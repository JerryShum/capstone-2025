import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { apiRoutes } from './api-routes';
import type { auth, Env } from './lib/auth';
import { authMiddleware } from './lib/middleware';

const app = new Hono<Env>();

//@ CORS setup
app.use(
   '*',
   cors({
      origin: (origin) => {
         // Allow requests from localhost and 127.0.0.1 for client (5173), studio (5174), and backend (3000)
         if (origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
            return origin;
         }
         return 'http://localhost:3000';
      },
      allowHeaders: ['Content-Type', 'Authorization'],
      allowMethods: ['POST', 'GET', 'OPTIONS'],
      exposeHeaders: ['Content-Length'],
      maxAge: 600,
      credentials: true,
   }),
);

//! Used to log all requests to the terminal
app.use('*', logger());

//@ Auth middleware
app.use('*', authMiddleware);

// Mount the pure API routes
app.route('/api', apiRoutes);

//! Serve static files when the user accesses an "unknown route"
// if someone types in a URL that doesnt exist, we can serve up the react page meant for hadnling the errors, (instead of a bad looking server 404 page)
app.use('*', serveStatic({ root: './static' }));

app.get('*', async (c, next) => {
   return serveStatic({ root: './static', path: 'index.html' })(c, next);
});

export default app;
