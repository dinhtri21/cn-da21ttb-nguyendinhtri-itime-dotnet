"use client";

import Image from "next/image";
import { Progress } from "../ui/progress";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { CgSpinner } from "react-icons/cg";

export default function Overlay() {
  const overlayStatus = useSelector((state: RootState) => state.overlayStatus);
  useEffect(() => {
  }, [overlayStatus.status]);

  return (
    <div
      className={`bg-white bg-opacity-97 fixed top-0 left-0 w-full h-full flex flex-col gap-4 items-center justify-center z-50 ${
        overlayStatus.status ? "" : "hidden"
      }`}
    >
      <Image src="/logo/logo-dark.svg" width={200} height={200} alt="Logo" />
      {/* <Progress className="max-w-40 opacity-40 h-1" value={progress} /> */}
      <CgSpinner className="animate-spin text-4xl text-gray-500" />
      <p className="text-gray-500">Đang xử lý dữ liệu...</p>
    </div>
  );
}
