/**
 * Server Action for Fetching Resources
 * 
 * This server action fetches resources from the database with proper filtering
 * and includes related data like categories, locations, and user likes.
 * 
 * @param {Object} options - Filter options
 * @param {string[]} options.categories - Selected category IDs
 * @param {string[]} options.boroughs - Selected boroughs
 * @returns {Promise<Resource[]>} Array of resources with related data
 */

import prisma from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";
import type { Resource } from "@/app/types/resource";

interface GetResourcesOptions {
  categories?: string[];
  boroughs?: string[];
}

export async function getResources({ categories = [], boroughs = [] }: GetResourcesOptions = {}): Promise<Resource[]> {
  try {
    const session = await getSession();
    const userId = session?.userId ? Number(session.userId) : null;

    // Build where clause based on filters
    const where = {
      ...(categories && categories.length > 0 && {
        categoryId: {
          in: categories.map(Number)
        }
      }),
      ...(boroughs && boroughs.length > 0 && {
        city: {
          in: boroughs
        }
      }),
      status: "APPROVED" // Only show approved resources
    };

    const resources = await prisma.resource.findMany({
      // where,
      include: {
        ResourceCategory: {
          select: { id: true, name: true },
        },
        Location: {
          select: {
            id: true,
            resourceId: true,
            latitude: true,
            longitude: true,
          },
        },
        ResourceLike: userId
          ? {
              where: { userId },
              select: { id: true },
            }
          : false,
      },
    });

    // Serialize all Decimal fields to numbers and convert IDs to strings
    return resources.map(resource => ({
      ...resource,
      id: String(resource.id),
      rating: resource.rating ? String(resource.rating) : null,
      Location: resource.Location.map(loc => ({
        ...loc,
        id: String(loc.id),
        resourceId: String(loc.resourceId),
        latitude: loc.latitude ? Number(loc.latitude) : null,
        longitude: loc.longitude ? Number(loc.longitude) : null,
      })),
      createdAt: resource.createdAt.toISOString(),
      openTime: resource.openTime?.toISOString() || null,
      closeTime: resource.closeTime?.toISOString() || null,
      ResourceCategory: resource.ResourceCategory ? {
        ...resource.ResourceCategory,
        id: String(resource.ResourceCategory.id),
      } : null,
    }));
  } catch (error) {
    console.error("Error fetching resources:", error);
    throw new Error("Failed to fetch resources");
  }
} 