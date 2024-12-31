import axiosConfig from "@/lib/axiosConfig";
import { MaterialResponse } from "@/types/material";
import qs from "qs";

const MaterialApi = {
  async getMaterials(
    skip: number,
    limit: number,
    filters?: Record<string, any>
  ): Promise<MaterialResponse> {
    const res = await axiosConfig.get("/materials", {
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

export default MaterialApi;
