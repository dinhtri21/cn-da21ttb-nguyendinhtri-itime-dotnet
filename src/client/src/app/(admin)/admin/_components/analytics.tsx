import { customerApi } from "@/apis/customerApi";
import OrderApi from "@/apis/orderApi";
import ProductApi from "@/apis/productApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { StatisticOrderRevenuesRes } from "@/types/statistics";

interface AnalyticsProps {
  selectedYear: number;
  selectedMonth: number;
  orderRevenuesRes: StatisticOrderRevenuesRes | null;
}

export default function Analytics(props: AnalyticsProps) {
  const [customersCount, setCustomersCount] = useState<number>(0);
  const [ordersCount, setOrdersCount] = useState<number>(0);
  const [productsCount, setProductsCount] = useState<number>(0);

  const token = Cookies.get("accessTokenAdmin");

  const fetchCustomersCount = async () => {
    if (!token) {
      console.error("Token is undefined");
      return;
    }
    try {
      const res = await customerApi.GetCustomersCount(token);
      setCustomersCount(res.totalCount);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrdersCount = async () => {
    if (!token) {
      console.error("Token is undefined");
      return;
    }
    try {
      const res = await OrderApi.GetOrdersCount(token);
      setOrdersCount(res.totalCount);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductsCount = async () => {
    if (!token) {
      console.error("Token is undefined");
      return;
    }
    try {
      const res = await ProductApi.getProductsCount(token);
      setProductsCount(res.totalCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomersCount();
    fetchOrdersCount();
    fetchProductsCount();
  }, [token]);
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card x-chunk="dashboard-01-chunk-0" className="border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium text-gray-700">
            Doanh thu
          </CardTitle>
          {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
          <img src="/icon/money.svg" alt="Dollar Sign" width={24} height={24} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {props?.orderRevenuesRes?.totalRevenue &&
              props.orderRevenuesRes?.totalRevenue.toLocaleString()}{" "}
            đ
          </div>
          <p className="text-xs text-muted-foreground">
            {props.selectedMonth !== 0 &&
              props.selectedYear &&
              "Tháng " + props.selectedMonth + " / " + props.selectedYear}

            {props.selectedMonth == 0 &&
              props.selectedYear &&
              "Năm " + props.selectedYear}
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-2" className="border ">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium  text-gray-700">
            Đơn hàng
          </CardTitle>
          {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
          <img src="/icon/cart.svg" alt="Dollar Sign" width={24} height={24} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {props?.orderRevenuesRes?.totalCount &&
              props.orderRevenuesRes?.totalCount}
          </div>
          <p className="text-xs text-muted-foreground">
            {props.selectedMonth !== 0 &&
              props.selectedYear &&
              "Tháng " + props.selectedMonth + " / " + props.selectedYear}
            {props.selectedMonth == 0 &&
              props.selectedYear &&
              "Năm " + props.selectedYear}
          </p>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-1" className="border ">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium  text-gray-700">
            Khách hàng
          </CardTitle>
          {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
          <img
            src="/icon/customer.svg"
            alt="Dollar Sign"
            width={24}
            height={24}
          />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{customersCount}</div>
          <p className="text-xs text-muted-foreground">trên hệ thống</p>
        </CardContent>
      </Card>

      <Card x-chunk="dashboard-01-chunk-3" className="border ">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium  text-gray-700">
            Sản phẩm
          </CardTitle>
          {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
          <img
            src="/icon/package.svg"
            alt="Dollar Sign"
            width={24}
            height={24}
          />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{productsCount}</div>
          <p className="text-xs text-muted-foreground">đang kinh doanh</p>
        </CardContent>
      </Card>
    </div>
  );
}
