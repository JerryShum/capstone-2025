import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { stitchVideoSchema } from '@shared/schemas/stitchVideoSchema';
import { Storage } from '@google-cloud/storage';
import type { Env } from '@server/lib/auth';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

// Point fluent-ffmpeg at the bundled binary (no system install required)
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

//------------------------------------------------------------------
// GCS Setup
//------------------------------------------------------------------
const GCS_BUCKET_NAME = process.env.GCS_BUCKET_NAME;
const storage = new Storage();
const bucket = storage.bucket(GCS_BUCKET_NAME!);

//------------------------------------------------------------------
// Helper: download a GCS public URL to a local tmp file
//------------------------------------------------------------------
async function downloadVideoTmp(url: string, destPath: string): Promise<void> {
   const response = await fetch(url);
   if (!response.ok) {
      throw new Error(`Failed to download video from ${url}: ${response.statusText}`);
   }
   const arrayBuf = await response.arrayBuffer();
   await fs.promises.writeFile(destPath, Buffer.from(arrayBuf));
}

//------------------------------------------------------------------
// Helper: concatenate via ffmpeg concat demuxer
// Writes a concat list file then runs ffmpeg stream copy (no re-encode)
//------------------------------------------------------------------
function concatVideos(inputFiles: string[], outputPath: string): Promise<void> {
   return new Promise((resolve, reject) => {
      // Build the concat list file content
      const listContent = inputFiles.map((f) => `file '${f.replace(/\\/g, '/')}'`).join('\n');
      const listPath = outputPath + '.concat.txt';
      fs.writeFileSync(listPath, listContent);

      ffmpeg()
         .input(listPath)
         .inputOptions(['-f', 'concat', '-safe', '0'])
         .outputOptions(['-c', 'copy']) // stream copy — instant, no quality loss
         .output(outputPath)
         .on('start', (cmd) => console.log('[stitch] ffmpeg command:', cmd))
         .on('end', () => {
            fs.unlinkSync(listPath); // clean up list file
            resolve();
         })
         .on('error', (err) => {
            try { fs.unlinkSync(listPath); } catch {}
            reject(err);
         })
         .run();
   });
}

//------------------------------------------------------------------
// Route
//------------------------------------------------------------------
export const stitchVideoRoute = new Hono<Env>()
   .post('/stitch', zValidator('json', stitchVideoSchema), async (c) => {
      const { videoURLs, projectId } = c.req.valid('json');

      // Create a working tmp directory for this request
      const sessionId = uuidv4();
      const tmpDir = path.join('./tmp', `stitch-${sessionId}`);
      fs.mkdirSync(tmpDir, { recursive: true });

      const downloadedFiles: string[] = [];
      const outputPath = path.join(tmpDir, 'stitched.mp4');

      try {
         console.log(`[stitch] Starting stitch for project ${projectId}: ${videoURLs.length} clips`);

         // 1. Download all videos in parallel
         await Promise.all(
            videoURLs.map(async (url, i) => {
               const dest = path.join(tmpDir, `clip-${i}.mp4`);
               console.log(`[stitch] Downloading clip ${i}: ${url}`);
               await downloadVideoTmp(url, dest);
               downloadedFiles.push(dest);
            }),
         );

         // Re-sort by index to guarantee order regardless of Promise.all resolution order
         downloadedFiles.sort((a, b) => {
            const ai = parseInt(path.basename(a).replace('clip-', '').replace('.mp4', ''));
            const bi = parseInt(path.basename(b).replace('clip-', '').replace('.mp4', ''));
            return ai - bi;
         });

         console.log('[stitch] All clips downloaded. Starting ffmpeg concat...');

         // 2. Concatenate via ffmpeg (stream copy — no re-encode, very fast)
         await concatVideos(downloadedFiles, outputPath);

         console.log('[stitch] Concatenation done. Uploading to GCS...');

         // 3. Upload to GCS
         const gcsDestination = `stitched/${projectId}/${sessionId}.mp4`;
         await bucket.upload(outputPath, {
            destination: gcsDestination,
            metadata: { contentType: 'video/mp4' },
         });

         const publicURL = `https://storage.googleapis.com/${bucket.name}/${gcsDestination}`;
         console.log(`[stitch] Stitched video uploaded to: ${publicURL}`);

         return c.json({ status: 'SUCCESS', stitchedVideoURL: publicURL }, 200);
      } catch (err: unknown) {
         console.error('[stitch] Error during stitching:', err);
         return c.json(
            {
               status: 'ERROR',
               message: err instanceof Error ? err.message : 'Failed to stitch videos.',
            },
            500,
         );
      } finally {
         // Clean up all tmp files regardless of success or failure
         try {
            await fs.promises.rm(tmpDir, { recursive: true, force: true });
            console.log(`[stitch] Cleaned up tmp dir: ${tmpDir}`);
         } catch (cleanupErr) {
            console.error('[stitch] Failed to clean tmp dir:', cleanupErr);
         }
      }
   });
