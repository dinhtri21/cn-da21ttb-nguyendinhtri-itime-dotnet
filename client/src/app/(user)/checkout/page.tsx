import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import CheckoutInfo from "./_components/checkout-info";
import CheckoutProducts from "./_components/checkout-products";
export default function CheckOutPage() {
  return (
    <div className="bg-muted/40 min-h-[calc(100vh-300px)] pt-4 pb-10">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="pb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Thanh toán</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-col md:flex-row md:gap-10">
          <CheckoutInfo />
          <CheckoutProducts />
        </div>
      </div>
    </div>
  );
}
