import axiosConfig from "@/lib/axiosConfig";
import { CartItemRes, CreateCartItemSchema } from "@/validations/cartItem.chema";

export const CartItemApi = {

  async getCartItems(token: string, customerId: number): Promise<CartItemRes[]> {
    const res = await axiosConfig.get(`/cart-items/customer/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
