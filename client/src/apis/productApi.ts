import axiosConfig from "@/lib/axiosConfig";
import { ProductRes, ProductsRes } from "@/validations/product.schema";
import { z } from "zod";
import qs from 'qs';

const ProductApi = {
  async getProduct(
    skip: number,
    limit: number,
    brandIds?: number[],
    materialIds?: number[]
  ): Promise<ProductsRes> {
    const response = await axiosConfig.get("products", {
      params: {
        skip: skip,
        limit: limit,
        brandIds: brandIds,
        materialIds: materialIds,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      }
      
    });
    return response.data;
  },
  async getProductById(id: string): Promise<ProductRes> {
    return await axiosConfig.get(`products/${id}`);
  },
};

export default ProductApi;
