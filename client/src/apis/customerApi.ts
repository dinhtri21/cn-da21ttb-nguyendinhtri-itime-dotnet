import axiosConfig from "@/lib/axiosConfig";
import {
  CreateCustomer,
  CustomerResponse,
  CustomerLoginResponse,
  CustomerLoginRequest,
} from "@/validations/customer.chema";
import { CustomerLoginRes } from "@/types/customer";
import { Customer } from "@/types/customer";

export const customerApi = {
  async createCustomer(customer: CreateCustomer): Promise<any> {
    const res = await axiosConfig.post("/customers", customer);
    return res;
  },

  async LoginCustomer(
    customerLogin: CustomerLoginRequest
  ): Promise<CustomerLoginRes> {
    const res = await axiosConfig.post("/customers/login", customerLogin);
    return res.data;
  },

  async GetCustomerById(id: string, token: string): Promise<Customer> {
    const res = await axiosConfig.get(`/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return res.data;
  },

  async LogoutCustomer(token: string): Promise<any> {
    const res = await axiosConfig.post("/customers/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  },

  async GetCustomersCount(token: string): Promise<{ totalCount: number }> {
    const res = await axiosConfig.get(`/customers/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
};


