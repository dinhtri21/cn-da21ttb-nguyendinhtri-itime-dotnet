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
import { setCartItemCount } from "@/redux/slices/cartItemsSlice";
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
    if (cartItems?.length == 0) {
      return;
    }
    cartItems?.forEach((cartItem) => {
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
    <div className="grid md:grid-cols-10 gap-10 mt-4 md:mt-6 min-h-[calc(100vh-370px)]">

      <div className=" md:col-span-7 gap-1 border rounded-xl">
        <div className="rounded-xl bg-background min-h-[400px] ">
          <div className="hidden md:grid grid-cols-12 grid-flow-row rounded-t-xl  gap-2 p-3 border-b bg-gray-100">
            <div className="col-span-1 flex text-gray-600 text-sm justify-center">
              Ảnh
            </div>
            <div className="col-span-4 flex text-gray-600 text-sm justify-center">
              Tên sản phẩm
            </div>
            <div className="col-span-2 flex text-gray-600 text-sm justify-center">
              Giá
            </div>
            <div className="col-span-2 flex text-gray-600 text-sm justify-center">
              Số lượng
            </div>
            <div className="col-span-3 flex text-gray-600 text-sm justify-center">
              Thành tiền
            </div>
          </div>

          {cartItems?.length == 0 ? (
            <div className="hidden md:grid grid-cols-12 grid-flow-row gap-2 p-3">
              <div className="col-span-12 flex flex-col items-center">
                <Image
                  src="/img/empty-cart.png"
                  width={200}
                  height={200}
                  alt="empty-cart"
                  quality={100}
                  className="opacity-20 mt-7"
                />
                <span className="text-gray-400">
                  {" "}
                  Chưa có sản phẩm nào trong giỏ hàng !
                </span>
              </div>
            </div>
          ) : null}

          {cartItems?.length > 0
            ? cartItems.map((cartItem, index) => (
              <div
                key={index}
                className="grid grid-rows-2 md:grid-cols-12 grid-flow-col md:grid-flow-row gap-2 pt-2 md:pt-3 md:py-3 mx-3 md:px-1 md:p-3 border-b mt-[2px] relative"
              >
                <div
                  onClick={() => handleDeleteCartItem(cartItem)}
                  className="absolute top--2 left-0 md:top-[50%] md:translate-y-[-50%] md:left-[96%] dark:bg-slate-800  rounded-full p-[5px]
               hover:bg-slate-300 hover:text-white cursor-pointer dark:hover:bg-slate-300 shadow"
                >
                  <Cross1Icon width={14} height={14} className="text-gray-500" />
                </div>
                <div className="row-span-2 md:col-span-1 md:row-span-2 overflow-hidden">
                  <img
                    src={
                      `${process.env.API_URL}${cartItem.product.imageUrls[0]}`
                    }
                    width={100}
                    height={100}
                    className="object-cover rounded-xl "
                    alt="Pic"
                  />
                </div>
                <div className="md:col-span-4 md:row-span-2 flex md:justify-center items-center ">
                  <span className="line-clamp-2 md:line-clamp-2  text-gray-600">
                    {cartItem.product.productName}
                  </span>
                </div>
                <div className="md:col-span-2 md:row-span-2 flex  md:justify-center items-center text-customOrange">
                  {cartItem.product.productPrice.toLocaleString()} ₫
                </div>
                <div className="md:col-span-2 md:row-span-2 flex  justify-center items-center ">
                  <div
                    onClick={() => handlerDecreaseQuantity(cartItem)}
                    className="h-7 w-7 shadow flex justify-center items-center rounded-l border-gray-200  hover:bg-gray-300  hover:text-white cursor-pointer dark:hover:bg-slate-800"
                  >
                    <MinusIcon className="text-gray-600" />
                  </div>
                  <span className="h-7 w-7 shadow flex justify-center cursor-pointer items-center px-2  border-gray-200  text-gray-600">
                    {cartItem.quantity}
                  </span>
                  <div
                    onClick={() => handlerIncreaseQuantity(cartItem)}
                    className="h-7 w-7 shadow flex justify-center  items-center rounded-r border-gray-200  hover:bg-gray-300 hover:text-white cursor-pointer dark:hover:bg-slate-800"
                  >
                    <PlusIcon className="text-gray-600" />
                  </div>
                </div>
                <div className="md:col-span-3 flex md:row-span-2 text-customOrange justify-center items-center">
                  {cartItem.unitPrice.toLocaleString()} ₫
                </div>
              </div>
            ))
            : null}
        </div>
      </div>
      <div className=" md:col-span-3 bg-white">
        <div className=" dark:bg-slate-800  px-3 py-4 md:px-7 flex flex-col gap-3 border border-gray-200/70 rounded-xl shadow">
          <h2 className="uppercase md:text-center text">
            Thông tin giỏ hàng
          </h2>
          <div className="flex justify-between">
            <p className="">Tổng tiền:</p>
            <span className="text-customOrange text-lg">
              {total.toLocaleString()}₫
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            - Phí vận chuyển sẽ được tính ở thanh toán. <br />- Thông tin thanh
            toán sẽ được cung cấp ở bước tiếp theo.
          </p>

          <Link
            className="bg-slate-900 text-white px-2 py-2 rounded-md font-medium text-center uppercase mb-2
            hover:bg-slate-500
            "
            href={`/checkout`}
          >
            Thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
}
