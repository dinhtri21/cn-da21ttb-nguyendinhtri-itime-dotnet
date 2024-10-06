import axiosConfig from "@/lib/axiosConfig";
import { ProductRes, ProductsRes } from "@/validations/product.schema";
import { z } from "zod";
import qs from 'qs';

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
        return qs.stringify(params, { arrayFormat: 'repeat' });
      }
    });
    return response.data;
  },
  async getProductById(id: string): Promise<ProductRes> {
    const response = await axiosConfig.get(`products/${id}`);
    return response.data;
  },
};

export default ProductApi;
