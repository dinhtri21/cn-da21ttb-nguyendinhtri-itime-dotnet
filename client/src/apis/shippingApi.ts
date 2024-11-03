import axiosConfig from "@/lib/axiosConfig";
import { ShippingCalculateFeeReQuest } from "@/types/shipping";

const shippingApi = {
  async GetCalculateFee(
    data: ShippingCalculateFeeReQuest,
    token: string
  ): Promise<{ total: number }> {
    const res = await axiosConfig.get(`/shippings/calculate-fee`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: data,
    });
    return res.data;
  },
};

export default shippingApi;
