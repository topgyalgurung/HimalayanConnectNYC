import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Cookie-based i18n (en / ne / bo) via next-intl; see src/i18n/request.ts.
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
  // whitelist host location of image files
  experimental: {
    cssChunking: 'strict', // Enables strict CSS chunking for better performance and smaller bundle sizes
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ]
  },
};

export default withNextIntl(nextConfig);
