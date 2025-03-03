"use client";
import { CheckIcon, Pencil2Icon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";
import { AlertDialogAddress } from "./alert-dialog-adress";
import Image from "next/image";
import { GiReceiveMoney } from "react-icons/gi";
import { customerAddressApi } from "@/apis/customerAddressApi";
import Cookies from "js-cookie";
import { CustomerAddress } from "@/types/customeraddress";
import shippingApi from "@/apis/shippingApi";
import CustomToast from "@/components/react-toastify/reactToastify";
import { FaCreditCard } from "react-icons/fa";

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

type LeadTime = {
  leadtime: number;
  fromEstimateDate: string;
  toEstimateDate: string;
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
  leadTime: LeadTime | null;
  setLeadTime: React.Dispatch<React.SetStateAction<LeadTime | null>>;
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
  leadTime,
  setLeadTime,
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
          Weight: 1000,
          Width: 10,
        },
        token
      );
      setShippingFee(res.total);
      setLeadTime({
        leadtime: res.leadtime,
        fromEstimateDate: res.fromEstimateDate,
        toEstimateDate: res.toEstimateDate,
      });

    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN"); // Định dạng ngày theo tiếng Việt
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
      <div className=" bg-background md:pt-5 md:py-6 py-3 rounded-xl ">
        <div className="border-b">
          <h1 className=" text-sm md:text-base font-medium uppercase flex gap-2 items-center">
            {/* <CiLocationOn className="w-5 h-5 " /> */}
            <span>Địa chỉ nhận hàng</span>
          </h1>
          <div className="gap-1 py-3 px-4 rounded-xl">
            <div className="flex gap-1 justify-between items-start">
              <div className="flex gap-1 text-gray-700">
                <p className="text-gray-700 text-sm md:text-base">
                  {customer.fullName ? customer.fullName : "Chưa có"}
                </p>
                <p className="text-sm md:text-base">
                  |
                </p>
                <p className="text-gray-700 text-sm md:text-base">
                  {customer.phoneNumber ? customer.phoneNumber : "Chưa có"}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center gap-1 text-gray-600">
              <p className="text-sm md:text-base">{customer.email ? customer.email : "Chưa có"}</p>
              <AlertDialogAddress
                customer={customer}
                customerAddressList={customerAddressList}
                isFetching={isFetching}
                setIsFetching={setIsFetching}
              />
            </div>
            <div className="flex justify-between items-center ">
              {customerAddressList.length > 0 ? (
                <p className="text-sm md:text-base">
                  {selectedAddress?.province},{""} {selectedAddress?.district},{" "}
                  {""}
                  {selectedAddress?.ward}
                </p>
              ) : (
                <p>Vui lòng thêm địa chỉ để thanh toán!</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-3 md:mt-5 border-b">
          <h1 className="text-sm md:text-base font-medium uppercase  flex items-center gap-2">
            <span>Phương thức thanh toán</span>
          </h1>
          <div className="flex flex-col rounded-xl py-3 md:py-0">
            <label
              className={`flex flex-1 items-center justify-between gap-3 py-1 md:py-3 px-3 rounded-xl cursor-pointer`}
              onClick={() => handlePaymentMethodChange({ id: 2, name: "COD" })}
            >
              <div className="flex gap-2 items-center">
                <div className="bg-slate-200 rounded-full h-[36px] w-[36px] md:h-[42px] md:w-[42px] flex items-center justify-center">
                  <GiReceiveMoney className="w-4 h-4 md:w-6 md:h-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm md:text-base">COD</p>
                  <div className="text-gray-500 text-sm md:text-base">Thanh toán khi nhận hàng.</div>
                </div>
              </div>
              <div
                className={`${selectedPaymentMethod.name == "COD"
                  ? "border-green-300 bg-green-100 "
                  : "border-gray-300"
                  } w-5 h-5 rounded-full  border flex items-center justify-center`}
              >
                <CheckIcon
                  className={`${selectedPaymentMethod.name == "COD"
                    ? "block text-green-400"
                    : "hidden"
                    } -translate-x-[0px] w-4 h-4`}
                />
              </div>
            </label>

            <label
              className={`flex flex-1 items-center justify-between gap-3 py-1 md:py-3 px-3 rounded-xl cursor-pointer`}
            // onClick={() =>
            //   handlePaymentMethodChange({ id: 1, name: "Credit Card" })
            // }
            >
              <div className="flex gap-2 items-center">
                <div className="bg-slate-200 rounded-full  h-[36px] w-[36px] md:h-[42px] md:w-[42px] flex items-center justify-center">
                  <FaCreditCard className="w-4 h-4 md:w-6 md:h-6 text-gray-400" />
                </div>
                <div>
                  <div className="flex gap-1 text-sm md:text-base">
                    <p>Thẻ ngân hàng</p>
                  </div>
                  <div className="text-gray-500 text-sm md:text-base">
                    Tính đăng đang phát triển.
                  </div>
                </div>
              </div>
              <div
                className={`${selectedPaymentMethod.name == "Credit Card"
                  ? "border-green-300 bg-green-100 "
                  : "border-gray-300"
                  } w-5 h-5 rounded-full border flex items-center justify-center`}
              >
                <CheckIcon
                  className={`${selectedPaymentMethod.name == "Credit Card"
                    ? "block text-green-400"
                    : "hidden"
                    } -translate-x-[0px] w-4 h-4`}
                />
              </div>
            </label>
            {/* <div className="py-2 px-3 rounded-xl cursor-pointer">Thêm phương thức thanh toán</div> */}
          </div>
        </div>
        <div className="mt-3 md:mt-5">
          <h1 className="text-sm md:text-base font-medium uppercase flex gap-2 items-center">
            {/* <CiDeliveryTruck className="w-5 h-5 " /> */}
            <span>Phương thức vận chuyển</span>
          </h1>
          <div className="  py-2 px-3 rounded-xl flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Image
                src="/logo/ghn-logo.jpg"
                width={42}
                height={42}
                className="rounded-full h-[36px] w-[36px] md:h-[42px] md:w-[42px] opacity-90"
                alt="ghtk"
              />
              <div>
                <div className="flex gap-2 text-gray-600">
                  <p className="text-gray-900 text-sm md:text-base">Giao hàng nhanh</p>
                </div>
                <div className="flex gap-1 text-gray-500">
                  <p className="hidden md:flex">Nhận hàng vào ngày </p>
                  <p className="text-sm md:text-base">{leadTime?.fromEstimateDate ? formatDate(leadTime.fromEstimateDate) : "..."}</p>
                  <p className="text-sm md:text-base">đến </p>
                  <p className="text-sm md:text-base">
                    {leadTime?.toEstimateDate ? formatDate(leadTime.toEstimateDate) : "..."}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-customOrange text-sm md:text-base">
              {shippingFee.toLocaleString()}đ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutInfo;
