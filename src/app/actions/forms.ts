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

  const data = Object.fromEntries(formData.entries());
  console.log("Received FormData entries: ", data); // Debug log
  try {
    const name = data.name as string;
    const address = data.address as string;
    if (!name || !address) {
      return { error: "Name and Address are required." };
    }

    const categoryId = data.categoryId
      ? parseInt(data.categoryId as string, 10)
      : null;
    
      const newResource = await prisma.resource.create({
        data: {
          name,
          address,
          categoryId,
          city: data.city as string | null,
          openDays: data.openDays as string | null,
          openTime: data.openTime
            ? new Date(`1970-01-01T${data.openTime}:00Z`)
            : null,
          closeTime: data.closeTime
            ? new Date(`1970-01-01T${data.closeTime}:00Z`)
            : null,
          phone: data.phone as string | null,
          email: data.email as string | null,
          url: data.url as string | null,
          facebookLink: data.facebookLink as string | null,
          description: data.description as string | null,
          imageUrl: data.image as string | null, // Cloudinary URL if used
          status: "PENDING",
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
