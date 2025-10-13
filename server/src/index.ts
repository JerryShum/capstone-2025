import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/bun';
import type { ApiResponse } from 'shared/dist';
import { logger } from 'hono/logger';
import { videosRoute } from './routes/videosRoute';
import { imageGenerationRoute } from './routes/imageGenerationRoute';
import { stream } from 'hono/streaming';
import { GoogleGenAI } from '@google/genai';

const app = new Hono();

app.use(cors());
app.use('*', logger());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
   throw new Error('GEMINI_API_KEY is not set in the environment variables.');
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const apiroutes = app
   .basePath('/api')
   .get('/hello', async (c) => {
      const data: ApiResponse = {
         message: 'hello',
         success: true,
      };
      return c.json(data, { status: 200 });
   })
   .post('/generate', async (c) => {
      try {
         const { prompt: userPrompt, audience, genre, length } = await c.req.json();

         if (!userPrompt) {
            return c.json({ success: false, message: 'Prompt is required.' }, 400);
         }

         const detailedPrompt = `
You are an expert storyteller.
Your task is to write a captivating and imaginative story based on the user's prompt and the specified options.

Please adhere to the following rules:
1.  **Target Audience:** The story must be appropriate for ${audience}.
2.  **Genre:** The story must be in the ${genre} genre.
3.  **Word Count:** The story must be approximately ${length} words long.
4.  **Safe for Work:** The story must be strictly safe-for-work. Avoid any scary, violent, or mature themes, especially if the audience is children.
5.  **Story Format:** The story must have a clear beginning, middle, and end.
6.  **Quality:** The story should be well-written, with good grammar and a rich vocabulary suitable for the target audience.

User's Prompt: "${userPrompt}"

Please begin the story now.
`;

         const result = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: [{ role: 'user', parts: [{ text: detailedPrompt }] }],
         });

         return stream(c, async (stream) => {
            for await (const chunk of result) {
               const chunkText = chunk.text;
               if (chunkText) {
                  await stream.write(chunkText);
               }
            }
         });
      } catch (error) {
         console.error('Error generating story:', error);
         c.status(500);
         return c.json({ success: false, message: 'Failed to generate story.' });
      }
   })
   .route('/videos', videosRoute)
   .route('/generate-image', imageGenerationRoute);

app.use('*', serveStatic({ root: './static' }));
app.get('*', async (c, next) => {
   return serveStatic({ root: './static', path: 'index.html' })(c, next);
});

export default app;
export type ApiRoutes = typeof apiroutes;
