/**
 * Server Action for Fetching Resources
 * 
 * This server action fetches resources from the database with proper filtering
 * and includes related data like categories, locations, and user likes.
 */

import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";
import type { Resource } from "@/app/lib/types";
import { ResourceStatus } from "@prisma/client";

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
      status: ResourceStatus.APPROVED // Only show approved resources
    };

    const resources = await prisma.resource.findMany({
      where,
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
      rating: Number(resource.rating),
      Location: resource.Location.map(loc => ({
        ...loc,
        latitude: loc.latitude ? Number(loc.latitude) : null,
        longitude: loc.longitude ? Number(loc.longitude) : null,
      })),
      createdAt: resource.createdAt,
      openTime: resource.openTime || null,
      closeTime: resource.closeTime || null,
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