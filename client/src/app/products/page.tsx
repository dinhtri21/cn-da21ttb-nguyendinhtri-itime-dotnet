"use client";

import ProductApi from "@/apis/productApi";
import { useEffect, useState } from "react";
import ProductItem from "@/components/productItem/page";
import { Button } from "@/components/ui/button";
import { ProductsRes } from "@/validations/product.schema";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Filter from "@/components/filter/filter";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import FilterResponsive from "@/components/filterResponsive/filter-responsive";

export default function ProductsPage() {
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
      <div className="container mx-auto max-w-screen-xl my-2 px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Sản phẩm</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="container mx-auto max-w-screen-xl md:mt-4 grid grid-cols-1 md:grid-cols-4 px-4 md:py-4">
        <Filter />
        <div className="col-span-3">
          <div className="grid md:grid-cols-3 grid-cols-2 gap-5">
            <div className="col-span-2 md:col-span-3 flex md:justify-end justify-between items-center">
              <div className="md:hidden">
                <FilterResponsive />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sắp xếp theo:" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Giá tăng dần</SelectItem>
                  <SelectItem value="dark">Giá giảm dần</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {productsRes?.products ? (
              productsRes.products.map((product, index) => (
                <ProductItem key={index} product={product} />
              ))
            ) : (
              <SkeletonCard />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
