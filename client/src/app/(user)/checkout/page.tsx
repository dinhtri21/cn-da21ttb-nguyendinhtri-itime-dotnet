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
import OrderApi from "@/apis/orderApi";
import CustomToast from "@/components/react-toastify/reactToastify";

type PaymentMethod =
  | {
      id: 1;
      name: "Credit Card";
    }
  | {
      id: 2;
      name: "COD";
    };

export default function CheckOutPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>({ id: 1, name: "Credit Card" });

  const customer = useSelector((state: RootState) => state.user);
  const token = Cookies.get("token");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderNote, setOrderNote] = useState("");

  const fetchCartItems = async () => {
    try {
      if (customer.customerId && token) {
        const data = await CartItemApi.getCartItems(token, customer.customerId);
        setCartItems(data);
      } else {
        console.error("User id is invalid");
      }
    } catch (error) {
      console.error("Lấy data cart Item thất bại", error);
    }
  };

  const handleCreateOrder = async () => {
    try {
      if (cartItems.length === 0) {
        CustomToast.showError("Giỏ hàng của bạn đang trống!");
        return;
      }
      if (customer.customerId && token) {
        const res = await OrderApi.CreateOrder(token, {
          customerId: customer.customerId,
          orderNote: orderNote,
          paymentId: selectedPaymentMethod.id,
          orderDetails: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        });
        CustomToast.showSuccess("Đơn hàng của bạn đã được tạo thành công!");
      } else {
        CustomToast.showError("Vui lòng đăng nhập để tạo đơn hàng!");
      }
    } catch (error) {
      CustomToast.showError("Tạo đơn hàng thất bại!");
      console.error("Tạo Order thất bại:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [customer]);

  return (
    <div className="dark:bg-muted/40  min-h-[calc(100vh-300px)] pt-4 pb-10">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="pb-4">
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
        <div className="flex flex-col md:flex-row md:gap-8">
          <CheckoutInfo
            countCartItems={cartItems.length}
            customer={customer}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            orderNote={orderNote}
            setOrderNote={setOrderNote}
          />
          <CheckoutProducts
            handleCreateOrder={handleCreateOrder}
            cartItems={cartItems}
          />
        </div>
      </div>
    </div>
  );
}
