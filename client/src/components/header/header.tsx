import Image from "next/image";
import logoDark from "../../assets/logo/logo-dart.svg";
import logoLight from "../../assets/logo/logo-light.svg";
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

export default function Header() {
  return (
    <header className="w-full border-b-[0.8px] mx-auto">
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center p-4">
        <div className="logo bg-background flex">
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
                  href="#"
                >
                  <span>Giới thiệu </span>
                  <ChevronRightIcon width={20} height={20} />
                </Link>
                <Link
                  className="py-2 flex items-center gap-3 px-1 md:px-4"
                  href="#"
                >
                  <span>Liên hệ </span>
                  <ChevronRightIcon width={20} height={20} />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <Image
            className="hidden dark:block"
            alt="Next.js Streaming"
            src={logoLight}
            width={100}
            height={100}
          />
          <Image
            className="block dark:hidden"
            alt="Next.js Streaming"
            src={logoDark}
            width={100}
            height={100}
          />
        </div>
        <nav className="hidden md:flex justify-center space-x-3 md:space-x-4 uppercase font-medium text-base">
          <Link className="py-2 px-1 md:px-4" href="/">
            Trang chủ
          </Link>
          <Link className="py-2 px-1 md:px-4" href="/products">
            Sản phẩm
          </Link>
          <Link className="py-2 px-1 md:px-4" href="#">
            Giới thiệu
          </Link>
          <Link className="py-2 px-1 md:px-4" href="#">
            Liên hệ
          </Link>
        </nav>
        <div className="user-actions flex justify-end items-center space-x-5">
          <Link href="/login">
            <PersonIcon width={20} height={20} />
          </Link>
          <Link href="#">
            <ArchiveIcon width={20} height={20} />
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
