import { z } from 'zod';

export const sendVideoSchema = z.object({
   id: z.number().int().positive().min(1),
   imageBase64: z.string(),
   script: z.string(),
   prompt: z.string(),
});

//@ the wanted structure of data that someone POSTS:
export const postVideoSchema = sendVideoSchema.omit({ id: true });
export type postVideoSchemaType = z.infer<typeof postVideoSchema>;
