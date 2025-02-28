"use client";

import ProductApi from "@/apis/productApi";
import { useEffect, useState } from "react";
import ProductItem from "@/components/productItem/page";
import { Button } from "@/components/ui/button";
import { ProductsRes } from "@/validations/product.schema";
import { SkeletonCard } from "../ui/skeleton-card";

interface FeaturedProductsProps {
  title: string;
}

export default function FeaturedProducts({ title }: FeaturedProductsProps) {
  const [productsRes, setProductsRes] = useState<ProductsRes | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductApi.getProduct(0, 4, undefined, undefined, "date_desc");
        setProductsRes(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="w-full">
      <div className="container max-w-screen-xl mx-auto py-10 mt-2 px-4">
        <h1 className="text-center mb-1 uppercase text-lg md:text-xl">
          {title}
        </h1>
        <p className="text-center mb-4 text-gray-500">
          Một số sản phẩm mới đến từ ITime.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {productsRes?.products ? (
            productsRes.products.map((product: any, index: number) => (
              <ProductItem key={index} product={product} />
            ))
          ) : (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
