"use client";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
const customer = {
  customerId: 1,
  fullName: "Nguyễn Đình Trí",
  phoneNumber: "0239828982",
  email: "abc@gmail.cpm",
  address: "Đức Hiệp, Càng Long, Trà Vinh",
};

export default function CheckoutInfo() {
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");

  const handlePaymentMethodChange = (
    method: "cod" | "card" | "momo" | "zalopay"
  ) => {
    setPaymentMethod(method);
    console.log(paymentMethod);
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
              paymentMethod == "cod"
                ? "bg-green-50 border-green-300 text-green-500"
                : "border-gray-300"
            } flex items-center justify-between gap-3 py-2 px-3 rounded border cursor-pointer`}
          >
            <div>Thanh toán khi nhận hàng</div>
            <div
              className={`${
                paymentMethod == "cod"
                  ? "border-green-300 bg-green-100"
                  : "border-gray-300"
              } w-4 h-4 rounded-full  border`}
            >
              <CheckIcon
                className={`${
                  paymentMethod == "cod" ? "block" : "hidden"
                } -translate-x-[1px] w-4 h-4`}
              />
            </div>
          </label>

          <label
            className={` ${
              paymentMethod == "card"
                ? "bg-green-50 border-green-300 text-green-400"
                : "border-gray-300"
            } flex items-center justify-between gap-3 py-2 px-3 rounded border cursor-pointer`}
            onClick={() => handlePaymentMethodChange("card")}
          >
            <div>Thanh toán qua thẻ (chưa hỗ trợ)</div>
            <div
              className={`${
                paymentMethod == "card"
                  ? "border-green-300 bg-green-100"
                  : "border-gray-300"
              } w-4 h-4 rounded-full  border`}
            >
              <CheckIcon
                className={`${
                  paymentMethod == "card" ? "block" : "hidden"
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
}
