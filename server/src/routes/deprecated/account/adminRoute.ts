// import { Hono } from 'hono';
// import { usersTable } from '@server/db/schemas/schema';
// import { db } from '../../../db'; // Your Drizzle instance
// import { eq } from 'drizzle-orm';

// // this route is for testing to add/del/modify accounts in the databases

// export const adminRoute = new Hono()

//    // ADD user
//    .post('/add', async (c) => {
//       const body = await c.req.json();
//       const result = await db.insert(usersTable).values(body).returning();
//       return c.json({ success: true, user: result[0] });
//    })

//    // GET user
//    .get('/:id', async (c) => {
//       const id = Number(c.req.param('id'));
//       const user = await db
//          .select()
//          .from(usersTable)
//          .where(eq(usersTable.id, id));
//       return c.json(user[0] || { error: 'Not found' });
//    })

//    // DELETE user
//    .delete('/:id', async (c) => {
//       const id = Number(c.req.param('id'));
//       await db.delete(usersTable).where(eq(usersTable.id, id));
//       return c.json({ message: 'User deleted' });
//    });
