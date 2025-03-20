import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // whitelist host location of image files 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:"res.cloudinary.com"
      }
    ]
  }
  
};

export default nextConfig;