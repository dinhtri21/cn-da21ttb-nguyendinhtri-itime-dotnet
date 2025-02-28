import "dotenv/config";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Tắt chế độ strict mode
  images: {
    domains: [
      "localhost",
      process.env.API_URL.replace(/^https?:\/\//, ""), // Loại bỏ http:// để tránh lỗi domains
      "dummyimage.com",
      "product.hstatic.net",
      "cdn.tgdd.vn",
    ],
  },
  env: {
    API_URL: process.env.API_URL, // Inject API_URL vào môi trường Next.js
  },
};

export default nextConfig;
