"use client";
import Image from "next/image";
import {
  GearIcon,
  CubeIcon,
  Cross1Icon,
  PlusIcon,
  MinusIcon,
} from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useState } from "react";
import { CartItemRes } from "@/validations/cartItem.chema";
import { Order } from "@/types/order";
import { RxDotFilled } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";
import { FcSurvey } from "react-icons/fc";
import { FcList } from "react-icons/fc";
import { ClockIcon, ReloadIcon } from "@radix-ui/react-icons";
import { FcShipped } from "react-icons/fc";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { BiReceipt } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import { CiDeliveryTruck } from "react-icons/ci";
import { TfiReceipt } from "react-icons/tfi";
import { CiReceipt } from "react-icons/ci";
import ComboboxFilter from "./combobox-filter";
import AlertAddProduct from "./alert-add-product";
import { Product } from "@/types/product";
import {
  DotsHorizontalIcon,
  TrashIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";

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

type ShippingStatus =
  | "waiting_to_return"
  | "ready_to_pick"
  | "picking"
  | "picked"
  | "storing"
  | "transporting"
  | "delivering"
  | "delivered"
  | "delivery_fail"
  | "waiting_to_return"
  | "return_transporting"
  | "return"
  | "returning"
  | "returned"
  | "return_fail"
  | "default";

const statusStyles: Record<
  ShippingStatus,
  { textColor: string; bgColor: string; content: string }
> = {
  ready_to_pick: {
    textColor: "text-violet-600",
    bgColor: "bg-violet-100",
    content: "Chuẩn bị hàng",
  },
  picking: {
    textColor: "text-violet-600",
    bgColor: "bg-violet-100",
    content: "Đang lấy hàng",
  },
  picked: {
    textColor: "text-violet-600",
    bgColor: "bg-violet-100",
    content: "Đang lấy hàng",
  },
  storing: {
    textColor: "text-violet-600",
    bgColor: "bg-violet-100",
    content: "Nhập bưu cục",
  },
  transporting: {
    textColor: "text-violet-600",
    bgColor: "bg-violet-100",
    content: "Đang trung chuyển",
  },
  delivering: {
    textColor: "text-blue-600",
    bgColor: "bg-blue-100",
    content: "Đang giao hàng",
  },
  delivered: {
    textColor: "text-green-600",
    bgColor: "bg-green-100",
    content: "Giao hàng thành công",
  },
  delivery_fail: {
    textColor: "text-red-600",
    bgColor: "bg-red-100",
    content: "Giao hàng thất bại",
  },
  waiting_to_return: {
    textColor: "text-yellow-600",
    bgColor: "bg-yellow-100",
    content: "Chờ xác nhận giao lại",
  },
  return: {
    textColor: "text-yellow-600",
    bgColor: "bg-yellow-100",
    content: "Chờ xác nhận giao lại",
  },
  returning: {
    textColor: "text-yellow-600",
    bgColor: "bg-yellow-100",
    content: "Đang hoàn hàng",
  },
  return_transporting: {
    textColor: "text-yellow-600",
    bgColor: "bg-yellow-100",
    content: "Đang trung chuyển hoàn hàng",
  },
  returned: {
    textColor: "text-yellow-600",
    bgColor: "bg-yellow-100",
    content: "Hoàn hàng thành công",
  },
  return_fail: {
    textColor: "text-red-600",
    bgColor: "bg-red-100",
    content: "Hoàn hàng thất bại",
  },
  default: {
    textColor: "text-gray-600",
    bgColor: "bg-gray-100",
    content: "Không xác định",
  },
};

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

interface DashboardProps {
  products: Product[];
  fetchProducts: () => void;
  deleteProduct: (id: number) => void;
}

export default function ProductList(props: DashboardProps) {
  const [open, setOpen] = useState<boolean>(false);

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

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <ComboboxFilter />
          <div className="flex items-center gap-2 border border-gray-300 px-3 py-1 hover:bg-slate-50 rounded-lg bg-white cursor-pointer text-gray-700">
            <button className="border-r border-gray-400 pr-2 ">
              <Image src="/icon/search.svg" width={16} height={16} alt="logo" />
            </button>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="outline-none caret-gray-400 text-gray-500"
            />
          </div>
        </div>
        <AlertAddProduct fetchProducts={props.fetchProducts}>
          <div className="flex items-center gap-1 border px-3 py-1 hover:bg-slate-800 rounded-lg bg-green-600  border-gray-400 cursor-pointer">
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
      <div className="mt-6 bg-background overflow-hidden min-h-[518px] border-t border-gray-300">
        <div className="hidden md:grid grid-cols-12 grid-flow-row rounded gap-2 px-3 p-4 border-b border-gray-300 ">
          <div className="col-span-1 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center">
            Ảnh
          </div>
          <div className="col-span-2 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            <span>Tên</span>
            {/* <ClockIcon className="" /> */}
          </div>
          <div className="col-span-1 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            <span>Giá</span>
            {/* <ReloadIcon className="" /> */}
          </div>
          <div className="col-span-1 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            Số lượng
          </div>
          <div className="col-span-2 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            Danh mục
          </div>
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
              <div
                key={index}
                className="grid grid-cols-12 grid-flow-row gap-2 px-3 p-4 border-b border-gray-300 text-black "
              >
                <div className="col-span-1 text-gray-900 font-[400] flex justify-center gap-1 items-center">
                  <Image
                    src={product?.imageUrls[0]}
                    width={60}
                    height={60}
                    alt="pic"
                    className="border rounded"
                  />
                </div>
                <div className="col-span-2 text-gray-900 font-[400]  text-sm flex justify-start gap-1 items-center ">
                  <span>{product.productName}</span>
                  {/* <ClockIcon className="" /> */}
                </div>
                <div className="col-span-1 text-gray-900 font-[400]  text-sm flex justify-center gap-1 items-center ">
                  <span>{product.productPrice.toLocaleString()} đ</span>
                  {/* <ReloadIcon className="" /> */}
                </div>
                <div className="col-span-1 text-gray-900 font-[400]  text-sm flex justify-center gap-1 items-center ">
                  <span>{product.quantityInStock}</span>
                </div>
                <div className="col-span-2 text-gray-900 font-[400]  text-sm flex justify-center gap-1 items-center ">
                  <div className="flex flex-col gap-1 ">
                    <div className="py-1 px-2 rounded-xl bg-green-100/70 font-[400] border border-green-200 text-green-400">
                      <span>Danh mục A</span>
                    </div>
                    {/* <div className="py-1 px-2 rounded-xl bg-blue-100/70 text-blue-400">
                      <span>Danh mục A</span>
                    </div> */}
                  </div>
                </div>
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
                  <div className="bg-sky-500 rounded-xl p-2 cursor-pointer">
                    <Pencil2Icon className="w-4 h-4 text-white" />
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <div className="bg-red-500 rounded-xl p-2 cursor-pointer">
                        <TrashIcon className="w-4 h-4 text-white" />
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
                            onClick={() => props.deleteProduct(product.productId)}
                          >
                            Xóa
                          </button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
