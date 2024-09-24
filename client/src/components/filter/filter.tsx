"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { use, useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";

import { MixerVerticalIcon } from "@radix-ui/react-icons";
import { Console } from "console";
import { number } from "zod";

interface FilterProps {
  brandIds: { id: number; name: string }[];
  materialIds: { id: number; name: string }[];
  colorIds: { id: number; name: string }[];
  handleSelectBrandIds: (brandId: number) => void;
  handleSelectMaterialIds: (materialId: number) => void;
  handleSelectColorIds: (colorId: number) => void;
}

export default function Filter({
  brandIds,
  materialIds,
  colorIds,
  handleSelectBrandIds,
  handleSelectMaterialIds,
  handleSelectColorIds,
}: FilterProps) {
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
                  onChange={() => handleSelectBrandIds(brand.id)}
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
                  onChange={() => handleSelectMaterialIds(material.id)}
                />
                <span className="ml-2">{material.name}</span>
              </label>
            </div>
          ))}
        </div>
        {/* Color */}
        <div className="filter-section mb-4">
          <h3 className="uppercase text-base font-medium">Màu sắc</h3>
          {colorIds.map((color) => (
            <div key={color.id}>
              <label className="flex items-center mt-1">
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  onChange={() => handleSelectColorIds(color.id)}
                />
                <span className="ml-2">{color.name}</span>
              </label>
            </div>
          ))}
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
              <SheetTitle>BỘ LỘC SẢN PHẨM</SheetTitle>
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
                      onChange={() => handleSelectBrandIds(brand.id)}
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
                      onChange={() => handleSelectMaterialIds(material.id)}
                    />
                    <span className="ml-2">{material.name}</span>
                  </label>
                </div>
              ))}
            </div>
            {/* Color */}
            <div className="filter-section mb-4">
              <h3 className="uppercase text-base font-medium">Màu sắc</h3>
              {colorIds.map((color) => (
                <div key={color.id}>
                  <label className="flex items-center mt-1">
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      onChange={() => handleSelectColorIds(color.id)}
                    />
                    <span className="ml-2">{color.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
