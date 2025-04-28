// src/app/api/resources/favorite/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";


export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const { resourceId } = await req.json();
  
    try {
      // Check if already liked
      const existingLike = await prisma.resourceLike.findFirst({
        where: {
          resourceId: resourceId,
          userId: Number(session.userId),
        },
      });
  
      if (existingLike) {
        // Already liked, remove the like
        await prisma.resourceLike.delete({
          where: {
            id: existingLike.id,
          },
        });
        return NextResponse.json({ success: true, liked: false });
      } else {
        // Not liked, create the like
        await prisma.resourceLike.create({
          data: {
            resourceId: resourceId,
            userId: Number(session.userId),
          },
        });
        return NextResponse.json({ success: true, liked: true });
      }
    } catch (error) {
      console.error("Failed to favorite resource:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json([], { status: 200 }); // return empty if not logged in
    }

    const favorites = await prisma.resourceLike.findMany({
      where: { userId: parseInt(session.userId) },
      select: { resourceId: true },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("Failed to fetch favorites:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}