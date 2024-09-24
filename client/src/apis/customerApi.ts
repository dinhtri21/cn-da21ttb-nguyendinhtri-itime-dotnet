import axiosConfig from "@/lib/axiosConfig";
import { CreateCustomer } from "@/validations/customer.chema";

export const customerApi = {
   createCustomer(customer: CreateCustomer): Promise<any> {
        const res = axiosConfig.post('/customers', customer);
        return res;
    }
}
