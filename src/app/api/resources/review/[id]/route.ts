import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";

export async function DELETE(req: NextRequest,
  props: { params: Promise<{ id: string }> })
{
  try {
    const params = await props.params;
    const reviewId = parseInt(params.id);

    if (isNaN(reviewId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    
    const session = await getSession();
    if (!session || !session?.userId) {
      console.error("Unauthorized access: No session");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.userId, 10);
    console.log(`User ID: ${userId}`);


    const review = await prisma.resourceReview.findUnique({
      where: { id: reviewId },
    });
    
    if (!review) {
      console.log(`Review ID: ${reviewId} not found`);
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }
    
    if (!review.userId) {
      console.log(`Review ID: ${reviewId} has no associated user`);
      return NextResponse.json(
        { error: "Cannot delete review with no associated user" },
        { status: 403 }
      );
    }

    if (review.userId !== userId) {
      console.log(
        `Forbidden: User ID ${userId} does not own review ID ${reviewId}`
      );
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    await prisma.resourceReview.delete({ where: { id: reviewId } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting review:", {
      message: error.message,
      stack: error.stack,
    
    });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}