import { useEffect } from "react";
import { RootState } from "../redux/store/store";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { customerApi } from "@/apis/customerApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { useRouter, usePathname } from "next/navigation";

export default function CustomerRouter({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: RootState) => state.user);
  const userIdCookie = Cookies.get("userId");
  const tokenCookie = Cookies.get("token");
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const getInfoUser = async (userId: string, token: string) => {
    try {
      const data = await customerApi.GetCustomerById(userId, token);
      dispatch(
        setUser({
          id: data.customerId,
          email: data.email,
          name: data.fullName,
        })
      );
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };
  useEffect(() => {
    if (!user.id && userIdCookie && tokenCookie) {
      getInfoUser(userIdCookie, tokenCookie);
      // Nếu đang ở trang /login thì chuyển hướng đến /user
      if (pathname === "/login") {
        router.push("/user");
      }
    }
  }, []);
  return <>{children}</>;
}
