"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomRouter from "./customRouter";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Overlay from "@/components/overlay/overlay";

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const token = Cookies.get("token");
  const isRegisterPage = pathname === "/unknow";

  const isAdmin = pathname.includes("/admin");
  const isUserPage = pathname === "/user";
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (isUserPage && !token) {
      router.push("/login"); // Chuyển hướng nếu không có token
    } else {
      setIsChecking(false); // Kết thúc kiểm tra nếu token hợp lệ
    }
  }, [isUserPage]);

  if (isChecking && isUserPage) {
    return <Overlay />;
  }

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
          {!isAdmin && <Header />} {/* Ẩn header nếu là /register */}
          <CustomRouter>{children}</CustomRouter>
          {!isAdmin && <Footer />} {/* Ẩn footer nếu là /register */}
        </TooltipProvider>
      </Provider>
    </>
  );
}
