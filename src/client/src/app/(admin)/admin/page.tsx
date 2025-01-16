"use client";
import React, { useEffect } from "react";
import Analytics from "./_components/analytics";
import { Chart } from "./_components/chart";
import Cookies from "js-cookie";
import statisticsApi from "@/apis/statisticsApi";
import { StatisticOrderRevenuesRes } from "@/types/statistics";

interface ChartData {
  day: string;
  name: number;
}

export default function AdminPage() {
  const [selectedMonth, setSelectedMonth] = React.useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = React.useState<number>(
    new Date().getFullYear()
  );
  const [chartData, setChartData] = React.useState<ChartData[]>([]);
  const [orderRevenuesRes, setOrderRevenuesRes] =
    React.useState<StatisticOrderRevenuesRes | null>(null);
  const adminToken = Cookies.get("accessTokenAdmin");

  const fetchGetOrderRevenue = async () => {
    if (!adminToken) {
      console.error("Vui lòng đăng nhập");
      return;
    }
    try {
      const data = await statisticsApi.getOrderRevenue(
        adminToken,
        selectedYear,
        selectedMonth == 0 ? undefined : selectedMonth
      );

      setOrderRevenuesRes(data);
      if (data.dailyData) {
        const chartData = data.dailyData.map((revenue) => {
          return {
            day: revenue.date.toString(),
            name: revenue.revenue,
          };
        });
        setChartData(chartData);
      }

      if (data.monthlyData) {
        const chartData = data.monthlyData.map((revenue) => {
          return {
            day: revenue.month.toString(),
            name: revenue.revenue,
          };
        });
        setChartData(chartData);
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        console.error("Phiên đăng nhập đã hết hạn!");
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchGetOrderRevenue();
  }, [selectedMonth, selectedYear]);

  return (
    <div className="w-full dark:bg-background relative bg-white">
      <div
        className="w-full min-h-screen  mx-auto dark:bg-background
        relative sm:pl-[220px] sm:pr-8 "
      >
        {/* <NavDashboard /> */}
        <div className="flex flex-col">
          {/* <HeaderAdmin /> */}
          <div className="flex flex-col gap-6">
            <Analytics
              orderRevenuesRes={orderRevenuesRes}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
            />
            <Chart
              chartData={chartData}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              setSelectedMonth={setSelectedMonth}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
