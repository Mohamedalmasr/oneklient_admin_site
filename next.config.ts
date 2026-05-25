import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,  
  images: {
    unoptimized: true,     
  },
  turbopack: {},
};

export default nextConfig;