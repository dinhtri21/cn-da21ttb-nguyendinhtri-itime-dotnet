"use client";
import { Order, OrderResponse } from "@/types/order";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CustomToast from "@/components/react-toastify/reactToastify";
import OrderApi from "@/apis/orderApi";
import { OrderList } from "./_components/order-list";
import RenderPaginationItems from "@/components/paginationItemsCustom/paginationItemsCustom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { customerApi } from "@/apis/customerApi";

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const token = Cookies.get("accessTokenAdmin");
  const [orderResponse, setOrderResponse] = useState<OrderResponse>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const params = new URLSearchParams(searchParams.toString());

  const fetchOrders = async () => {
    if (!token) {
      CustomToast.showError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
      return;
    }
    try {
      const res = await OrderApi.GetOrders(
        token,
        parseInt(params.get("limit") || "6"),
        parseInt(params.get("skip") || "0")
      );
      setOrders(res.orders);
      setOrderResponse(res);
    } catch (error) {
      console.log(error);
    }
  };

 

  const updateURLWithFilters = (filters: Record<string, any>) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("skip", "5"); // Reset 0 nếu có thay đổi filters

    Object.keys(filters).forEach((key: string) => {
      // Nếu value có giá trị thì set vào URL
      if (filters[key]) {
        params.set(key, filters[key]);
      } else {
        params.delete(key); // Ngược lại xóa param query đó ra khỏi URL
      }
    });

    router.push(`${window.location.pathname}?${params.toString()}`); // => Push URL mới vào URL khi có thay đổi filters
  };

  const handlePaginationItem = (page: number) => {
    updateURLWithFilters({ skip: page });
  };

  useEffect(() => {
    fetchOrders();
  }, [searchParams]);

  return (
    <div className="w-full dark:bg-muted/40 bg-gray-100/70 relative">
      <div
        className="w-full min-h-screen max-w-screen-2xl mx-auto  dark:bg-background
          relative sm:pl-[90px] sm:pr-6 "
      >
        <OrderList orders={orders} />
        {orders && orders?.length !== 0 && (
          <div className="col-span-3 mt-5">
            <Pagination>
              <PaginationContent className=" rounded-xl">
                <PaginationItem
                  className="cursor-pointer"
                  // onClick={handlePaginationPrevious}
                >
                  <PaginationPrevious />
                </PaginationItem>
                <RenderPaginationItems
                  total={orderResponse?.total || 0}
                  limit={orderResponse?.limit ?? 0}
                  skip={parseInt(searchParams.get("skip") || "0")}
                  handlePaginationItem={handlePaginationItem}
                />

                <PaginationItem className="cursor-pointer">
                  <PaginationNext
                  // onClick={handlePaginationNext}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
