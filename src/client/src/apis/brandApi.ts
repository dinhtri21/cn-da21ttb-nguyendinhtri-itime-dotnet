import axiosConfig from "@/lib/axiosConfig";
import { Brand, BrandResponse } from "@/types/brand";
import qs from "qs";

const BrandApi = {
  async getBrands(
    skip?: number,
    limit?: number,
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
  async getBrandById(id: string): Promise<Brand> {
    const res = await axiosConfig.get(`/brands/${id}`);
    return res.data;
  },

  async createBrand(form: FormData, token: string): Promise<Brand> {
    const response = await axiosConfig.post("brands", form, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  async deleteBrand(id: number, token: string): Promise<void> {
    await axiosConfig.delete(`/brands/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async updateBrand(id: number, form: FormData, token: string): Promise<Brand> {
    const response = await axiosConfig.put(`brands/${id}`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default BrandApi;
