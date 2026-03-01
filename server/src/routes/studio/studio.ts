import { Hono } from 'hono';
import type { ApiResponse } from 'shared/dist';

export const studioRoute = new Hono().get('/hello', async (c) => {
   const data: ApiResponse = {
      message: 'hello',
      success: true,
   };

   return c.json(data, { status: 200 });
});
