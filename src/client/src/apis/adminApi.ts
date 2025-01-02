import axiosConfig from "@/lib/axiosConfig";
import { AdminLoginRes } from "@/types/admin";

const AdminApi = {
  async loginAdmin(email: string, password: string): Promise<AdminLoginRes> {
    const res = await axiosConfig.post("/admin/login", {
      adminEmail: email,
      adminPassword: password,
    });
    return res.data;
  },
};
export default AdminApi;
