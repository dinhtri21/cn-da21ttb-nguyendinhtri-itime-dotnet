import axiosConfig from "@/lib/axiosConfig";
import {
  MaterialResponse,
  CreateMaterial,
  Material,
  UpdateMaterialRequest,
} from "@/types/material";
import qs from "qs";

const MaterialApi = {
  async getMaterials(
    skip?: number,
    limit?: number,
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
  async getMaterialById(id: number): Promise<Material> {
    const res = await axiosConfig.get(`/materials/${id}`);
    return res.data;
  },
  async createMaterial(data: CreateMaterial, token: string): Promise<Material> {
    const res = await axiosConfig.post("/materials", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  async deleteMaterial(id: number, token: string): Promise<void> {
    await axiosConfig.delete(`/materials/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  async updateMaterial(
    id: number,
    data: UpdateMaterialRequest,
    token: string
  ): Promise<Material> {
    const response = await axiosConfig.put(`materials/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default MaterialApi;
