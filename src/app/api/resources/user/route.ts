import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const session = await getSession();
        const userId = session?.userId ? Number(session.userId) : null;

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    
        // Get user's resources
        const resources = await prisma.resource.findMany({
            where: {
                createdById: userId
            },
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
                ResourceLike: {
                    where: { userId: userId },
                    select: { id: true },
                },
            },
        });

        // Get user's favorites
        const favorites = await prisma.resourceLike.findMany({
            where: {
                userId: userId
            },
            include: {
                resource: {
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
                    },
                },
            },
        });

        const resourcesWithLikeStatus = resources.map((res) => ({
            ...res,
            id: String(res.id),
            rating: res.rating ? Number(res.rating) : null,
            createdAt: res.createdAt.toISOString(),
            openTime: res.openTime?.toISOString() || null,
            closeTime: res.closeTime?.toISOString() || null,
            isLiked: res.ResourceLike && res.ResourceLike.length > 0,
        }));

        const favoritesWithResource = favorites.map((fav) => ({
            id: fav.id.toString(),
            resource: {
                ...fav.resource,
                id: String(fav.resource.id),
                rating: fav.resource.rating ? Number(fav.resource.rating) : null,
                createdAt: fav.resource.createdAt.toISOString(),
                openTime: fav.resource.openTime?.toISOString() || null,
                closeTime: fav.resource.closeTime?.toISOString() || null,
            },
            type: 'likes'
        }));

        return NextResponse.json({
            resources: resourcesWithLikeStatus,
            favorites: favoritesWithResource
        });
    } catch (error) {
        console.log("Error fetching user resources: ", error);
        return NextResponse.json({error: "Failed to fetch user resources"},{status: 500})
    }
}
