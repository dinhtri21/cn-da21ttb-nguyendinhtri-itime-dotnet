import axiosConfig from "@/lib/axiosConfig";
import {
  CartItemRes,
  CreateCartItemSchema,
  CartItemsUpdateRequest,
} from "@/validations/cartItem.chema";

export const CartItemApi = {
  async getCartItems(
    token: string,
    customerId: number
  ): Promise<CartItemRes[]> {
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
    const res = await axiosConfig.get(
      `/cart-items/items-count/customer/${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  },

  async updateCartItem(
    token: string,
    cartItemsUpdateRequest: CartItemsUpdateRequest
  ): Promise<any> {
    // console.log(cartItemsUpdateRequest.cartItemId);
    const res = await axiosConfig.put(
      `/cart-items/${cartItemsUpdateRequest.cartItemId}`,
      cartItemsUpdateRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  },

  async deleteCartItem(token: string, cartItemId: number): Promise<any> {
    const res = await axiosConfig.delete(`/cart-items/${cartItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  }
};
