"use client";

import ProductApi from "@/apis/productApi";
import { useEffect, useState } from "react";
import ProductItem from "@/components/productItem/page";
import { Button } from "@/components/ui/button";
import { ProductsRes } from "@/validations/product.schema";
import { SkeletonCard } from "../ui/skeleton-card";
import { Product } from "@/types/product";

interface RandomProductsProps {
  title: string;
}

export default function RandomProducts({ title }: RandomProductsProps) {
  const [productsRes, setProductsRes] = useState<Product[] | null>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductApi.getRandomProducts(4);
        setProductsRes(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="w-full">
      <div className="container max-w-screen-xl mx-auto pb-10 px-4">
        <h1 className="text-center mb-1 uppercase text-xl">{title}</h1>
        <p className="text-center mb-4 text-gray-500">
          Một số sản phẩm đến từ ITime.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {productsRes && productsRes.length > 0 ? (
            productsRes.map((product: any, index: number) => (
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
