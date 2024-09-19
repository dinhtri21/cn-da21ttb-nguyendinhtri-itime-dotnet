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
  filtersData: { [key: string]: { id: number; name: string }[] };
  selectedFilters: { [key: string]: { id: number; name: string }[] };
  setSelectedFilters: React.SetStateAction<{
    [key: string]: { id: number; name: string }[];
  }>;
  handleFilterChange: any;
}

export default function Filter({
  filtersData,
  selectedFilters,
  setSelectedFilters,
  handleFilterChange,
}: FilterProps) {
  return (
    <div className="absolute md:relative left-4 top-2">
      <div className="hidden md:block">
        <div className="mb-4 mt-2 flex items-center gap-2">
          <MixerVerticalIcon width={20} height={20} />
          <span className="uppercase font-medium">Lọc sản phẩm</span>
        </div>
        {Object.keys(filtersData).map((filterKey: string) => (
          <div key={filterKey} className="filter-section mb-4">
            <h3 className="uppercase text-base font-medium">
              {filterKey == "brandIds"
                ? "Thương hiệu"
                : filterKey == "materialIds"
                ? "Chất liệu"
                : filterKey == "colorIds"
                ? "Màu sắc"
                : ""}
            </h3>
            {filtersData[filterKey].map((option) => (
              <div key={option.id}>
                <label className="flex items-center mt-1">
                  <input
                    className="w-4 h-4"
                    type="checkbox"
                    checked={
                      selectedFilters[filterKey]?.some(
                        (selectedOption) => selectedOption.id === option.id
                      ) || false
                    } // Check để đánh dấu
                    onChange={() => handleFilterChange(filterKey, option)}
                  />
                  <span className="ml-2">{option.name}</span>
                </label>
              </div>
            ))}
          </div>
        ))}
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
            <div className="px-4 mt-4">
              {Object.keys(filtersData).map((filterKey: string) => (
                <div key={filterKey} className="filter-section mb-4">
                  <h3 className="uppercase text-base font-medium">
                    {filterKey == "brandIds"
                      ? "Thương hiệu"
                      : filterKey == "materialIds"
                      ? "Chất liệu"
                      : filterKey == "colorIds"
                      ? "Màu sắc"
                      : ""}
                  </h3>
                  {filtersData[filterKey].map((option) => (
                    <div key={option.id}>
                      <label className="flex items-center mt-1">
                        <input
                          className="w-4 h-4"
                          type="checkbox"
                          checked={
                            selectedFilters[filterKey]?.some(
                              (selectedOption) =>
                                selectedOption.id === option.id
                            ) || false
                          } // Check để đánh dấu
                          onChange={() => handleFilterChange(filterKey, option)}
                        />
                        <span className="ml-2">{option.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
