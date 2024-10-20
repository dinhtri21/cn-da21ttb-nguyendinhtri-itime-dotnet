import axiosConfig from "@/lib/axiosConfig";
import { CreateOrder, OrderResponse } from "@/types/order";

const OrderApi = {
  async CreateOrder(token: string, CreateOrder: CreateOrder): Promise<any> {
    const res = await axiosConfig.post(`/orders`, CreateOrder, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  },
  async GetOrdersByCustomerId(
    token: string,
    customerId: number,
    limit?: number,
    skip?: number
  ): Promise<OrderResponse> {
    const res = await axiosConfig.get(`/orders/customer/${customerId}`, {
      params: {
        limit: limit,
        skip: skip,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  async GetOrdersCount(
    token: string,
    month?: number,
    year?: number
  ): Promise<{ totalCount: number }> {
    const response = await axiosConfig.get("orders/count", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { month: month, year: year },
    });
    return response.data;
  },
};

export default OrderApi;
