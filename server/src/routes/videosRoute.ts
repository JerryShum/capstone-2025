import { Hono } from 'hono';
import z from 'zod';
import { zValidator } from '@hono/zod-validator';
import { id } from 'zod/locales';
import { GoogleGenAI, Type } from '@google/genai';

//! Importing type from shared
import { sendScriptSchema } from '@shared/schemas/sendScriptSchema';
import { postScriptSchema } from '@shared/schemas/sendScriptSchema';

//! Importing prompt builder functions
import { buildScriptPrompt } from '@server/functions/buildScriptPrompt';
import { buildImagePrompt } from '@server/functions/buildImagePrompt';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
   throw new Error('GEMINI_API_KEY is not set in the environment variables.');
}

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

//! ZOD TYPING --> infer the type from the schema
type scriptPrompt = z.infer<typeof sendScriptSchema>;

//@ Define gemini text output schema
const geminiOutputSchema = z.object({
   script: z.string().describe('The full script for the storybook.'),
   video_prompt: z
      .array(z.string())
      .describe('An array of descriptive prompts for generating scene images.'),
});

type geminiTextOutput = z.infer<typeof geminiOutputSchema>;

//@ Temporary database
const testVideoPrompts: scriptPrompt[] = [
   {
      id: 1,
      title: 'Science',
      overview: 'A fun adventure explaining the water cycle.',
      agegroup: 'young-children',
      genre: 'adventure',
      artstyle: 'cartoon',
   },
   {
      id: 2,
      title: 'Mathematics',
      overview:
         'A comedic take on the concept of definite integrals and their applications in physics.',
      agegroup: 'preschool',
      genre: 'comedy',
      artstyle: 'watercolor',
   },
   {
      id: 3,
      title: 'History',
      overview:
         'A fairy-tale journey through the Industrial Revolution in Europe.',
      agegroup: 'toddlers',
      genre: 'fairy-tale',
      artstyle: 'pixel-art',
   },
   {
      id: 4,
      title: 'Computer Science',
      overview:
         'An adventurous explanation of how blockchain works and its security features.',
      agegroup: 'young-children',
      genre: 'adventure',
      artstyle: '3d-render',
   },
   {
      id: 5,
      title: 'Literature',
      overview:
         "A fantasy retelling of Shakespeare's Romeo and Juliet, focusing on themes of love and loss.",
      agegroup: 'preschool',
      genre: 'fantasy',
      artstyle: 'line-art',
   },
];

export const videosRoute = new Hono()
   .get('/', (c) => {
      return c.json({ message: 'Videos Route' });
   })
   .get('/:id', (c) => {
      const { id } = c.req.param();
      return c.json({ message: `Video ${id}` });
   })
   .post('/create', zValidator('json', postScriptSchema), async (c) => {
      //@ when someone sends a post request to our backend, their submitted JSON goes through the validator first
      // it checks whether their JSON matches the schema that we specified above.

      //@ if it passed, then we get the json obj using .valid
      const promptOBJ = await c.req.valid('json');

      //! Replace with DB later --> storing the user input into the DB
      testVideoPrompts.push({ ...promptOBJ, id: testVideoPrompts.length + 1 });

      //! Building a prompt based on the user's inputs
      const scriptPromptToSend = buildScriptPrompt(promptOBJ);
      const imagePromptToSend = buildImagePrompt(promptOBJ);

      //! PROMPT GEMINI API --> Generate promises
      //@ Text model --> script generation
      const scriptPromise = genAI.models.generateContent({
         model: 'gemini-2.5-flash',
         contents: scriptPromptToSend,
         config: {
            systemInstruction:
               'You are a creative assistant for a storybook generation app. Your task is to take some paramters related to a story (Title, Overview, Agegroup, Genre, Art Style) and generate an appropriate script for the storybook.',
            responseMimeType: 'application/json',
            responseSchema: {
               type: Type.OBJECT,
               properties: {
                  script: {
                     type: Type.STRING,
                     description: 'The full script for the storybook.',
                  },
                  video_prompt: {
                     type: Type.ARRAY,
                     items: {
                        type: Type.STRING,
                     },
                     description:
                        'An array of strings, where each string is a detailed prompt for generating a scene image/video.',
                  },
               },
               required: ['script', 'video_prompt'],
            },
         },
      });

      //@ Nano banana --> Image generation
      const imagePromise = genAI.models.generateContent({
         model: 'gemini-2.5-flash-image',
         contents: imagePromptToSend,
         config: {
            systemInstruction: '',
         },
      });

      //! Execute both promises in parallel
      const [scriptResult, imageResult] = await Promise.all([
         scriptPromise,
         imagePromise,
      ]);

      //! Handle the script result:
      const scriptResponse = scriptResult;

      if (!scriptResponse || !scriptResponse.text) {
         throw new Error('Script generation returned no text.');
      }
      console.log(scriptResponse.text);
      const scriptRawJSON = JSON.parse(scriptResponse.text);
      const structuredScriptJSON: geminiTextOutput =
         geminiOutputSchema.parse(scriptRawJSON);

      //! Handle the image result:
      if (
         !imageResult ||
         !imageResult.candidates ||
         imageResult.candidates.length === 0
      ) {
         throw new Error('Error when sending request to generate image.');
      }

      const candidate = imageResult.candidates[0];
      if (!candidate || !candidate.content || !candidate.content.parts) {
         throw new Error('Image generation failed, no image data returned.');
      }

      const imagePart = candidate.content.parts.find((part) => part.inlineData);

      if (!imagePart || !imagePart.inlineData) {
         throw new Error('Image generation failed, no image data returned.');
      }

      const imageBase64 = imagePart.inlineData.data;

      return c.json({
         message: 'Content generated successfully!',
         script: structuredScriptJSON.script,
         video_prompt: structuredScriptJSON.video_prompt,
         imageBase64: imageBase64,
      });
   });
