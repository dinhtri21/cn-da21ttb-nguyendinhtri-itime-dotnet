/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Tăt chế độ strict mode
  images: {
    domains: ["dummyimage.com", "localhost", "product.hstatic.net","cdn.tgdd.vn"], 
  },
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL, // Định nghĩa biến môi trường cho client side
  }
};

export default nextConfig;
