import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const file = req.body.image; // Base64 image string

    const uploadedImage = await cloudinary.v2.uploader.upload(file, {
      folder: "himalayan_connect",
    });

    res.status(200).json({ imageUrl: uploadedImage.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Upload failed", details: error });
  }
}