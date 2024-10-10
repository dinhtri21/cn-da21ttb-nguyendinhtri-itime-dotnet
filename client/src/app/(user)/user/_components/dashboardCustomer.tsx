"use client";
import Image from "next/image";
import {
  GearIcon,
  CubeIcon,
  Cross1Icon,
  PlusIcon,
  MinusIcon,
} from "@radix-ui/react-icons";

import { useState } from "react";
import { CartItemRes } from "@/validations/cartItem.chema";


export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

export function Dashboard() {
  const [cartItems, setCartItems] = useState<CartItemRes[]>([
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
    <div className="w-full max-w-screen-xl mx-auto px-4 mt-4">
      <div className="border rounded-xl mt-4 bg-background">
        <div className="hidden md:grid grid-cols-12 grid-flow-row rounded gap-2 p-3 border-b">
          <div className="col-span-1 flex  justify-center">Ảnh</div>
          <div className="col-span-4 flex  justify-center">Tên sản phẩm</div>
          <div className="col-span-2 flex  justify-center">Giá</div>
          <div className="col-span-2 flex  justify-center">Số lượng</div>
          <div className="col-span-3 flex  justify-center">Thành tiền</div>
        </div>

        {cartItems.length > 0
          ? cartItems.map((cartItem, index) => (
              <div
                key={index}
                className="grid grid-rows-2 md:grid-cols-12 grid-flow-col md:grid-flow-row gap-2 py-3 px-1 md:p-3 border-b relative bg-background"
              >
                <div
                  // onClick={() => handleDeleteCartItem(cartItem)}
                  className="absolute top-2 left-0 md:top-[50%] md:translate-y-[-50%] md:left-[96%] dark:bg-slate-800 bg-slate-100 rounded-full p-[5px]
               hover:bg-slate-400 hover:text-white cursor-pointer dark:hover:bg-slate-600"
                >
                  <Cross1Icon width={14} height={14} />
                </div>
                <div className="row-span-2 md:col-span-1 md:row-span-2 overflow-hidden">
                  <Image
                    src={
                      cartItem.product.imageUrls[0] ||
                      "https://dummyimage.com/70x70"
                    }
                    width={70}
                    height={70}
                    className="object-cover rounded-xl"
                    alt="Picture of the author"
                  />
                </div>
                <div className="md:col-span-4 md:row-span-2 flex md:justify-center items-center ">
                  <span className="line-clamp-1 md:line-clamp-2 ">
                    {cartItem.product.productName}
                  </span>
                </div>
                <div className="md:col-span-2 md:row-span-2 flex  md:justify-center items-center">
                  {cartItem.product.productPrice} đ
                </div>
                <div className="md:col-span-2 md:row-span-2 flex  justify-center items-center">
                  <div
                    // onClick={() => handlerDecreaseQuantity(cartItem)}
                    className="h-7 w-7 flex justify-center items-center border-[0.1px] rounded-l border-slate-400  hover:bg-slate-400 hover:text-white cursor-pointer dark:hover:bg-slate-800"
                  >
                    <MinusIcon />
                  </div>
                  <span className="h-7 w-7 flex justify-center cursor-pointer items-center px-2 border-y-[1px] border-slate-400">
                    {cartItem.quantity}
                  </span>
                  <div
                    // onClick={() => handlerIncreaseQuantity(cartItem)}
                    className="h-7 w-7 flex justify-center  items-center border-[0.1px] rounded-r border-slate-400 hover:bg-slate-400 hover:text-white cursor-pointer dark:hover:bg-slate-800"
                  >
                    <PlusIcon />
                  </div>
                </div>
                <div className="md:col-span-3 flex md:row-span-2  justify-center items-center">
                  {cartItem.unitPrice} đ
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
