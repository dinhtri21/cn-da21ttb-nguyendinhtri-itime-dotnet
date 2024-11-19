import axiosConfig from "@/lib/axiosConfig";
import { CreateProductReq, Product, ProductsRes } from "@/types/product";
import { z } from "zod";
import qs from "qs";

const ProductApi = {
  async getProduct(
    skip: number,
    limit: number,
    brandIds?: number[],
    materialIds?: number[],
    sortOrder?: string
  ): Promise<ProductsRes> {
    const response = await axiosConfig.get("products", {
      params: {
        skip: skip,
        limit: limit,
        brandIds: brandIds,
        materialIds: materialIds,
        sortOrder: sortOrder,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    });
    return response.data;
  },
  async createProduct(form: FormData, token: string): Promise<{message : string}> {
    const response = await axiosConfig.post("products", form, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  async getProductById(id: string): Promise<Product> {
    const response = await axiosConfig.get(`products/${id}`);
    return response.data;
  },
  async getProductsCount(
    token: string,
    month?: number,
    year?: number
  ): Promise<{ totalCount: number }> {
    const response = await axiosConfig.get("products/count", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { month: month, year: year },
    });
    return response.data;
  },
};

export default ProductApi;
