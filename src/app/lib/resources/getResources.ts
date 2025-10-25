/**
 * Server Action for Fetching Resources
 * 
 * Fetches and caches approved resources with filtering capabilities.
 * Implements server-side caching with 5-minute revalidation.
 * Includes related data (categories, locations, user likes).
 * Supports filtering by categories and boroughs.
 */

import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";
// import type { Resource } from "@/app/lib/types";
import { ResourceStatus } from "@prisma/client";
import { unstable_cache } from 'next/cache';

interface GetResourcesOptions {
  categories?: string[];
  boroughs?: string[];
  search?: string;
  page?: number;
}

// Cache the getResources function with a 5-minute revalidation period
const getCachedResources = unstable_cache(
  async ({ categories = [], boroughs = [], userId = null, search , page = 1 }: GetResourcesOptions & { userId?: number | null } ) => {
     const GROUPS_PER_PAGE = 6;
     const skip = (page - 1) * GROUPS_PER_PAGE; // offset
    try {
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
        orderBy: [
          {
            name:'asc'
          }
        ],
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
      // return data, total number of resources, and total number of pages
      return { data: resources, total, perPage: GROUPS_PER_PAGE };
    } catch (error) {
      console.error("Error fetching resources:", error);
      throw new Error("Failed to fetch resources");
    }
  },
  ['resources'], // Cache key
  {
    revalidate: 300, // Revalidate every 5 minutes
    tags: ['resources'] // Tag for manual revalidation
  }
);

// Wrapper function that handles session outside of cache
export async function getResources({ search, page, categories = [], boroughs = []}: GetResourcesOptions ) {
  try {

    // Get session outside of cached function
    const session = await getSession();
    const userId = session?.userId ? Number(session.userId) : null;
    
    // Pass userId to cached function
    return await getCachedResources({ categories, boroughs, userId, search, page });
  } catch (error) {
    console.error("Error in getResources wrapper:", error);
    throw new Error("Failed to fetch resources");
  }
} 