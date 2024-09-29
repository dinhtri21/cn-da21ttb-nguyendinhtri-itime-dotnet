import axiosConfig from "@/lib/axiosConfig";
import {
  CreateCustomer,
  CustomerResponse,
  CustomerLoginResponse,
  CustomerLoginRequest,
} from "@/validations/customer.chema";

export const customerApi = {
  async createCustomer(customer: CreateCustomer): Promise<any> {
    const res = await axiosConfig.post("/customers", customer);
    return res;
  },
  async LoginCustomer(
    customerLogin: CustomerLoginRequest
  ): Promise<CustomerLoginResponse> {
    const res = await axiosConfig.post("/customers/login", customerLogin);
    return res.data;
  },
  async GetCustomerById(id: string, token: string): Promise<CustomerResponse> {
    const res = await axiosConfig.get(`/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return res.data;
  },
};
