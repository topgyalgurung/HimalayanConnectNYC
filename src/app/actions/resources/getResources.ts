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
}

// Cache the getResources function with a 5-minute revalidation period
const getCachedResources = unstable_cache(
  async ({ categories = [], boroughs = [] }: GetResourcesOptions = {}) => {
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
        orderBy: [
          {
            name:'asc'
          }
        ],
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
  },
  ['resources'], // Cache key
  {
    revalidate: 300, // Revalidate every 5 minutes
    tags: ['resources'] // Tag for manual revalidation
  }
);

export const getResources = getCachedResources; 