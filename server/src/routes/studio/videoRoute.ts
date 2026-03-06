import { zValidator } from '@hono/zod-validator';
import { postVideoSchema } from '@shared/schemas/sendVideoSchema';
import { Hono } from 'hono';
import { buildGCPVideoPrompt } from '@server/functions/video/buildGCPVideoPrompt';
import { GenerateVideosOperation, GoogleGenAI } from '@google/genai';

//---------------------------------------------------------

//! Google Gemini API Setup
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
   throw new Error('GEMINI_API_KEY is not set in the environment variables.');
}

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const videoRoute = new Hono()
   .post('/generate', zValidator('json', postVideoSchema), async (c) => {
      // get validated data from validator
      const data = c.req.valid('json');

      //---------------------------------------------------------
      // create master prompt using prompt builder function:
      const masterPrompt = buildGCPVideoPrompt(data);
      console.log('--- MASTER PROMPT BUILT ---');
      console.log(masterPrompt);
      console.log('---------------------------');

      //---------------------------------------------------------
      //@ Gemini api call
      try {
         const operation = await genAI.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: masterPrompt,
            config: {
               durationSeconds: 8,
            },
         });

         if (!operation) {
            throw new Error('SERVER: Failed to start video generation.');
         }

         return c.json({
            operationName: operation.name,
         });
      } catch (error) {
         return c.json(
            {
               message: error,
            },
            500,
         );
      }
   })
   .get('/status/:name{.+}', async (c) => {
      // get the operationName from the URL
      const operationName = c.req.param('name');

      // ask gemini for the status on the operation
      const operationBuild = new GenerateVideosOperation();
      operationBuild.name = operationName;

      const operation = await genAI.operations.getVideosOperation({
         operation: operationBuild,
      });

      //@ return the state of the operation
      // if the operation is not done yet
      if (!operation.done) {
         return c.json({ status: 'PROCESSING', videosURL: undefined });
      }

      if (operation.error) {
         return c.json({ status: 'ERROR', videosURL: undefined });
      }

      return c.json({ status: 'READY_TO_DOWNLOAD' });
   });
