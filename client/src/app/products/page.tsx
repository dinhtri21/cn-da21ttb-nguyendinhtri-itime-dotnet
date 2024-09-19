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

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Filter from "@/components/filter/filter";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import FilterResponsive from "@/components/filterResponsive/filter-responsive";

const filtersData: { [key: string]: { id: number; name: string }[] } = {
  brandIds: [
    { id: 1, name: "Casio" },
    { id: 2, name: "Omega" },
    { id: 3, name: "Seiko" },
    { id: 4, name: "Rolex" },
  ],
  materialIds: [
    { id: 1, name: "Vàng" },
    { id: 2, name: "Bạch kim" },
    { id: 3, name: "Thép không gỉ" },
  ],
  colorIds: [
    { id: 1, name: "Đen" },
    { id: 2, name: "Trắng" },
    { id: 3, name: "Xanh" },
  ],
};

export default function ProductsPage() {
  const [productsRes, setProductsRes] = useState<ProductsRes | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: { id: number; name: string }[];
  }>({});

  const [skip, setSkip] = useState<number>(0);
  const [limit, setLimit] = useState<number>(9);

  //// BEGIN: FETCH PRODUCTS ////
  const fetchProducts = async () => {
    try {
      // Tạo query params từ selectedFilters
      const queryParams: Record<string, number[]> = {};

      // Chuyển đổi selectedFilters thành queryParams
      for (const [key, values] of Object.entries(selectedFilters)) {
        if (values.length > 0) {
          queryParams[key] = values.map((v) => v.id);
        }
      }
      // Chuyển đổi queryParams thành query string
      const params = new URLSearchParams();

      // Duyệt qua queryParams và thêm vào URLSearchParams
      if (queryParams) {
        Object.keys(queryParams).forEach((key) => {
          queryParams[key].forEach((value) => {
            params.append(key, value.toString());
          });
        });
      }

      // Thêm limit và skip vào URLSearchParams
      params.append("limit", `${limit}`);
      params.append("skip", `${skip}`);

      const data = await ProductApi.getProduct(params);

      setProductsRes(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  //// END: FETCH PRODUCTS ////

  //// BEGIN: Filter ////
  const handleFilterChange = (
    category: string,
    value: { id: number; name: string }
  ) => {
    setSelectedFilters((prevFilters) => {
      setSkip(0);
      const prevValues = prevFilters[category] || [];

      // Nếu giá trị đã được chọn trước đó, thì bỏ chọn
      if (prevValues.some((v) => v.id === value.id)) {
        return {
          ...prevFilters,
          [category]: prevValues.filter((v) => v.id !== value.id),
        };
      }

      // Nếu chưa chọn, thêm giá trị vào danh sách
      return {
        ...prevFilters,
        [category]: [...prevValues, value],
      };
    });
  };
  //// END: Filter ////

  //// BEGIN: Pagination ////
  const handlePaginationPrevious = () => {
    if (skip > 0) {
      setSkip(skip - 1);
    }
  };

  const handlePaginationNext = () => {
    if (
      productsRes &&
      skip < Math.ceil(productsRes.total / productsRes.limit) - 1
    )
      setSkip((prev) => prev + 1);
  };
  //// END: Pagination ////

  useEffect(() => {
    fetchProducts();
  }, [selectedFilters, skip]);

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
        <Filter
          filtersData={filtersData}
          selectedFilters={selectedFilters}
          setSelectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
        />
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
          {productsRes?.products.length !== 0 ? (
            <div className="col-span-3 mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem onClick={handlePaginationPrevious}>
                    <PaginationPrevious onClick={handlePaginationPrevious} />
                  </PaginationItem>
                  {productsRes
                    ? Array.from(
                        {
                          length: Math.ceil(
                            productsRes.total / productsRes.limit
                          ),
                        },
                        (_, i) => (
                          <PaginationItem key={i + 1}>
                            <PaginationLink href="#">{i + 1}</PaginationLink>
                          </PaginationItem>
                        )
                      )
                    : null}
                  <PaginationItem>
                    {/* <PaginationEllipsis /> */}
                  </PaginationItem>

                  <PaginationNext onClick={handlePaginationNext} />
                </PaginationContent>
              </Pagination>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
