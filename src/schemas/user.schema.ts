import {z} from 'zod';

export const userCreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userUpdateSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;