"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import ComboboxFilter from "./combobox-filter";
import AlertAddProduct from "./alert-add-product";
import { Product } from "@/types/product";
import AlertEditProduct from "./alert-edit-product";
import { TrashIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { frameworks } from "./combobox-filter";
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
import BrandApi from "@/apis/brandApi";
import MaterialApi from "@/apis/materialApi";
import AlertViewProduct from "./alert-view-product";
import AlertImportExcel from "./alert-import-excel";
import ProductApi from "@/apis/productApi";
import Cookies from "js-cookie";
import CustomToast from "@/components/react-toastify/reactToastify";

const sortBy: frameworks[] = [
  {
    value: "null",
    label: "Giá",
  },
  {
    value: "price_asc",
    label: "Giá tăng dần",
  },
  {
    value: "price_desc",
    label: "Giá giảm dần",
  },
];

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

interface DashboardProps {
  products: Product[];
  fetchProducts: () => void;
  deleteProduct: (id: number) => void;
  setFilterBrand: React.Dispatch<React.SetStateAction<number[] | null>>;
  setFilterMaterial: React.Dispatch<React.SetStateAction<number[] | null>>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setFilterSortOrder: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function ProductList(props: DashboardProps) {
  const [search, setSearch] = useState<string>("");
  const [brands, setBrands] = useState<frameworks[]>([]);
  const [materials, setMaterials] = useState<frameworks[]>([]);
  const token = Cookies.get("accessTokenAdmin");

  const fetchBrands = async () => {
    try {
      const res = await BrandApi.getBrands();
      const newBrands = await res?.brands.map((brand) => {
        return {
          value: brand.brandId.toString(),
          label: brand.brandName,
        };
      });
      newBrands.unshift({
        value: "null",
        label: "Thương hiệu",
      });

      setBrands(newBrands);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const res = await MaterialApi.getMaterials();
      const newMaterial = await res?.materials.map((material) => {
        return {
          value: material.materialId.toString(),
          label: material.materialName,
        };
      });
      newMaterial.unshift({
        value: "null",
        label: "Chất liệu",
      });
      setMaterials(newMaterial);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Ngăn sự kiện lan ra ngoài
  };

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);

    // Định dạng cho ngày và giờ
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Sử dụng định dạng 12 giờ (AM/PM)
    };

    // Định dạng ngày theo ngôn ngữ Việt Nam
    const formattedDate = dateObj.toLocaleDateString("vi-VN", options);

    // Tách ngày và giờ
    const [date, time] = formattedDate.split(" ");

    // Tách giờ và phân đoạn AM/PM
    const [hour, minute, second] = time.split(":");
    const ampm = parseInt(hour) >= 12 ? "PM" : "AM";
    const hourIn12 = parseInt(hour) % 12 || 12;

    // Trả về định dạng theo yêu cầu
    return `${date} ${hourIn12}:${minute}:${second} ${ampm}`;
  };

  const handleSearch = () => {
    if (search) {
      props.setFilters({ productName: `"${search}"` });
    } else {
      props.setFilters({});
    }
  };

  const handleKeyDownSearch = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleExortExcel = async () => {
    if (!token) {
      CustomToast.showError("Vui lòng đăng nhập");
      return;
    }
    try {
      const res = await ProductApi.exportExcel(token);
      const blob = new Blob([res], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "DanhSachSanPhamItime.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      CustomToast.showError("Xuất excel thất bại");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBrands();
    fetchMaterials();
  }, []);

  return (
    <div className="w-full mx-auto pb-2">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <ComboboxFilter
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
          />
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
        <div className="flex gap-3">
          <div
            onClick={handleExortExcel}
            className="flex items-center gap-1 border px-3 py-1 hover:bg-[#2a976019] rounded-lg   border-[#20744a] cursor-pointer"
          >
            <Image src="/icon/excel.svg" width={16} height={16} alt="logo" />
            <span className="text-[#20744a]">Xuất excel</span>
          </div>
          <AlertImportExcel fetchProducts={props.fetchProducts}>
            <div className="flex items-center gap-1 border px-3 py-1 hover:bg-[#2a976018] rounded-lg   border-[#20744a] cursor-pointer">
              <Image src="/icon/excel.svg" width={16} height={16} alt="logo" />
              <span className="text-[#20744a]">Nhập excel</span>
            </div>
          </AlertImportExcel>
          <div className="w-[1px] h-full bg-gray-300"></div>
          <AlertAddProduct fetchProducts={props.fetchProducts}>
            <div className="flex items-center gap-1 border px-3 py-1 hover:bg-gray-600 rounded-lg bg-black  border-gray-200 cursor-pointer">
              <Image
                src="/icon/add-round.svg"
                width={16}
                height={16}
                alt="logo"
              />
              <span className="text-white">Thêm sản phẩm</span>
            </div>
          </AlertAddProduct>
        </div>
      </div>
      <div className="mt-6 bg-background overflow-hidden min-h-[530px] border-t border-gray-300">
        <div className="hidden md:grid grid-cols-12 grid-flow-row rounded gap-2 px-3 p-4 border-b border-gray-300 ">
          <div className="col-span-1 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center">
            ID
          </div>
          <div className="col-span-1 text-gray-600 font-medium text-sm flex justify-start gap-1 items-center pl-2">
            Ảnh
          </div>
          <div className="col-span-2 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            <span>Tên</span>
            {/* <ClockIcon className="" /> */}
          </div>
          <div className="col-span-2 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            <span>Giá</span>
            {/* <ReloadIcon className="" /> */}
          </div>
          <div className="col-span-1 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            Số lượng
          </div>
          {/* <div className="col-span-2 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            Danh mục
          </div> */}
          <div className="col-span-1 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            Thương Hiệu
          </div>
          <div className="col-span-1 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            Chất liệu
          </div>
          <div className="col-span-2 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            Mô tả
          </div>
          <div className="col-span-1 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            Tuỳ chọn
          </div>

          {/* <div className="col-span-1 text-gray-500 text-sm flex justify-center gap-1 items-center ">
            Tuỳ chọn
          </div> */}
        </div>
        {props.products?.length > 0
          ? props.products.map((product, index) => (
              <AlertViewProduct
                key={index}
                fetchProducts={props.fetchProducts}
                productId={product.productId}
              >
                <div
                  key={index}
                  className="grid grid-cols-12 grid-flow-row gap-2 cursor-pointer p-3 border-b border-gray-300 text-black hover:bg-gray-50"
                >
                  <div className="col-span-1 text-gray-900 font-[400]  text-sm flex justify-center gap-1 items-center">
                    <span>{product.productId}</span>
                  </div>
                  <div className="col-span-1 text-gray-900 font-[400] flex justify-start gap-1 items-center">
                    <img
                      src={`${process.env.API_URL}${product.imageUrls[0]}`}
                      width={50}
                      height={50}
                      alt="pic"
                      className="border rounded w-[50px] h-[50px] object-cover"
                    />
                  </div>
                  <div className="col-span-2 text-gray-900 font-[400]  text-sm flex justify-start gap-1 items-center ">
                    <span>{product.productName}</span>
                    {/* <ClockIcon className="" /> */}
                  </div>
                  <div className="col-span-2 text-gray-900 font-[400]  text-sm flex justify-center gap-1 items-center ">
                    <span>{product.productPrice.toLocaleString()} đ</span>
                    {/* <ReloadIcon className="" /> */}
                  </div>
                  <div className="col-span-1 text-gray-900 font-[400]  text-sm flex justify-center gap-1 items-center ">
                    <span>{product.quantityInStock}</span>
                  </div>
                  {/* <div className="col-span-2 text-gray-900 font-[400]  text-sm flex justify-center gap-1 items-center ">
                  <div className="flex flex-col gap-1 ">
                    <div className="py-1 px-2 rounded-xl bg-green-100/70 font-[400] border border-green-200 text-green-400">
                      <span>Danh mục A</span>
                    </div>
                   
                  </div>
                </div> */}
                  <div className="col-span-1 text-gray-900 font-[400]  text-sm flex justify-center gap-1 items-center ">
                    <span>{product.brand.brandName}</span>
                  </div>
                  <div className="col-span-1 text-gray-900 font-[400]  text-sm flex justify-center gap-1 items-center ">
                    <span>{product.material.materialName}</span>
                  </div>
                  <div className="col-span-2 text-gray-900 font-[400]  text-sm flex justify-center gap-1 items-center ">
                    <span className="line-clamp-2">
                      {product.productDescription}
                    </span>
                  </div>
                  <div className="col-span-1 text-gray-900 font-medium text-sm flex justify-center gap-1 items-center ">
                    {/* <div className="cursor-pointer">
                    <DotsHorizontalIcon className="text-gray-900 font-[400]  w-5 h-5" />
                  </div> */}
                    <div className="flex gap-2" onClick={handleInnerClick}>
                      <AlertEditProduct
                        fetchProducts={props.fetchProducts}
                        productId={product.productId}
                      >
                        <div className="bg-blue-100 rounded-md p-1 cursor-pointer">
                          <Pencil2Icon className="w-5 h-5 text-blue-400" />
                        </div>
                      </AlertEditProduct>

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
                                onClick={() =>
                                  props.deleteProduct(product.productId)
                                }
                              >
                                Xóa
                              </button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </AlertViewProduct>
            ))
          : null}
      </div>
    </div>
  );
}
