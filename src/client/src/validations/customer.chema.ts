import { z } from "zod";

// Create Customer Form
export const CreateCustomerForm = z.object({
  fullName: z
    .string({ message: "Tên kiểu chuỗi" })
    .min(1, { message: "Vui lòng nhập tên!" }),
  phoneNumber: z.string().min(1, { message: "Vui lòng nhập số điện thoại!" }),
  email: z.string().email({ message: "Email không hợp lệ!" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự!" }),
});

export type CreateCustomerForm = z.infer<typeof CreateCustomerForm>;

// Create Customer Request
export const CreateCustomer = z.object({
  fullName: z
    .string({ message: "Tên kiểu chuỗi" })
    .min(1, { message: "Vui lòng nhập tên!" }),
  phoneNumber: z.string().min(1, { message: "Vui lòng nhập số điện thoại!" }),
  email: z.string().email({ message: "Email không hợp lệ!" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự!" }),
});

export type CreateCustomer = z.infer<typeof CreateCustomer>;

// Login Customer Request
export const CustomerLoginRequest = z.object({
  email: z.string().email({ message: "Email không hợp lệ!" }),
  password: z.string().min(3, { message: "Mật khẩu phải có ít nhất 3 ký tự!" }),
});

export type CustomerLoginRequest = z.infer<typeof CustomerLoginRequest>;

// Customer Login Response
export const CustomerLoginResponse = z.object({
  token: z.string(),
  customer: z.object({
    customerId: z.number(),
    fullName: z.string(),
    phoneNumber: z.string(),
    email: z.string().email(),
    address: z.string(),
  }),
});

export type CustomerLoginResponse = z.infer<typeof CustomerLoginResponse>;

// Customer Response
export const CustomerResponse = z.object({
  customerId: z.string(),
  fullName: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  address: z.string(),
});

export type CustomerResponse = z.infer<typeof CustomerResponse>;
