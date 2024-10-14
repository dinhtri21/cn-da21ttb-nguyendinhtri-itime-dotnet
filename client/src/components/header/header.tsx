import Image from "next/image";
import { ModeToggle } from "../ui/mode-toggle";
import {
  PersonIcon,
  ArchiveIcon,
  HamburgerMenuIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { Root } from "postcss";
import { RootState } from "@/redux/store/store";

export default function Header() {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user);
  const cartItemsCount = useSelector((state: RootState) => state.cartItemCount);

  // console.log(user);

  return (
    <header className="w-full border-b-[0.8px] mx-auto">
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center p-4">
        <div className="logo bg-background flex">
          {/* Reponsive nav */}
          <Sheet>
            <SheetTrigger>
              <HamburgerMenuIcon className="md:hidden" width={20} height={20} />
            </SheetTrigger>
            <SheetContent side={"left"}>
              <div className="flex flex-col font-semibold text-lg">
                <Link
                  className="py-2 flex items-center gap-3 px-1 md:px-4"
                  href="/"
                >
                  <span>Trang chủ </span>
                  <ChevronRightIcon width={20} height={20} />
                </Link>
                <Link
                  className="py-2 flex items-center gap-3 px-1 md:px-4"
                  href="/products"
                >
                  <span>Sản phẩm </span>
                  <ChevronRightIcon width={20} height={20} />
                </Link>
                <Link
                  className="py-2 flex items-center gap-3 px-1 md:px-4"
                  href="/about"
                >
                  <span>Giới thiệu </span>
                  <ChevronRightIcon width={20} height={20} />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          {/* Logo */}
          <Link href="/">
            <Image
              className="hidden dark:block"
              alt="Next.js Streaming"
              src={"/logo/logo-light.svg"}
              width={100}
              height={100}
            />
          </Link>
          <Link href="/">
            <Image
              className="block dark:hidden"
              alt="Next.js Streaming"
              src={"/logo/logo-dark.svg"}
              width={100}
              height={100}
            />
          </Link>
        </div>
        <nav className="hidden md:flex justify-center space-x-3 md:space-x-4 uppercase font-medium text-base">
          <Link
            className={`py-2 px-1 md:px-4 hover:text-slate-400 ${
              pathname === "/" ? "text-slate-400" : ""
            }`}
            href="/"
          >
            Trang chủ
          </Link>
          <Link
            className={`py-2 px-1 md:px-4 hover:text-slate-400 ${
              pathname.startsWith("/products") ? "text-slate-400" : ""
            }`}
            href="/products"
          >
            Sản phẩm
          </Link>
          <Link
            className={`py-2 px-1 md:px-4 hover:text-slate-400 ${
              pathname.startsWith("/about") ? "text-slate-400" : ""
            }`}
            href="/about"
          >
            Giới thiệu
          </Link>
        </nav>
        <div className="user-actions flex justify-end items-center space-x-5">
          <Link
            className={`hover:text-slate-400 flex gap-2 items-center ${
              pathname.startsWith("/login") ||
              pathname.startsWith("/register") ||
              pathname.startsWith("/user")
                ? "text-slate-400"
                : ""
            }`}
            href={`${user.customerId ? "/user" : "/login"}`}
          >
            <PersonIcon width={20} height={20} />
            {user.fullName ? user.fullName : null}
          </Link>
          <Link
            className={`hover:text-slate-400 ${
              pathname.startsWith("/cart") ? "text-slate-400" : ""
            } relative`}
            href="/cart"
          >
            <ArchiveIcon width={20} height={20} />
            <span
              className="  absolute top-[-10px] right-[-10px] bg-red-400
               h-5 w-5 flex items-center justify-center rounded-full text-white text-xs"
            >
              {cartItemsCount.total > 0 ? (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              ) : null}

              {cartItemsCount.total}
            </span>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
