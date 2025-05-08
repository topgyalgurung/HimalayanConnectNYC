import prisma from "@/app/lib/prisma";
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

        const resourcesWithLikeStatus = resources.map((res) => ({
            ...res,
            isLiked: res.ResourceLike && res.ResourceLike.length > 0,
        }));

        return NextResponse.json(resourcesWithLikeStatus);
    } catch (error) {
        console.log("Error fetching user resources: ", error);
        return NextResponse.json({error: "Failed to fetch user resources"},{status: 500})
    }
}
