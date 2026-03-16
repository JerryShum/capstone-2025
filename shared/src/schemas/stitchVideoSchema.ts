import { z } from 'zod';

// POST body for the stitch endpoint
// videoURLs: ordered array of GCS public video URLs to concatenate
// projectId: the project this stitch belongs to (used to namespace the output file)
export const stitchVideoSchema = z.object({
   videoURLs: z
      .array(z.string().url())
      .min(2, 'At least 2 video clips are required to stitch.'),
   projectId: z.number().int().positive(),
});

export type StitchVideoInput = z.infer<typeof stitchVideoSchema>;
