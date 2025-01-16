import axiosConfig from "@/lib/axiosConfig";
import { StatisticOrderRevenuesRes } from "@/types/statistics";

const statisticsApi = {
  async getOrderRevenue(
    token: string,
    year: number,
    month?: number
  ): Promise<StatisticOrderRevenuesRes> {
    const res = await axiosConfig.get(`/statistics/order/revenue`, {
      params: {
        year: year,
        month: month,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
};

export default statisticsApi;
