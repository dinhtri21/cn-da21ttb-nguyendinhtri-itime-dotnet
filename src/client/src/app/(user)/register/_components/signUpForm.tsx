"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateCustomerForm,
  CreateCustomer,
} from "@/validations/customer.chema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { customerApi } from "@/apis/customerApi";
import { useToast } from "@/hooks/use-toast";

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

export function SignUpForm() {
  
  interface Province {
    Id: string;
    Name: string;
    Districts: District[];
  }
  interface District {
    Id: string;
    Name: string;
    Wards: Ward[];
  }
  interface Ward {
    Id: string;
    Name: string;
  }

  const { toast } = useToast();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const { register, handleSubmit, setValue, formState: { errors },
  } = useForm<CreateCustomerForm>({
    mode: "onSubmit",
    resolver: zodResolver(CreateCustomerForm), // Sử dụng zodResolver với schema CreateCustomer
  });

  //// Xử lý submit form
  const onSubmit = async (data: CreateCustomerForm) => {
    const createCustomerData: CreateCustomer = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      password: data.password,
      address: `${data.province}, ${data.district}, ${data.ward}`,
    };

    try {
      const res = await customerApi.createCustomer(createCustomerData);
      if (res) {
        toast({
          title: "Tạo tài khoản thành công",
          // description: `Chào mừng ${res.data.fullName} đã tham gia cùng chúng tôi!`,
          description: `Chào mừng đã tham gia cùng chúng tôi!`,
        });
      }
    } catch (error) {
      toast({
        title: "Tạo tài khoản thất bại!",
        variant: "destructive",
        description: "Vui lòng thử lại sau.",
      });
      console.error("Error creating customer:", error);
    }
  };

  const onError = (errors: any) => {
    console.error("Validation errors:", errors);
  };

  //// Fetch dữ liệu về tỉnh/thành phố, huyện/quận, xã/phường
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Cập nhật districts khi selectedProvince thay đổi
    const selectedProvinceData = provinces.find(
      (province) => province.Name === selectedProvince
    );
    setDistricts(selectedProvinceData ? selectedProvinceData.Districts : []);
    setSelectedDistrict("");
    setSelectedWard("");
  }, [selectedProvince, provinces]);

  useEffect(() => {
    const selectedDistrictData = districts.find(
      (district) => district.Name === selectedDistrict
    ) || { Wards: [] };
    districts.find((district) => district.Name === selectedDistrict) || {};
    setWards(selectedDistrictData.Wards || []);
    setSelectedWard("");
  }, [selectedDistrict, districts]);

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setValue("province", value);
  };
  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setValue("district", value);
  };
  const handleWardChange = (value: string) => {
    setSelectedWard(value);
    setValue("ward", value);
  };

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="text-lg">Đăng ký</CardTitle>
        <CardDescription>
          {/* Enter your information to create an account */}
          Nhập thông tin của bạn để tạo tài khoản.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex  flex-col justify-start gap-2">
              <Label htmlFor="first-name">Họ và tên</Label>
              <Input
                {...register("fullName")}
                id="first-name"
                placeholder="Nguyễn Văn A"
                required
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col justify-start gap-2">
              <Label htmlFor="phoneNumber">Số điện thoại</Label>
              <Input
                {...register("phoneNumber")}
                id="phoneNumber"
                placeholder="0938783784"
                required
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-500">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* <div className="col-span-2 grid gap-2">
              <Label htmlFor="province">Địa chỉ</Label>
              <Select
                onValueChange={handleProvinceChange}
                value={selectedProvince}
                {...register("province")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn tỉnh/thành phố" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {provinces &&
                      provinces.map((province) => {
                        return (
                          province && (
                            <SelectItem
                              key={province?.Id}
                              value={province?.Name}
                            >
                              {province?.Name}
                            </SelectItem>
                          )
                        );
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                onValueChange={handleDistrictChange}
                value={selectedDistrict}
                {...register("district")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn quận/huyện" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {districts &&
                      districts.map((district) => {
                        return (
                          district && (
                            <SelectItem
                              key={district?.Id}
                              value={district?.Name}
                            >
                              {district?.Name}
                            </SelectItem>
                          )
                        );
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                onValueChange={handleWardChange}
                value={selectedWard}
                {...register("ward")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn xã/phường" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {wards &&
                      wards.map((ward) => {
                        return (
                          ward && (
                            <SelectItem key={ward?.Id} value={ward?.Name}>
                              {ward?.Name}
                            </SelectItem>
                          )
                        );
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}

            <div className="grid col-span-2 gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid col-span-2 gap-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                {...register("password")}
                id="password"
                type="password"
                required
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full col-span-2 text-white bg-black">
              Tạo tài khoản
            </Button>
            {/* <Button variant="outline" className="w-full col-span-2">
              Sign up with GitHub
            </Button> */}
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Đã có tài khoản?{" "}
          <Link href="/login" className="underline">
            Đăng nhập
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
