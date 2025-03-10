import { Brand } from "@/types/brand";
import { useState } from "react";
import Image from "next/image";
import AlertAddBrand from "./alert-add-brand";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import AlertEditBrand from "./alert-edit-brand";

interface BrandPageProps {
  brands?: Brand[];
  setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  fetchBrands: () => void;
  deleteBrand: (id: number) => void;
}

export default function BrandList(props: BrandPageProps) {
  const [search, setSearch] = useState<string>("");

  const handleSearch = () => {
    if (search) {
      props.setFilters({ brandName: `"${search}"` });
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
        <AlertAddBrand fetchBrands={props.fetchBrands}>
          <div className="flex items-center gap-1 border px-3 py-1 hover:bg-slate-800 rounded-lg bg-black  border-gray-400 cursor-pointer">
            <Image
              src="/icon/add-round.svg"
              width={16}
              height={16}
              alt="logo"
            />
            <span className="text-white">Thêm thương hiệu</span>
          </div>
        </AlertAddBrand>
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
          <div className="col-span-4 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            Mô tả
          </div>
          <div className="col-span-1 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            Tuỳ chọn
          </div>
        </div>
        {props?.brands &&
          props?.brands?.length > 0 &&
          props?.brands?.map((brand) => (
            <div className="hidden md:grid grid-cols-10 grid-flow-row rounded gap-2 px-3 p-4 border-b border-gray-300 ">
              <div className="col-span-1 text-gray-900 justify-center font-[400]  text-sm flex gap-1 items-center">
                {brand?.brandId}
              </div>
              <div className="col-span-2 text-gray-900 justify-center font-[400]  text-sm flex gap-1 items-center ">
                <img
                  src={`${process.env.API_URL}${brand?.brandImageUrl}`}
                  width={60}
                  height={30}
                  alt="logo"
                  className="w-[60px] h-[30px] object-cover rounded-sm"
                />
              </div>
              <div className="col-span-2 text-gray-900 justify-center font-[400]  text-sm flex gap-1 items-center ">
                <span>{brand?.brandName}</span>
              </div>
              <div className="col-span-4 text-gray-900 justify-center font-[400]  text-sm flex gap-1 items-center ">
                <span className="w-full truncate">
                  {brand?.brandDescription}
                </span>
              </div>
              <div className="col-span-1 text-gray-900 justify-center font-[400]  text-sm flex gap-1 items-center ">
                <AlertEditBrand
                  fetchBrands={props.fetchBrands}
                  brandId={brand.brandId}
                >
                  <div className="bg-blue-100 rounded-md p-1 cursor-pointer">
                    <Pencil2Icon className="w-5 h-5 text-blue-400" />
                  </div>
                </AlertEditBrand>

                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="bg-red-100 rounded-md p-1 cursor-pointer">
                      <TrashIcon className="w-5 h-5 text-red-400" />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Bạn có thật sự muốn xóa sản phẩm này?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Sau khi xóa, sản phẩm sẽ không thể khôi phục.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Huỷ</AlertDialogCancel>
                      <AlertDialogAction>
                        <button
                          onClick={() => props.deleteBrand(brand.brandId)}
                        >
                          Xóa
                        </button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
