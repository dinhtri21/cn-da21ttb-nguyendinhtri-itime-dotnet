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
import HeaderAdmin from "./(admin)/admin/_components/headerAdmin";
import NavDashboard from "./(admin)/admin/_components/navDashboard";

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
  const isLoginAdmin = pathname === "/admin/login";
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
          {isAdmin && !isLoginAdmin ? <HeaderAdmin /> : null}
          {!isAdmin ? <Header /> : null}
          {isAdmin && !isLoginAdmin ? <NavDashboard /> : null}
          <CustomRouter>{children}</CustomRouter>
          {isAdmin ? null : <Footer />} 
        </TooltipProvider>
      </Provider>
    </>
  );
}
