import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/lib/session"; // your secure session utils
import prisma from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // set CORS headers if needed 
    const session = await getSession();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { error: "Request body is missing" },
        { status: 400 }
      );
    }

    const { resourceId, rating, content } = body;

    if (!resourceId || !rating) {
      return NextResponse.json(
        { error: "Missing required fields: resourceId or rating" },
        { status: 400 }
      );
    }

    const review = await prisma.resourceReview.create({
      data: {
        resourceId,
        userId: Number(session.userId),
        rating,
        content: content || "",
        // isAnonymous: isAnonymous || false, // from checkbox/toggle on frontend
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error("Error in review API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
