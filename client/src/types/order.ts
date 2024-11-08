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
  trackingNumber: string;
  customerId: number;
  paymentId: number;
  total: number;
  estimatedDeliveryTime: string;
  shippingStatus: string;
  addressLine: string;
  createdAt: string;
};

export type OrderResponse = {
  orders: Order[];
  total: number;
  limit: number;
  skip: number;
};
