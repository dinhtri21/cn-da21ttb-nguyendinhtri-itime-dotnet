/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Tăt chế độ strict mode
  images: {
    domains: ["http://165.154.248.156:5288","dummyimage.com", `${process.env.NEXT_PUBLIC_API_URL}`, "product.hstatic.net","cdn.tgdd.vn"], 
  },
};

export default nextConfig;
