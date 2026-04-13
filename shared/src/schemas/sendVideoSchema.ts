import { z } from 'zod';

export const sendVideoSchema = z.object({
   id: z.number().int().positive().min(1),
   imageBase64: z.string(),
   characters: z.array(z.any()),
   environments: z.array(z.any()),
   scripts: z.array(z.object({ content: z.string() })),
   prompt: z.string(),
   duration: z.string().optional(),
   aspectRatio: z.string(),
   engine: z.string(),
   cinematicPreset: z.string(),
   negativePrompt: z.string(),
   // Video continuation fields
   lastFrameBase64: z.string().optional(),  // base64 PNG → image-to-video fallback (>48h)
   geminiVideoUri: z.string().optional(),   // Gemini Files API URI → native Veo extension (<48h)
   // User feedback for regeneration
   feedback: z.string().optional(),
});

//@ the wanted structure of data that someone POSTS:
export const postVideoSchema = sendVideoSchema.extend({
   projectId: z.number().int().positive() 
}).omit({ id: true });
export type postVideoSchemaType = z.infer<typeof postVideoSchema>;
