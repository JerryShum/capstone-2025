import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { waitForFile } from '../deprecated/waitForFile';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const execFileAsync = promisify(execFile);

/**
 * Downloads a video from a GCS public URL and extracts the very last frame as a
 * base64-encoded PNG string using ffmpeg.
 *
 * Used as a fallback when native Veo video extension is unavailable
 * (e.g. when the previous video is older than 2 days and Gemini's internal
 * reference may no longer be live).
 */
export async function extractLastFrame(gcsPublicUrl: string): Promise<string> {
   const id = uuidv4();
   const tmpDir = './tmp';
   const videoPath = path.join(tmpDir, `${id}.mp4`);
   const framePath = path.join(tmpDir, `${id}_frame.png`);

   // Ensure tmp dir exists
   fs.mkdirSync(tmpDir, { recursive: true });

   try {
      console.log(`[extractLastFrame] Downloading video from: ${gcsPublicUrl}`);

      // Download the video from GCS public URL
      const response = await fetch(gcsPublicUrl);
      if (!response.ok) {
         throw new Error(
            `Failed to download video: ${response.status} ${response.statusText}`,
         );
      }
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(videoPath, Buffer.from(buffer));

      // Wait for the file to be ready
      await waitForFile(videoPath);

      console.log(`[extractLastFrame] Extracting last frame via ffmpeg...`);

      const ffmpegPath = ffmpegInstaller?.path;
      if (!ffmpegPath) {
         throw new Error(
            'FFmpeg binary is unavailable. Ensure @ffmpeg-installer/ffmpeg is installed for this platform.',
         );
      }

      // Use ffmpeg to grab the very last frame
      // -sseof -0.1  → seek to 0.1s before end
      // -frames:v 1  → extract exactly 1 frame
      // -q:v 2       → high quality PNG
      await execFileAsync(ffmpegPath, [
         '-y',
         '-sseof',
         '-0.1',
         '-i',
         videoPath,
         '-frames:v',
         '1',
         '-q:v',
         '2',
         framePath,
      ]);

      // Wait for the output frame to be written
      await waitForFile(framePath);

      console.log(`[extractLastFrame] Frame extracted successfully.`);

      // Read frame and encode as base64
      const frameBuffer = fs.readFileSync(framePath);
      const base64 = frameBuffer.toString('base64');

      return base64;
   } finally {
      // Clean up temp files
      for (const filePath of [videoPath, framePath]) {
         try {
            if (fs.existsSync(filePath)) {
               fs.unlinkSync(filePath);
               console.log(`[extractLastFrame] Cleaned up temp file: ${filePath}`);
            }
         } catch (err) {
            console.warn(`[extractLastFrame] Failed to delete temp file ${filePath}:`, err);
         }
      }
   }
}
