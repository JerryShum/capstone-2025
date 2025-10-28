import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/bun';
import type { ApiResponse } from 'shared/dist';
import { logger } from 'hono/logger';

import { createScriptImageRoute } from './routes/create/createScriptImageRoute';
import { createVideoRoute } from './routes/create/createVideoRoute';

const app = new Hono();

//@ we dont need to use cors since the backend will be serving the static HTML files
//# I am leaving this here for now - Jerry
app.use(cors());

//! Used to log all requests to the terminal
app.use('*', logger());

const apiroutes = app
   .basePath('/api')
   .get('/hello', async (c) => {
      const data: ApiResponse = {
         message: 'hello',
         success: true,
      };

      return c.json(data, { status: 200 });
   })
   .route('/create', createScriptImageRoute)
   .route('/create', createVideoRoute);

//! Serve static files when the user accesses an "unknown route"
//@ if someone types in a URL that doesnt exist, we can serve up the react page meant for hadnling the errors, (instead of a bad looking server 404 page)
app.use('*', serveStatic({ root: './static' }));

app.get('*', async (c, next) => {
   return serveStatic({ root: './static', path: 'index.html' })(c, next);
});

export default app;

export type ApiRoutes = typeof apiroutes;
