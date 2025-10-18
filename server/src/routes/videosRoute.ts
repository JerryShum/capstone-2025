import { Hono } from 'hono';
import z from 'zod';
import { zValidator } from '@hono/zod-validator';
import { id } from 'zod/locales';
import { GoogleGenAI } from '@google/genai';

//! Importing type from shared
import { sendScriptSchema } from '@shared/schemas/sendScriptSchema';
import { postScriptSchema } from '@shared/schemas/sendScriptSchema';

//! Importing prompt builder functions
import { buildScriptPrompt } from '@server/functions/buildScriptPrompt';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
   throw new Error('GEMINI_API_KEY is not set in the environment variables.');
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

//! ZOD TYPING --> infer the type from the schema
type scriptPrompt = z.infer<typeof sendScriptSchema>;

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
      const promptToSend = buildScriptPrompt(promptOBJ);

      //! PROMPT GEMINI API
      const response = await ai.models.generateContent({
         model: 'gemini-2.5-flash',
         contents: promptToSend,
         config: {
            systemInstruction:
               'You are a creative assistant for a storybook generation app. Your task is to take some paramters related to a story (Title, Overview, Agegroup, Genre, Art Style) and generate two things: 1. A short story segment appropriate for a young child. 2. A detailed, descriptive prompt that can be used to generate a beautiful illustration for that story segment in an AI image generator. Provide the output in a valid JSON object with the following keys: "story_segment" and "image_prompt"',
         },
      });

      // Safely parse response.text which may be undefined and guard against invalid JSON
      let parsedResponse: unknown = null;
      if (typeof response.text === 'string') {
         try {
            parsedResponse = JSON.parse(response.text);
         } catch (err) {
            console.warn('Failed to parse response.text as JSON:', err);
            // fall back to the raw text if it's not valid JSON
            parsedResponse = response.text;
         }
      } else {
         console.warn('response.text is undefined');
      }
      console.log(parsedResponse);

      return c.json({ response: response.text });
   });
