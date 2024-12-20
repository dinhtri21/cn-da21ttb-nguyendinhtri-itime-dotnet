import Image from "next/image";
import { ModeToggle } from "../ui/mode-toggle";
import {
  PersonIcon,
  ArchiveIcon,
  HamburgerMenuIcon,
  ChevronRightIcon,
  DividerVerticalIcon,
  GearIcon,
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

export default function Header() {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user);
  const cartItemsCount = useSelector((state: RootState) => state.cartItemCount);

  return (
    <header className="w-full border-b-[0.8px] mx-auto fixed z-40 bg-background top-0 ">
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center p-4 ">
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
                  <span className="text-primaryColor">Trang chủ </span>
                  <ChevronRightIcon width={20} height={20} />
                </Link>
                <Link
                  className="py-2 flex items-center gap-3 px-1 md:px-4"
                  href="/products"
                >
                  <span className="text-primaryColor">Sản phẩm </span>
                  <ChevronRightIcon width={20} height={20} />
                </Link>
                <Link
                  className="py-2 flex items-center gap-3 px-1 md:px-4"
                  href="/about"
                >
                  <span className="text-primaryColor">Giới thiệu </span>
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
              width={90}
              height={100}
            />
          </Link>
          <Link href="/">
            <Image
              className="block dark:hidden"
              alt="Next.js Streaming"
              src={"/logo/logo-dark2.svg"}
              width={90}
              height={100}
            />
          </Link>
        </div>
        <nav className="hidden md:flex justify-center space-x-3 md:space-x-4 uppercase font-medium text-base">
          <Link
            className={`py-2 px-1 md:px-4 hover:text-slate-400 relative ${
              pathname === "/" ? "text-slate-400" : ""
            }`}
            href="/"
          >
            <span>Trang chủ</span>
            <div
              className={`${
                pathname === "/" ? "block" : "hidden"
              } w-[100px] left-[12px] top-[54px] h-[2px] bg-gray-300 absolute`}
            ></div>
          </Link>
          <Link
            className={`py-2 px-1 md:px-4 hover:text-slate-400 relative ${
              pathname.startsWith("/products") ? "text-slate-400" : "text-slate-700"
            }`}
            href="/products"
          >
            <span>Sản phẩm</span>
            <div
              className={`${
                pathname.startsWith("/products") ? "block" : "hidden"
              } w-[88px] left-[13px] top-[54px] h-[2px] bg-gray-300 absolute`}
            ></div>
          </Link>
          <Link
            className={`py-2 px-1 md:px-4 hover:text-slate-400 relative ${
              pathname.startsWith("/about") ? "text-slate-400" : "text-slate-700"
            }`}
            href="/about"
          >
            <span>Giới thiệu</span>
            <div
              className={`${
                pathname.startsWith("/about") ? "block" : "hidden"
              } w-[90px] left-[12px] top-[54px] h-[2px] bg-gray-300 absolute`}
            ></div>
          </Link>
        </nav>
        <div className="user-actions flex justify-end items-center gap-5">
          <div className="md:hidden flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <PersonIcon width={20} height={20} />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link
                    className={`${
                      pathname.startsWith("/register") ? "text-slate-400" : ""
                    }
                     hover:text-slate-400`}
                    href={`/register`}
                  >
                    Đăng ký
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className={`${
                      pathname.startsWith("/login") ? "text-slate-400" : ""
                    } hover:text-slate-400`}
                    href={`/login`}
                  >
                    Đăng nhập
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden md:flex gap-2">
            {user.fullName ? (
              <Link
                className={`${
                  pathname.startsWith("/user") ? "text-slate-400" : ""
                }
                   hover:text-slate-400 flex gap-2 items-center`}
                href={`/user`}
              >
                <PersonIcon width={20} height={20} />
                {user.fullName}
              </Link>
            ) : (
              <div className="flex gap-2 items-center">
                <Link
                  className={`${
                    pathname.startsWith("/register") ? "text-slate-400" : ""
                  } hover:text-slate-400`}
                  href={`/register`}
                >
                  Đăng ký
                </Link>
                <div className="w-[1px] h-[20px] bg-slate-500"></div>
                <Link
                  className={`${
                    pathname.startsWith("/login") ? "text-slate-400" : ""
                  } hover:text-slate-400`}
                  href={`/login`}
                >
                  Đăng nhập
                </Link>
              </div>
            )}
          </div>
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
