"use client";

import Image from "next/image";
import { Progress } from "../ui/progress";
import { useState, useEffect } from "react";

interface OverlayProps {
  isLoading: boolean;
}

export default function Overlay({ isLoading }: OverlayProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 90) return 95; // Dừng lại ở 90 khi đang kiểm tra
          return prevProgress + 5;
        });
      }, 20); // Tăng progress mỗi 100ms
      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [isLoading]);

  return (
    <div className="overlay bg-white bg-opacity-97 fixed top-0 left-0 w-full h-full flex flex-col gap-4 items-center justify-center z-50">
      <Image src="/logo/logo-dark.svg" width={200} height={200} alt="Logo" />
      <Progress className="max-w-40 opacity-40 h-1" value={progress} />
      <p className="text-gray-500">Đang xử lý dữ liệu...</p>
    </div>
  );
}
