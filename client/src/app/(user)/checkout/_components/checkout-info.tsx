"use client";
import { CheckIcon, Pencil2Icon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { CiLocationOn } from "react-icons/ci";
import { CiCreditCard2 } from "react-icons/ci";
import { AlertDialogAddress } from "./alert-dialog-adress";
import { CiTrash } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GiReceiveMoney } from "react-icons/gi";
import { customerAddressApi } from "@/apis/customerAddressApi";
import Cookies from "js-cookie";
import { CustomerAddress } from "@/types/customeraddress";
import shippingApi from "@/apis/shippingApi";
import CustomToast from "@/components/react-toastify/reactToastify";
import { Console, count } from "console";

interface Customer {
  customerId: number | null;
  fullName: string | null;
  phoneNumber: string | null;
  email: string | null;
}

type PaymentMethod =
  | {
      id: 1;
      name: "Credit Card";
    }
  | {
      id: 2;
      name: "COD";
    };

interface CheckoutInfoProps {
  countCartItems: number;
  customer: Customer;
  selectedPaymentMethod: PaymentMethod;
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;
  orderNote: string;
  setOrderNote: React.Dispatch<React.SetStateAction<string>>;
  shippingFee: number;
  setShippingFee: React.Dispatch<React.SetStateAction<number>>;
  selectedAddress: CustomerAddress | null;
  setSelectedAddress: React.Dispatch<
    React.SetStateAction<CustomerAddress | null>
  >;
}

