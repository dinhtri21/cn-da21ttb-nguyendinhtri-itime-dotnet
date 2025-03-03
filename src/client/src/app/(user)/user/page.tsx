"use client";
import { Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import OrderApi from "@/apis/orderApi";
import { Order, OrderResponse } from "@/types/order";
import { RootState } from "@/redux/store/store";
import InfoCustomer from "./_components/info-customer";
import { OrderList } from "@/app/(user)/user/_components/order-list";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import RenderPaginationItems from "@/components/paginationItemsCustom/paginationItemsCustom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function UserPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserPage />
    </Suspense>
  );
}

function UserPage() {
  const customer = useSelector((state: RootState) => state.user);
  const token = Cookies.get("token");
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderResponse, setOrderResponse] = useState<OrderResponse>();
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      if (customer.customerId && token) {
        const params = new URLSearchParams(window.location.search);
        const limit = parseInt(params.get("limit") || "5");
        const skip = parseInt(params.get("skip") || "0");

        const data = await OrderApi.GetOrdersByCustomerId(
          token,
          customer.customerId,
          limit,
          skip,
          filterStatus || undefined
        );
        setOrders(data.orders);
        setOrderResponse(data);
      } else {
        console.error("User id is invalid");
      }
    } catch (error) {
      console.error("Lấy data order thất bại", error);
    }
  };

  const updateURLWithFilters = (filters: Record<string, any>) => {
    const params = new URLSearchParams(window.location.search);

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params.set(key, filters[key]);
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`);
  };

  const handlePaginationItem = (page: number) => {
    const newSkip = page * (orderResponse?.limit ?? 5);
    updateURLWithFilters({ skip: newSkip.toString() });
  };

  useEffect(() => {
    fetchOrders();
  }, [customer, filterStatus]);

  return (
    <div className="dark:bg-muted/40 min-h-[calc(100vh-300px)] pt-4 md:pt-7 pb-12 mt-[73px]">
      <div className="w-full max-w-screen-xl mx-auto px-4 pb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="text-base">
              <BreadcrumbLink className="text-sm md:text-base" href="/">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-sm md:text-base text-gray-500">Người dùng</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <InfoCustomer />
      <OrderList orders={orders} setFilterStatus={setFilterStatus} />
      {orders && orders?.length !== 0 && (
        <div className="col-span-3 mt-5">
          <Pagination>
            <PaginationContent className="rounded-xl">
              <PaginationItem>
                <PaginationPrevious />
              </PaginationItem>
              <RenderPaginationItems
                total={orderResponse?.total || 0}
                limit={orderResponse?.limit ?? 0}
                skip={parseInt(new URLSearchParams(window.location.search).get("skip") || "0")}
                handlePaginationItem={handlePaginationItem}
              />
              <PaginationItem>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
