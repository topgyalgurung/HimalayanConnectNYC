import prisma from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";
import type { Resource } from "@/app/types/resource";

export async function getAllResources(): Promise<Resource[]> {
    try {
        const session = await getSession();
        const userId = session?.userId ? Number(session.userId) : null;
    
        const resources = await prisma.resource.findMany({
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
                        where: { userId: userId },
                        select: { id: true },
                    }
                    : false,
            },
        });
        const resourcesWithLikeStatus = resources.map((res) => ({
            ...res,
            isLiked: res.ResourceLike && res.ResourceLike.length > 0,
        }));
        console.log("Fetched resources:", JSON.stringify(resourcesWithLikeStatus, null, 2));
        return NextResponse.json(resourcesWithLikeStatus);
    } catch (error) {
        console.log("Error fetching resources: ", error);
        return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 })
        
    }
}
}