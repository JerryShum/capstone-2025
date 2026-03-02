import { Hono } from 'hono';
import type { studioRoute } from './routes/studio/studio';
import type { createScriptImageRoute } from './routes/create/createScriptImageRoute';
import type { createVideoRoute } from './routes/create/createVideoRoute';

// We define the type of our API without actually running any server logic.
// We use 'new Hono()' for mocks because Hono needs a valid instance to 
// correctly map routes at runtime, even if they are empty.
const app = new Hono()
   .basePath('/api')
   .get('/hello', (c) => c.json({ message: 'hello' }))
   .route('/create', new Hono() as any as typeof createScriptImageRoute) 
   .route('/create', new Hono() as any as typeof createVideoRoute)
   .route('/studio', new Hono() as any as typeof studioRoute);

export type ApiRoutes = typeof app;
