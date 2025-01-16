"use client";
import { useEffect, useState } from "react";
import BrandList from "./_components/brand-list";
import { Brand, BrandResponse } from "@/types/brand";
import BrandApi from "@/apis/brandApi";
import RenderPaginationItems from "@/components/paginationItemsCustom/paginationItemsCustom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Cookies from "js-cookie";
import CustomToast from "@/components/react-toastify/reactToastify";

export default function BrandPage() {
  const [brandResponse, setBrandResponse] = useState<BrandResponse | null>(
    null
  );
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(12);
  const token = Cookies.get("accessTokenAdmin");

  const fetchBrands = async () => {
    try {
      const res = await BrandApi.getBrands(skip, limit, filters || undefined);
      setBrandResponse(res);
    } catch (error) {
      console.log(error);
    }
  };

  //// DELETE BRAND
  const deleteBrand = async (id: number) => {
    if (!token) {
      CustomToast.showError("Bạn chưa đăng nhập!");
      return;
    }
    try {
      await BrandApi.deleteBrand(id, token);
      CustomToast.showSuccess("Xóa sản phẩm thành công!");
      fetchBrands();
    } catch (error: any) {
      console.error("Failed to delete product:", error.response.data.message);
      CustomToast.showError(error.response.data.message);
    }
  };

  //// Pagination handlers
  const handlePaginationPrevious = () => {
    if (skip > 0) {
      setSkip(skip - 1);
    }
  };

  const handlePaginationNext = () => {
    if (!brandResponse) {
      return;
    }
    if (Math.ceil(brandResponse?.total % brandResponse?.limit) > skip) {
      setSkip(skip + 1);
    }
  };

  const handlePaginationItem = (page: number) => {
    setSkip(page);
  };

  useEffect(() => {
    fetchBrands();
  }, [filters, skip, limit]);

  useEffect(() => {
    setSkip(0);
    fetchBrands();
  }, [filters]);

  return (
    <div className="w-full dark:bg-muted/40 relative">
      <div
        className="w-full mx-auto  dark:bg-background
        relative sm:pl-[220px] sm:pr-6 pb-6"
      >
        <BrandList
          deleteBrand={deleteBrand}
          brands={brandResponse?.brands}
          setFilters={setFilters}
          fetchBrands={fetchBrands}
        />
        {brandResponse && brandResponse?.brands?.length !== 0 && (
          <div className="flex justify-center items-center mt-3">
            <Select
              onValueChange={(value: string) => {
                setLimit(parseInt(value));
                setSkip(0);
              }}
              // defaultValue={`${limit.toString()}`}
            >
              <SelectTrigger className="w-[60px] border border-gray-300">
                <SelectValue placeholder="6" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="8">10</SelectItem>
                <SelectItem value="8">20</SelectItem>
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
                    total={brandResponse?.total || 0}
                    limit={brandResponse?.limit ?? 0}
                    skip={brandResponse?.skip || 0}
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
      </div>
    </div>
  );
}
