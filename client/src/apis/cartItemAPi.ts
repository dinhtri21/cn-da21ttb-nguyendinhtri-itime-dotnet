import axiosConfig from "@/lib/axiosConfig";
import { CreateCartItemSchema } from "@/validations/cartItem.chema";

export const CartItemApi = {
  async getCartItemById(id: string): Promise<any> {
    const res = await axiosConfig.get(`/cartItems/${id}`);
    return res.data;
  },

  async createCartItem(
    token: string,
    CreateCartItemSchema: CreateCartItemSchema
  ): Promise<any> {
    const res = await axiosConfig.post(`/cart-items`, CreateCartItemSchema, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  },

  async getCartItemsCount(token: string, customerId: number): Promise<any> {
    const res = await axiosConfig.get(`/cart-items/items-count/customer/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  },
};
