"use server";

import { prisma } from "../lib/prisma";

export async function getUserData(userId: string) {
  try {
    // Convert string ID to number as per our memory about consistent ID handling
    const userIdNum = parseInt(userId, 10);
    if (isNaN(userIdNum)) {
      console.error("Invalid user ID format:", userId);
      return null;
    }

    const userData = await prisma.user.findUnique({
      where: { id: userIdNum },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!userData) {
      console.warn("No user found for ID:", userIdNum);
      return null;
    }

    // Format dates for client consumption
    return {
      ...userData,
      createdAt: userData.createdAt.toISOString(),
      updatedAt: userData.updatedAt.toISOString()
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
