import { z } from 'zod';

export const signupSchema = z.object({
    name: z.string().min(3, "Name is required. Please enter your name."),
    email: z.string({ message: "Invalid email format. Please enter a valid email address." }),
    password: z.string().min(8, "Password must be atleast 8 characters long.")
})

export type SignupInput = z.infer<typeof signupSchema>