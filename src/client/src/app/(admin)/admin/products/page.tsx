"use client";
import { useEffect, useState } from "react";
import ProductList from "./_components/product-list";
import { Order } from "@/types/order";
import { Product, ProductsRes, UpdateProductReq } from "@/types/product";
import { useRouter, useSearchParams } from "next/navigation";
import ProductApi from "@/apis/productApi";
import RenderPaginationItems from "@/components/paginationItemsCustom/paginationItemsCustom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import CustomToast from "@/components/react-toastify/reactToastify";
import Cookies from "js-cookie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [productsRes, setProductsRes] = useState<ProductsRes | null>(null);

  const [filters, setFilters] = useState<Record<string, any>>({});
  const [filterBrand, setFilterBrand] = useState<number[] | null>(null);
  const [filterMaterial, setFilterMaterial] = useState<number[] | null>(null);
  const [filterSortOrder, setFilterSortOrder] = useState<string | null>(null);

  const [limit, setLimit] = useState(7);
  const [skip, setSkip] = useState(0);

  const token = Cookies.get("accessTokenAdmin");

  //// FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const data = await ProductApi.getProduct(
        skip,
        limit,
        filterBrand || undefined,
        filterMaterial || undefined,
        filterSortOrder || undefined,
        filters || undefined
      );
      setProductsRes(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  //// DELETE PRODUCT
  const deleteProduct = async (id: number) => {
    if (!token) {
      CustomToast.showError("Bạn chưa đăng nhập!");
      return;
    }
    try {
      await ProductApi.deleteProduct(id, token);
      CustomToast.showSuccess("Xóa sản phẩm thành công!");
      fetchProducts();
    } catch (error: any) {
      console.error("Failed to delete product:", error.response.data.message);
      CustomToast.showError(error.response.data.message);
    }
  };

  //// FILTER PRODUCTS
  useEffect(() => {
    fetchProducts();
  }, [
    searchParams,
    filterBrand,
    filters,
    filterMaterial,
    filterSortOrder,
    limit,
    skip,
  ]);

  //// Pagination handlers
  const handlePaginationPrevious = () => {
    if (skip > 0) {
      setSkip(skip - 1);
    }
  };

  const handlePaginationNext = () => {
    if (!productsRes) {
      return;
    }
    if (Math.ceil(productsRes?.total % productsRes?.limit) > skip) {
      setSkip(skip + 1);
    }
  };

  const handlePaginationItem = (page: number) => {
    setSkip(page);
  };

  return (
    <div className="w-full dark:bg-muted/40 relative bg-white">
      <div
        className="w-full mx-auto  dark:bg-background
            relative  sm:pl-[220px] sm:pr-8 pb-5"
      >
        {productsRes && (
          <ProductList
            fetchProducts={fetchProducts}
            deleteProduct={deleteProduct}
            products={productsRes.products}
            setFilterBrand={setFilterBrand}
            setFilters={setFilters}
            setFilterMaterial={setFilterMaterial}
            setFilterSortOrder={setFilterSortOrder}
          />
        )}
        {productsRes && productsRes?.products?.length !== 0 && (
          <div className="flex justify-center items-center mt-3">
            <Select
              onValueChange={(value: string) => {
                setLimit(parseInt(value));
                setSkip(0);
              }}
              defaultValue={`${limit.toString()}`}
            >
              <SelectTrigger className="w-[60px] border border-gray-300">
                <SelectValue placeholder="6" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
            <div>
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
          </div>
        )}
        <h1></h1>
      </div>
    </div>
  );
}
