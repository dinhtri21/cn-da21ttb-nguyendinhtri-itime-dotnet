"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { MixerVerticalIcon } from "@radix-ui/react-icons";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BrandApi from "@/apis/brandApi";
import { Brand, BrandResponse } from "@/types/brand";
import { set } from "date-fns";
import { Material } from "@/types/material";
import MaterialApi from "@/apis/materialApi";

interface FilterProps {
  updateURLWithFilters: (filters: Record<string, any>) => void;
}

// const brandIds = [
//   { id: 1, name: "Casio" },
//   { id: 2, name: "Omega" },
//   { id: 9, name: "Citizen" },
//   { id: 4, name: "Rolex" },
//   { id: 12, name: "Rolex" },
//   { id: 10, name: "Rolex" },
//   { id: 11, name: "Rolex" },
// ];

// const materialIds = [
//   { id: 1, name: "Thép" },
//   { id: 2, name: "Bạch kim" },
//   { id: 3, name: "Vàng" },
//   { id: 12, name: "Thép" },
//   { id: 23, name: "Bạch kim" },
//   { id: 34, name: "Vàng" },
// ];

const colorIds = [
  { id: 1, name: "Đen" },
  { id: 2, name: "Trắng" },
  { id: 3, name: "Xanh" },
];

export default function Filter({ updateURLWithFilters }: FilterProps) {
  const searchParams = new URLSearchParams(window.location.search);

  const brands = searchParams.get("brands")?.split(",").map(Number);
  const materials = searchParams.get("materials")?.split(",").map(Number);

  const [brandIds, setBrandIds] = useState<Brand[] | null>([]);
  const [materialIds, setMaterialIds] = useState<Material[] | null>([]);

  // State để lưu các checkbox đã chọn
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>(
    brands || []
  );
  const [selectedMaterialIds, setSelectedMaterialIds] = useState<number[]>(
    materials || []
  );

  const fetchBrands = async () => {
    try {
      const data = await BrandApi.getBrands();
      setBrandIds(data.brands);
    } catch (error) {
      console.error("Failed to fetch brands:", error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const data = await MaterialApi.getMaterials();
      setMaterialIds(data.materials);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    }
  }

  // Hàm xử lý chọn hoặc bỏ chọn checkbox
  const toggleSelection = (
    id: number,
    selectedIds: number[],
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>,
    handleSelect: (id: number) => void
  ) => {
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((itemId) => itemId !== id) // Nếu đã chọn thì bỏ chọn
      : [...selectedIds, id]; // Nếu chưa chọn thì thêm vào

    setSelectedIds(newSelectedIds); // Cập nhật trạng thái checkbox
    handleSelect(id); // Gọi hàm xử lý khi người dùng chọn/bỏ chọn
  };

  //// Filter handlers
  const handleSelectBrand = (id: number) => {
    // Get brands from URL
    const brands = searchParams.get("brands")
      ? searchParams.get("brands")?.split(",").map(Number)
      : [];
    // Update brands with selected brand
    const updatedBrands = (brands || []).includes(id)
      ? (brands || []).filter((item) => item !== id)
      : [...(brands || []), id];
    updateURLWithFilters({ brands: updatedBrands.join(",") });
  };

  const handleSelectMaterial = (id: number) => {
    const materials = searchParams.get("materials")
      ? searchParams.get("materials")?.split(",").map(Number)
      : [];
    const updatedMaterials = (materials || []).includes(id)
      ? (materials || []).filter((item) => item !== id)
      : [...(materials || []), id];
    updateURLWithFilters({ materials: updatedMaterials.join(",") });
  };

  useEffect(() => {
    fetchBrands();
    fetchMaterials();
  }, []);

  return (
    <div className="absolute md:relative md:left-0 md:top-0 left-4 top-2 pl-4 pr-4">
      <div className="hidden md:block">
        <div className="mb-4 mt-2 flex items-center gap-2">
          <MixerVerticalIcon width={20} height={20} />
          <span className="uppercase text-lg ">Lọc sản phẩm</span>
        </div>

        {/* Brand */}
        <div className="filter-section mb-4">
          <h3 className="uppercase text-base">Thương hiệu</h3>
          {brandIds &&
            brandIds?.length > 0 &&
            brandIds?.slice(0, 5).map((brand) => (
              <div key={brand.brandId}>
                <label className="flex items-center mt-1">
                  <input
                    className="w-4 h-4"
                    type="checkbox"
                    checked={selectedBrandIds.includes(brand.brandId)}
                    onChange={() =>
                      toggleSelection(
                        brand.brandId,
                        selectedBrandIds,
                        setSelectedBrandIds,
                        handleSelectBrand
                      )
                    }
                  />
                  <span className="ml-2 text-gray-600">{brand.brandName}</span>
                </label>
              </div>
            ))}

          {/* Hiển thị Accordion nếu có nhiều hơn 5 mục */}
          {brandIds && brandIds?.length > 5 && (
            <Accordion type="single" collapsible>
              <AccordionItem value="remaining-brands" className="text-gray-500">
                <AccordionTrigger>Hiển thị thêm</AccordionTrigger>
                <AccordionContent>
                  {brandIds.slice(5).map((brand) => (
                    <div key={brand.brandId}>
                      <label className="flex items-center mt-1">
                        <input
                          className="w-4 h-4"
                          type="checkbox"
                          checked={selectedBrandIds.includes(brand.brandId)}
                          onChange={() =>
                            toggleSelection(
                              brand.brandId,
                              selectedBrandIds,
                              setSelectedBrandIds,
                              handleSelectBrand
                            )
                          }
                        />
                        <span className="ml-2 text-gray-600">
                          {brand.brandName}
                        </span>
                      </label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>

        {/* Material */}
        <div className="filter-section mb-4">
          <h3 className="uppercase text-base">Chất liệu</h3>
          {materialIds && materialIds.length> 0 && materialIds.slice(0, 5).map((material) => (
            <div key={material.materialId}>
              <label className="flex items-center mt-1">
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  checked={selectedMaterialIds.includes(material.materialId)}
                  onChange={() =>
                    toggleSelection(
                      material.materialId,
                      selectedMaterialIds,
                      setSelectedMaterialIds,
                      handleSelectMaterial
                    )
                  }
                />
                <span className="ml-2 text-gray-600">{material.materialName}</span>
              </label>
            </div>
          ))}

          {/* Hiển thị Accordion nếu có nhiều hơn 5 mục */}
          {materialIds && materialIds?.length > 5 && (
            <Accordion type="single" collapsible>
              <AccordionItem
                value="remaining-materials"
                className="text-gray-500 "
              >
                <AccordionTrigger>Hiển thị thêm</AccordionTrigger>
                <AccordionContent className="">
                  {materialIds.slice(5).map((material) => (
                    <div key={material.materialId}>
                      <label className="flex items-center mt-1">
                        <input
                          className="w-4 h-4"
                          type="checkbox"
                          checked={selectedMaterialIds.includes(material.materialId)}
                          onChange={() =>
                            toggleSelection(
                              material.materialId,
                              selectedMaterialIds,
                              setSelectedMaterialIds,
                              handleSelectMaterial
                            )
                          }
                        />
                        <span className="ml-2 text-gray-600">
                          {material.materialName}
                        </span>
                      </label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <div className="flex items-center gap-1">
              <MixerVerticalIcon width={16} height={16} />
              <span>Bộ lọc</span>
            </div>
          </SheetTrigger>
          <SheetContent className="w-[250px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>BỘ LỌC SẢN PHẨM</SheetTitle>
            </SheetHeader>
            <SheetDescription></SheetDescription>
            {/* Brand */}
            <div className="filter-section mb-4">
              <h3 className="uppercase text-base font-medium">Thương hiệu</h3>
              {brandIds && brandIds?.length && brandIds.map((brand) => (
                <div key={brand.brandId}>
                  <label className="flex items-center mt-1">
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      checked={selectedBrandIds.includes(brand.brandId)}
                      onChange={() =>
                        toggleSelection(
                          brand.brandId,
                          selectedBrandIds,
                          setSelectedBrandIds,
                          handleSelectBrand
                        )
                      }
                    />
                    <span className="ml-2">{brand.brandName}</span>
                  </label>
                </div>
              ))}
            </div>
            {/* Material */}
            <div className="filter-section mb-4">
              <h3 className="uppercase text-base font-medium">Chất liệu</h3>
              {materialIds && materialIds.length > 0 &&  materialIds.map((material) => (
                <div key={material.materialId}>
                  <label className="flex items-center mt-1">
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      checked={selectedMaterialIds.includes(material.materialId)}
                      onChange={() =>
                        toggleSelection(
                          material.materialId,
                          selectedMaterialIds,
                          setSelectedMaterialIds,
                          handleSelectMaterial
                        )
                      }
                    />
                    <span className="ml-2">{material.materialName}</span>
                  </label>
                </div>
              ))}
            </div>
            {/* Color */}
            {/* <div className="filter-section mb-4">
              <h3 className="uppercase text-base font-medium">Màu sắc</h3>
              {colorIds.map((color) => (
                <div key={color.id}>
                  <label className="flex items-center mt-1">
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      checked={selectedColorIds.includes(color.id)}
                      onChange={() =>
                        toggleSelection(
                          color.id,
                          selectedColorIds,
                          setSelectedColorIds,
                          handleSelectColorIds
                        )
                      }
                    />
                    <span className="ml-2">{color.name}</span>
                  </label>
                </div>
              ))}
            </div> */}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
