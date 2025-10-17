import { z } from 'zod';

export const sendScriptSchema = z.object({
   id: z.number().int().positive().min(1),
   title: z.string().min(3).max(100),
   overview: z.string().min(10),
   agegroup: z.string(),
   genre: z.string(),
   artstyle: z.string(),
});
