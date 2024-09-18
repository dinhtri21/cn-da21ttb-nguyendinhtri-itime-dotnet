import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { MixerVerticalIcon } from "@radix-ui/react-icons";

const filtersData: { [key: string]: string[] } = {
    "Thương hiệu": ["Casio", "Omega", "Seiko", "Rolex"],
    "Chất liệu": ["Vàng", "Bạch kim", "Thép không gỉ"],
    "Màu sắc": ["Đen", "Trắng", "Xanh"],
  };
  
export default function FilterResponsive() {
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});

  // Hàm cập nhật bộ lọc khi người dùng thay đổi lựa chọn
  const handleFilterChange = (category: string, value: string) => {
    setSelectedFilters((prevFilters) => {
      const prevValues = prevFilters[category] || [];

      // Nếu giá trị đã được chọn trước đó, thì bỏ chọn
      if (prevValues.includes(value)) {
        return {
          ...prevFilters,
          [category]: prevValues.filter((v) => v !== value),
        };
      }

      // Nếu chưa chọn, thêm giá trị vào danh sách
      return {
        ...prevFilters,
        [category]: [...prevValues, value],
      };
    });
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <div className="flex items-center gap-1">
            <MixerVerticalIcon width={16} height={16} />
            <span>Bộ lọc</span>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>BỘ LỘC SẢN PHẨM</SheetTitle>
            {Object.keys(filtersData).map((filterKey: string) => (
              <div key={filterKey} className="filter-section mb-4">
                <h3 className="uppercase text-base font-medium text-left">
                  {filterKey}
                </h3>
                {filtersData[filterKey].map((option) => (
                  <div key={option}>
                    <label className="flex items-center mt-1">
                      <input
                        className="w-4 h-4"
                        type="checkbox"
                        checked={
                          selectedFilters[filterKey]?.includes(option) || false
                        } // Check để đánh dấu
                        onChange={() => handleFilterChange(filterKey, option)}
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
