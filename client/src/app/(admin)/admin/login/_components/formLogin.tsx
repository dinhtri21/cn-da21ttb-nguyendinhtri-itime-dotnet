"use client";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  EnterIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";

interface AdminFormLoginProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function AdminFormLogin({
  email,
  password,
  setEmail,
  setPassword,
  handleLogin,
}: AdminFormLoginProps) {
  return (
    <div
      className="bg-white/20 rounded-2xl shadow-lg shadow-black/10 backdrop-blur-sm border border-white/30
    px-6 py-8 min-w-[330px]"
    >
      <div className="flex justify-center">
        <Image src="/logo/logo-dark.svg" width={150} height={150} alt={""} />
      </div>
      <p className="text-sm mt-4 text-center text-gray-500">
        Vui lòng nhập thông tin đăng nhập !
      </p>
      <form className="mt-7" onSubmit={handleLogin}>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="flex items-center gap-2 text-gray-800"
          >
            <EnvelopeClosedIcon
              width={18}
              height={18}
              className="translate-y-px"
            />
            <p>Email</p>
          </label>
          <input
            placeholder="admin@gmal.com"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 bg-white/30 rounded-full px-4 py-1 focus:outline-none focus:ring-1 caret-sky-500 autofill:bg-white/30"
          />
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <label
            htmlFor="password"
            className="flex items-center gap-1 text-gray-800"
          >
            <LockClosedIcon width={18} height={18} className="translate-y-px" />
            <p>Mật khẩu</p>
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 bg-white/30 rounded-full px-4 py-1 focus:outline-none focus:ring-1 caret-sky-500"
            placeholder="#acb123"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 w-full mt-8 text-center font-medium bg-black text-white rounded-full hover:bg-slate-600 uppercase"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
