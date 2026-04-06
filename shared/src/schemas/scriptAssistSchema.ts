import { z } from 'zod';

export const scriptAssistSchema = z.object({
   currentContent: z.string(),
   context: z.object({
      characters: z.array(z.any()),
      environments: z.array(z.any()),
      scripts: z.array(z.any()),
   }),
});

export type ScriptAssistRequest = z.infer<typeof scriptAssistSchema>;
