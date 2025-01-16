"use client";
import Image from "next/image";
import {
  GearIcon,
  CubeIcon,
  Cross1Icon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

import React, { useState } from "react";
import { CartItemRes } from "@/validations/cartItem.chema";
import { Order } from "@/types/order";
import { RxDotFilled } from "react-icons/rx";

import AlertOrderDetail from "./alert-order-detail";
import ComboboxFilter, { frameworks } from "./combobox-filter";
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
    content: "Đã lấy hàng",
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

const shippingStatusFilter: frameworks[] = [
  {
    value: "null",
    label: "Trạng thái đơn hàng",
  },

  {
    value: "ready_to_pick",
    label: "Chuẩn bị hàng",
  },
  {
    value: "picking",
    label: "Đang lấy hàng",
  },
  {
    value: "picked",
    label: "Đã lấy hàng",
  },
  {
    value: "storing",
    label: "Nhập bưu cục",
  },
  {
    value: "transporting",
    label: "Đang trung chuyển",
  },
  {
    value: "delivering",
    label: "Đang giao hàng",
  },
  {
    value: "delivered",
    label: "Giao hàng thành công",
  },
  {
    value: "delivery_fail",
    label: "Giao hàng thất bại",
  },
  {
    value: "return_transporting",
    label: "Đang trung chuyển hoàn hàng",
  },
  {
    value: "return",
    label: "Chờ xác nhận giao lại",
  },
  {
    value: "returning",
    label: "Đang hoàn hàng",
  },
  {
    value: "returned",
    label: "Hoàn hàng thành công",
  },
  {
    value: "return_fail",
    label: "Hoàn hàng thất bại",
  },
  {
    value: "default",
    label: "Không xác định",
  },
  {
    value: "waiting_to_return",
    label: "Chờ xác nhận giao lại",
  },
];

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

interface DashboardProps {
  orders: Order[];
  setFilterStatus: React.Dispatch<React.SetStateAction<string | null>>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  deleteOrder: (id: number) => void;
}
export function OrderList(props: DashboardProps) {
  const [search, setSearch] = useState<string>("");
  // Hàm định dạng ngày
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
      props.setFilters({ orderId: `${search}` });
    } else {
      props.setFilters({});
    }
  };

  const handleKeyDownSearch = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Ngăn sự kiện lan ra ngoài
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between ">
        <div className="flex items-center gap-2 border border-gray-300 px-3 py-1 hover:bg-slate-50 rounded-lg bg-white cursor-pointer text-gray-700">
          <button
            onClick={handleSearch}
            className="border-r border-gray-400 pr-2 "
          >
            <Image src="/icon/search.svg" width={16} height={16} alt="logo" />
          </button>
          <input
            type="text"
            placeholder="Tìm theo mã đơn"
            className="outline-none caret-gray-400 text-gray-800"
            value={search}
            onKeyDown={handleKeyDownSearch}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {/* <ComboboxFilter
            frameworks={sortBy}
            // setFilterValueText={props.setFilterSortOrder}
          /> */}
          <ComboboxFilter
            frameworks={shippingStatusFilter}
            setFilterValueText={props.setFilterStatus}
          />
        </div>
      </div>

      <div className="mt-6 bg-background overflow-hidden min-h-[530px] border-t border-gray-300 ">
        <div className="hidden md:grid grid-cols-12 grid-flow-row gap-2 px-3 p-4 border-b border-gray-300 text-black ">
          <div className="col-span-1 text-gray-600 font-medium text-sm  flex  justify-center">
            ID
          </div>
          <div className="col-span-2 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            <span>Ngày giao</span>
            {/* <ClockIcon className="" /> */}
          </div>
          <div className="col-span-2 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            <span>Trạng thái</span>
            {/* <ReloadIcon className="" /> */}
          </div>
          <div className="col-span-2 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            Tổng tiền
          </div>
          <div className="col-span-1 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            Thanh toán
          </div>
          <div className="col-span-3 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            Địa chỉ nhận hàng
          </div>
          <div className="col-span-1 text-gray-600 font-medium text-sm flex justify-center gap-1 items-center ">
            Tuỳ chọn
          </div>
          {/* <div className="col-span-1 text-gray-500 text-sm flex justify-center gap-1 items-center ">
            Tuỳ chọn
          </div> */}
        </div>
        {props.orders?.length > 0
          ? props.orders.map((order, index) => (
              <AlertOrderDetail
                order={order}
                key={index}
                orderId={order.orderId}
              >
                <div
                  key={index}
                  className="grid grid-rows-2 md:grid-cols-12 grid-flow-col md:grid-flow-row gap-2 py-3 px-1 md:px-3 md:py-3 border-b border-gray-300 relative bg-background
                hover:bg-gray-100 cursor-pointer min-h-[73px] "
                >
                  <div className="row-span-2 md:col-span-1 md:row-span-2 flex md:justify-center items-center overflow-hidden">
                    <div className="flex flex-col text-gray-700 font-[400]">
                      <span>{order.orderId}</span>
                    </div>
                  </div>
                  <div className="md:col-span-2 md:row-span-2 flex md:justify-center items-center ">
                    <span className="line-clamp-1 md:line-clamp-2 text-gray-700 font-[400]">
                      <span className="line-clamp-1 md:line-clamp-2 text-gray-700 font-[400]">
                        {/* {formatDate(order.estimatedDeliveryTime)} */}
                        {order.estimatedDeliveryTime
                          ? order.estimatedDeliveryTime.slice(0, 10)
                          : ""}
                      </span>
                    </span>
                  </div>
                  <div className="md:col-span-2 md:row-span-2 flex  md:justify-center items-center">
                    <div
                      className={`${
                        statusStyles[
                          order.shippingStatus as keyof typeof statusStyles
                        ]?.bgColor || statusStyles.default.bgColor
                      }  ${
                        statusStyles[
                          order.shippingStatus as keyof typeof statusStyles
                        ]?.textColor || statusStyles.default.textColor
                      } flex items-center pr-3 pl-1 py-[2px] rounded-xl text-sm`}
                    >
                      <RxDotFilled />
                      <span className="text-sm">
                        {statusStyles[
                          order.shippingStatus as keyof typeof statusStyles
                        ]?.content || statusStyles.default.content}
                      </span>
                      {/* {statusTranslations[order.shippingStatus as ShippingStatus] || statusTranslations.default} */}
                    </div>
                  </div>
                  <div className="md:col-span-2 md:row-span-2 flex  justify-center items-center text-gray-600">
                    {(order.total + order.shippingFee).toLocaleString()} đ
                  </div>
                  <div className="md:col-span-1 md:row-span-2 flex  justify-center items-center ">
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-gray-600">COD</span>
                    </div>
                  </div>
                  <div className="md:col-span-3 flex md:row-span-2  justify-center items-center text-center text-gray-600">
                    {order.addressLine}
                  </div>
                  <div
                    onClick={handleInnerClick}
                    className="md:col-span-1 flex md:row-span-2  justify-center items-center text-center text-gray-600"
                  >
                    {order?.shippingStatus == "ready_to_pick" ||
                    order?.shippingStatus == "picking" ||
                    order?.shippingStatus == "money_collect_picking" ? (
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <div className="bg-red-100 rounded-md p-1 cursor-pointer text-white">
                            <TrashIcon className="w-5 h-5 text-red-400" />
                          </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Bạn có thật sự muốn huỷ đơn hàng này ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Sau khi huỷ, đơn hàng sẽ không thể khôi phục.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Đóng</AlertDialogCancel>
                            <AlertDialogAction>
                              <button
                                onClick={() => props.deleteOrder(order.orderId)}
                              >
                                Huỷ đơn
                              </button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <div className="bg-red-100 rounded-md p-1 cursor-pointer text-white">
                            <TrashIcon className="w-5 h-5 text-red-400" />
                          </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Không thể huỷ</AlertDialogTitle>
                            <AlertDialogDescription>
                              Đơn hàng sau khi bắt đầu vận chuyển không thể huỷ!
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Đóng</AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </AlertOrderDetail>
            ))
          : null}
      </div>
    </div>
  );
}
