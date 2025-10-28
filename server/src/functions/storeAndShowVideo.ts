import type { Bucket } from '@google-cloud/storage';
import type { Video } from '@google/genai';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';

import { GoogleGenAI } from '@google/genai';

// +++ ADDED HELPER FUNCTION +++
/**
 * Waits for a file to exist at the specified path and have a size greater than 0.
 * This polls the filesystem to avoid race conditions where an operation
 * continues before a file stream has fully closed.
 * @param filePath The full path to the file to check.
 * @param timeout The maximum time to wait in milliseconds.
 */
async function waitForFile(filePath: string, timeout = 10000): Promise<void> {
   const startTime = Date.now();
   console.log(`Waiting for file to appear at: ${filePath}`);
   while (Date.now() - startTime < timeout) {
      try {
         // fs.promises.stat throws if file doesn't exist
         const stats = await fs.promises.stat(filePath);

         // Check if file has content
         if (stats.size > 0) {
            console.log(`✅ File found and has content (${stats.size} bytes).`);
            return; // Success!
         }

         console.log(
            `... File exists but is empty (0 bytes). Waiting for content...`
         );
         // File exists but is empty, so we wait.
      } catch (error: any) {
         if (error.code !== 'ENOENT') {
            // It's an error other than "File Not Found", so we should fail fast.
            console.error(`Error while waiting for file: ${error.message}`);
            throw error;
         }
         // File doesn't exist yet (ENOENT), so we wait.
         console.log(`... File not found. Waiting...`);
      }
      // Wait for a short duration before polling again
      await new Promise((resolve) => setTimeout(resolve, 250));
   }

   // If we exit the loop, we timed out
   throw new Error(
      `Timeout: File not found or was empty at ${filePath} after ${timeout}ms`
   );
}
// +++ END ADDED HELPER FUNCTION +++

