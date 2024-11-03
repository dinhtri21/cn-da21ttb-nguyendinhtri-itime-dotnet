"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { CustomerAddress } from "@/types/customeraddress";
import { use, useEffect, useState } from "react";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import { BsBox2 } from "react-icons/bs";
import { Input } from "@/components/ui/input";

import NewAddressItem from "./new-address-item";
import { Customer } from "@/types/customer";
import CustomToast from "@/components/react-toastify/reactToastify";
import { customerAddressApi } from "@/apis/customerAddressApi";
import Cookies from "js-cookie";

interface customer {
  customerId: number | null;
  fullName: string | null;
  phoneNumber: string | null;
  email: string | null;
  address: string | null;
}
interface AlertDialogAddressProps {
  customer: customer;
  customerAddressList: CustomerAddress[];
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AlertDialogAddress = (props: AlertDialogAddressProps) => {
  const [isDefault, setIsDefault] = useState<Number>();
  const [isChosen, setIsChosen] = useState<Number>();
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const token = Cookies.get("token");

  const handleChooseAddress = (addressId: Number) => {
    setIsChosen(addressId);
  };

  const handlerOut = () => {
    handlerChooseFirtDefault();
    setIsAdding(false);
  };

  const handlerChooseFirtDefault = () => {
    const defaultAddress = props.customerAddressList?.find(
      (address) => address.isDefault
    );
    if (defaultAddress) {
      setIsChosen(defaultAddress.addressId);
      setIsDefault(defaultAddress?.addressId);
    }
  };

  const updateDefaultAddress = async () => {
    if (isChosen === isDefault) return;
    if (!token) {
      CustomToast.showError(
        "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại !"
      );
      return;
    }
    const address = props.customerAddressList.find(
      (address) => address.addressId === isChosen
    );
    if (!address) return;
    address.isDefault = true;
    try {
      const res = await customerAddressApi.UpdateCustomerAddress(
        address,
        token
      );
      CustomToast.showSuccess("Cập nhật địa chỉ mặc định thành công !");
      handlerOut();
      props.setIsFetching(true);
    } catch (error) {
      console.log(error);
      CustomToast.showError("Cập nhật địa chỉ mặc định thất bại !");
      handlerOut();
    }
  };

  useEffect(() => {
    handlerChooseFirtDefault();
    return () => {
      setIsChosen(undefined);
      setIsAdding(false);
    };
  }, [props.customerAddressList]);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex gap-1 items-center text-sm text-gray-500">
          <CiEdit className="w-5 h-5" />
          <span>Tuỳ chọn</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div>
          <div className="flex justify-between cursor-pointer">
            <AlertDialogTitle>Địa chỉ nhận hàng </AlertDialogTitle>
            <div
              onClick={() => {
                if (props.customerAddressList?.length >= 3) {
                  CustomToast.showError("Số lượng địa chỉ tối đa là 3 !");
                  return;
                }
                setIsAdding(true);
              }}
              className="flex gap-1 items-center"
            >
              <MdOutlineAddLocationAlt className="w-4 h-4" />
              Thêm
            </div>
          </div>
          <AlertDialogDescription>
            Chọn địa mặc định để nhận hàng hoặc thêm địa chỉ mới
          </AlertDialogDescription>
        </div>
        {props.customerAddressList?.map((address, index) => (
          <div
            key={index}
            onClick={() => handleChooseAddress(address.addressId)}
            className={`gap-1 border-[0.5px] border-gray-300  py-3 px-4 rounded-xl cursor-pointer hover:bg-gray-50`}
          >
            <div className="flex gap-1 justify-between items-start">
              <div className="flex gap-1">
                <p className="font-semibold">Địa chỉ {index + 1}</p>
              </div>
              {/* <div className="flex gap-1">
                        <p>{address.addressLine}</p> | <p>{address.zipCode}</p>
                    </div> */}
              {isChosen == address.addressId && (
                <span className="text-sm border bg-sky-50/70 border-sky-400 px-2 rounded-xl text-sky-400">
                  Mặc định
                </span>
              )}
            </div>
            <p>{address.province}</p>
            <p>{address.district}</p>
            <div className="flex justify-between items-center">
              <p>{address.ward}</p>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 items-center text-sm text-gray-500">
                  <CiEdit className="w-5 h-5" />
                  <span>Sửa</span>
                </div>
                <div className="flex gap-1 items-center text-sm text-gray-500 text-red-500">
                  <CiTrash className="w-5 h-5" />
                  <span>Xoá</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isAdding && (
          <NewAddressItem
            isFetching={props.isFetching}
            setIsFetching={props.setIsFetching}
            isAdding={isAdding}
            setIsAdding={setIsAdding}
          />
        )}
        {props.customerAddressList?.length === 0 && !isAdding ? (
          <div className="min-h-[200px]">
            <p>Chưa có địa chỉ!</p>
          </div>
        ) : null}

        <AlertDialogFooter className="flex justify-between">
          <AlertDialogCancel onClick={handlerOut}>Huỷ bỏ</AlertDialogCancel>
          <AlertDialogAction onClick={updateDefaultAddress}>
            Lưu
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
function setIsFetching(arg0: boolean) {
  throw new Error("Function not implemented.");
}
