import exp from "constants";

export type CustomerAddress = {
  addressId: number;
  customerId: number;
  addressLine: string;
  provinceId: number;
  province: string;
  district: string;
  districtId: number;
  ward: string;
  wardId: number;
  zipCode: string;
  isDefault: Boolean;
  createdAt: string;
};

export type CreateCustomerAddress = {
  customerId: number;
  addressLine: string;
  province: string;
  provinceId: number;
  district: string;
  districtId: number;
  ward: string;
  wardId: number;
  isDefault: boolean;
};

export type Province = {
  provinceID: number;
  provinceName: string;
};

export type District = {
  districtID: number;
  provinceID: number;
  districtName: string;
};

export type Ward = {
  wardCode: string;
  districtID: number;
  wardName: string;
};
