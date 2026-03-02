import { z } from 'zod';

export const updateProjectSchema = z.object({
   id: z.number().int().optional(),
   projectTitle: z.string(),
   aspectRatio: z.enum(['16:9', '9:16']),
   engine: z.enum(['veo', 'sora']),
   globalNegativePrompt: z.string(),
   executiveSummary: z.string(),
   cinematicPreset: z.enum([
      'Neo-Noir',
      'Technicolor',
      'Hand-held Documentary',
      '80s VHS',
      'Cyberpunk',
      'Studio Ghibli',
      'None',
   ]),
   flowData: z.object({
      nodes: z.array(z.any()),
      edges: z.array(z.any()),
   }),
});
