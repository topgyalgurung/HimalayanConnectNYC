// add a new resource
// •	This allows you to handle file uploads and save image URLs to the database
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/app/lib/prisma"; // Adjust path

export default async function handler(req, res) {
  if (req.method === "POST") {
    // check session server side next.auth
    const session = await getServerSession();
    try {
      const { name, description, imageUrl } = req.body;

      // Save to database
      const resource = await prisma.resource.create({
        data: {
          name,
          description,
          imageUrl,
        },
      });

      res.status(201).json(resource);
    } catch (error) {
      res.status(500).json({ error: "Failed to save resource" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}