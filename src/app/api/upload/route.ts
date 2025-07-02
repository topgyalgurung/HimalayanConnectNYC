// import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
// import cloudinary from "cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { checkRateLimit } from "@/app/lib/rate-limit";

export const dynamic = 'force-dynamic';  

// Configure Cloudinary
// cloudinary.v2.config({
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
export async function POST(req: NextRequest) {
  // if (req.method !== "POST") {
  //   return res.status(405).json({ error: "Method Not Allowed" });
  // }

  try {
    // Get client IP from request headers
    const forwardedFor = req.headers.get('x-forwarded-for')
    const ip = forwardedFor?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown'
    
    // Check rate limit
    const rateLimitResult = await checkRateLimit(ip)
    if (rateLimitResult) return rateLimitResult

    const data = await req.json();
    const file = data.image; // Base64 image string

    // const uploadedImage = await cloudinary.v2.uploader.upload(file, {
    const uploadedImage = await cloudinary.uploader.upload(file, {
      folder: "himalayan_connect",
    });

    return NextResponse.json({ imageUrl: uploadedImage.secure_url });
  } catch (error) {
    return NextResponse.json(
      { error: "Upload failed", details: error },
      { status: 500 }
    );
  }
}