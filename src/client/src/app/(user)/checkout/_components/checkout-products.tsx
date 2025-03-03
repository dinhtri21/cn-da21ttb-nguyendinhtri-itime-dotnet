"use client";
import { CartItemRes } from "@/validations/cartItem.chema";
import { Cross1Icon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import { CartItem } from "@/types/cartItem";
import { BsBox2 } from "react-icons/bs";

import { CgSpinner } from "react-icons/cg";

interface CheckoutProductsProps {
  cartItems: CartItem[];
  handleCreateOrder: () => void;
  shippingFee: number;
  setShippingFee: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CheckoutProducts(props: CheckoutProductsProps) {
  const [tempTotal, setTempTotal] = useState(0);

  const handleCalculateTempTotal = () => {
    let total = 0;
    if (props.cartItems.length == 0) {
      setTempTotal(total);
      return;
    } else {
      props.cartItems?.forEach((item) => {
        total += item.unitPrice;
      });
      setTempTotal(total);
    }
  };

  useEffect(() => {
    handleCalculateTempTotal();
  }, [props.cartItems]);

  return (
    <div className="w-full md:w-[40%] ">
      <div className="border p-4 md:p-6 rounded-xl bg-background shadow">
        <div className="border-b pb-4 flex items-center gap-2 ">
          <BsBox2 />
          <h1 className="font-medium uppercase text-sm md:text-base">Đơn hàng của bạn</h1>
        </div>
        <div className="flex flex-col gap-2 md:gap-5 mt-3 md:mt-5 px-2">
          {props.cartItems.length > 0
            ? props.cartItems.map((cartItem, index) => (
              <div key={index} className="flex gap-4 justify-between ">
                <div>
                  <Image
                    src={
                      `${process.env.API_URL}${cartItem.product.imageUrls[0]}` ||
                      "https://dummyimage.com/100x100"
                    }
                    width={50}
                    height={50}
                    className="object-cover rounded-xl border h-[40px] w-[40px] md:h-[50px] md:w-[50px]"
                    alt="Pic"
                  />
                </div>
                <div className="flex flex-col justify-start flex-1">
                  <span className="line-clamp-1 text-sm md:text-base">
                    {cartItem.product.productName}
                  </span>
                  <span className="">
                    <span className="text-customOrange text-sm md:text-base">
                      {cartItem.product.productPrice.toLocaleString()} ₫
                    </span>
                    <span className="text-sm md:text-base"> x {cartItem.quantity}</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-customOrange text-sm md:text-base">
                    {cartItem.unitPrice.toLocaleString()} ₫
                  </span>
                </div>
              </div>
            ))
            : null}
          {props.cartItems.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/img/empty-cart.png"
                width={100}
                height={100}
                alt="empty-cart"
                quality={100}
                className="opacity-85"
              />
              <span className="text-gray-400">
                Chưa có sản phẩm nào trong giỏ hàng !
              </span>
            </div>
          )}
        </div>
        <div className="flex justify-between px-2 py-2 md:py-4 mt-3 md:mt-6 border-t">
          <span className="text-gray-500 text-sm md:text-base">Tạm tính</span>
          <span className="text-gray-500 text-sm md:text-base">{tempTotal.toLocaleString()} ₫</span>
        </div>
        <div className="flex justify-between px-2 py-2">
          <span className="text-gray-500 text-sm md:text-base">Phí vận chuyển</span>
          <span className="text-gray-500 text-sm md:text-base">
            {props.shippingFee.toLocaleString()} ₫
          </span>
        </div>
        <div className="flex justify-between border px-2 py-3 mt-1 md:mt-2 rounded">
          <span className="font-medium text-sm md:text-base">Tổng cộng</span>
          <span className="font-medium text-red-500 text-sm md:text-base">
            {(tempTotal + props.shippingFee).toLocaleString()} ₫
          </span>
        </div>
        <div
          onClick={!props.loading ? props.handleCreateOrder : undefined} // Vô hiệu hóa onClick khi loading là true
          className={`mt-5 w-full px-4 py-2 rounded-md text-center text-sm md:text-base font-medium
             uppercase cursor-pointer bg-black text-white dark:bg-slate-200 dark:text-black
             ${props.loading
              ? "pointer-events-none bg-gray-400"
              : "hover:bg-slate-600"
            } 
             flex justify-center
             `}
        >
          {props.loading ? (
            <CgSpinner className="animate-spin w-6 h-6 font-bold" />
          ) : (
            "Đặt hàng"
          )}
        </div>
      </div>
    </div>
  );
}
