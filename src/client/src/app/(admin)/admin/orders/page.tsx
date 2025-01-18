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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const token = Cookies.get("accessTokenAdmin");
  const [orderResponse, setOrderResponse] = useState<OrderResponse>();
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const [limit, setLimit] = useState(7);
  const [skip, setSkip] = useState(0);

  const fetchOrders = async () => {
    if (!token) {
      CustomToast.showError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
      return;
    }
    try {
      const res = await OrderApi.GetOrders(
        token,
        limit,
        skip,
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

  //// Pagination handlers
  const handlePaginationPrevious = () => {
    if (skip > 0) {
      setSkip(skip - 1);
    }
  };

  const handlePaginationNext = () => {
    if (!orderResponse) {
      return;
    }
    if (Math.ceil(orderResponse?.total % orderResponse?.limit) > skip) {
      setSkip(skip + 1);
    }
  };

  const handlePaginationItem = (page: number) => {
    setSkip(page);
  };

  useEffect(() => {
    fetchOrders();
  }, [filterStatus, filters, limit, skip]);

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
          <div className="flex justify-center items-center mt-5">
            <Select
              onValueChange={(value: string) => {
                setLimit(parseInt(value));
                setSkip(0);
              }}
              defaultValue={`${limit.toString()}`}
            >
              <SelectTrigger className="w-[60px] border border-gray-300">
                <SelectValue placeholder="7" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="14">14</SelectItem>
                <SelectItem value="21">21</SelectItem>
              </SelectContent>
            </Select>
            <div>
              <Pagination>
                <PaginationContent className=" rounded-xl">
                  <PaginationItem
                    className="cursor-pointer"
                    onClick={handlePaginationPrevious}
                  >
                    <PaginationPrevious />
                  </PaginationItem>
                  <RenderPaginationItems
                    total={orderResponse?.total || 0}
                    limit={orderResponse?.limit ?? 0}
                    skip={orderResponse?.skip ?? 0}
                    handlePaginationItem={handlePaginationItem}
                  />

                  <PaginationItem className="cursor-pointer">
                    <PaginationNext onClick={handlePaginationNext} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
