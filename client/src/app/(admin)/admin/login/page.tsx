"use client";
import { useState } from "react";
import AdminFormLogin from "./_components/formLogin";
import Image from "next/image";
import AdminApi from "@/apis/adminApi";
import CustomToast from "@/components/react-toastify/reactToastify";
import { useDispatch } from "react-redux";
import { setAdmin } from "@/redux/slices/adminSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AdminLoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (!email || !password) {
      CustomToast.showError("Vui lòng nhập đầy đủ thông tin đăng nhập !");
    }
    try {
      const res = await AdminApi.loginAdmin(email, password);
      Cookies.set("accessTokenAdmin", res.accessToken);
      Cookies.set("adminId", res.admin.adminId.toString());
      dispatch(setAdmin(res.admin));
      CustomToast.showSuccess("Đăng nhập thành công !");
      router.push("/admin");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[url('/img/bg-login.jpg')] w-full h-screen bg-no-repeat bg-cover bg-center">
      <div className="flex items-center h-screen justify-center ">
        <AdminFormLogin
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleLogin={handleLogin}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
