import { Role } from "./role";

export type Admin = {
  adminId: number;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  adminRoles: Role[];
  createdAt: string;
};

export type AdminLoginRes = {
  accessToken: string;
  admin: Admin;
};
