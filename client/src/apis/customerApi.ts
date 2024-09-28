import axiosConfig from "@/lib/axiosConfig";
import { CreateCustomer, LoginCustomer } from "@/validations/customer.chema";

export const customerApi = {
  async createCustomer(customer: CreateCustomer): Promise<any> {
    const res = await axiosConfig.post("/customers", customer);
    return res;
  },
  async LoginCustomer(customerLogin: LoginCustomer): Promise<any> {
    const res = await axiosConfig.post("/customers/login", customerLogin);
    return res;
  },
  async GetCustomer(id: string): Promise<any> {
    const res = await axiosConfig.get(`/customers${id}`);
    return res;
  },
};
