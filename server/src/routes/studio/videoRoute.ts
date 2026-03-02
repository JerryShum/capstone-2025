import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';

//! Shared
import { postVideoSchema, type postVideoSchemaType } from '@shared/schemas/sendVideoSchema';
import type { CharacterNodeData, EnvironmentNodeData } from '@shared';

//----------------------------------------------------------------------

//! Imports for GCS
import { Storage } from '@google-cloud/storage'; // The GCS toolbox
import { storeAndShowVideo } from '@server/functions/storeAndShowVideo';

//! GCS bucket name and credentials
const GCS_BUCKET_NAME = process.env.GCS_BUCKET_NAME; // Add this to your .env!

//! Connecting to GCS
const storage = new Storage({
   keyFilename: './gcs-service-account.json', // Use explicit service account if present
});
const bucket = storage.bucket(GCS_BUCKET_NAME!);

//----------------------------------------------------------------------

//! Setting up google ai
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
   throw new Error('GEMINI_API_KEY is not set in the environment variables.');
}

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// -----------------------------------------------------------------------------------

/**
 * 🎓 MENTOR CHALLENGE #4: The Server-Side "Master Builder"
 * 
 * Your Goal:
 * 1. Create a "Setting" string from the environments array.
 * 2. Create a "Subject" string from the characters array.
 * 3. Combine them with the action 'prompt' from the SceneNode.
 */
function buildGCPVideoPrompt(data: postVideoSchemaType): string {
   const { prompt, characters, environments } = data;

   // 1. Build Environment Context
   const environmentContext = environments.length > 0
      ? environments.map((env: EnvironmentNodeData) => 
         `at ${env.location}, during the ${env.timeOfDay}, with ${env.weather} weather and ${env.lightingStyle} lighting. ${env.description}`
      ).join(' ')
      : '';

   // 2. Build Character Context
   const characterContext = characters.length > 0
      ? `Featuring ${characters.map((char: CharacterNodeData) => 
         `${char.name} (${char.appearance}, in ${char.style} style)`
      ).join(' and ')}.`
      : '';

   // 3. Combine with Scene Action
   const masterPrompt = [
      environmentContext,
      characterContext,
      `Action: ${prompt}`,
      'Cinematic style, high quality, professional cinematography.'
   ].filter(Boolean).join(' ');
   
   return masterPrompt; 
}

// -----------------------------------------------------------------------------------

export const videoRoute = new Hono()
   .post('/generate', zValidator('json', postVideoSchema), async (c) => {
      //! get validated data from zValidator
      const postOBJ = await c.req.valid('json');

      const masterPrompt = buildGCPVideoPrompt(postOBJ);

      let operation = await genAI.models.generateVideos({
         model: 'veo-3.1-fast-generate-preview',
         prompt: masterPrompt,
         config: {
            durationSeconds: postOBJ.duration,
            aspectRatio: postOBJ.aspectRatio,
         },
      });

      if (!operation) {
         console.error('Something went wrong when sending the api request');
      }

      return c.json({
         operationName: operation.name,
      });
   })
   .get('/status/:name{.+}', async (c) => {
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
            message: undefined,
         });
      }

      //@ 2. FAILED (DURING OPERATION)
      if (operation.error) {
         console.error('Video generation failed:', operation.error.message);
         return c.json({
            status: 'FAILED',
            videoURL: undefined,
            error: operation.error.message || 'Unknown error',
            message: undefined,
         });
      }

      //@ operation should be ready here
      const generatedVideos = operation.response?.generatedVideos;
      console.log('GENERATED VIDEOS RESPONSE:', JSON.stringify(generatedVideos, null, 2));

      //@ 3. FAILED (NO VIDEOS)
      if (!generatedVideos || generatedVideos.length === 0) {
         return c.json({
            status: 'FAILED',
            videoURL: undefined,
            error: 'no generated video found in operation response',
            message: undefined,
         });
      }

      const video = generatedVideos[0]?.video;

      //@ 4. FAILED (NO VIDEO OBJECT)
      if (!video) {
         return c.json({
            status: 'FAILED',
            videoURL: undefined,
            error: 'Video data missing in response',
            message: undefined,
         });
      }

      const videoURL = await storeAndShowVideo(video, bucket, genAI);
      console.log('VIDEO IN SERVER ROUTE:' + videoURL);

      //@ 5. SUCCESS
      return c.json(
         {
            status: 'SUCCESS',
            videoURL: videoURL,
            error: undefined,
            message: 'video has been successfully generated.',
         },
         200
      );
   })
   .get('/test', async (c) => {
      return c.json({ message: 'Server is running and test route works!' });
   });
