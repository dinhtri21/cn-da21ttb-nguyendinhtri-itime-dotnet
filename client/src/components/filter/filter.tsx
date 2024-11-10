"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { MixerVerticalIcon } from "@radix-ui/react-icons";

interface FilterProps {
  updateURLWithFilters: (filters: Record<string, any>) => void;
}

const brandIds = [
  { id: 1, name: "Casio" },
  { id: 2, name: "Omega" },
  { id: 3, name: "Citizen" },
  { id: 4, name: "Rolex" },
];

const materialIds = [
  { id: 1, name: "Vàng" },
  { id: 2, name: "Bạch kim" },
  { id: 3, name: "Thép không gỉ" },
];

const colorIds = [
  { id: 1, name: "Đen" },
  { id: 2, name: "Trắng" },
  { id: 3, name: "Xanh" },
];

export default function Filter({ updateURLWithFilters }: FilterProps) {
  const searchParams = new URLSearchParams(window.location.search);

  const brands = searchParams.get("brands")?.split(",").map(Number);
  const materials = searchParams.get("materials")?.split(",").map(Number);
  // State để lưu các checkbox đã chọn
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>(
    brands || []
  );
  const [selectedMaterialIds, setSelectedMaterialIds] = useState<number[]>(
    materials || []
  );
  // const [selectedColorIds, setSelectedColorIds] = useState<number[]>([]);

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

  return (
    <div className="absolute md:relative left-4 top-2">
      <div className="hidden md:block">
        <div className="mb-4 mt-2 flex items-center gap-2">
          <MixerVerticalIcon width={20} height={20} />
          <span className="uppercase font-medium">Lọc sản phẩm</span>
        </div>
        {/* Brand */}
        <div className="filter-section mb-4">
          <h3 className="uppercase text-base font-medium">Thương hiệu</h3>
          {brandIds.map((brand) => (
            <div key={brand.id}>
              <label className="flex items-center mt-1">
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  checked={selectedBrandIds.includes(brand.id)}
                  onChange={() =>
                    toggleSelection(
                      brand.id,
                      selectedBrandIds,
                      setSelectedBrandIds,
                      handleSelectBrand
                    )
                  }
                />
                <span className="ml-2 text-gray-600">{brand.name}</span>
              </label>
            </div>
          ))}
        </div>
        {/* Material */}
        <div className="filter-section mb-4">
          <h3 className="uppercase text-base font-medium">Chất liệu</h3>
          {materialIds.map((material) => (
            <div key={material.id}>
              <label className="flex items-center mt-1">
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  checked={selectedMaterialIds.includes(material.id)}
                  onChange={() =>
                    toggleSelection(
                      material.id,
                      selectedMaterialIds,
                      setSelectedMaterialIds,
                      handleSelectMaterial
                    )
                  }
                />
                <span className="ml-2 text-gray-600">{material.name}</span>
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
                      
                    )
                  }
                />
                <span className="ml-2">{color.name}</span>
              </label>
            </div>
          ))}
        </div> */}
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
              {brandIds.map((brand) => (
                <div key={brand.id}>
                  <label className="flex items-center mt-1">
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      checked={selectedBrandIds.includes(brand.id)}
                      onChange={() =>
                        toggleSelection(
                          brand.id,
                          selectedBrandIds,
                          setSelectedBrandIds,
                          handleSelectBrand
                        )
                      }
                    />
                    <span className="ml-2">{brand.name}</span>
                  </label>
                </div>
              ))}
            </div>
            {/* Material */}
            <div className="filter-section mb-4">
              <h3 className="uppercase text-base font-medium">Chất liệu</h3>
              {materialIds.map((material) => (
                <div key={material.id}>
                  <label className="flex items-center mt-1">
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      checked={selectedMaterialIds.includes(material.id)}
                      onChange={() =>
                        toggleSelection(
                          material.id,
                          selectedMaterialIds,
                          setSelectedMaterialIds,
                          handleSelectMaterial
                        )
                      }
                    />
                    <span className="ml-2">{material.name}</span>
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
