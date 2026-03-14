// import { Hono } from 'hono';
// import { zValidator } from '@hono/zod-validator';
// import { loginSchema } from '@shared/schemas/loginSchema';
// import { signupSchema } from '@shared/schemas/signupSchema';
// import { usersTable } from '@server/db/schemas/schema';
// import { db } from '../../../db';
// import { eq } from 'drizzle-orm';
// import { sign } from 'hono/jwt';

// const JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

// export const loginRoute = new Hono()
//    .post('/login', zValidator('json', loginSchema), async (c) => {
//       const info = await c.req.valid('json');

//       // finding if user exists in database
//       const result = await db
//          .select()
//          .from(usersTable)
//          .where(eq(usersTable.email, info.email));

//       const user = result[0];
//       if (!user) {
//          return c.json({ message: 'Invalid credentials' }, 401);
//       }

//       // verify if pass is correct
//       if (!(info.password === user.password)) {
//          return c.json({ message: 'Invalid username/password' }, 401);
//       } else {
//          const payload = {
//             id: user.id,
//             email: user.email,
//             name: user.name,
//             exp: Math.floor(Date.now() / 1000) + 60 * 60, //1 hr session before exp.
//          };

//          const token = await sign(payload, JWT_SECRET);
//          // return success msg
//          return c.json(
//             {
//                success: true,
//                message: 'logged in success!',
//                token,
//                user: {
//                   id: user.id,
//                   name: user.name,
//                   email: user.email,
//                },
//             },
//             200,
//          );
//       }
//    })

//    // sign up
//    .post('/addUser', zValidator('json', signupSchema), async (c) => {
//       const info = await c.req.valid('json');
//       const result = await db.insert(usersTable).values(info).returning();
//       return c.json(result);
//    });
