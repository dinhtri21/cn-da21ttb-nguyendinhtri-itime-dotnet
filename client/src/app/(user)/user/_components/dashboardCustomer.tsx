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

import { ClockIcon, ReloadIcon } from "@radix-ui/react-icons";

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

interface DashboardProps {
  orders: Order[];
}
export function Dashboard(props: DashboardProps) {
  // Hàm định dạng ngày
  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Sử dụng định dạng 24 giờ
    };
    return dateObj.toLocaleDateString("vi-VN", options); // Định dạng theo ngôn ngữ Việt Nam
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 mt-4">
      <Tabs defaultValue="confirm">
        <TabsList className="border bg-white">
          {/* <TabsTrigger value="all">Tất cả</TabsTrigger> */}
          <TabsTrigger value="confirm">Chờ xác nhận</TabsTrigger>
          <TabsTrigger value="delivery">Chờ giao hàng</TabsTrigger>
          <TabsTrigger className="" value="history">
            Lịch sử
          </TabsTrigger>
          {/* <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger> */}
        </TabsList>
      </Tabs>
      <div className="border rounded-xl mt-4 bg-background overflow-hidden min-h-[344px]">
        <div className="hidden md:grid grid-cols-12 grid-flow-row rounded gap-2 px-3 p-4 border-b text-black">
          <div className="col-span-1 font-medium text-black/80 flex  justify-center">
            ID
          </div>
          <div className="col-span-3 font-medium text-black/80 flex justify-center gap-1 items-center uppercase">
            <span>Ngày đặt</span>
            <ClockIcon className="" />
          </div>
          <div className="col-span-2 font-medium text-black/80 flex justify-center gap-1 items-center uppercase">
            <span>Trạng thái</span>
            <ReloadIcon className="" />
          </div>
          <div className="col-span-3 font-medium text-black/80 flex justify-center gap-1 items-center uppercase">
            Tổng tiền
          </div>
          <div className="col-span-3 font-medium text-black/80 flex justify-center gap-1 items-center uppercase">
            Ghi chú
          </div>
        </div>
        {props.orders?.length > 0
          ? props.orders.map((order, index) => (
              <div
                key={index}
                className="grid grid-rows-2 md:grid-cols-12 grid-flow-col md:grid-flow-row gap-2 py-3 px-1 md:px-3 md:py-4 border-b relative bg-background"
              >
                <div
                  // onClick={() => handleDeleteCartItem(cartItem)}
                  className="absolute top-2 left-0 md:top-[50%] md:translate-y-[-50%] md:left-[96%] dark:bg-slate-800 bg-slate-100 rounded-full p-[5px]
               hover:bg-slate-400 hover:text-white cursor-pointer dark:hover:bg-slate-600"
                >
                  <Cross1Icon width={14} height={14} />
                </div>
                <div className="row-span-2 md:col-span-1 md:row-span-2 flex md:justify-center items-center overflow-hidden">
                  {order.orderId}
                </div>
                <div className="md:col-span-3 md:row-span-2 flex md:justify-center items-center ">
                  <span className="line-clamp-1 md:line-clamp-2 ">
                    {formatDate(order.orderDate)}
                  </span>
                </div>
                <div className="md:col-span-2 md:row-span-2 flex  md:justify-center items-center">
                  <div className="border border-yellow-600 px-3 rounded-md text-yellow-600">
                    {order.orderStatus}
                  </div>
                </div>
                <div className="md:col-span-3 md:row-span-2 flex  justify-center items-center ">
                  {order.total} đ
                </div>
                <div className="md:col-span-3 flex md:row-span-2  justify-center items-center">
                  {order.orderNote.length == 0 ? "Không" : order.orderNote}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
