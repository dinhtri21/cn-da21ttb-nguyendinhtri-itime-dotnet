export type CreateOrder = {
  customerId: number;
  customerAddressId: number;
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
  orderStatus: string;
  total: number;
  createdAt: string;
};

export type OrderResponse = {
  orders: Order[];
  total: number;
  limit: number;
  skip: number;
};
