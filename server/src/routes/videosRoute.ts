import { Hono } from 'hono';
import z from 'zod';
import { zValidator } from '@hono/zod-validator';
import { id } from 'zod/locales';
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
   throw new Error('GEMINI_API_KEY is not set in the environment variables.');
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const videosPromptSchema = z.object({
   id: z.number().int().positive().min(1),
   title: z.string().min(3).max(100),
   overview: z.string().min(10),
   agegroup: z.string(),
   genre: z.string(),
   artstyle: z.string(),
});

type videoPrompt = z.infer<typeof videosPromptSchema>;

//wanted structure of data when someone POSTS:
const createVideoPromptSchema = videosPromptSchema.omit({ id: true });

const testVideoPrompts: videoPrompt[] = [
   {
      id: 1,
      title: 'Science',
      overview: 'Explain the water cycle to a 5th grader.',
      agegroup: 'Kids',
      genre: 'Educational',
      artstyle: 'Cartoon',
   },
   {
      id: 2,
      title: 'Mathematics',
      overview:
         'Explain the concept of definite integrals and their applications in physics.',
      agegroup: 'Adults',
      genre: 'Educational',
      artstyle: 'Realistic',
   },
   {
      id: 3,
      title: 'History',
      overview:
         'Discuss the causes and consequences of the Industrial Revolution in Europe.',
      agegroup: 'Teens',
      genre: 'Documentary',
      artstyle: 'Vintage',
   },
   {
      id: 4,
      title: 'Computer Science',
      overview:
         'Describe the working principle of a blockchain and its security features.',
      agegroup: 'Adults',
      genre: 'Educational',
      artstyle: 'Modern',
   },
   {
      id: 5,
      title: 'Literature',
      overview:
         "Analyze the themes of love and loss in Shakespeare's Romeo and Juliet.",
      agegroup: 'Teens',
      genre: 'Drama',
      artstyle: 'Classic',
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
   .post('/create', zValidator('json', createVideoPromptSchema), async (c) => {
      const promptOBJ = await c.req.valid('json');
      //! Replace with DB later
      testVideoPrompts.push({ ...promptOBJ, id: testVideoPrompts.length + 1 });

      //! PROMPT GEMINI API
      const response = await ai.models.generateContent({
         model: 'gemini-2.5-flash',
         contents: JSON.stringify(promptOBJ),
      });

      return c.json({ response: response.text });
   });
