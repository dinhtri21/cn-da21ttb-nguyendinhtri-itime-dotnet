'use client';

import ProductApi from "@/apis/productApi";
import { useEffect, useState } from "react";
import { ProductResponse } from "@/apis/productApi"; // Đảm bảo đường dẫn đúng
import ProductItem from "@/components/productItem/page";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductResponse | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductApi.getProduct(); 
        setProducts(data); 
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div >
      <h1>Products</h1>
      {products ? (
        <ul>
          {products.products.map(product => (
            <ProductItem product={product}/>
          ))}
        </ul>
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
}
