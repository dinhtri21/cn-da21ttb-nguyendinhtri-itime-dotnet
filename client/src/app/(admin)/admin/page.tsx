"use client";
import React from "react";
import NavDashboard from "./_components/navDashboard";
import HeaderAdmin from "./_components/headerAdmin";
import { FcPaid } from "react-icons/fc";
import Analytics from "./_components/analytics";
import { Chart } from "./_components/chart";

export default function AdminPage() {
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
            <Analytics />
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
}
