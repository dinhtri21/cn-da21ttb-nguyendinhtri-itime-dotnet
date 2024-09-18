import axiosConfig from "@/lib/axiosConfig";
import { ProductsRes } from "@/validations/product.schema";
import { z } from "zod";

const ProductApi = {
  async getProduct(): Promise<ProductsRes> {
    try {
      const response = await axiosConfig.get("products");
      // Check type
      const result = ProductsRes.safeParse(response.data);
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
