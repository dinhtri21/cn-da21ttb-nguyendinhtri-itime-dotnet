"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomRouter from "./customRouter";
import React from "react";
import { ToastContainer } from "react-toastify";

// CustomLayout để quản lý việc có hiển thị Header và Footer hay không
export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const isRegisterPage = pathname === "/unknow"; // Kiểm tra xem có phải trang /register không

  return (
    <>
      <Provider store={store}>
        <TooltipProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {!isRegisterPage && <Header />} {/* Ẩn header nếu là /register */}
          <CustomRouter>{children}</CustomRouter>
          {!isRegisterPage && <Footer />} {/* Ẩn footer nếu là /register */}
        </TooltipProvider>
      </Provider>
    </>
  );
}
