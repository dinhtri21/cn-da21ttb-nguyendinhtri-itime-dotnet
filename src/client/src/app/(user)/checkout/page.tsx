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
import { CustomerAddress } from "@/types/customeraddress";
import { useDispatch } from "react-redux";
import { setCartItemCount } from "@/redux/slices/cartItemsSlice";
import { CgSpinnerTwo } from "react-icons/cg";

type PaymentMethod =
  | {
      id: 1;
      name: "Credit Card";
    }
  | {
      id: 2;
      name: "COD";
    };

type LeadTime = {
  leadtime: number;
  fromEstimateDate: string;
  toEstimateDate: string;
}

export default function CheckOutPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>({ id: 2, name: "COD" });

  const [selectedAddress, setSelectedAddress] =
    useState<CustomerAddress | null>(null);

  const [shippingFee, setShippingFee] = useState<number>(0);
  const [leadTime, setLeadTime] = useState<LeadTime | null>(null);

  const customer = useSelector((state: RootState) => state.user);
  const token = Cookies.get("token");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderNote, setOrderNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateCartItemsCount = async (customerId: number) => {
    try {
      const res = await CartItemApi.getCartItemsCount(token ?? "", customerId);
      dispatch(setCartItemCount(res.data.cartItemsCount));
    } catch (error) {
      console.error("Failed to fetch cart items count:", error);
    }
  };

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
    setIsLoading(true);
    try {
      if (cartItems.length === 0) {
        CustomToast.showError("Giỏ hàng của bạn đang trống!");
        return;
      }
      if (!selectedAddress) {
        CustomToast.showError("Vui lòng chọn địa chỉ giao hàng!");
        return;
      }
      if (customer.customerId && token) {
        const res = await OrderApi.CreateOrder(token, {
          customerId: customer.customerId,
          paymentId: selectedPaymentMethod.id,
          customerAddressId: selectedAddress.addressId,
          orderDetails: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        });
        CustomToast.showSuccess("Đơn hàng của bạn đã được tạo thành công!");
        fetchCartItems();
        handleUpdateCartItemsCount(customer.customerId);
      } else {
        CustomToast.showError("Vui lòng đăng nhập để tạo đơn hàng!");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response?.data) {
        CustomToast.showError(error.response.data.message);
      }
      CustomToast.showError("Tạo đơn hàng thất bại!");
      console.error("Tạo Order thất bại:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [customer]);

  return (
    <div className="dark:bg-muted/40 min-h-[calc(100vh-300px)] pt-6 pb-10 mt-[73px]">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="pb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-500">Thanh toán</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-col md:flex-row md:gap-10">
          <CheckoutInfo
            countCartItems={cartItems.length}
            customer={customer}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            orderNote={orderNote}
            setOrderNote={setOrderNote}
            shippingFee={shippingFee}
            setShippingFee={setShippingFee}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            leadTime={leadTime}
            setLeadTime={setLeadTime}
          />
          <CheckoutProducts
            handleCreateOrder={handleCreateOrder}
            cartItems={cartItems}
            shippingFee={shippingFee}
            setShippingFee={setShippingFee}
            loading={isLoading}
            setLoading={setIsLoading}
          />
        </div>
      </div>
    </div>
  );
}
