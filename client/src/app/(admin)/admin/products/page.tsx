"use client";
import { useEffect, useState } from "react";
import ProductList from "./_components/product-list";
import { Order } from "@/types/order";
import { Product, ProductsRes } from "@/types/product";
import { useRouter, useSearchParams } from "next/navigation";
import ProductApi from "@/apis/productApi";
import RenderPaginationItems from "@/components/paginationItemsCustom/paginationItemsCustom";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

export default function ProductsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

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
      console.log(data);
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
      <div className="w-full dark:bg-muted/40 relative">
        <div
          className="w-full min-h-screen max-w-screen-2xl mx-auto bg-gray-100/70 dark:bg-background
            relative p-3 sm:pl-[90px] sm:pr-6 "
        >
           {productsRes && <ProductList fetchProducts={fetchProducts} products={productsRes.products} />}
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
          <h1></h1>
        </div>
      </div>
    );
  }
  