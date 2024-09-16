import Image from "next/image";
import logoDark from "../../assets/logo/logo-dart.svg";
import logoLight from "../../assets/logo/logo-light.svg";
import { ModeToggle } from "../ui/mode-toggle";
import { PersonIcon, ArchiveIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b-[0.8px] mx-auto">
      <div className="container mx-auto max-w-screen-xl flex justify-between items-center p-4 bg-background text-foreground">
        <div className="logo bg-background">
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
        <nav className="flex justify-center space-x-3 md:space-x-4 uppercase font-medium text-base">
          <Link className="py-2 px-1 md:px-4" href="#">
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
          <Link href="#">
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
