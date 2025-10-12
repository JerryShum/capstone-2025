import { Hono } from 'hono';
import z from 'zod';
import { zValidator } from '@hono/zod-validator';
import { id } from 'zod/locales';

const videosPromptSchema = z.object({
   id: z.number().int().positive().min(1),
   subject: z.string().min(3).max(100),
   prompt: z.string().min(10),
});

type videoPrompt = z.infer<typeof videosPromptSchema>;

//wanted structure of data when someone POSTS:
const createVideoPromptSchema = videosPromptSchema.omit({ id: true });

const testVideoPrompts: videoPrompt[] = [
   {
      id: 1,
      subject: 'Mathematics',
      prompt:
         'Explain the concept of definite integrals and their applications in physics.',
   },
   {
      id: 2,
      subject: 'History',
      prompt:
         'Discuss the causes and consequences of the Industrial Revolution in Europe.',
   },
   {
      id: 3,
      subject: 'Computer Science',
      prompt:
         'Describe the working principle of a blockchain and its security features.',
   },
   {
      id: 4,
      subject: 'Literature',
      prompt:
         "Analyze the themes of love and loss in Shakespeare's Romeo and Juliet.",
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
      return c.json({ testVideoPrompts });
   });
