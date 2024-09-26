"use client";

import ProductApi from "@/apis/productApi";
import { useEffect, useState } from "react";
import ProductItem from "@/components/productItem/page";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Filter from "@/components/filter/filter";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { useRouter, useSearchParams } from "next/navigation";
import RenderPaginationItems from "@/components/paginationItemsCustom/paginationItemsCustom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [productsRes, setProductsRes] = useState<ProductsRes | null>(null);

  //// FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const skip = parseInt(searchParams.get("skip") || "0");
      const limit = parseInt(searchParams.get("limit") || "1");
      // const limit = 2;
      const brands = searchParams.get("brands")?.split(",").map(Number);
      const materials = searchParams.get("materials")?.split(",").map(Number);

      const data = await ProductApi.getProduct(skip, limit, brands, materials);
      setProductsRes(data);
      console.log("Products:", data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  //// Update filters and call API
  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  //// Function to update URL with filters
  const updateURLWithFilters = (filters: Record<string, any>) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("skip", "0"); // Reset 0 nếu có thay đổi filters

    Object.keys(filters).forEach((key: string) => {
      if (filters[key]) {
        // Nếu value có giá trị thì set vào URL
        params.set(key, filters[key]);
      } else {
        params.delete(key); // Ngược lại xóa param query đó ra khỏi URL
      }
    });

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  //// Pagination handlers
  const handlePaginationPrevious = () => {
    const skip = parseInt(searchParams.get("skip") || "0");
    if (skip > 0) {
      updateURLWithFilters({ skip: skip - 1 });
    }
  };

  const handlePaginationNext = () => {
    const skip = parseInt(searchParams.get("skip") || "0");
    const totalPages = productsRes
      ? Math.ceil(productsRes.total / productsRes.limit) - 1
      : 0;
    if (skip < totalPages) {
      updateURLWithFilters({ skip: skip + 1 });
    }
  };

  const handlePaginationItem = (page: number) => {
    updateURLWithFilters({ skip: page });
  };

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
      <div className="container mx-auto max-w-screen-xl grid grid-cols-1 md:grid-cols-4 px-4 md:py-4 relative">
        <Filter updateURLWithFilters={updateURLWithFilters} />
        <div className="col-span-3">
          <div className="grid md:grid-cols-3 grid-cols-2 gap-5">
            <div className="col-span-2 md:col-span-3 flex justify-end">
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
            {productsRes?.products.length == 0 ? (
              <div>Không tìm thấy sản phẩm nào ...</div>
            ) : productsRes?.products ? (
              productsRes.products.map((product, index) => (
                <ProductItem key={index} product={product} />
              ))
            ) : (
              <SkeletonCard />
            )}
          </div>
          {productsRes?.products.length !== 0 && (
            <div className="col-span-3 mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem
                    className="cursor-pointer"
                    onClick={handlePaginationPrevious}
                  >
                    <PaginationPrevious />
                  </PaginationItem>
                  <RenderPaginationItems
                    total={productsRes?.total || 0}
                    limit={productsRes?.limit ?? 0}
                    skip={parseInt(searchParams.get("skip") || "0")}
                    handlePaginationItem={handlePaginationItem}
                  />

                  <PaginationItem className="cursor-pointer">
                    <PaginationNext onClick={handlePaginationNext} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
