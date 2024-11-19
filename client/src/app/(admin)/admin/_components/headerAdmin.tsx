import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Calendar } from "@/components/ui/calendar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { PersonIcon } from "@radix-ui/react-icons";
import { CalendarIcon } from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Console } from "console";

export default function HeaderAdmin() {
  const admin = useSelector((state: RootState) => state.admin);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const onClose = () => {
    setIsOpen(false);
  };

  const toggleCalendar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) // Kiểm tra xem có click vào popup hay không
      ) {
        onClose(); // Nếu không thì đóng popup
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleMouseDown); // Thêm sự kiện click vào document
    }

    return () => {
      document.removeEventListener("mousedown", handleMouseDown); // Xóa sự kiện click khi component bị unmount
    };
  }, [isOpen]);

  console.log(date?.getDay());
  return (
    <div className="w-full  dark:bg-background ">
      <div className="w-full max-w-screen-2xl bg-gray-100/70 mx-auto py-2 sm:pl-[90px] pl-[44px] sm:py-5 pr-6 flex items-center md:justify-between justify-end  dark:bg-background">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="sm:text-lg font-semibold"
                href="/admin"
              >
                Bảng điều khiển
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathname == "/admin/orders" ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="sm:text-lg font-semibold text-gray-700">
                    Đơn hàng
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : null}
            {pathname == "/admin/customers" ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="sm:text-lg font-semibold text-gray-700">
                    Khách hàng
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : null}
            {pathname == "/admin/products" ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="sm:text-lg font-semibold text-gray-700">
                    Sản phẩm
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : null}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex gap-2 items-center">
          <span className="text-base font-medium text-gray-600">
            {/* {admin ? admin.admin?.adminName : "Admin"} */}
          </span>
          <div className="rounded-full p-2 bg-background border dark:bg-background">
            <PersonIcon width={18} height={18} />
          </div>
          {/* <div className="flex items-center gap-1  border rounded-md py-[5px] px-2 bg-background">
            <span className="text-base font-normal">
              {admin ? admin.admin?.adminName : "Admin"}
            </span>

            <div className="dark:bg-background">
              <PersonIcon width={18} height={18} />
            </div>
          </div> */}
          <div className="flex gap-1 border rounded-md py-[5px] px-2 bg-background relative">
            {date
              ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
              : "N/A"}
            <CalendarIcon
              className="hover:text-slate-400 cursor-pointer"
              onClick={toggleCalendar}
              width={24}
              height={24}
            />
            {isOpen && (
              <div
                ref={popupRef}
                className="absolute right-0 top-[calc(100%+6px)]"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="bg-background  z-10 rounded-md border"
                />
              </div>
            )}
          </div>
          <ModeToggle className={"bg-background"} />
        </div>
      </div>
    </div>
  );
}
