import { ResourceStatus, Prisma } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";
import type { Resource, Location } from "./types";

const ITEMS_PER_PAGE = 6;

type GetResourcesOptions = {
  categories?: number[];
  boroughs?: string[];
  query?: string;
  page?: number;
};

export async function fetchFilteredResources({
  categories = [],
  boroughs = [],
  query = "",
  page = 1,
}: GetResourcesOptions = {}): Promise<Resource[]> {
  try {
    const session = await getSession();
    const userId = session?.userId ? Number(session.userId) : null;

    // Calculate pagination
    const skip = (page - 1) * ITEMS_PER_PAGE;

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