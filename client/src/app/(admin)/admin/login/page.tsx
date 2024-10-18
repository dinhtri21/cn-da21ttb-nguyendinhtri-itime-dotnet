"use client";
import { useState } from "react";
import AdminFormLogin from "./_components/formLogin";
import Image from "next/image";
export default function AdminLoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Login success");
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
        />
      </div>
    </div>
  );
}
