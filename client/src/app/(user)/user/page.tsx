"use client";
import { Dashboard } from "@/app/(user)/user/_components/dashboardCustomer";
import NavigationCusomer from "@/app/(user)/user/_components/navigationCusomer";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import OrderApi from "@/apis/orderApi";
import { Order, OrderResponse } from "@/types/order";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
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

export default function UserPage() {
  const customer = useSelector((state: RootState) => state.user);
  const token = Cookies.get("token");
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderResponse, setOrderResponse] = useState<OrderResponse>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const params = new URLSearchParams(searchParams.toString());

  const fetchOrders = async () => {
    try {
      if (customer.customerId && token) {
        const data = await OrderApi.GetOrdersByCustomerId(
          token,
          customer.customerId,
          parseInt(params.get("limit") || "5"),
          parseInt(params.get("skip") || "0")
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
    const params = new URLSearchParams(searchParams.toString());

    params.set("skip", "0"); // Reset 0 nếu có thay đổi filters

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
  }, [customer, searchParams]);

  return (
    <div className="dark:bg-muted/40 min-h-[calc(100vh-300px)] pt-4 pb-10">
      <div className="w-full max-w-screen-xl mx-auto px-4 pb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Người dùng</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <NavigationCusomer />
      <Dashboard orders={orders} />
      {orders && orders?.length !== 0 && (
        <div className="col-span-3 mt-4">
          <Pagination>
            <PaginationContent>
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
  );
}
