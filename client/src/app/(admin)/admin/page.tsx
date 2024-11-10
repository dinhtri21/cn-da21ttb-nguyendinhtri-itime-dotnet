"use client";
import React from "react";
import NavDashboard from "./_components/navDashboard";
import HeaderAdmin from "./_components/headerAdmin";
import { FcPaid } from "react-icons/fc";
import Analytics from "./_components/analytics";
import { Chart } from "./_components/chart";

export default function AdminPage() {
  return (
    <div className="w-full bg-gray-100/70 dark:bg-background relative">
      <div
        className="w-full min-h-screen max-w-screen-2xl mx-auto  dark:bg-background
        relative sm:pl-[90px] sm:pr-6 "
      >
        {/* <NavDashboard /> */}
        <div className="flex flex-col">
          {/* <HeaderAdmin /> */}
          <div className="flex flex-col gap-6">
            <Analytics />
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
}
