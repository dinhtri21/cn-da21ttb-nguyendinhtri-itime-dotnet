import { Product } from "./product";

export type OrderDetail = {
  orderDetailId: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  product: Product;
};
