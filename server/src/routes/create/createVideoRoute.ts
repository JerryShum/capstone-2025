import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import {
   GoogleGenAI,
   GenerateVideosOperation,
} from '@google/genai';

//! Shared
import {
   postVideoSchema
} from '@shared/schemas/sendVideoSchema';

//----------------------------------------------------------------------

//! Imports for GCS
import { Storage } from '@google-cloud/storage'; // The GCS toolbox
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

      let operation = await genAI.models.generateVideos({
         model: 'veo-3.1-fast-generate-preview',
         prompt: postOBJ.prompt,
         config: {
            durationSeconds: 4,
         },
      });

      if (!operation) {
         console.error('Something went wrong when sending the api request');
      }

      return c.json({
         operationName: operation.name,
      });
   })
   .get('/video/status/:name{.+}', async (c) => {
      // get the "ticket number / operation number" from the URL (that the client will send)
      const operationName = c.req.param('name');

      const operationBuild = new GenerateVideosOperation();
      operationBuild.name = operationName;

      const operation = await genAI.operations.getVideosOperation({
         operation: operationBuild,
      });

      //@ 1. PROCESSING
      if (!operation.done) {
         return c.json({
            status: 'PROCESSING',
            videoURL: undefined,
            error: undefined,
            message: undefined, // <-- Add this
         });
      }

      //@ 2. FAILED (DURING OPERATION)
      if (operation.error) {
         console.error('Video generation failed:', operation.error.message);
         return c.json({
            status: 'FAILED',
            videoURL: undefined,
            error: operation.error.message || 'Unknown error',
            message: undefined, // <-- Add this
         });
      }

      //@ operation should be ready here
      const generatedVideos = operation.response?.generatedVideos;

      //@ 3. FAILED (NO VIDEOS)
      if (!generatedVideos || generatedVideos.length === 0) {
         return c.json({
            status: 'FAILED',
            videoURL: undefined,
            error: 'no generated video found in operation response',
            message: undefined, // <-- Add this
         });
      }

      const video = generatedVideos[0]?.video;

      //@ 4. FAILED (NO VIDEO OBJECT)
      if (!video) {
         return c.json({
            status: 'FAILED',
            videoURL: undefined,
            error: 'Video data missing in response',
            message: undefined, // <-- Add this
         });
      }

      const videoURL = await storeAndShowVideo(video, bucket, genAI);
      console.log('VIDEO IN SERVER ROUTE:' + videoURL);

      //@ 5. SUCCESS
      return c.json(
         {
            status: 'SUCCESS',
            videoURL: videoURL,
            error: undefined, // <-- Add this
            message: 'video has been successfully generated.',
         },
         200
      );
   })
   .get('/test', async (c) => {
      return c.json({ message: 'Server is running and test route works!' });
   });
