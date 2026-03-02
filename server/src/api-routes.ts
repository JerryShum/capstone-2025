import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { updateProjectSchema } from '@shared/schemas/updateProjectSchema';
import { db } from '@server/db';
import { projectsTable } from '@server/db/schemas/schema';
import { initialNodes, initialEdges } from '@shared';
import { desc, eq } from 'drizzle-orm';
import type { ApiResponse } from '@shared';

import { createScriptImageRoute } from './routes/create/createScriptImageRoute';
import { studioRoute } from './routes/studio/studio';
import { videoRoute } from './routes/studio/videoRoute';

export const apiRoutes = new Hono()
   .get('/hello', async (c) => {
      const data: ApiResponse = {
         message: 'hello',
         success: true,
      };

      return c.json(data, { status: 200 });
   })
   .route('/create', createScriptImageRoute)
   .route('/studio/video', videoRoute)
   .route('/studio', studioRoute);

export type ApiRoutes = typeof apiRoutes;
