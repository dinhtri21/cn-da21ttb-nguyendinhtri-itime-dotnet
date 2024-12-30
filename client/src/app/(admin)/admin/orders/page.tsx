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
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});

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
        parseInt(params.get("limit") || "7"),
        parseInt(params.get("skip") || "0"),
        filterStatus || undefined,
        filters || undefined
      );
      setOrders(res.orders);
      setOrderResponse(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (id: number) => {
    if (!token) {
      CustomToast.showError("Bạn chưa đăng nhập!");
      return;
    }
    try {
      await OrderApi.DeleteOrder(token, id);
      CustomToast.showSuccess("Huỷ đơn hàng thành công!");
      fetchOrders();
    } catch (error: any) {
      console.error("Failed to delete order:", error.response.data.message);
      CustomToast.showError(error.response.data.message);
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
  }, [searchParams, filterStatus, filters]);

  return (
    <div className="w-full dark:bg-muted/40 relative">
      <div
        className="w-full mx-auto  dark:bg-background
          relative sm:pl-[220px] sm:pr-6 pb-6"
      >
        <OrderList
          orders={orders}
          setFilterStatus={setFilterStatus}
          setFilters={setFilters}
          deleteOrder={deleteOrder}
        />
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
