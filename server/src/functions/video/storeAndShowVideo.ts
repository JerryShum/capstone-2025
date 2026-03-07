import type { Bucket } from '@google-cloud/storage';
import type { Video } from '@google/genai';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

import { GoogleGenAI } from '@google/genai';
import { waitForFile } from '../deprecated/waitForFile';

export async function storeAndShowVideo(
   videoFile: Video,
   bucket: Bucket,
   genAI: GoogleGenAI,
): Promise<string> {
   console.log('VIDEO FILE:' + videoFile.uri);

   //! Steps
   // 1. Download the video from google
   //    1.1 Create a unique name for the video
   //    1.2 See if the video works when downloaded locally
   // 2. Create a directory in the server / files dedicated to video downloads
   // 3. Download the video to that specific directory
   // 4. Upload to GCS
   // 5. Get the link for the video from GCS

   //@ create a unique filename using uuidv4 function
   const uniqueFileName = `${uuidv4()}.mp4`;
   const FILE_PATH = `./tmp/${uniqueFileName}`;
   console.log('FILENAME:' + uniqueFileName);

   //@ create a /tmp folder in the server (if it doesnt exist)
   fs.mkdirSync('./tmp', { recursive: true });

   try {
      //! Downloading the video from google using the videoFile (name)
      await genAI.files.download({
         file: videoFile,
         downloadPath: FILE_PATH,
      });

      await waitForFile(FILE_PATH);

      // Upload the temporary file to Google Cloud Storage
      const gcsFileName = `videos/${uniqueFileName}`; // Specify a folder in GCS
      await bucket.upload(FILE_PATH, {
         destination: gcsFileName,
         metadata: {
            contentType: 'video/mp4',
         },
      });

      //! 3. create a public URL (unlisted url similar to youtube) --> allows any user with the URL to access video
      console.log('Generating public URL...');

      const publicURL = `https://storage.googleapis.com/${bucket.name}/${gcsFileName}`;

      console.log('Upload complete! Signed URL:', publicURL);

      // Return the secure, temporary URL
      return publicURL;
   } catch (err) {
      console.error('Error processing video:', err);
      throw err;
   } finally {
      //! after delete the video file
      try {
         await fs.promises.unlink(FILE_PATH);
         console.log(`Temp file deleted: ${FILE_PATH}`);
      } catch (cleanupErr) {
         console.error(`Failed to delete temp file ${FILE_PATH}:`, cleanupErr);
      }
   }
}
