/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Tăt chế độ strict mode
  images: {
    domains: ["dummyimage.com", "localhost", "product.hstatic.net"], // Thêm các hostname cần thiết ở đây
  },
};

export default nextConfig;
