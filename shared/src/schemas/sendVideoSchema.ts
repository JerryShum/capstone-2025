import { z } from 'zod';

export const sendVideoSchema = z.object({
   id: z.number().int().positive().min(1),
   prompt: z.string(), // The scene-specific action
   aspectRatio: z.enum(['16:9', '9:16', '1:1']).default('16:9'),
   duration: z.number().min(1).max(10).default(5),
   // Contextual data from upstream nodes
   characters: z.array(z.any()).default([]),
   environments: z.array(z.any()).default([]),
   // Reference image for Image-to-Video (optional)
   imageBase64: z.string().optional(),
});

//@ the wanted structure of data that someone POSTS:
export const postVideoSchema = sendVideoSchema.omit({ id: true });
export type postVideoSchemaType = z.infer<typeof postVideoSchema>;
