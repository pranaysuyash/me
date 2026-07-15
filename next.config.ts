import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/pranaysuyash/SentinelTwin/**",
      },
    ],
  },
};

export default nextConfig;
