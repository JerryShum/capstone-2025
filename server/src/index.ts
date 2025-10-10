import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/bun';
import type { ApiResponse } from 'shared/dist';

const app = new Hono();

app.use(cors());

app.get('/api/hello', async (c) => {
   const data: ApiResponse = {
      message: 'Hello BHVR!',
      success: true,
   };

   return c.json(data, { status: 200 });
});

// Serve static files for everything else
app.use('*', serveStatic({ root: './static' }));

app.get('*', async (c, next) => {
   return serveStatic({ root: './static', path: 'index.html' })(c, next);
});

export default app;
