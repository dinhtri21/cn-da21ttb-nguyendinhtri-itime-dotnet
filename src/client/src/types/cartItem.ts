import { Product } from "./product";

export type CartItem = {
  cartItemId: number;
  cartId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  product: Product;
};

export type CreateCartItem = {
  customerId: number;
  productId: number;
  quantity: number;
}

