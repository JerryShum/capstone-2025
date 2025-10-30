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
   console.log('FILENAME:' + uniqueFileName);

   return '';
}
