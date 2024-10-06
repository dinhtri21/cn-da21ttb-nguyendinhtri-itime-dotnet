"use client";
import Image from "next/image";
import { PlusIcon, MinusIcon, Cross1Icon } from "@radix-ui/react-icons";
import { CartItemApi } from "@/apis/cartItemAPi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Cookies from "js-cookie";
import { parse } from "path";
import { useEffect, useState } from "react";
import { CartItemRes } from "@/validations/cartItem.chema";
import { set } from "zod";

export function TableProduct() {
  const user = useSelector((state: RootState) => state.user);
  const token = Cookies.get("token");
  const [cartItems, setCartItems] = useState<CartItemRes[]>([]);
  const [total, setTotal] = useState(0);

  const fetchCartItems = async () => {
    try {
      console.log(user.id);
      if (user.id && token) {
        const data = await CartItemApi.getCartItems(token, parseInt(user.id));
        setCartItems(data);
      } else {
        console.error("User id or token is invalid");
      }
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  useEffect(() => {
    if (user.id && token) {
      fetchCartItems();
    }
  }, [user, token]); // Chỉ gọi user được cập nhật redux

  console.log(cartItems);

  return (
    <div>
      <div className="grid grid-cols-10 gap-8">
        <div className="col-span-10 md:col-span-7 grid grid-flow-row gap-1">
          <div className="hidden md:grid grid-cols-12 grid-flow-row border-b gap-2 p-3">
            <div className="col-span-1 flex  justify-center">Ảnh</div>
            <div className="col-span-4 flex  justify-center">Tên sản phẩm</div>
            <div className="col-span-2 flex  justify-center">Giá</div>
            <div className="col-span-2 flex  justify-center">Số lượng</div>
            <div className="col-span-3 flex  justify-center">Thành tiền</div>
          </div>

          {cartItems.map((cartItem, index) => (
            <div
              key={index}
              className="grid grid-rows-2 grid-flow-col md:grid-cols-12 md:grid-rows-subgrid gap-2 py-3 px-1 md:p-3 border-b relative"
            >
              <div
                className="absolute top-2 left-0 md:top-[50%] md:translate-y-[-50%] md:left-[97%] dark:bg-slate-800 bg-slate-200 rounded-full p-[5px]
               hover:bg-slate-400 hover:text-white cursor-pointer dark:hover:bg-slate-600"
              >
                <Cross1Icon width={10} height={10} />
              </div>
              <div className="row-span-2 md:col-span-1  overflow-hidden">
                <Image
                  src={
                    cartItem.product.imageUrls[0] ||
                    "https://dummyimage.com/100x100"
                  }
                  width={100}
                  height={100}
                  className="object-cover rounded-xl"
                  alt="Picture of the author"
                />
                {/* <img
                  className="rounded-md"
                  src="https://dummyimage.com/100x100"
                /> */}
                {/* <Image
                  src={"https://dummyimage.com/100x100"}
                  width={100}
                  height={100}
                  className="object-cover"
                  alt="Picture of the author"
                /> */}
              </div>
              <div className="md:col-span-4 flex md:justify-center items-center ">
                <span className="line-clamp-1">
                  {cartItem.product.productName}
                </span>
              </div>
              <div className="md:col-span-2 flex  md:justify-center items-center">
                {cartItem.product.productPrice} đ
              </div>
              <div className="md:col-span-2 flex  justify-center items-center">
                <div className="p-1 border-[0.1px] border-slate-500 rounded hover:bg-slate-200 cursor-pointer dark:hover:bg-slate-800">
                  <MinusIcon />
                </div>
                <span className="px-2">{cartItem.quantity}</span>
                <div className="p-1 border-[0.1px] border-slate-500 rounded hover:bg-slate-200 cursor-pointer dark:hover:bg-slate-800">
                  <PlusIcon />
                </div>
              </div>
              <div className="md:col-span-3 flex  justify-center items-center">
                {cartItem.unitPrice} đ
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-10 md:col-span-3 dark:bg-slate-800 rounded-md bg-slate-200 px-3 py-2 md:px-4 flex flex-col gap-3">
          <h2 className="uppercase font-semibold md:text-center  text-lg">
            Thông tin đơn hàng
          </h2>
          <div className="flex justify-between">
            <p className="font-semibold  text-lg">Tổng tiền:</p>
            <span className="text-customOrange text-lg">{total}</span>
          </div>
          <p className="">
            - Phí vận chuyển sẽ được tính ở thanh toán. <br />- Bạn cũng có thể
            nhập mã giảm giá ở trang thanh toán.
          </p>
        </div>
      </div>
    </div>
  );
}
