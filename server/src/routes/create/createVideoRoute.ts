import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

export const createVideoRoute = new Hono().post('/video', async (c) => {
   const data = {
      message: 'hello',
      success: true,
   };

   return c.json(data, { status: 200 });
});
