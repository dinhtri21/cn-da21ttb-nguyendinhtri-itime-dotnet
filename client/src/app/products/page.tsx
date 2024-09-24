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

const brandIds: { id: number; name: string }[] = [
  { id: 1, name: "Casio" },
  { id: 2, name: "Omega" },
  { id: 3, name: "Seiko" },
  { id: 4, name: "Rolex" },
];

const materialIds: { id: number; name: string }[] = [
  { id: 1, name: "Vàng" },
  { id: 2, name: "Bạch kim" },
  { id: 3, name: "Thép không gỉ" },
];

const colorIds: { id: number; name: string }[] = [
  { id: 1, name: "Đen" },
  { id: 2, name: "Trắng" },
  { id: 3, name: "Xanh" },
];

export default function ProductsPage() {
  const [productsRes, setProductsRes] = useState<ProductsRes | null>(null);
  const [selectBrandIds, setSelectBrandIds] = useState<number[]>([]);
  const [selectMaterialIds, setSelectMaterialIds] = useState<number[]>([]);
  const [selectColorIds, setSelectColorIds] = useState<number[]>([]);

  const [skip, setSkip] = useState<number>(0);
  const [limit, setLimit] = useState<number>(9);

  //// FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const data = await ProductApi.getProduct(
        skip,
        limit,
        selectBrandIds.length > 0 ? selectBrandIds : undefined,
        selectMaterialIds.length > 0 ? selectMaterialIds : undefined
      );
      setProductsRes(data);
      console.log("Products:", data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  //// Filter
  const handleSelectBrand = (id: number) => {
    if (selectBrandIds.includes(id)) {
      setSelectBrandIds((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectBrandIds((prev) => [...prev, id]);
    }
  };

  const handleSelectMaterial = (id: number) => {
    if (selectMaterialIds.includes(id)) {
      setSelectMaterialIds((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectMaterialIds((prev) => [...prev, id]);
    }
  };

  const handleSelectColor = (id: number) => {
    if (selectColorIds.includes(id)) {
      setSelectColorIds((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectColorIds((prev) => [...prev, id]);
    }
  };

  //// Pagination
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

  //// Update
  useEffect(() => {
    fetchProducts();
  }, [selectBrandIds, selectMaterialIds, selectColorIds, skip]);

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
          brandIds={brandIds}
          materialIds={materialIds}
          colorIds={colorIds}
          handleSelectBrandIds={handleSelectBrand}
          handleSelectMaterialIds={handleSelectMaterial}
          handleSelectColorIds={handleSelectColor}
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
