import type { Bucket } from '@google-cloud/storage';
import type { Video } from '@google/genai';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';

import { GoogleGenAI } from '@google/genai';

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
   console.log(tempLocalPath);

   console.log('Temp dir is:', tempDir);

   try {
      fs.accessSync(tempDir, fs.constants.W_OK);
      console.log('✅ Temp directory is writable');
   } catch (err) {
      console.error('❌ Temp directory is not writable:', err);
   }

   try {
      //@ download the video and store it in the temp directory
      await genAI.files.download({
         file: videoFile,
         downloadPath: tempLocalPath,
      });
      console.log('File downloaded successfully to temp path.');

      // Right after download()
      const files = fs.readdirSync(process.cwd());
      console.log('Files in current working directory:', files);
   } catch (downloadError) {
      console.error('--- DOWNLOAD FAILED ---');
      console.error(
         `Failed to download video file to ${tempLocalPath}`,
         downloadError
      );
      throw new Error('Failed to download video from Google.');
   }

   //! DEBUG CHECK SIZE
   const stats = fs.statSync(tempLocalPath);
   console.log(`Downloaded file size: ${stats.size} bytes`);

   //@ upload to bucket
   try {
      await bucket.upload(tempLocalPath, {
         destination: uniqueFileName,
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
   const [metadata] = await bucket.file(uniqueFileName).getMetadata();
   console.log('GCS uploaded file size:', metadata.size);

   //@ make the file public
   await bucket.file(uniqueFileName).makePublic();

   //@ get the URL from the bucket:
   const publicUrl = `https://storage.googleapis.com/${bucket.name}/${uniqueFileName}`;

   //@ delete video locally:
   fs.unlinkSync(tempLocalPath);

   return publicUrl;
}
