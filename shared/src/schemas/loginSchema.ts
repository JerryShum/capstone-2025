import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string({message: "Invalid email format"}),
    password: z.string().min(8,"password must be atleast 8 char long")
}) 

export type LoginInput = z.infer<typeof loginSchema>