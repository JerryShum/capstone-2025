import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import {
   GoogleGenAI,
   VideoGenerationReferenceImage,
   VideoGenerationReferenceType,
} from '@google/genai';

//! Shared
import {
   postVideoSchema,
   sendVideoSchema,
} from '@shared/schemas/sendVideoSchema';

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
         },
         referenceType: VideoGenerationReferenceType.ASSET,
      };

      let operation = await genAI.models.generateVideos({
         model: 'veo-3.1-generate-preview',
         prompt: postOBJ.prompt,
         config: {
            referenceImages: [referenceImage],
            durationSeconds: 4,
         },
      });

      // Poll the operation status until the video is ready.
      while (!operation.done) {
         console.log('Waiting for video generation to complete...');
         await new Promise((resolve) => setTimeout(resolve, 10000));
         operation = await genAI.operations.getVideosOperation({
            operation: operation,
         });
      }

      // Poll the operation status until the video is ready.
      while (!operation.done) {
         console.log('Waiting for video generation to complete...');
         await new Promise((resolve) => setTimeout(resolve, 10000));
         operation = await genAI.operations.getVideosOperation({
            operation: operation,
         });
      }

      // Download the video.
      genAI.files.download({
         file: operation.response.generatedVideos[0].video,
         downloadPath: '../../../downloads/veo3_with_image_input.mp4',
      });

      return c.json({
         message: 'Video generated successfully!',
         videoUri: generatedVideo.uri,
      });
   })
   .get('/test', async (c) => {
      return c.json({ message: 'Server is running and test route works!' });
   });
