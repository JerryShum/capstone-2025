import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import {
   GoogleGenAI,
   VideoGenerationReferenceType,
   GenerateVideosOperation,
} from '@google/genai';
import type { VideoGenerationReferenceImage } from '@google/genai';

//! Shared
import {
   postVideoSchema,
   sendVideoSchema,
} from '@shared/schemas/sendVideoSchema';

//----------------------------------------------------------------------

//! Imports for GCS
import { Storage } from '@google-cloud/storage'; // The GCS toolbox
import { v4 as uuidv4 } from 'uuid'; // The unique name generator
import * as path from 'path'; // Node.js tool for file paths
import * as os from 'os'; // Node.js tool for finding the temp directory
import * as fs from 'fs';
import { types } from 'util';
import { storeAndShowVideo } from '@server/functions/storeAndShowVideo';

//! GCS bucket name and credentials
const GCS_BUCKET_NAME = process.env.GCS_BUCKET_NAME; // Add this to your .env!

//! Connecting to GCS
const storage = new Storage();
const bucket = storage.bucket(GCS_BUCKET_NAME!);

//----------------------------------------------------------------------

//! Setting up google ai
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
   throw new Error('GEMINI_API_KEY is not set in the environment variables.');
}

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// -----------------------------------------------------------------------------------

export const createVideoRoute = new Hono()
   .post('/video', zValidator('json', postVideoSchema), async (c) => {
      //! get validated data from zValidator
      const postOBJ = await c.req.valid('json');

      // declare interface Image_2 {
      //     /** The Cloud Storage URI of the image. ``Image`` can contain a value
      //      for this field or the ``image_bytes`` field but not both. */
      //     gcsUri?: string;
      //     /** The image bytes data. ``Image`` can contain a value for this field
      //      or the ``gcs_uri`` field but not both.
      //      * @remarks Encoded as base64 string. */
      //     imageBytes?: string;
      //     /** The MIME type of the image. */
      //     mimeType?: string;
      // }

      const referenceImage: VideoGenerationReferenceImage = {
         image: {
            imageBytes: postOBJ.imageBase64,
            mimeType: 'image/png',
         },
         referenceType: VideoGenerationReferenceType.ASSET,
      };

      let operation = await genAI.models.generateVideos({
         model: 'veo-3.1-fast-generate-preview',
         prompt: postOBJ.prompt,
         config: {
            durationSeconds: 6,
         },
      });

      return c.json({
         operationName: operation.name,
      });
   })
   .get('/video/status/:name{.+}', async (c) => {
      // get the "ticket number / operation number" from the URL (that the client will send)
      const operationName = c.req.param('name');

      const operationBuild = {
         name: operationName,
      } as GenerateVideosOperation;

      // use the operationName --> get the operation object from google
      let operation = await genAI.operations.getVideosOperation({
         operation: operationBuild,
      });

      //@ check if the operation is "done" (video is done generating)
      if (!operation.done) {
         return c.json({ status: 'PROCESSING' });
      }

      //@ check if there was an error that occurred
      if (operation.error) {
         console.error('Video generation failed:', operation.error.message);
         return c.json(
            { status: 'FAILED', error: operation.error.message },
            500
         );
      }

      //@ operation should be ready here:
      console.log('job is done --> upload to GCS');

      const generatedVideos = operation.response?.generatedVideos;
      if (!generatedVideos || generatedVideos.length === 0) {
         console.error('No generated videos found in operation response.');
         return c.json(
            { status: 'FAILED', error: 'No generated videos found' },
            500
         );
      }

      const video = generatedVideos[0]?.video;
      if (!video) {
         console.error('No video object found in the first generated video.');
         return c.json({ status: 'FAILED', error: 'Video data missing' }, 500);
      }

      const videoURL = await storeAndShowVideo(video, bucket);

      return c.json(
         {
            status: 'SUCCESS',
            message: 'video has been successfully generated.',
            videoURL: videoURL,
         },
         200
      );
   })
   .get('/test', async (c) => {
      return c.json({ message: 'Server is running and test route works!' });
   });
