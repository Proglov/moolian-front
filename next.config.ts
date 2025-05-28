import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: 'storage.c2.liara.space',
        pathname: '/moolian-image/**',
      }
    ],
  },
};

export default {
  ...nextConfig
};
