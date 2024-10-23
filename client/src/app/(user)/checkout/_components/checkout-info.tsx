"use client";
import { CheckIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface Customer {
  customerId: number | null;
  fullName: string | null;
  phoneNumber: string | null;
  email: string | null;
  address: string | null;
}

type PaymentMethod =
  | {
      id: 1;
      name: "cod";
    }
  | {
      id: 2;
      name: "card";
    };


interface CheckoutInfoProps {
  customer: Customer;
  selectedPaymentMethod: PaymentMethod;
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;
  orderNote: string;
  setOrderNote: React.Dispatch<React.SetStateAction<string>>;
}

const CheckoutInfo: React.FC<CheckoutInfoProps> = ({
  customer,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  orderNote,
  setOrderNote,
}) => {
  //
  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    console.log(method);
  };

  const handleOrderNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOrderNote(e.target.value);
  };

  return (
    <div className="w-full md:w-[60%]">
      <div className=" bg-background p-5 rounded-md">
        <h1 className="font-medium uppercase mb-2">Thông tin khách hàng</h1>
        <div className="grid grid-cols-2 grid-flow-row gap-1">
          <label>Họ và tên :</label>
          <p>{customer.fullName}</p>
          <label>Số điện thoại :</label>
          <p>{customer.phoneNumber}</p>
          <label>Email :</label>
          <p>{customer.email}</p>
        </div>
        <div className="md:mt-4">
          <h1 className="font-medium uppercase mb-2">Phương thức thanh toán</h1>
          <div className="flex flex-col gap-2">
            <label
              onClick={() => handlePaymentMethodChange({ id: 1, name: "cod" })}
              className={`${
                selectedPaymentMethod.name == "cod"
                  ? "bg-green-50 border-green-300 text-green-500"
                  : "border-gray-300"
              } flex items-center justify-between gap-3 py-2 px-3 rounded border cursor-pointer`}
            >
              <div>Thanh toán khi nhận hàng</div>
              <div
                className={`${
                  selectedPaymentMethod.name == "cod"
                    ? "border-green-300 bg-green-100"
                    : "border-gray-300"
                } w-4 h-4 rounded-full  border`}
              >
                <CheckIcon
                  className={`${
                    selectedPaymentMethod.name == "cod" ? "block" : "hidden"
                  } -translate-x-[1px] w-4 h-4`}
                />
              </div>
            </label>

            <label
              className={` ${
                selectedPaymentMethod.name == "card"
                  ? "bg-green-50 border-green-300 text-green-400"
                  : "border-gray-300"
              } flex items-center justify-between gap-3 py-2 px-3 rounded border cursor-pointer`}
              onClick={() => handlePaymentMethodChange({ id: 2, name: "card" })}
            >
              <div>Thanh toán qua thẻ (chưa hỗ trợ)</div>
              <div
                className={`${
                  selectedPaymentMethod.name == "card"
                    ? "border-green-300 bg-green-100"
                    : "border-gray-300"
                } w-4 h-4 rounded-full  border`}
              >
                <CheckIcon
                  className={`${
                    selectedPaymentMethod.name == "card" ? "block" : "hidden"
                  } -translate-x-[1px] w-4 h-4`}
                />
              </div>
            </label>
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
        <div className="mt-4">
          <h1 className="font-medium uppercase mb-2">
            THÔNG TIN BỔ SUNG (TUỲ CHỌN)
          </h1>
          <Textarea
            className="h-full"
            onChange={handleOrderNoteChange}
            value={orderNote}
            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutInfo;
