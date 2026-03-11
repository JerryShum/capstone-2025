import {Hono} from 'hono';
import { zValidator } from '@hono/zod-validator';
import { loginSchema } from '@shared/schemas/loginSchema';
import { signupSchema } from '@shared/schemas/signupSchema';
import { usersTable } from '@server/db/schemas/schema';
import { db } from '../../db'; 
import { eq } from 'drizzle-orm';


export const loginRoute = new Hono()
    .post('/login', zValidator('json',loginSchema), async(c) =>{
        const info = await c.req.valid('json');

        // finding if user exists in database
        const result = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, info.email))
        
        const user = result[0];
        if (!user) {
            return c.json({ message: "Invalid credentials" }, 401);
        }


        // verify if pass is correct
        if (!(info.password === user.password)){
            return c.json({message: "Invalid username/password"}, 401);
        }
        else{
            // return success msg
            return c.json({
                success: true,
                message: "logged in success!",
                user:{
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }, 200)
        }
    })
    
    
    // sign up
    .post('/addUser', zValidator('json',signupSchema), async(c) => {
        const info = await c.req.valid('json');
        const result = await db.insert(usersTable).values(info).returning();
        return c.json(result);

    })
    