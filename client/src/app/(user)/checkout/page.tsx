"use client";
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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { CartItemApi } from "@/apis/cartItemAPi";
import Cookies from "js-cookie";
import { CartItem } from "@/types/cartItem";

type PaymentMethod = "cod" | "card" | "momo" | "zalopay";

export default function CheckOutPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>("cod");
  const customer = useSelector((state: RootState) => state.user);
  const token = Cookies.get("token");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCartItems = async () => {
    try {
      if (customer.customerId && token) {
        const data = await CartItemApi.getCartItems(token, customer.customerId);
        setCartItems(data);
      } else {
        console.error("User id is invalid");
      }
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [customer]);

  return (
    <div className="bg-muted/40 min-h-[calc(100vh-300px)] pt-5 pb-10">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="pb-3">
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
          <CheckoutInfo
            customer={customer}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />
          <CheckoutProducts cartItems={cartItems} />
        </div>
      </div>
    </div>
  );
}
