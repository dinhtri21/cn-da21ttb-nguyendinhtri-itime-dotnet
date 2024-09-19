import axiosConfig from "@/lib/axiosConfig";
import { ProductRes, ProductsRes } from "@/validations/product.schema";
import { z } from "zod";

const ProductApi = {
  async getProduct(params?: Record<string, any>): Promise<ProductsRes> {
    try {
      const response = await axiosConfig.get("products", {
        params: params, // Thêm tham số truy vấn vào yêu cầu GET nếu có
      });
      // console.log(response.data);
      // const result = ProductsRes.safeParse(response.data);
      // if (result.success) {
        return response.data;
      // } else {
      //   console.error("Lỗi xác thực:", result.error.errors);
      //   throw new Error("Lỗi xác thực: Dữ liệu sản phẩm không hợp lệ");
      // }
    } catch (error) {
      console.error("Lỗi fetch api:", error);
      throw new Error("Lỗi fetch api: Unable to retrieve product data");
    }
  },
  async getProductById(id: string): Promise<ProductRes> {
    try {
      const response = await axiosConfig.get(`products/${id}`);
      const result = ProductRes.safeParse(response.data);
      if (result.success) {
        return result.data;
      } else {
        console.error("Lỗi xác thực:", result.error.errors);
        throw new Error("Lỗi xác thực: Dữ liệu sản phẩm không hợp lệ");
      }
    } catch (error) {
      console.error("Lỗi fetch api:", error);
      throw new Error("Lỗi fetch api: Unable to retrieve product data");
    }
  },
};

export default ProductApi;
