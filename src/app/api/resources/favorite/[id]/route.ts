import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";

export const dynamic = "force-dynamic";
export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const likeId = parseInt(params.id);

    if (isNaN(likeId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    
    const session = await getSession();
    if (!session || !session?.userId) {
      console.error("Unauthorized access: No session");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.userId, 10);
    console.log(`User ID: ${userId}`);

    const like = await prisma.resourceLike.findUnique({
      where: { id: likeId },
    });


  if (!like || like.userId !== Number(session.userId)) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

 
    if (!like) {
      console.log(`Favorite ID: ${likeId} not found`);
      return NextResponse.json(
        { error: "Favorite item not found" },
        { status: 404 }
      );
    }
    
    if (!like.userId) {
      console.log(`Favorite ID: ${like} has no associated user`);
      return NextResponse.json(
        { error: "Cannot delete favorite item with no associated user" },
        { status: 403 }
      );
    }

    if (like.userId !== userId) {
      console.log(
        `Forbidden: User ID ${userId} does not own favorite ID ${likeId}`
      );
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    await prisma.resourceLike.delete({ where: { id: likeId } });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error deleting favorite", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
  
