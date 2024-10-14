"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { customerApi } from "@/apis/customerApi";
import { useToast } from "@/hooks/use-toast";
import { SymbolIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { setCartItemCount } from "@/redux/slices/cartItemsSlide";

import customToast from "@/components/react-toastify/reactToastify";
import { CartItemApi } from "@/apis/cartItemAPi";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export function LoginForm() {
  const toast = useToast();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await customerApi.LoginCustomer({ email, password });
      // Lưu thông tin user vào Cookie
      Cookies.set("userId", res.customer.customerId.toString(), { expires: 1 });
      Cookies.set("token", res.token, { expires: 1 });
      // Lấy số lượng sản phẩm trong giỏ hàng
      handleUpdateCartItemsCount(res.customer.customerId, res.token);
      // Lưu thông tin user vào Redux
      dispatch(
        setUser({
          customerId: res.customer.customerId,
          email: res.customer.email,
          fullName: res.customer.fullName,
          phoneNumber: res.customer.phoneNumber,
          address: res.customer.address,
        })
      );

      customToast.showSuccess("Đăng nhập thành công !");
      router.push("/user");
      // window.location.href = "/user";
    } catch (error) {
      customToast.showError("Đăng nhập thất bại !");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCartItemsCount = async (
    customerId: number,
    token: string
  ) => {
    try {
      const res = await CartItemApi.getCartItemsCount(
        token ?? "",
        customerId
      );
      dispatch(setCartItemCount(res.data.cartItemsCount));
    } catch (error) {
      console.error("Failed to fetch cart items count:", error);
    }
  };

  const submitFormLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Chặn hành vi submit mặc định của form
    handleLogin();
    // Xác thực dữ liệu nhập vào
    // try {
    //   const validatedData = LoginCustomer.parse({ email, password });
    //   console.log(validatedData);
    // } catch (error) {
    //   if (error instanceof z.ZodError) {
    //     console.error(error.errors[0].message); // Lỗi xác thực
    //   }
    // }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Đăng nhập</CardTitle>
        <CardDescription>
          {/* Enter your email below to login to your account */}
          Nhập email bạn đã đăng ký để đăng nhập vào tài khoản của bạn.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitFormLogin}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mật khẩu</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {isLoading ? (
                <SymbolIcon className="animate-spin" width={20} height={20} />
              ) : (
                "Đăng nhập"
              )}
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="underline">
              Đăng ký
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
