"use client";
import MaterialApi from "@/apis/materialApi";
import { Material, MaterialResponse } from "@/types/material";
import { useEffect, useState } from "react";
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
import MaterialList from "./_components/material-list";
import Cookies from "js-cookie";
import CustomToast from "@/components/react-toastify/reactToastify";

export default function MaterialsPage() {
  const [materialResponse, setMaterialResponse] =
    useState<MaterialResponse | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const token = Cookies.get("accessTokenAdmin");

  const fetchMaterials = async () => {
    try {
      const res = await MaterialApi.getMaterials(
        skip,
        limit,
        filters || undefined
      );
      setMaterialResponse(res);
    } catch (error) {
      console.log(error);
    }
  };

    //// DELETE MATERIAL
    const deleteMaterial = async (id: number) => {
      if (!token) {
        CustomToast.showError("Bạn chưa đăng nhập!");
        return;
      }
      try {
        await MaterialApi.deleteMaterial(id, token);
        CustomToast.showSuccess("Xóa sản phẩm thành công!");
        fetchMaterials();
      } catch (error: any) {
        console.error("Failed to delete product:", error.response.data.message);
        CustomToast.showError(error.response.data.message);
      }
    };

  // Pagination handlers
  const handlePaginationPrevious = () => {
    if (skip > 0) {
      setSkip(skip - 1);
    }
  };

  const handlePaginationNext = () => {
    if (!materialResponse) {
      return;
    }
    if (Math.ceil(materialResponse?.total % materialResponse?.limit) > skip) {
      setSkip(skip + 1);
    }
  };

  const handlePaginationItem = (page: number) => {
    setSkip(page);
  };

  useEffect(() => {
    fetchMaterials();
  }, [filters, skip, limit]);

  useEffect(() => {
    setSkip(0);
    fetchMaterials();
  }, [filters]);

  return (
    <div className="w-full dark:bg-muted/40 relative">
      <div
        className="w-full mx-auto  dark:bg-background
          relative sm:pl-[220px] sm:pr-6 pb-6"
      >
        <MaterialList
          deleteMaterial={deleteMaterial}
          fetchMaterials={fetchMaterials}
          setFilters={setFilters}
          materials={materialResponse?.materials}
        />
        {materialResponse && materialResponse?.materials?.length !== 0 && (
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
                    total={materialResponse?.total || 0}
                    limit={materialResponse?.limit || 0}
                    skip={materialResponse?.skip || 0}
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
