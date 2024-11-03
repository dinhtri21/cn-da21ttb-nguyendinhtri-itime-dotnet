"use client";
import { CartItemRes } from "@/validations/cartItem.chema";
import { Cross1Icon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import { CartItem } from "@/types/cartItem";
import { BsBox2 } from "react-icons/bs";

interface CheckoutProductsProps {
  cartItems: CartItem[];
  handleCreateOrder: () => void;
}

export default function CheckoutProducts(props: CheckoutProductsProps) {
  const [tempTotal, setTempTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);

  const handleCalculateTempTotal = () => {
    let total = 0;
    props.cartItems.forEach((item) => {
      total += item.unitPrice;
    });
    setTempTotal(total);
  };

  useEffect(() => {
    handleCalculateTempTotal();
  }, [props.cartItems]);

  return (
    <div className="w-full md:w-[40%] ">
      <div className="border  p-5 rounded-md bg-background">
        <div className="border-b pb-2 flex items-center gap-2">
          <BsBox2 />
          <h1 className="font-medium uppercase">Đơn hàng của bạn</h1>
        </div>
        <div className="flex flex-col gap-3 mt-3 px-2">
          {props.cartItems.length > 0
            ? props.cartItems.map((cartItem, index) => (
                <div 
                key={index}
                className="flex gap-2 justify-between ">
                  <div>
                    <Image
                      src={
                        cartItem.product.imageUrls[0] ||
                        "https://dummyimage.com/100x100"
                      }
                      width={50}
                      height={50}
                      className="object-cover rounded-xl border"
                      alt="Picture of the author"
                    />
                  </div>
                  <div className="flex flex-col justify-start flex-1">
                    <span className="line-clamp-1">
                      {cartItem.product.productName}
                    </span>
                    <span>
                      {cartItem.product.productPrice.toLocaleString()} ₫
                      <span> x {cartItem.quantity}</span>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span>{cartItem.unitPrice} ₫</span>
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
        <div className="flex justify-between px-2 py-2 mt-4 border-t">
          <span className="text-gray-500">Tạm tính</span>
          <span className="text-gray-500">{tempTotal.toLocaleString()} ₫</span>
        </div>
        <div className="flex justify-between px-2">
          <span className="text-gray-500">Phí vận chuyển</span>
          <span className="text-gray-500">{shippingFee} ₫</span>
        </div>
        <div className="flex justify-between border p-2 mt-2 rounded">
          <span className="font-medium">Tổng cộng</span>
          <span className="font-medium text-red-500">
            {(tempTotal + shippingFee).toLocaleString()} ₫
          </span>
        </div>
        <div
          onClick={props.handleCreateOrder}
          className="mt-4 w-full px-4 py-2 rounded-md text-center text-sm md:text-base font-medium
             uppercase cursor-pointer bg-black text-white dark:bg-slate-200 dark:text-black
             hover:bg-slate-600
             "
        >
          Đặt hàng
        </div>
      </div>
    </div>
  );
}
