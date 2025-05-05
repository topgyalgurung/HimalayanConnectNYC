import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // whitelist host location of image files 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:"res.cloudinary.com"
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
      },

      // {
      //   protocol: "https",
      //   hostname: "lh3.googleusercontent.com",
      // },
    ]
  },
  // i18n: {
  //   locales: ['en', 'ne'],
  //   defaultLocale:'en',
  // }
  
};

export default nextConfig;