const CheckoutInfo: React.FC<CheckoutInfoProps> = ({
  customer,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  orderNote,
  setOrderNote,
  countCartItems,
  shippingFee,
  setShippingFee,
  selectedAddress,
  setSelectedAddress,
}) => {
  //
  const [customerAddressList, setCustomerAddressList] = useState<
    CustomerAddress[]
  >([]);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const token = Cookies.get("token");

  // Chọn phương thức thanh toán
  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

  // Lấy tất cả danh sách địa chỉ của khách hàng
  const fetchCustomerAddress = async () => {
    try {
      if (!customer.customerId || !token) return;
      const res = await customerAddressApi.GetCustomerAddress(
        customer.customerId,
        token
      );
      setCustomerAddressList(res);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Chọn địa chỉ mặc định để thanh toán
  const chooseDefaultAddress = () => {
    const defaultAddress = customerAddressList.find(
      (address) => address.isDefault
    );
    if (!defaultAddress) return;
    setSelectedAddress(defaultAddress);
  };

  // Tính phí vận chuyển
  const fetchShippingFee = async () => {
    if (countCartItems === 0) return;
    if (!selectedAddress) return;
    if (!token) {
      CustomToast.showError(
        "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại !"
      );
      return;
    }
    try {
      const res = await shippingApi.GetCalculateFee(
        {
          ToDistrictId: selectedAddress.districtId,
          ToWardCode: selectedAddress.wardId.toString(),
          Height: 10,
          Length: 10,
          Weight: 2000,
          Width: 10,
        },
        token
      );
      setShippingFee(res.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomerAddress();
  }, [customer, isFetching]);

  // Khi fetch xong danh sách địa chỉ thì chọn địa chỉ mặc định
  useEffect(() => {
    chooseDefaultAddress();
  }, [customerAddressList]);

  useEffect(() => {
    fetchShippingFee();
  }, [selectedAddress, countCartItems]);

  return (
    <div className="w-full md:w-[60%]">
      <div className=" bg-background pt-5 py-6 px-5 rounded-xl border ">
        <h1 className="font-medium uppercase mb-3 flex gap-2 items-center">
          <CiLocationOn className="w-5 h-5 " />
          <span>Địa chỉ nhận hàng</span>
        </h1>

        <div className="gap-1 border  py-3 px-4 rounded-xl">
          <div className="flex gap-1 justify-between items-start">
            <div className="flex gap-1 text-gray-600">
              <p className="text-gray-600">{customer.fullName ? customer.fullName : "Chưa có"}</p>|{" "}
              <p className="text-gray-600">{customer.phoneNumber ? customer.phoneNumber : "Chưa có"}</p>
            </div>
            {/* <span className="text-sm border bg-sky-50/70 border-sky-400 px-2 rounded-xl text-sky-400">
              Mặc định
            </span> */}
          </div>
          <div className="flex justify-between items-center gap-1 text-gray-600">
            <p>{customer.email ? customer.email : "Chưa có"}</p>
            {}
            <AlertDialogAddress
              customer={customer}
              customerAddressList={customerAddressList}
              isFetching={isFetching}
              setIsFetching={setIsFetching}
            />
          </div>
          <div className="flex justify-between items-center ">
            {customerAddressList.length > 0 ? (
              <p>
                {selectedAddress?.province},{""} {selectedAddress?.district},{" "}
                {""}
                {selectedAddress?.ward}
              </p>
            ) : (
              <p>Vui lòng thêm địa chỉ để thanh toán!</p>
            )}
          </div>
        </div>
        <div className="md:mt-5">
          <h1 className="font-medium uppercase mb-3 flex items-center gap-2">
            <CiCreditCard2 className="w-5 h-5" />
            <span>Phương thức thanh toán</span>
          </h1>
          <div className="flex flex-col border-[0.5px]  rounded-xl">
            <label
              className={`flex flex-1 items-center justify-between gap-3 py-3 px-3 rounded-xl cursor-pointer`}
              onClick={() => handlePaymentMethodChange({ id: 2, name: "COD" })}
            >
              <div className="flex gap-2 items-center">
                <div className="bg-slate-200 rounded-full h-[42px] w-[42px] flex items-center justify-center">
                  <GiReceiveMoney className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p>COD</p>
                  <div className="text-gray-500">
                    Thanh toán khi nhận hàng.
                  </div>
                </div>
              </div>
              <div
                className={`${
                  selectedPaymentMethod.name == "COD"
                    ? "border-green-300 bg-green-100 "
                    : "border-gray-300"
                } w-5 h-5 rounded-full  border flex items-center justify-center`}
              >
                <CheckIcon
                  className={`${
                    selectedPaymentMethod.name == "COD"
                      ? "block text-green-400"
                      : "hidden"
                  } -translate-x-[0px] w-4 h-4`}
                />
              </div>
            </label>

            <label
              className={`flex flex-1 items-center justify-between gap-3 py-3 px-3 rounded-xl cursor-pointer`}
              onClick={() =>
                handlePaymentMethodChange({ id: 1, name: "Credit Card" })
              }
            >
              <div className="flex gap-2 items-center">
                <div className="bg-slate-200 rounded-full h-[42px] w-[42px] flex items-center justify-center">
                  <Image
                    src="/logo/mb-bank-logo.png"
                    width={100}
                    height={72}
                    className="h-[18px] w-[35px]"
                    alt="visa"
                  />
                </div>
                <div>
                  <div className="flex gap-1">
                    <p>Visa 0049023094</p>
                  </div>
                  <div className="text-gray-500">
                    Lorem ipsum dolor sit, amet{" "}
                  </div>
                </div>
              </div>
              <div
                className={`${
                  selectedPaymentMethod.name == "Credit Card"
                    ? "border-green-300 bg-green-100 "
                    : "border-gray-300"
                } w-5 h-5 rounded-full border flex items-center justify-center`}
              >
                <CheckIcon
                  className={`${
                    selectedPaymentMethod.name == "Credit Card"
                      ? "block text-green-400"
                      : "hidden"
                  } -translate-x-[0px] w-4 h-4`}
                />
              </div>
            </label>
            {/* <div className="py-2 px-3 rounded-xl cursor-pointer">Thêm phương thức thanh toán</div> */}
          </div>
        </div>
        {/* <div className="mt-4">
          <h1 className="font-medium uppercase mb-2">ĐỊA CHỈ GIAO HÀNG</h1>
          <Textarea
            className="h-full"
            onChange={handleOrderNoteChange}
            value={orderNote}
            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
          />
        </div> */}
        <div className="mt-5">
          <h1 className="font-medium uppercase mb-3 flex gap-2 items-center">
            <CiDeliveryTruck className="w-5 h-5 " />
            <span>Phương thức vận chuyển</span>
          </h1>
          <div className="border-[0.5px] py-2 px-3 rounded-xl flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Image
                src="/logo/ghtk-logo.jpg"
                width={42}
                height={42}
                className="rounded-full h-[42px] w-[42px] opacity-80"
                alt="ghtk"
              />
              <div>
                <div className="flex gap-2 text-gray-600">
                  <p>Giao hàng tiết kiệm (GHTK)</p>
                </div>
                <div className="flex gap-1 text-gray-500">
                  <p>Nhận hàng vào ngày </p>
                  <p>Thứ 2, 20/09/2021</p>
                </div>
              </div>
            </div>
            <div>{shippingFee.toLocaleString()}đ</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutInfo;
