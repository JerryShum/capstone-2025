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
   //@ create a unique filename using uuidv4 function
   const uniqueFileName = `${uuidv4()}.mp4`;
   console.log('FILENAME:' + uniqueFileName);

   //@ define a temp file path --> \appdata\local\temp\<filename>
   const tempLocalPath = path.join(os.tmpdir(), uniqueFileName);
   console.log(tempLocalPath);

   //@ download the video and store it in the temp directory
   await genAI.files.download({
      file: videoFile,
      downloadPath: tempLocalPath,
   });

   //@ upload to bucket
   await bucket.upload(tempLocalPath, {
      destination: uniqueFileName,
      metadata: {
         contentType: 'video/mp4',
      },
   });

   //@ make the file public
   await bucket.file(uniqueFileName).makePublic();

   //@ get the URL from the bucket:
   const publicUrl = `https://storage.googleapis.com/${bucket.name}/${uniqueFileName}`;

   //@ delete video locally:
   fs.unlinkSync(tempLocalPath);

   return publicUrl;
}
