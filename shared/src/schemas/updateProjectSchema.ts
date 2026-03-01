import { z } from 'zod';

export const updateProjectSchema = z.object({
   id: z.number().int().optional(),
   projectTitle: z.string(),
   flowData: z.object({
      nodes: z.array(z.any()),
      edges: z.array(z.any()),
   }),
});
