"use client";
import { CheckIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

interface Customer {
  customerId: number | null;
  fullName: string | null;
  phoneNumber: string | null;
  email: string | null;
  address: string | null;
}

interface CheckoutInfoProps {
  customer: Customer;
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: React.Dispatch<
    React.SetStateAction<"cod" | "card" | "momo" | "zalopay">
  >;
}

const CheckoutInfo: React.FC<CheckoutInfoProps> = ({
  customer,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}) => {
  const handlePaymentMethodChange = (
    method: "cod" | "card" | "momo" | "zalopay"
  ) => {
    setSelectedPaymentMethod(method);
    console.log(method); 
  };

  return (
    <div className="w-full md:w-[60%]">
      <h1 className="font-medium uppercase mb-1">Thông tin khách hàng</h1>
      <div className="grid grid-cols-2 grid-flow-row gap-1">
        <label>Họ và tên :</label>
        <p>{customer.fullName}</p>
        <label>Số điện thoại :</label>
        <p>{customer.phoneNumber}</p>
        <label>Email :</label>
        <p>{customer.email}</p>
        <label>Địa chỉ :</label>
        <p>{customer.address}</p>
      </div>
      <div className="md:border-t py-3 md:mt-4">
        <h1 className="font-medium uppercase mb-2">Phương thức thanh toán</h1>
        <div className="flex flex-col gap-2">
          <label
            onClick={() => handlePaymentMethodChange("cod")}
            className={`${
              selectedPaymentMethod == "cod"
                ? "bg-green-50 border-green-300 text-green-500"
                : "border-gray-300"
            } flex items-center justify-between gap-3 py-2 px-3 rounded border cursor-pointer`}
          >
            <div>Thanh toán khi nhận hàng</div>
            <div
              className={`${
                selectedPaymentMethod == "cod"
                  ? "border-green-300 bg-green-100"
                  : "border-gray-300"
              } w-4 h-4 rounded-full  border`}
            >
              <CheckIcon
                className={`${
                  selectedPaymentMethod == "cod" ? "block" : "hidden"
                } -translate-x-[1px] w-4 h-4`}
              />
            </div>
          </label>

          <label
            className={` ${
              selectedPaymentMethod == "card"
                ? "bg-green-50 border-green-300 text-green-400"
                : "border-gray-300"
            } flex items-center justify-between gap-3 py-2 px-3 rounded border cursor-pointer`}
            onClick={() => handlePaymentMethodChange("card")}
          >
            <div>Thanh toán qua thẻ (chưa hỗ trợ)</div>
            <div
              className={`${
                selectedPaymentMethod == "card"
                  ? "border-green-300 bg-green-100"
                  : "border-gray-300"
              } w-4 h-4 rounded-full  border`}
            >
              <CheckIcon
                className={`${
                  selectedPaymentMethod == "card" ? "block" : "hidden"
                } -translate-x-[1px] w-4 h-4`}
              />
            </div>
          </label>
        </div>
      </div>
      {/* <div className="border-t py-3 mt-2">
        <h1 className="font-medium uppercase">Vận chuyển</h1>
      </div> */}
    </div>
  );
};

export default CheckoutInfo;
