import axiosConfig from "@/lib/axiosConfig";

export interface Product {
  productId: number;
  productName: string;
  productPrice: number;
  productDescription: string;
  quantityInStock: number;
  brandId: number;
  materialId: number;
  imageUrls: string[];
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const ProductApi = {
    async getProduct(): Promise<ProductResponse> {
      try {
        const response = await axiosConfig.get<ProductResponse>("products");
        return response.data; 
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
  };
  
  export default ProductApi;
