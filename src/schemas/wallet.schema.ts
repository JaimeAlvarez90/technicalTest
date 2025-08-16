import {z} from "zod";

export const walletCreateSchema = z.object({
 tag:z.string().optional(),
 chain:z.string().min(1),
 address:z.string().min(1)
});

export const walletUpdateSchema = walletCreateSchema.partial();

export type WalletCreateInput = z.infer<typeof walletCreateSchema>;
export type WalletUpdateInput = z.infer<typeof walletUpdateSchema>;