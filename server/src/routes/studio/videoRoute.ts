import { zValidator } from '@hono/zod-validator';
import { postVideoSchema } from '@shared/schemas/sendVideoSchema';
import { Hono } from 'hono';

export const videoRoute = new Hono().post(
   '/generate',
   zValidator('json', postVideoSchema),
   async (c) => {
      // get validated data from validator
      const data = c.req.valid('json');

      //---------------------------------------------------------
      console.log('FACTORY SERVER RECEIVED SCENENODE DATA:', data);

      return c.json({
         operationName: 'mock-ticket-' + Date.now(),
         message: 'Factory is ready for work!',
      });
   },
);