export async function storeAndShowVideo(
   videoFile: Video,
   bucket: Bucket,
   genAI: GoogleGenAI
): Promise<string> {
   console.log('VIDEO FILE:' + videoFile.uri);

   //@ create a unique filename using uuidv4 function
   const uniqueFileName = `${uuidv4()}.mp4`;
   console.log('FILENAME:' + uniqueFileName);

   //! Check for temp directory first
   const tempDir = os.tmpdir();

   if (!fs.existsSync(tempDir)) {
      console.log(
         `Temp Directrory: ${tempDir} does not exist. Creating now...`
      );
      fs.mkdirSync(tempDir, { recursive: true });
   }

   //@ define a temp file path --> \appdata\local\temp\<filename>
   const tempLocalPath = path.join(tempDir, uniqueFileName);
   console.log('Temp file path:', tempLocalPath);

   console.log('Temp dir is:', tempDir);

   try {
      fs.accessSync(tempDir, fs.constants.W_OK);
      console.log('✅ Temp directory is writable');
   } catch (err) {
      console.error('❌ Temp directory is not writable:', err);
      // If we can't write to the temp dir, we must stop.
      throw new Error(`Temp directory ${tempDir} is not writable.`);
   }

   try {
      //@ download the video and store it in the temp directory
      await genAI.files.download({
         file: videoFile,
         downloadPath: tempLocalPath,
      });
      console.log('Download call finished. Verifying file existence...');

      // +++ ADDED VERIFICATION STEP +++
      // Wait for the file to actually exist on the filesystem and have content.
      await waitForFile(tempLocalPath, 10000); // Wait up to 10 seconds
      // +++ END ADDED STEP +++

      console.log('File downloaded and verified successfully.');

      // Right after download()
      // *** DEBUGGING FIX: Changed to check the tempDir, not process.cwd() ***
      const files = fs.readdirSync(tempDir);
      console.log(
         `Files in temp directory (${tempDir}):`,
         files.filter((f) => f.includes(uniqueFileName.substring(0, 5)))
      ); // Filter to find our file
   } catch (downloadError) {
      console.error('--- DOWNLOAD/VERIFICATION FAILED ---');
      console.error(
         `Failed to download or verify video file at ${tempLocalPath}`,
         downloadError
      );
      throw new Error('Failed to download video from Google.');
   }

   //! DEBUG CHECK SIZE
   const stats = fs.statSync(tempLocalPath);
   console.log(`Downloaded file size: ${stats.size} bytes`);

   // +++ ADDED DEBUG STEP: Check for read permissions before upload +++
   // This helps verify if the process has rights to read the file it just wrote.
   try {
      fs.accessSync(tempLocalPath, fs.constants.R_OK);
      console.log('✅ Temp file is readable');
   } catch (err) {
      console.error('❌ Temp file is not readable:', err);
      // If we can't read it, the upload will fail.
      throw new Error(`Downloaded file ${tempLocalPath} is not readable.`);
   }
   // +++ END ADDED STEP +++

   //@ upload to bucket
   try {
      await bucket.upload(tempLocalPath, {
         destination: uniqueFileName,
         // +++ LIKELY FIX: Explicitly set the content type +++
         // This tells GCS to treat the file as a video/mp4, preventing it
         // from defaulting to application/octet-stream or another incorrect type.
         metadata: {
            contentType: 'video/mp4',
         },
         // +++ END ADDED FIX +++
      });
      console.log('File uploaded successfully to GCS.');
   } catch (uploadError) {
      console.error('--- UPLOAD FAILED ---');
      console.error(
         `Failed to upload file from ${tempLocalPath} to GCS.`,
         uploadError
      );
      // This is where your ENOENT was originally thrown
      throw new Error('Failed to upload video to GCS.');
   }

   //! DEBUG AFTER UPLOAD
   try {
      const [metadata] = await bucket.file(uniqueFileName).getMetadata();
      console.log('GCS uploaded file size:', metadata.size);

      // Compare local and remote sizes
      if (stats.size.toString() === metadata.size) {
         console.log('✅ Size match: Local and GCS file sizes are identical.');
      } else {
         console.warn(
            `❌ Size mismatch: Local (${stats.size}) vs GCS (${metadata.size})`
         );
      }
   } catch (metaError) {
      console.error('Failed to get GCS metadata after upload', metaError);
   }

   // --- FIX: Public Access Prevention ---
   // The line below is commented out because the GCS bucket has "public access prevention"
   // enforced, which blocks .makePublic() and throws a 412 error.
   // await bucket.file(uniqueFileName).makePublic();
   console.log('Skipping .makePublic() due to public access prevention.');

   // Instead of a public URL, we will generate a time-limited Signed URL.
   // This provides secure, temporary access to the file.

   // Set options for the signed URL
   const signedUrlOptions = {
      version: 'v4' as const, // Use v4 signing
      action: 'read' as const, // We want to read the file
      expires: Date.now() + 15 * 60 * 1000, // URL expires in 15 minutes
   };

   let signedUrl: string;
   try {
      // Generate the signed URL
      const [url] = await bucket
         .file(uniqueFileName)
         .getSignedUrl(signedUrlOptions);
      signedUrl = url;
      console.log('Generated Signed URL (valid for 15 mins).');
   } catch (signError) {
      console.error('--- SIGNED URL FAILED ---');
      console.error(
         `Failed to generate signed URL for ${uniqueFileName}`,
         signError
      );
      throw new Error('Failed to generate signed URL for GCS file.');
   }
   // --- END FIX ---

   //@ get the URL from the bucket:
   // const publicUrl = `https://storage.googleapis.com/${bucket.name}/${uniqueFileName}`; // <-- This won't work
   // console.log('Public URL:', publicUrl); // <-- This is replaced by the signedUrl

   //@ delete video locally:
   try {
      fs.unlinkSync(tempLocalPath);
      console.log('Local temp file deleted.');
   } catch (unlinkError) {
      console.warn(
         `Failed to delete local temp file ${tempLocalPath}`,
         unlinkError
      );
   }

   return signedUrl;
}
