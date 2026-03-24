import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email("Invalid email format. Please enter a valid email address."),
    password: z.string().min(8, "Password must be atleast 8 characters long.")
})

export type LoginInput = z.infer<typeof loginSchema>