/**
 * Server Action for Fetching Resources
 * 
 * Fetches and caches approved resources with filtering capabilities.
 * Implements server-side caching with 5-minute revalidation.
 * Includes related data (categories, locations, user likes).
 * Supports filtering by categories and boroughs.
 */

import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/auth-session";
// import type { Resource } from "@/app/lib/types";
import { ResourceStatus } from "@prisma/client";
import { unstable_cache } from 'next/cache';

interface GetResourcesOptions {
  categories?: string[];
  boroughs?: string[];
  query?: string;
  page?: number;
  sort?: "alphabetical" | "newest" | "oldest";
}

const getOrderBy = (sort: GetResourcesOptions["sort"]) => {
  switch (sort) {
    case "newest":
      return [{ createdAt: "desc" as const }];
    case "oldest":
      return [{ createdAt: "asc" as const }];
    case "alphabetical":
    default:
      return [{ name: "asc" as const }];
  }
};

// Cache the getResources function with a 5-minute revalidation period
// unstable cache to cache expensive result, unstable cache will be replaced by usecache when stable 
const getCachedResources = unstable_cache(
  async ({
    categories = [],
    boroughs = [],
    userId = null,
    page = 1,
    query = "",
    sort = "alphabetical",
  }: GetResourcesOptions & { userId?: number | null }) => {
    const GROUPS_PER_PAGE = 6;
    const skip = (page - 1) * GROUPS_PER_PAGE; // offset
    try {
      const search = query.trim();
      // Build where clause based on filters
      const where = {
        ...(categories && categories.length > 0 && {
          ResourceCategory: {
            name: {
              in: categories,
            },
          },
        }),
        ...(boroughs && boroughs.length > 0 && {
          city: {
            in: boroughs,
          },
        }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { city: { contains: search, mode: "insensitive" as const } },
            { address: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
          ],
        }),
        status: ResourceStatus.APPROVED, // Only show approved resources
      };

      const resources = await prisma.resource.findMany({
        orderBy: getOrderBy(sort),
        skip,
        take: GROUPS_PER_PAGE,
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
      // count total number of resources
      const total = await prisma.resource.count({ where }); // total number of resources

      // Serialize all Decimal fields to numbers and convert IDs to strings
      const serializedResources = resources.map((resource) => ({
        ...resource,
        id: String(resource.id),
        rating: resource.rating ? Number(resource.rating) : null,
        createdAt: resource.createdAt.toISOString(),
        openTime: resource.openTime?.toISOString() || null,
        closeTime: resource.closeTime?.toISOString() || null,
      }));

      // return data, total number of resources, and total number of pages
      return { data: serializedResources, total, perPage: GROUPS_PER_PAGE };
    } catch (error) {
      console.error("Error fetching resources:", error);
      throw new Error("Failed to fetch resources");
    }
  },
  ['resources'], // Cache key (unstable_cache differentiates by function args)
  {
    revalidate: 300, // Revalidate every 5 minutes
    tags: ['resources'] // Tag for manual revalidation
  }
);

// Wrapper function that handles session outside of cache
export async function getResources({
  page,
  categories = [],
  boroughs = [],
  query = "",
  sort = "alphabetical",
}: GetResourcesOptions) {
  try {
    // Get session outside of cached function
    const session = await getSession();
    const userId = session?.userId ? Number(session.userId) : null;

    // Pass filters into the cached function so pagination happens after filtering.
    return await getCachedResources({
      categories,
      boroughs,
      userId,
      page,
      query,
      sort,
    });
  } catch (error) {
    console.error("Error in getResources wrapper:", error);
    throw new Error("Failed to fetch resources");
  }
} 