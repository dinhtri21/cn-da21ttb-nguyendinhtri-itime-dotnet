export type CreateOrder = {
  customerId: number;
  orderNote: string;
  paymentId: number;
  orderDetails: {
    productId: number;
    quantity: number;
  }[];
};

export type Order = {
  orderId: number;
  customerId: number;
  paymentId: number;
  orderDate: string;
  orderStatus: string;
  total: number;
  orderNote: string;
};

export type OrderResponse = {
  orders: Order[];
  total: number;
  limit: number;
  skip: number;
};
