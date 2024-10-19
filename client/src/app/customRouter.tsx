import { useEffect } from "react";
import { RootState } from "../redux/store/store";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { customerApi } from "@/apis/customerApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { CartItemApi } from "@/apis/cartItemAPi";
import { setCartItemCount } from "@/redux/slices/cartItemsSlice";

export default function CustomerRouter({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: RootState) => state.user);
  const userIdCookie = Cookies.get("userId");
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const token = Cookies.get("token");

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
          address: data.address,
        })
      );
      handleUpdateCartItemsCount(data.customerId);
    } catch (error) {
      // console.error("Failed to fetch user:", error);
    }
  };
  useEffect(() => {
    if (!user.customerId && userIdCookie && token) {
      getInfoUser(userIdCookie, token);
      // Nếu đang ở trang /login thì chuyển hướng đến /user
      if (pathname === "/login") {
        router.push("/user");
      }
    }
  }, []);
  return <>{children}</>;
}
