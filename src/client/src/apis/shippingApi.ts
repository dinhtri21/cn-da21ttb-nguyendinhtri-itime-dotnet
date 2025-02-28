import axiosConfig from "@/lib/axiosConfig";
import { ShippingCalculateFeeReQuest } from "@/types/shipping";
import { Delete } from "lucide-react";

const shippingApi = {
  async GetCalculateFee(
    data: ShippingCalculateFeeReQuest,
    token: string
  ): Promise<{ total: number, leadtime: number , fromEstimateDate: string, toEstimateDate: string }> {
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
