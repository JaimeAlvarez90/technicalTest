import {z} from "zod";
export const signInSchema = z.object({
  email: z.string(),
  password: z.string().min(6).max(100)
});

export type SignInInput = z.infer<typeof signInSchema>;