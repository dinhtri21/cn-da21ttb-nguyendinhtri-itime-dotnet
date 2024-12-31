import { useState } from "react";
import Image from "next/image";
import { Material } from "@/types/material";

interface MaterialPageProps {
  materials?: Material[];
  setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export default function MaterialList(props: MaterialPageProps) {
  const [search, setSearch] = useState<string>("");

  const handleSearch = () => {
    if (search) {
      props.setFilters({ materialName: `"${search}"` });
    } else {
      props.setFilters({});
    }
  };

  const handleKeyDownSearch = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between">
        <div className="flex gap-3">
          {/* <ComboboxFilter
                    frameworks={brands}
                    setFilterValue={props.setFilterBrand}
                  />
                  <ComboboxFilter
                    frameworks={materials}
                    setFilterValue={props.setFilterMaterial}
                  />
                  <ComboboxFilter
                    frameworks={sortBy}
                    setFilterValueText={props.setFilterSortOrder}
                  /> */}
          <div className="flex items-center gap-2 border border-gray-300 px-3 py-1 hover:bg-slate-50 rounded-lg bg-white cursor-pointer text-gray-700">
            <button
              onClick={handleSearch}
              className="border-r border-gray-400 pr-2 "
            >
              <Image src="/icon/search.svg" width={16} height={16} alt="logo" />
            </button>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="outline-none caret-gray-400 text-gray-800"
              value={search}
              onKeyDown={handleKeyDownSearch}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 bg-background overflow-hidden min-h-[518px] border-t border-gray-300">
        <div className="hidden md:grid grid-cols-10 grid-flow-row rounded gap-2 px-3 p-4 border-b border-gray-300 ">
          <div className="col-span-1 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center">
            Id
          </div>
          <div className="col-span-2 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            <span>Ảnh</span>
          </div>
          <div className="col-span-2 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            <span>Tên</span>
          </div>
          <div className="col-span-1 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            Tuỳ chọn
          </div>
        </div>
        {props?.materials &&
          props?.materials?.length > 0 &&
          props?.materials?.map((material) => (
            <div className="hidden md:grid grid-cols-10 grid-flow-row rounded gap-2 px-3 p-4 border-b border-gray-300 ">
              <div className="col-span-1 text-gray-900 justify-center font-[400]  text-sm flex gap-1 items-center">
                {material?.materialId}
              </div>
              <div className="col-span-2 text-gray-900 justify-center font-[400]  text-sm flex gap-1 items-center ">
                <span>Ảnh</span>
              </div>
              <div className="col-span-2 text-gray-900 justify-center font-[400]  text-sm flex gap-1 items-center ">
                <span>{material?.materialName}</span>
              </div>
              <div className="col-span-1 text-gray-900 justify-center font-[400]  text-sm flex gap-1 items-center ">
                Tuỳ chọn
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
