export type Customer = {
  customerId: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
};

export type CustomerLoginRes = {
  token: string;
  customer: Customer;
};
