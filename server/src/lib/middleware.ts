import { createMiddleware } from 'hono/factory';
import { auth } from './auth';
import type { Env } from './auth';

export const authMiddleware = createMiddleware<Env>(async (c, next) => {
   // Skip authentication check for auth routes like login, signup, and session
   if (c.req.path.startsWith('/api/auth')) {
      return next();
   }

   const session = await auth.api.getSession({
      headers: c.req.raw.headers,
   });

   if (!session) {
      return c.json({ message: 'Unauthorized' }, 401);
   }

   // Inject the user into the Hono context so handlers can use it
   c.set('user', session.user);
   c.set('session', session.session);
   await next();
});
