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
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ]
  }
  
};

export default nextConfig;