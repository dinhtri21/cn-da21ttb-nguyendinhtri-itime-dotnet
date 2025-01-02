import { z } from "zod";
import { ProductRes } from "./product.schema";

export const CreateCartItemSchema = z.object({
  customerId: z.number(),
  productId: z.number(),
  quantity: z.number(),
});
export type CreateCartItemSchema = z.infer<typeof CreateCartItemSchema>;

export const CartItemRes = z.object({
  cartItemId: z.number(),
  cartId: z.number(),
  productId: z.number(),
  quantity: z.number(),
  unitPrice: z.number(),
  product: ProductRes,
});
export type CartItemRes = z.infer<typeof CartItemRes>;

export const CartItemsUpdateRequest = z.object({
  customerId: z.number(),
  cartItemId: z.number(),
  quantity: z.number(),
});

export type CartItemsUpdateRequest = z.infer<typeof CartItemsUpdateRequest>;
