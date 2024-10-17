"use client";
import Image from "next/image";
import { PlusIcon, MinusIcon, Cross1Icon } from "@radix-ui/react-icons";
import { CartItemApi } from "@/apis/cartItemAPi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CartItemRes,
  CartItemsUpdateRequest,
} from "@/validations/cartItem.chema";
import { setCartItemCount } from "@/redux/slices/cartItemsSlide";
import { useDispatch } from "react-redux";
import React from "react";
import CustomToast from "@/components/react-toastify/reactToastify";

export function TableProduct() {
  const user = useSelector((state: RootState) => state.user);
  const token = Cookies.get("token");
  const [cartItems, setCartItems] = useState<CartItemRes[]>([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  const fetchCartItems = async () => {
    try {
      if (user.customerId && token) {
        const data = await CartItemApi.getCartItems(token, user.customerId);
        setCartItems(data);
      } else {
        console.error("User id or token is invalid");
      }
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  const handlerIncreaseQuantity = async (cartItem: any) => {
    if (user.customerId && token) {
      const cartItemsUpdateRequest: CartItemsUpdateRequest = {
        customerId: user.customerId,
        cartItemId: cartItem.cartItemId,
        quantity: cartItem.quantity + 1,
      };
      try {
        const data = await CartItemApi.updateCartItem(
          token,
          cartItemsUpdateRequest
        );
        fetchCartItems();
        handleUpdateCartItemsCount(user.customerId);
        CustomToast.showSuccess("Cập nhật giỏ hàng thành công");
      } catch (error) {
        CustomToast.showError("Cập nhật giỏ hàng thất bại");
        console.error("Failed to update cart item:", error);
      }
    }
  };

  const handlerDecreaseQuantity = async (cartItem: any) => {
    if (user.customerId && token && cartItem.quantity > 1) {
      const cartItemsUpdateRequest: CartItemsUpdateRequest = {
        customerId: user.customerId,
        cartItemId: cartItem.cartItemId,
        quantity: cartItem.quantity - 1,
      };
      try {
        const data = await CartItemApi.updateCartItem(
          token,
          cartItemsUpdateRequest
        );
        fetchCartItems();
        handleUpdateCartItemsCount(user.customerId);
        CustomToast.showSuccess("Cập nhật giỏ hàng thành công");
      } catch (error) {
        console.error("Failed to update cart item:", error);
        CustomToast.showError("Cập nhật giỏ hàng thất bại");
      }
    }
  };

  const handleDeleteCartItem = async (cartItem: any) => {
    if (user.customerId && token) {
      try {
        const data = await CartItemApi.deleteCartItem(
          token,
          cartItem.cartItemId
        );
        fetchCartItems();
        handleUpdateCartItemsCount(user.customerId);
        CustomToast.showSuccess("Xoá sản phẩm thành công");
      } catch (err) {
        CustomToast.showSuccess("Xoá sản phẩm thất bại");
        console.log(err);
      }
    }
  };

  const handleUpdateCartItemsCount = async (customerId: number) => {
    try {
      const res = await CartItemApi.getCartItemsCount(token ?? "", customerId);
      dispatch(setCartItemCount(res.data.cartItemsCount));
    } catch (error) {
      console.error("Failed to fetch cart items count:", error);
    }
  };

  const calculateTotal = () => {
    let num = 0;
    cartItems.forEach((cartItem) => {
      num = num + cartItem.unitPrice;
    });
    setTotal(num);
  };

  useEffect(() => {
    if (user.customerId && token) {
      fetchCartItems();
    }
  }, [user, token]);

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  return (
    <div className="grid grid-cols-10 gap-8 mt-4 min-h-[calc(100vh-370px)]">
      <div className="col-span-10 md:col-span-7 gap-1">
        <div className="border rounded-xl bg-background min-h-[400px]">
          <div className="hidden md:grid grid-cols-12 grid-flow-row rounded border-b gap-2 p-3 ">
            <div className="col-span-1 flex  justify-center">Ảnh</div>
            <div className="col-span-4 flex  justify-center">Tên sản phẩm</div>
            <div className="col-span-2 flex  justify-center">Giá</div>
            <div className="col-span-2 flex  justify-center">Số lượng</div>
            <div className="col-span-3 flex  justify-center">Thành tiền</div>
          </div>

          {cartItems.length == 0 ? (
            <div className="hidden md:grid grid-cols-12 grid-flow-row gap-2 p-3">
              <div className="col-span-12 flex flex-col items-center">
                <Image
                  src="/img/empty-cart.png"
                  width={200}
                  height={200}
                  alt="empty-cart"
                  quality={100}
                  className="opacity-85 mt-7"
                />
                <span className="text-gray-400">
                  {" "}
                  Chưa có sản phẩm nào trong giỏ hàng !
                </span>
              </div>
            </div>
          ) : null}

          {cartItems.length > 0
            ? cartItems.map((cartItem, index) => (
                <div
                  key={index}
                  className="grid grid-rows-2 md:grid-cols-12 grid-flow-col md:grid-flow-row gap-2 py-3 px-1 md:p-3 border-b relative"
                >
                  <div
                    onClick={() => handleDeleteCartItem(cartItem)}
                    className="absolute top-2 left-0 md:top-[50%] md:translate-y-[-50%] md:left-[96%] dark:bg-slate-800 bg-slate-100 rounded-full p-[5px]
               hover:bg-slate-400 hover:text-white cursor-pointer dark:hover:bg-slate-600"
                  >
                    <Cross1Icon width={14} height={14} />
                  </div>
                  <div className="row-span-2 md:col-span-1 md:row-span-2 overflow-hidden">
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
                      onClick={() => handlerDecreaseQuantity(cartItem)}
                      className="h-7 w-7 flex justify-center items-center border-[0.1px] rounded-l border-slate-400  hover:bg-slate-400 hover:text-white cursor-pointer dark:hover:bg-slate-800"
                    >
                      <MinusIcon />
                    </div>
                    <span className="h-7 w-7 flex justify-center cursor-pointer items-center px-2 border-y-[1px] border-slate-400">
                      {cartItem.quantity}
                    </span>
                    <div
                      onClick={() => handlerIncreaseQuantity(cartItem)}
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
      <div className="col-span-10 md:col-span-3 ">
        <div className=" dark:bg-slate-800 bg-gray-100 rounded-md px-3 py-4 md:px-7 flex flex-col gap-3 border rounded-xl">
          <h2 className="uppercase font-semibold md:text-center  text-lg">
            Thông tin đơn hàng
          </h2>
          <div className="flex justify-between">
            <p className="font-semibold  text-lg">Tổng tiền:</p>
            <span className="text-customOrange text-lg font-medium">
              {total}đ
            </span>
          </div>
          <p className="">
            - Phí vận chuyển sẽ được tính ở thanh toán. <br />- Bạn cũng có thể
            nhập mã giảm giá ở trang thanh toán.
          </p>

          <Link
            className="bg-black text-white px-2 py-2 rounded-md font-medium text-center uppercase mb-2
            hover:bg-slate-500
            "
            href={"/checkout"}
          >
            Thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
}
