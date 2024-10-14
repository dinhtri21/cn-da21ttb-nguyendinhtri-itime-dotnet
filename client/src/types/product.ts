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
