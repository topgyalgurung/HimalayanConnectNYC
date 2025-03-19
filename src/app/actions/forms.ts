"use server";

// next js server action has default body size limit of 1mb 
// option1: increase body size limit by configuring next.config.js 
// option 2: use cloudinary or another file storage solution , then save url of the uploaded file in your database 
// cloudinary: free 10gb storage

import prisma from "../lib/prisma";


export async function getCategories() {
  try {
    return await prisma.resourceCategory.findMany();
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return [];
  }
}

export async function addResource(formData: FormData) {
  console.log("Received FormData entries: ", Object.fromEntries(formData)); // Debug log
  try {
    const name = formData.get("name") as string;
    const categoryId = formData.get("categoryId")
      ? parseInt(formData.get("categoryId") as string, 10)
      : null;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string | null;
    const openDays = formData.get("openDays") as string | null;
    const openTime = formData.get("openTime")
      ? new Date(`1970-01-01T${formData.get("openTime")}:00Z`)
      : null;
    const closeTime = formData.get("closeTime")
      ? new Date(`1970-01-01T${formData.get("closeTime")}:00Z`)
      : null;
    const phone = formData.get("phone") as string | null;
    const email = formData.get("email") as string | null;
    const url = formData.get("url") as string | null;
    const facebookLink = formData.get("facebookLink") as string | null;
    const description = formData.get("description") as string | null;
    const image = formData.get("image") as string | null;

    if (!name || !address ) {
      return { error: "Name, Address are required" };
    }


    const newResource = await prisma.resource.create({
      data: {
        name,
        address,
        categoryId,
        city,
        openDays,
        openTime,
        closeTime,
        phone,
        email,
        url,
        facebookLink,
        description,
        status: "PENDING",
        imageUrl: image, // Store Cloudinary URL
      },
    });
    /**
     * Prisma returns the rating field as a Decimal object (from the @db.Decimal(2, 1) in your schema), 
     * but Next.js Server Actions can only return plain JavaScript objects to Client Components. 
     * The Decimal type from Prisma isn’t serializable by default in this context.
     */
    // Convert Decimal to plain number before returning
    const serializedResource = {
      ...newResource,
      rating: newResource.rating.toNumber(), // Convert Prisma Decimal to number
    };

    return { success: "resource added successfully", resource: serializedResource };
  } catch (error) {
    console.error("Error adding resource: ", error);
    return { error: "Failed to add resource" };
  }
}
