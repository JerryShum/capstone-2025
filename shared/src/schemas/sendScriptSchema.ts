import { z } from 'zod';

export const sendScriptSchema = z.object({
   id: z.number().int().positive().min(1),
   title: z
      .string()
      .min(3, { message: 'Title must be atleast 3 characters.' })
      .max(100, { message: 'Title must be at most 100 characters.' }),
   overview: z.string().min(10, {
      message: 'The overview/script must be atleast 3 characters.',
   }),
   agegroup: z.enum(['toddlers', 'preschool', 'young-children']),
   genre: z.enum(['adventure', 'fantasy', 'comedy', 'fairy-tale']),
   artstyle: z.enum([
      'cartoon',
      'watercolor',
      'pixel-art',
      '3d-render',
      'line-art',
   ]),
});

//@ the wanted structure of data that someone POSTS:
export const postScriptSchema = sendScriptSchema.omit({ id: true });
