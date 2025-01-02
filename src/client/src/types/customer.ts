export type Customer = {
  customerId: number;
  fullName: string;
  phoneNumber: string;
  email: string;
};

export type CustomerLoginRes = {
  token: string;
  customer: Customer;
};
