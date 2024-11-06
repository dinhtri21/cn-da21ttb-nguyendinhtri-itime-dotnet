// appRouter.tsx
"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
import Cookies from "js-cookie";
import { customerApi } from "@/apis/customerApi";
import { setUser } from "@/redux/slices/userSlice";
import { useRouter, usePathname } from "next/navigation";
import { CartItemApi } from "@/apis/cartItemAPi";
import { setCartItemCount } from "@/redux/slices/cartItemsSlice";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastContainer } from "react-toastify";
import Overlay from "@/components/overlay/overlay";
import HeaderAdmin from "./(admin)/admin/_components/headerAdmin";
import NavDashboard from "./(admin)/admin/_components/navDashboard";
import { setOverlayStatus } from "@/redux/slices/overlayStatusSilde";

export default function AppRouter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const token = Cookies.get("token");
  const userIdCookie = Cookies.get("userId");
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const overlayStatus = useSelector((state: RootState) => state.overlayStatus);
  const isAdmin = pathname.includes("/admin");
  const isLoginAdmin = pathname === "/admin/login";
  const isUserPage = pathname === "/user";
  const isCheckoutPage = pathname.includes("/checkout");
  const isLoginPage = pathname === "/login";
  const [isChecking, setIsChecking] = useState(true);

  const handleUpdateCartItemsCount = async (customerId: number) => {
    try {
      const res = await CartItemApi.getCartItemsCount(token ?? "", customerId);
      dispatch(setCartItemCount(res.data.cartItemsCount));
    } catch (error) {
      console.error("Failed to fetch cart items count:", error);
    }
  };

  const getInfoUser = async (userId: string, token: string) => {
    try {
      const data = await customerApi.GetCustomerById(userId, token);
      dispatch(
        setUser({
          customerId: data.customerId,
          email: data.email,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
        })
      );
      handleUpdateCartItemsCount(data.customerId);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw error;
    }
  };

  const checkUserStatus = async () => {
    // Nếu đang ở trang user hoặc checkout mà chưa có token thì chuyển về trang login
    if ((isUserPage || isCheckoutPage || isLoginPage) && !token) {
      router.push("/login");
      const timeId = setTimeout(() => {
        dispatch(setOverlayStatus(false));
      }, 1000);
      return () => clearTimeout(timeId);
    }
    // Nếu ở bất kỳ trang nào mà có token thì lấy thông tin user
    if (!user.customerId && userIdCookie && token) {
      try {
        await getInfoUser(userIdCookie, token);
        // Trường hợp ở /login mà lấy thông tin thành công thì chuyển về trang user => đang đăng nhập
        // Nếu ở bất kỳ trang nào thì chỉ cần lấy thông tin user thành công để hiển thị header,...
        if (pathname === "/login") {
          router.push("/user");
        }
        dispatch(setOverlayStatus(false));
      } catch (error) {
        // Ở bất kỳ trang nào mà lấy thông tin user thất bại thì thôi không cần hiển thị header,...
        // Nếu ở trang user mà lấy thông tin user thất bại thì chuyển về trang login.
        //   Cookies.remove("token");
        //   Cookies.remove("userId");
        if (isUserPage || isCheckoutPage) {
          router.push("/login");
        }
        dispatch(setOverlayStatus(false));
      }
    }
  };
  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
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
      <Overlay />
      {isAdmin && !isLoginAdmin ? (
        <HeaderAdmin />
      ) : !isAdmin ? (
        <Header />
      ) : null}
      {isAdmin && !isLoginAdmin ? <NavDashboard /> : null}
      {children}
      {!isAdmin ? <Footer /> : null}
    </TooltipProvider>
  );
}
