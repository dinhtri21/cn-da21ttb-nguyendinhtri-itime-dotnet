import { z } from "zod";

export const CreateCustomer = z.object({
  fullName: z
    .string({ message: "Tên kiểu chuỗi" })
    .min(1, { message: "Vui lòng nhập tên!" }),
  phoneNumber: z.string().min(1, { message: "Vui lòng nhập số điện thoại" }),
  address: z.string().min(1, { message: "Vui lòng nhập địa chỉ" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

export type CreateCustomer = z.infer<typeof CreateCustomer>;
