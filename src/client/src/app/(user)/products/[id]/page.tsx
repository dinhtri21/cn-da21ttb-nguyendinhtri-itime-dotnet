"use client";
import ProductApi from "@/apis/productApi";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductRes } from "@/validations/product.schema";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { PlusIcon, MinusIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CartItemApi } from "@/apis/cartItemAPi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Cookies from "js-cookie";
import { set } from "zod";
import { setCartItemCount } from "@/redux/slices/cartItemsSlice";
import OtherProducts from "@/components/otherProducts/otherProducts";
import { MdAddCircleOutline } from "react-icons/md";
import CustomToast from "@/components/react-toastify/reactToastify";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<ProductRes | null>(null);
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  const handleIncrease = () => {
    if (quantity > (product?.quantityInStock ?? 0)) return;
    setQuantity((prev) => prev + 1);
  };
  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  const handleUpdateCartItemsCount = async () => {
    try {
      if (!user.customerId) {
        return;
      }
      const res = await CartItemApi.getCartItemsCount(
        token ?? "",
        user.customerId
      );
      dispatch(setCartItemCount(res.data.cartItemsCount));
    } catch (error) {
      console.error("Failed to fetch cart items count:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      if (user.customerId === null) {
        CustomToast.showError("Vui lòng đăng nhập để thêm vào giỏ hàng");
        return;
      }
      const data = await CartItemApi.createCartItem(token ?? "", {
        customerId: user.customerId!,
        productId: product?.productId ?? 0,
        quantity: quantity,
      });
      
      CustomToast.showSuccess("Thêm vào giỏ hàng thành công");
      handleUpdateCartItemsCount();
    } catch (error: any) {
      console.log("Failed to add to cart:", error);
      CustomToast.showError("Thêm vào giỏ hàng thất bại");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductApi.getProductById(params.id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [params.id]);

  return (
    <div className="w-full dark:bg-muted/40">
      <div className="min-h-[calc(100vh-300px)] max-w-screen-xl mx-auto pt-8 pb-10 px-4 mt-[73px]">
        <div className="px-4">
          <Breadcrumb>
            <BreadcrumbList>
              {/* <BreadcrumbItem>
                <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
              </BreadcrumbItem> */}
              {/* <BreadcrumbSeparator /> */}
              <BreadcrumbItem className="text-base">
                <BreadcrumbLink href="/products">Sản phẩm</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem className="text-base">
                <BreadcrumbPage>
                  <div className="line-clamp-1 overflow-hidden text-gray-500">
                    {product?.productName}
                  </div>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {/*  */}
        <div className="mx-auto px-4 max-w-screen-xl grid grid-cols-1 md:grid-cols-7 gap-3 md:gap-10 mt-4">
          <div className="md:col-span-3 p-4 bg-background rounded-xl">
            <Carousel>
              <CarouselContent>
                {product?.imageUrls.map((image, index) => {
                  return (
                    <CarouselItem key={index} className="w-full max-h-[450px]">
                      <div className=" dark:bg-white rounded-xl w-full h-full">
                        <img
                          className="rounded-lg object-cover w-full h-full aspect-square"
                          src={image}
                          alt={product.productName}
                        />
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="md:col-span-4 py-6 px-8 bg-background rounded-xl border bg-gray-100">
            <h1 className="text-xl md:text-xl ">
              {product?.productName}
            </h1>
            <div className="flex items-center mt-4 gap-2">
              <p className=" font-normal text-gray-600">Giá: </p>
              <span className="text-lg md:text-xl  text-customOrange">
                {product?.productPrice.toLocaleString()}₫
              </span>
            </div>
            <div className="flex items-center mt-4 gap-2">
              <p className=" font-normal text-gray-600">Số lượng: </p>
              <div className="ml-2 flex items-center gap-2 border  rounded-sm">
                <div
                  onClick={handleDecrease}
                  className="p-1 border-r cursor-pointer px-1 bg-gray-100 border-customOrange rounded-l-[3px]"
                >
                  <MinusIcon className="text-customOrange" width={18} height={18} />
                </div>
                <span className=" flex items-center justify-center w-4 h-4 px-1 text-customOrange">
                  {quantity}
                </span>
                <div
                  onClick={handleIncrease}
                  className="p-1 border-l cursor-pointer px-1 bg-gray-100 border-customOrange rounded-r-[3px]"
                >
                  <PlusIcon className="text-customOrange" width={18} height={18} />
                </div>
              </div>
            </div>
            <div className="mt-4">
              {/* <p className="text-base md:text-xl font-normal">
                Thông số:
              </p> */}
              <p className=" text-gray-600 font-normal mt-4">
                Thương hiệu: {product?.brand?.brandName}.
              </p>
              <p className=" text-gray-600 font-normal mt-4">
                Chất liệu: {product?.material?.materialName}.
              </p>
              {/* <p className=" text-gray-600 font-normal mt-3">
                Trình trạng: 28 sản phẩm có sẵn.
              </p> */}
            </div>

            <Button
              onClick={handleAddToCart}
              className="mt-6 w-[250px]  py-5 rounded-xl flex items-center justify-center gap-1 text-sm md:text-sm font-semibold
             uppercase cursor-pointer  hover:bg-gray-600 border bg-black"
            >
              <p className="text-white">Thêm vào giỏ hàng</p>
              {/* <MdOutlineAddShoppingCart />
               */}
              {/* <MdAddCircleOutline className="w-5 h-5 text-white" /> */}
            </Button>

            <div className="w-full h-[1px] bg-gray-300 mt-7 mb-6"></div>
            <div>
              <p className="text-gray-600">{product?.productDescription}</p>
            </div>
          </div>
        </div>
        <div className="">
          <OtherProducts title="Một số sản phẩm khác" />
        </div>
      </div>
    </div>
  );
}
