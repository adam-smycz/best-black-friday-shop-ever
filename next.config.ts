import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/best-black-friday-shop-ever',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
