import { Hono } from 'hono';
import type { ApiResponse } from '@shared';

import { createScriptImageRoute } from './routes/create/createScriptImageRoute';
import { createVideoRoute } from './routes/create/createVideoRoute';
import { studioRoute } from './routes/studio/studio';
import { videoRoute } from './routes/studio/videoRoute';
import { stitchVideoRoute } from './routes/studio/stitchVideoRoute';
import { scriptRoute } from './routes/studio/scriptRoute';
import { auth } from './lib/auth';

import type { Env } from './lib/auth';

export const apiRoutes = new Hono<Env>()
   .on(['POST', 'GET'], '/auth/*', (c) => auth.handler(c.req.raw))
   .get('/hello', async (c) => {
      const data: ApiResponse = {
         message: 'hello',
         success: true,
      };

      return c.json(data, { status: 200 });
   })
   .route('/create', createScriptImageRoute)
   .route('/create', createVideoRoute)
   .route('/studio', studioRoute)
   .route('/studio/video', videoRoute)
   .route('/studio', stitchVideoRoute)
   .route('/studio/script', scriptRoute);

// unused auth routes
// .route('/login', loginRoute)
// .route('/admin', adminRoute);

export type ApiRoutes = typeof apiRoutes;
