import axios, { AxiosResponse, AxiosInstance } from "axios";

const BASE_URL = "http://localhost:5288/api/";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
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
