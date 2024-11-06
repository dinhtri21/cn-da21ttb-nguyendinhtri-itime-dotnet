import axiosConfig from "@/lib/axiosConfig";
import {
  CreateCustomerAddress,
  CustomerAddress,
  District,
  Province,
  Ward,
} from "@/types/customeraddress";

export const customerAddressApi = {
  async GetCustomerAddress(
    customerId: number,
    token: string
  ): Promise<CustomerAddress[]> {
    const res = await axiosConfig.get(
      `/customer-address/customer/${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },
  async CreateCustomerAddress(
    data: CreateCustomerAddress,
    token: string
  ): Promise<CustomerAddress> {
    const res = await axiosConfig.post(`/customer-address`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  async UpdateCustomerAddress(
    data: CustomerAddress,
    token: string
  ): Promise<CustomerAddress> {
    const res = await axiosConfig.put(
      `/customer-address/${data.addressId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  },
  async DeleteCustomerAddress(addressId: number, token: string): Promise<any> {
    const res = await axiosConfig.delete(`/customer-address/${addressId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },

  async GetProvinces(): Promise<Province[]> {
    const res = await axiosConfig.get(`/customer-address/provinces`);
    return res.data;
  },
  async GetDistricts(provinceId: number): Promise<District[]> {
    const res = await axiosConfig.get(`/customer-address/districts`, {
      params: {
        provinceId: provinceId,
      },
    });
    return res.data;
  },
  async GetWards(districtId: number): Promise<Ward[]> {
    const res = await axiosConfig.get(`/customer-address/wards`, {
      params: {
        districtId: districtId,
      },
    });
    return res.data;
  },
};
