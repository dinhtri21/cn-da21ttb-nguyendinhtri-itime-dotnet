import { z } from "zod";
export const CreateCustomerForm = z.object({
  fullName: z
    .string({ message: "Tên kiểu chuỗi" })
    .min(1, { message: "Vui lòng nhập tên!" }),
  phoneNumber: z.string().min(1, { message: "Vui lòng nhập số điện thoại!" }),
  email: z.string().email({ message: "Email không hợp lệ!" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự!" }),
  province: z.string().min(1, { message: "Vui lòng nhập thành phố!" }),
  district: z.string().min(1, { message: "Vui lòng nhập huyện/quận!" }),
  ward: z.string().min(1, { message: "Vui lòng nhập xã/phường!" }),
});

export type CreateCustomerForm = z.infer<typeof CreateCustomerForm>;

//
export const CreateCustomer = z.object({
  fullName: z
    .string({ message: "Tên kiểu chuỗi" })
    .min(1, { message: "Vui lòng nhập tên!" }),
  phoneNumber: z.string().min(1, { message: "Vui lòng nhập số điện thoại!" }),
  email: z.string().email({ message: "Email không hợp lệ!" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự!" }),
  address: z.string().min(1, { message: "Vui lòng nhập địa chỉ!" }),
});

export type CreateCustomer = z.infer<typeof CreateCustomer>;

