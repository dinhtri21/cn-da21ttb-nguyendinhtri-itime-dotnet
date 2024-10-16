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
import { useToast } from "@/hooks/use-toast";
import { set } from "zod";
import { setCartItemCount } from "@/redux/slices/cartItemsSlide";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<ProductRes | null>(null);
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const toast = useToast();

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecrease = () => {
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
      const data = await CartItemApi.createCartItem(token ?? "", {
        customerId: user.customerId!,
        productId: product?.productId ?? 0,
        quantity: quantity,
      });
      toast.toast({
        title: "Thên vào giỏ hàng thành công",
      });
      handleUpdateCartItemsCount();
    } catch (error) {
      toast.toast({
        title: "Thên vào giỏ hàng thất bại",
      });
      console.error("Failed to add to cart:", error);
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
    <div className="w-full">
      <div className="container mx-auto max-w-screen-xl my-2 px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Sản phẩm</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <div className="line-clamp-1 overflow-hidden">
                  {product?.productName}
                </div>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/*  */}
      <div className="container mx-auto max-w-screen-xl grid grid-cols-1 md:grid-cols-7 gap-10 mt-5">
        <div className="md:col-span-3 p-4">
          <Carousel>
            <CarouselContent>
              {product?.imageUrls.map((image, index) => {
                return (
                  <CarouselItem key={index}>
                    <div className="p-4 dark:bg-white rounded-xl">
                      <img
                        className="rounded-lg"
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
        <div className="md:col-span-4 mt-4 px-4">
          <h1 className="text-xl md:text-2xl font-medium">
            {product?.productName}
          </h1>
          <div className="flex items-center mt-4 gap-2">
            <p className="md:text-lg font-normal uppercase">Giá : </p>
            <span className="text-lg md:text-xl font-semibold text-customOrange">
              {product?.productPrice.toLocaleString()}đ
            </span>
          </div>
          <div className="flex items-center mt-4 gap-2">
            <p className="md:text-lg font-normal uppercase">Số lượng : </p>
            <div className="ml-2 flex items-center gap-2 border-2 rounded-sm">
              <div
                onClick={handleDecrease}
                className="p-1 border-r cursor-pointer px-1"
              >
                <MinusIcon width={16} height={16} />
              </div>
              <span className="text-lg font-medium px-1 text-cyan-600">
                {quantity}
              </span>
              <div
                onClick={handleIncrease}
                className="p-1 border-l cursor-pointer px-1"
              >
                <PlusIcon width={16} height={16} />
              </div>
            </div>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <p className="text-base md:text-lg font-normal uppercase">
                  Thông số :
                </p>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-base font-normal">
                  - Thương hiệu: {product?.brand?.brandName}
                </p>
                <p className="text-base font-normal mt-3">
                  - Chất liệu: {product?.material?.materialName}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button
            onClick={handleAddToCart}
            className="mt-4 w-full px-4 py-3 rounded-md text-center text-sm md:text-base font-medium
             uppercase cursor-pointer bg-black text-white dark:bg-slate-200 dark:text-black"
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
}
