import axiosConfig from "@/lib/axiosConfig";
import { CreateOrder, OrderResponse } from "@/types/order";
import { Delete } from "lucide-react";
import qs from "qs";

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
    skip?: number,
    status?: string,
  ): Promise<OrderResponse> {
    const res = await axiosConfig.get(`/orders/customer/${customerId}`, {
      params: {
        limit: limit,
        skip: skip,
        status: status,
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
  async GetOrders(
    token: string,
    limit?: number,
    skip?: number,
    status?: string,
    filters?: Record<string, any>
  ): Promise<OrderResponse> {
    const response = await axiosConfig.get("orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { limit: limit, skip: skip, status: status, filters: filters },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    });
    return response.data;
  },

  async DeleteOrder(token: string, orderId: number): Promise<any> {
    const res = await axiosConfig.delete(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  }
};

export default OrderApi;
