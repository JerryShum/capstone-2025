import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { apiRoutes } from './api-routes';
import type { Env } from './lib/auth';
import { authMiddleware } from './lib/middleware';

const app = new Hono<Env>();

//@ CORS setup
app.use(
   '*',
   cors({
      origin: (origin) => {
         const allowed = [
            'http://localhost:3000',
            'http://localhost:5173',
            'http://localhost:5174',
            process.env.PRODUCTION_URL ?? '',
         ].filter(Boolean);
         return allowed.find((o) => origin?.startsWith(o)) ?? null;
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
app.use('/api/*', authMiddleware);

// Mount the pure API routes
app.route('/api', apiRoutes);

//! Serve static files when the user accesses an "unknown route"
// if someone types in a URL that doesnt exist, we can serve up the react page meant for hadnling the errors, (instead of a bad looking server 404 page)
//@ Serve studio SPA under /studio prefix
app.use('/studio/*', serveStatic({ root: './static/studio', rewriteRequestPath: (path) => path.replace(/^\/studio/, '') }));
app.get('/studio/*', async (c, next) => {
   return serveStatic({ root: './static/studio', path: 'index.html' })(c, next);
});

//@ Serve client SPA for everything else
app.use('*', serveStatic({ root: './static' }));

app.get('*', async (c, next) => {
   return serveStatic({ root: './static', path: 'index.html' })(c, next);
});

export default app;
