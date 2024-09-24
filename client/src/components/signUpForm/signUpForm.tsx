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
import { CreateCustomer } from "@/validations/customer.chema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCustomer>({
    mode: "onBlur",
    resolver: zodResolver(CreateCustomer), // Sử dụng zodResolver với schema CreateCustomer
  });

  const onSubmit = (data: CreateCustomer) => {
    // console.log("Form Data:adjshjhk");
    console.log("Form Data:", data);
    // Xử lý dữ liệu khi form hợp lệ, ví dụ gửi lên server
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Đăng ký</CardTitle>
        <CardDescription>
          {/* Enter your information to create an account */}
          Nhập thông tin của bạn để tạo tài khoản.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Họ và tên</Label>
              <Input {...register('fullName')} id="first-name" placeholder="Max" required />
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Họ</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div>
          </div> */}
          <div className="">
            <Label htmlFor="first-name">Họ và tên</Label>
            <Input
              {...register("fullName")}
              id="first-name"
              placeholder="Nguyễn Văn A"
              required
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="">
            <Label htmlFor="phoneNumber">Số điện thoại</Label>
            <Input
              {...register("phoneNumber")}
              id="phoneNumber"
              placeholder="0932838278"
              required
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="">
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              {...register("address")}
              id="address"
              placeholder="Nguyễn Văn A"
              required
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>
          <div className="">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input {...register("password")} id="password" type="password" required />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          {/* <div className="grid gap-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input id="password" type="password" />
          </div> */}
          <Button type="submit" className="w-full">
            Tạo tài khoản
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with GitHub
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Đã có tài khoản?{" "}
          <Link href="/login" className="underline">
            Đăng nhập
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
