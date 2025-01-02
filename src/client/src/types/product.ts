import { Brand } from "./brand";
import { Material } from "./material";

export type Product = {
  productId: number;
  productName: string;
  productPrice: number;
  productDescription: string;
  quantityInStock: number;
  imageUrls: string[];
  brand: Brand;
  material: Material;
};

export type ProductsRes ={
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type CreateProductReq = {
  productName: string;
  productPrice: number;
  productDescription: string;
  quantityInStock: number;
  images: File[];
  brandId: number;
  materialId: number;
};

export type UpdateProductReq = {
  productId: number;
  productName: string;
  productPrice: number;
  productDescription: string;
  quantityInStock: number;
  images: File[];
  brandId: number;
  materialId: number;
};
