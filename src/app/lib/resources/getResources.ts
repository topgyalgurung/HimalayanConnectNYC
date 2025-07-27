/**
 * Server Action for Fetching Resources
 * 
 * This server action fetches resources from the database with proper filtering
 * and includes related data like categories, locations, and user likes.
 */

// todo: move both into one resource.ts 

import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";
import type { Resource } from "@/app/lib/definitions";
import { ResourceStatus } from "@prisma/client";

type GetResourcesOptions = {
  categories?: number[];
  boroughs?: string[];
  query?: string;
  currentPage?: number;
};

// getResources

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



const ITEMS_PER_PAGE = 6;


export async function fetchFilteredResources({
  categories = [],
  boroughs = [],
  query = "",
  currentPage = 1,
}: GetResourcesOptions = {}): Promise<Resource[]> {
  try {
    const session = await getSession();
    const userId = session?.userId ? Number(session.userId) : null;

    // Calculate pagination
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;

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
      skip,
      take: ITEMS_PER_PAGE,
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

    // Transform the data to match the Resource type
    return resources.map(resource => {
      const locations: Location[] = resource.Location.map(loc => ({
        id: Number(loc.id),
        latitude: Number(loc.latitude),
        longitude: Number(loc.longitude),
      }));

      return {
        id: String(resource.id),
        name: resource.name,
        description: resource.description || null,
        address: resource.address || null,
        city: resource.city || null,
        phone: resource.phone || null,
        email: resource.email || null,
        url: resource.url || null,
        openDays: resource.openDays || null,
        openTime: resource.openTime || null,
        closeTime: resource.closeTime || null,
        status: resource.status,
        createdAt: resource.createdAt,
        categoryId: resource.categoryId || null,
        rating: resource.rating ? Number(resource.rating) : null,
        imageUrl: resource.imageUrl || null,
        facebookLink: resource.facebookLink || null,
        ResourceCategory: resource.ResourceCategory ? {
          name: resource.ResourceCategory.name,
        } : null,
        Location: locations,
      };
    });
  } catch (error) {
    console.error("Failed to fetch resources:", error);
    throw new Error("Unable to fetch resources.");
  }
}

export async function fetchResourcesPages({
  categories = [],
  boroughs = [],
  query = "",
}: GetResourcesOptions = {}): Promise<number> {
  try {
    const where: Prisma.ResourceWhereInput = {
      ...(categories.length > 0 && {
        categoryId: { in: categories.map(Number) },
      }),
      ...(boroughs.length > 0 && {
        city: { in: boroughs },
      }),
      status: ResourceStatus.APPROVED,
      ...(query && {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { city: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      }),
    };

    const count = await prisma.resource.count({ where });
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Failed to count resources:", error);
    throw new Error("Unable to count matching resources.");
  }
}