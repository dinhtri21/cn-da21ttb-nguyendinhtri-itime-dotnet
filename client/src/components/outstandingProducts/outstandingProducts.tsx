"use client";

import ProductApi from "@/apis/productApi";
import { useEffect, useState } from "react";
import ProductItem from "@/components/productItem/page";
import { Button } from "@/components/ui/button";
import { ProductsRes } from "@/validations/product.schema";
import { SkeletonCard } from "../ui/skeleton-card";

interface OutstandingProductsProps {
  title: string;
}

export default function OutstandingProducts({
  title,
}: OutstandingProductsProps) {
  const [productsRes, setProductsRes] = useState<ProductsRes | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductApi.getProduct();
        setProductsRes(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="w-full">
      <div className="container max-w-screen-xl mx-auto py-10 mt-4 px-4">
        <h1 className="text-center mb-4 uppercase text-lg font-medium">{title}</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {productsRes?.products ? (
            productsRes.products.map((product: any, index: number) => (
              <ProductItem key={index} product={product} />
            ))
          ) : (
            <SkeletonCard />
          )}
        </div>
      </div>
    </div>
  );
}
