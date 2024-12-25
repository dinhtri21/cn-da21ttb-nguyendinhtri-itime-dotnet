import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function NavDashboard() {
  const pathname = usePathname();
  return (
    <>
      <aside className="hidden bg-gray-600 z-50 fixed left-0 top-0 bottom-0  min-h-[calc(100vh-16px)]  flex-col border-1 sm:flex ">
        <nav className="flex flex-col items-start gap-4 px-6 py-4">
          <Link
            href="#"
            className={`group flex shrink-0 items-center justify-center gap-2 text-lg font-semibold text-primary-foreground md:text-base px-3 pb-1 pt-2`}
          >
            <img src="/logo/logo-light2.svg" alt="logo" className="" />
            <span className="sr-only">iTime</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin"
                className={`${
                  pathname == "/admin"
                    ? "bg-slate-500/50 text-dark dark:text-white"
                    : ""
                } flex gap-2 px-3 w-full py-2 text-white items-center justify-start rounded-lg transition-colors`}
              >
                <Home className="h-5 w-5" />
                <span className="">Trang chủ</span>
                <span className="sr-only">Trang chủ</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/orders"
                className={`${
                  pathname == "/admin/orders"
                    ? "bg-slate-500/50 text-dark dark:text-white"
                    : ""
                } flex gap-2 px-3 py-2 w-full text-white items-center justify-start rounded-lg transition-colors `}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="">Đơn hàng</span>
                <span className="sr-only">Orders</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Orders</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/products"
                className={`${
                  pathname == "/admin/products"
                    ? "bg-slate-500/50 text-dark dark:text-white"
                    : ""
                } flex gap-2 px-3 w-full py-2 text-white items-center justify-start rounded-lg transition-colors`}
              >
                <Package className="h-5 w-5" />
                <span className="">Sản phẩm</span>
                <span className="sr-only">Sản phẩm</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/customers"
                className={`${
                  pathname == "/admin/customers"
                    ? "bg-slate-500/50 text-dark dark:text-white"
                    : ""
                } flex gap-2 px-3 w-full py-2 text-white items-center justify-start rounded-lg transition-colors `}
              >
                <Users2 className="h-5 w-5" />
                <span className="">Khách hàng</span>
                <span className="sr-only">Khách hàng</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Customers</TooltipContent>
          </Tooltip>
         
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <Sheet>
        <SheetTrigger asChild className="absolute top-[22px]">
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Users2 className="h-5 w-5" />
              Customers
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
