import { TableProduct } from "./_components/TableProduct";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CartPage() {
  return (
    <div className="w-full  dark:bg-muted/40">
      <div className="max-w-screen-xl mx-auto pt-5 pb-10 px-4 mt-[72px]">
        <div className="mt-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-500">
                  Giỏ hàng
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <TableProduct />
        </div>
      </div>
    </div>
  );
}
