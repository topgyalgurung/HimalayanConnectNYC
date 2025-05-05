"use server";

import { Resource } from "@prisma/client";
// next js server action has default body size limit of 1mb 
// option1: increase body size limit by configuring next.config.js 
// option 2: use cloudinary or another file storage solution , then save url of the uploaded file in your database 
// cloudinary: free 10gb storage

// NOTE: Server action vs api routes 
// Server Actions are best for form submissions and other server-side mutations within the Next.js application itself, offering a more direct integration with React components.
// API Routes, on the other hand, are more flexible and suitable for building public APIs, handling external interactions, and managing complex routing scenarios

import prisma from "../lib/prisma";
import { getSession } from '@/app/lib/session';
import { parse } from "date-fns";
// Define strong input typing for clarity and safety
interface EditResourceInput {
  name: string;
  address: string;
  resourceId: string;
  categoryId: string | null;
  city?: string | null;
  openDays?: string | null;
  openTime?: string | null;
  closeTime?: string | null;
  phone?: string | null;
  email?: string | null;
  url?: string | null;
  facebookLink?: string | null;
  description?: string | null;
  image?: string | null;
};


export async function getCategories() {
  try {
    return await prisma.resourceCategory.findMany();
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return [];
  }
}

// Server action 
// use zod for form validation 
export async function addResource(formData: FormData) {
  if (!formData) {
    return {error: "No form data received"}
  }
  const session = await getSession();
  // check if session exists, otherwise deny access
  if (!session || !session?.userId) {
    return { error: "Unauthorized. Please log in to suggest an edit " }; // output status: 401
  }
// check if access to user email, make sure access on server 
  // client side hacker can use any email to update record of another user 
  const currentUserId = parseInt(session.userId, 10);

  try {
    const data = Object.fromEntries(formData.entries()) as any;
    const { name, address, categoryId } = data;
    if (!name || !address) {
      return { error: "Name and Address are required." };
    }

    const parsedCategoryId = categoryId
      ? parseInt(categoryId, 10)
      : null;
    
      const newResource = await prisma.resource.create({
        data: {
          createdById: currentUserId,
          name,
          address,
          categoryId:parsedCategoryId,
          city: data.city as string | null,
          openDays: data.openDays as string | null,
          openTime: data.openTime
            ? parse(data.openTime, "hh:mm a", new Date())
            : null,
          closeTime: data.closeTime
            ? parse(data.closeTime, "hh:mm a", new Date())
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

// Server action for edit form 
export async function addEditResource(formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" };
  }
  // using my custom session not next-auth
  const session = await getSession(); 

  if (!session || !session?.userId) {
    return { error: "Unauthorized. Please log in to suggest an edit " };
  }

  const userId = parseInt(session.userId, 10);

  const data = Object.fromEntries(formData.entries()) as unknown as EditResourceInput;
  console.log("form data received for edit: ", data);
  if (!data || Object.keys(data).length === 0) {
    return { error: "No form data received" };
  }
  
  const {  name, address, phone, url,openDays, openTime, closeTime } = data;
  const resourceId = parseInt(data.resourceId as string, 10);
  if (isNaN(resourceId)) {
    return { error: "Invalid or missing resource ID" };
  }

  try {
    const editResource = await prisma.resourceEditSuggestion.create({
      data: {
        suggestedById:userId, // attach the logged in user's Id(user from session)
        resourceId,
        name: name || "Untitled",
        address: address || "Unknown",
        phone: phone || null,
        url: url || null,
        openDays: openDays || null,
        openTime: openTime
        ? parse(openTime, "hh:mm a", new Date())
        : null,
      closeTime: closeTime
        ? parse(closeTime, "hh:mm a", new Date())
        : null,
        status:"PENDING"
      }
    })
  
    return {
      success: "resource edit submitted successfully, ",
      resourceEditSuggestion: editResource,
    }
    
  } catch (error) {
    console.error("Error submitting edit resource: ", error);
    return { error: "Failed to submit edit resource" };
  }
 
}
