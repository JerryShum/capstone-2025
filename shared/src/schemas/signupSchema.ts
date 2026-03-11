import { z } from 'zod';

export const signupSchema = z.object({
    name: z.string().min(1,"Name is required"),
    age: z.coerce.number().int().min(1, "Age is required"),
    email: z.string({message: "Invalid email format"}),
    password: z.string().min(8,"password must be atleast 8 char long")
}) 

export type LoginInput = z.infer<typeof signupSchema>