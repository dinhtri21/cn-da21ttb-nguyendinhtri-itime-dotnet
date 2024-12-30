import axiosConfig from "@/lib/axiosConfig";
import { BrandResponse } from "@/types/brand";
import qs from "qs";

const BrandApi = {
  async getBrands(
    skip: number,
    limit: number,
    filters?: Record<string, any>
  ): Promise<BrandResponse> {
    const res = await axiosConfig.get("/brands", {
      params: {
        skip: skip,
        limit: limit,
        filters: filters,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    });
    return res.data;
  },
};

export default BrandApi;
