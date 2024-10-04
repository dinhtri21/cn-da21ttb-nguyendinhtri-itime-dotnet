import { z } from "zod";

export const CreateCartItemSchema = z.object({
  customerId: z.number(),
  productId: z.number(),
  quantity: z.number(),
});

export type CreateCartItemSchema = z.infer<typeof CreateCartItemSchema>;
