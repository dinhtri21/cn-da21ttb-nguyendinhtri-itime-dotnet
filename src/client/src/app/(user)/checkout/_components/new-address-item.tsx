import { CiEdit, CiTrash } from "react-icons/ci";
import * as React from "react";
import { useEffect, useState } from "react";
import { District, Province, Ward } from "@/types/customeraddress";
import { customerAddressApi } from "@/apis/customerAddressApi";
import { IoSaveOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import CustomToast from "@/components/react-toastify/reactToastify";
import Cookies from "js-cookie";

interface NewAddressItemProps {
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewAddressItem(props: NewAddressItemProps) {
  const customer = useSelector((state: RootState) => state.user);
  const token = Cookies.get("token");

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [ward, setWard] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [selectedWard, setSelectedWard] = useState<number | null>(null);

  const fetchProvinces = async () => {
    try {
      const res = await customerAddressApi.GetProvinces();
      setProvinces(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDistricts = async (provinceId: number) => {
    try {
      const res = await customerAddressApi.GetDistricts(provinceId);
      setDistricts(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWards = async (districtId: number) => {
    try {
      const res = await customerAddressApi.GetWards(districtId);
      setWard(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerCreateCustomerAddress = async () => {
    try {
      if (!selectedProvince || !selectedDistrict || !selectedWard) {
        CustomToast.showError("Vui lòng chọn đầy đủ thông tin địa chỉ!");
        return;
      }
      if (customer.customerId && token) {
        const data = {
          customerId: customer.customerId,
          addressLine: "123 abc",
          provinceId: selectedProvince,
          districtId: selectedDistrict,
          wardId: selectedWard,
          zipCode: "123",
          isDefault: false,
          province: String(
            provinces.find(
              (province) => province.provinceID === selectedProvince
            )?.provinceName || ""
          ),
          district: String(
            districts.find(
              (district) => district.districtID === selectedDistrict
            )?.districtName || ""
          ),
          ward: String(
            ward.find((ward) => Number(ward.wardCode) === selectedWard)?.wardName ||
              ""
          ),
        };
        await customerAddressApi.CreateCustomerAddress(data, token);
      }
      props.setIsFetching(true);
      CustomToast.showSuccess("Tạo địa chỉ mới thành công!");
    } catch (error) {
      CustomToast.showError("Tạo địa chỉ mới thất bại!");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  return (
    <div
      className={`flex flex-col gap-2 border-[0.5px] border-gray-300 py-3 px-4 rounded-xl cursor-pointer hover:bg-gray-50`}
    >
      <div className="flex gap-1 justify-between items-start">
        <div className="flex gap-1">
          <p className="font-semibold">Thêm địa chỉ mới</p>
        </div>
      </div>

      {/* Dropdown cho Tỉnh/Thành Phố */}
      <select
        className="flex border w-[250px]  px-1 py-1 rounded-md"
        value={selectedProvince || 0}
        onChange={(e) => {
          const provinceId = Number(e.target.value);
          setSelectedProvince(provinceId);
          setSelectedDistrict(null); // Reset quận khi thay đổi tỉnh
          fetchDistricts(provinceId);
        }}
      >
        <option value={0}>
          {selectedProvince
            ? provinces.find(
                (province) => province.provinceID === selectedProvince
              )?.provinceName
            : "Chọn Tỉnh / Thành Phố"}
        </option>
        {provinces?.map((province, index) => (
          <option key={index} value={Number(province.provinceID)}>
            {province.provinceName}
          </option>
        ))}
      </select>

      {/* Dropdown cho Quận/Huyện */}
      <select
        className="flex border w-[250px] px-1 py-1 rounded-md"
        value={selectedDistrict || 0} // Sử dụng 0 nếu không có quận nào được chọn
        onChange={(e) => {
          const districtId = Number(e.target.value);
          setSelectedDistrict(districtId); // Cập nhật state cho quận đã chọn
          setSelectedWard(null); // Reset xã khi thay đổi quận
          fetchWards(districtId);
        }}
      >
        <option value={0}>
          {selectedDistrict
            ? districts.find(
                (district) => district.districtID === selectedDistrict
              )?.districtName
            : "Chọn Quận / Huyện"}
        </option>
        {districts?.map((district, index) => (
          <option key={index} value={String(district.districtID)}>
            {district.districtName}
          </option>
        ))}
      </select>

      {/* Dropdown cho Xã/Phường */}
      <div className="flex sm:flex-row flex-col sm:justify-between gap-3 sm:gap-0 sm:items-center">
        <select
          className="flex border w-[250px] px-1 py-1 rounded-md"
          value={selectedWard || 0}
          onChange={(e) => {
            const wardId = Number(e.target.value);
            setSelectedWard(wardId);
          }}
        >
          <option value={0}>
            {selectedWard
              ? ward.find(
                  (district) => district.districtID === selectedDistrict
                )?.wardName
              : "Chọn Xã / Phường"}
          </option>
          {ward?.map((ward, index) => (
            <option key={index} value={Number(ward.wardCode)}>
              {ward.wardName}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2 self-end">
          <div
            onClick={handlerCreateCustomerAddress}
            className="flex gap-1 items-center text-sm text-green-500"
          >
            <IoSaveOutline className="w-5 h-5" />
            <span>Lưu</span>
          </div>
          <div
            onClick={() => props.setIsAdding(false)}
            className="flex gap-1 items-center text-sm text-gray-500 text-red-500"
          >
            <CiTrash className="w-5 h-5" />
            <span>Xoá</span>
          </div>
        </div>
      </div>
    </div>
  );
}
