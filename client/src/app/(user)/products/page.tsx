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
      const limit = parseInt(searchParams.get("limit") || "6");
      // const limit = 2;
      const brands = searchParams.get("brands")?.split(",").map(Number);
      const materials = searchParams.get("materials")?.split(",").map(Number);
      const sortOrder = searchParams.get("sortOrder");

      const data = await ProductApi.getProduct(
        skip,
        limit,
        brands,
        materials,
        sortOrder || undefined
      );
      setProductsRes(data);
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
      // Nếu value có giá trị thì set vào URL
      if (filters[key]) {
        params.set(key, filters[key]);
      } else {
        params.delete(key); // Ngược lại xóa param query đó ra khỏi URL
      }
    });

    router.push(`${window.location.pathname}?${params.toString()}`); // => Push URL mới vào URL khi có thay đổi filters
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

  const handleSortChange = (sortOrder: string) => {
    if (sortOrder === "default") {
      sortOrder = "";
    }
    updateURLWithFilters({ sortOrder }); // Cập nhật sortOrder vào URL
  };

  return (
    <div className="w-full dark:bg-muted/40">
      <div className="min-h-[calc(100vh-300px)] max-w-screen-xl mx-auto pt-4 pb-10 px-4 mt-[73px]">
        <div className="px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Sản phẩm</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="mx-auto max-w-screen-xl grid grid-cols-1 md:grid-cols-4 px-2 relative">
          <Filter updateURLWithFilters={updateURLWithFilters} />
          <div className="col-span-3">
            <div className="grid md:grid-cols-3 grid-cols-2 gap-5">
              <div className="col-span-2 md:col-span-3 flex justify-end">
                <Select onValueChange={(value) => handleSortChange(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sắp xếp theo:" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Mặc định</SelectItem>
                    <SelectItem value="price_asc">Giá tăng dần</SelectItem>
                    <SelectItem value="price_desc">Giá giảm dần</SelectItem>
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
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              )}
            </div>
            {productsRes && productsRes?.products?.length !== 0 && (
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
    </div>
  );
}
