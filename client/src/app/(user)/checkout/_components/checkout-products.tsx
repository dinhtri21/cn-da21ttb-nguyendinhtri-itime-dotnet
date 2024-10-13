"use client";
import { CartItemRes } from "@/validations/cartItem.chema";
import { Cross1Icon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Image from "next/image";

export default function CheckoutProducts() {
  const [cartItems, setCartItems] = useState<CartItemRes[]>([
    {
      productId: 1,
      product: {
        productId: 1,
        productName: "products dashboard with a asdạksdjjk",
        productDescription: "products dashboard with a",
        productPrice: 9000,
        imageUrls: ["https://dummyimage.com/100x100"],
        quantityInStock: 100,
        brand: {
          brandId: 1,
          brandName: "strong",
          brandDescription: "string",
        },
        material: {
          materialId: 1,
          materialName: "string",
        },
      },
      cartItemId: 1,
      cartId: 1,
      quantity: 1,
      unitPrice: 100000000,
    },
    {
      productId: 1,
      product: {
        productId: 1,
        productName: "products dashboard with a",
        productDescription: "products dashboard with a",
        productPrice: 9000,
        imageUrls: ["https://dummyimage.com/100x100"],
        quantityInStock: 100,
        brand: {
          brandId: 1,
          brandName: "strong",
          brandDescription: "string",
        },
        material: {
          materialId: 1,
          materialName: "string",
        },
      },
      cartItemId: 1,
      cartId: 1,
      quantity: 1,
      unitPrice: 100,
    },
    {
      productId: 1,
      product: {
        productId: 1,
        productName: "products dashboard with a",
        productDescription: "products dashboard with a",
        productPrice: 9000,
        imageUrls: ["https://dummyimage.com/100x100"],
        quantityInStock: 100,
        brand: {
          brandId: 1,
          brandName: "strong",
          brandDescription: "string",
        },
        material: {
          materialId: 1,
          materialName: "string",
        },
      },
      cartItemId: 1,
      cartId: 1,
      quantity: 1,
      unitPrice: 100,
    },

  ]);
  return (
    <div className="w-full md:w-[40%] ">
      <h1 className="font-medium uppercase">Đơn hàng của bạn</h1>
      <div className="flex flex-col gap-3 mt-3 px-2">
        {cartItems.length > 0
          ? cartItems.map((cartItem, index) => (
              <div className="flex gap-2 justify-between ">
                <div>
                  <Image
                    src={
                      cartItem.product.imageUrls[0] ||
                      "https://dummyimage.com/100x100"
                    }
                    width={50}
                    height={50}
                    className="object-cover rounded-xl"
                    alt="Picture of the author"
                  />
                </div>
                <div className="flex flex-col justify-start flex-1">
                  <span className="line-clamp-1">{cartItem.product.productName}</span>
                  <span>
                    {cartItem.product.productPrice}đ
                    <span> x {cartItem.quantity}</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <span>{cartItem.unitPrice}đ</span>
                </div>
              </div>
            ))
          : null}
      </div>
      <div className="flex justify-between px-2 py-2 mt-4 border-t">
        <span className="text-gray-500">Tạm tính</span>
        <span className="text-gray-500">1.000.000đ</span>
      </div>
      <div className="flex justify-between px-2">
        <span className="text-gray-500">Phí vận chuyển</span>
        <span className="text-gray-500">1.000.000đ</span>
      </div>
      <div className="flex justify-between border p-2 mt-2 rounded">
        <span className="font-medium">Tổng cộng</span>
        <span className="font-medium text-customOrange">2.000.000đ</span>
      </div>
      <div
        className="mt-4 w-full px-4 py-2 rounded-md text-center text-sm md:text-base font-medium
             uppercase cursor-pointer bg-slate-900 text-white dark:bg-slate-200 dark:text-black
             hover:bg-slate-600
             "
      >
        Đặt hàng
      </div>
    </div>
  );
}
