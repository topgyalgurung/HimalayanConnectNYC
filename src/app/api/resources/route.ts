// GET, POST
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";
import { NextResponse, NextRequest } from "next/server";
import { checkRateLimit } from "@/app/lib/rate-limit";

// to disable default cached GET routes of next.js to prevent getting same results even after adding new data through api
// second option: you can use  revalidate option for time based validation to determine when you want to revaildate an api route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    try {
        // Get client IP from request headers
        const forwardedFor = request.headers.get('x-forwarded-for')
        const ip = forwardedFor?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown'
        
        // Check rate limit
        const rateLimitResult = await checkRateLimit(ip)
        if (rateLimitResult) return rateLimitResult

        const session = await getSession();
        const userId = session?.userId ? Number(session.userId) : null;
    
        const resources = await prisma.resource.findMany({
            orderBy: [{
                name:'asc',
            }],
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
            id: String(res.id),
            rating: res.rating ? Number(res.rating) : null,
            createdAt: res.createdAt.toISOString(),
            openTime: res.openTime?.toISOString() || null,
            closeTime: res.closeTime?.toISOString() || null,
            isLiked: res.ResourceLike && res.ResourceLike.length > 0,
        }));
        // console.log("API Resources:", JSON.stringify(resourcesWithLikeStatus, null, 2));
        // console.log("Resources with locations:", resourcesWithLikeStatus.filter(r => r.Location?.[0]?.latitude && r.Location?.[0]?.longitude));
        return NextResponse.json(resourcesWithLikeStatus);
    } catch (error) {
        console.error("Error fetching resources:", error);
        return NextResponse.json(
            { error: "Failed to fetch resources" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // Get client IP from request headers
        const forwardedFor = request.headers.get('x-forwarded-for')
        const ip = forwardedFor?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown'
        
        // Check rate limit
        const rateLimitResult = await checkRateLimit(ip)
        if (rateLimitResult) return rateLimitResult

        const session = await getSession();
        if (!session?.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const resource = await prisma.resource.create({
            data: {
                ...body,
                userId: Number(session.userId),
            },
        });

        return NextResponse.json(resource);
    } catch (error) {
        console.error("Error creating resource:", error);
        return NextResponse.json(
            { error: "Failed to create resource" },
            { status: 500 }
        );
    }
}
  
// DELETE AND PUT
// will need to create dynamic route handler 
