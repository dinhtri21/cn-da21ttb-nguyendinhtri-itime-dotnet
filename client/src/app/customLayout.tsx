"use client"; 

import { usePathname } from "next/navigation";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

// CustomLayout để quản lý việc có hiển thị Header và Footer hay không
export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const isRegisterPage = pathname === "/unknow" ; // Kiểm tra xem có phải trang /register không

  return (
    <>
      {!isRegisterPage && <Header />} {/* Ẩn header nếu là /register */}
      {children}
      {!isRegisterPage && <Footer />} {/* Ẩn footer nếu là /register */}
    </>
  );
}