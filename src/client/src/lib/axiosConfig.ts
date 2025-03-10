import axios, { AxiosResponse, AxiosInstance } from "axios";

const axiosConfig = axios.create({
  baseURL: `${process.env.API_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
    // Thêm các header khác nếu cần
  },
  withCredentials: true, // Gửi cookie kèm theo mỗi request hoặc cho phép nhận cookie từ server (phải enable CORS ở server)
});

// axiosConfig.interceptors.response.use(
//     (response) => response.data,
//     (error) => Promise.reject(error)
// );

export default axiosConfig;
