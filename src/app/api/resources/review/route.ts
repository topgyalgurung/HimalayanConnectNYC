import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/lib/session"; // your secure session utils
import prisma from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    console.log("Session in review API:", session);

    if (!session?.userId) {
      console.error("No session or userId found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("Request body:", body);

    if (!body) {
      return NextResponse.json(
        { error: "Request body is missing" },
        { status: 400 }
      );
    }

    const { resourceId, rating, content } = body;
   

    if (!resourceId || rating === undefined || rating === null) {
      return NextResponse.json(
        { error: "Missing required fields: resourceId or rating" },
        { status: 400 }
      );
    }

    // Validate rating is between 0 and 5
    if (isNaN(rating) || rating < 0 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be a number between 0 and 5" },
        { status: 400 }
      );
    }

    console.log("Rating before updating db:", rating);
    // Create the review
    const review = await prisma.resourceReview.create({
      data: {
        resourceId: Number(resourceId),
        userId: Number(session.userId),
        rating,
        content: content || "",
      },
    });

    console.log("Rating after update db:", review);

    // Calculate new average rating
    const allReviews = await prisma.resourceReview.findMany({
      where: { resourceId: Number(resourceId) },
      select: { rating: true },
    });

    const totalRating = allReviews.reduce((sum, review) => sum + Number(review.rating), 0);
    const averageRating = totalRating / allReviews.length;

    // Update resource's average rating
    await prisma.resource.update({
      where: { id: Number(resourceId) },
      data: { rating: averageRating },
    });

    console.log("Review created successfully:", review);
    console.log("New average rating:", averageRating);
    
    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error("Error in review API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
