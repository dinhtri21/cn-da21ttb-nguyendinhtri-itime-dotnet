import { z } from "zod";

// Định nghĩa schema cho đối tượng Product
export const ProductRes = z.object({
  productId: z.number(),
  productName: z.string(),
  productDescription: z.string(),
  productPrice: z.number(),
  imageUrls: z.array(z.string().optional()), // Kiểm tra URL hợp lệ
  quantityInStock: z.number().min(0), // Giá trị tối thiểu là 0
  brandId: z.number(),
  materialId: z.number(),
});

export const ProductsRes = z.object({
    products: z.array(ProductRes),
    total: z.number(),
    skip: z.number(),
    limit: z.number(),
})

export type ProductRes = z.infer<typeof ProductRes>;
export type ProductsRes = z.infer<typeof ProductsRes>
