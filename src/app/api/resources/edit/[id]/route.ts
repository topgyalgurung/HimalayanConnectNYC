import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";

export const dynamic = "force-dynamic";
export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const resourceId = parseInt(params.id, 10);
    if (isNaN(resourceId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    console.log(`Attempting to delete resource ID: ${resourceId}`);

    const session = await getSession();
    if (!session || !session.userId) {
      console.error("Unauthorized access: No session");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.userId, 10);
    console.log(`User ID: ${userId}`);

    const suggestion = await prisma.resourceEditSuggestion.findUnique({
      where: { id: resourceId },
    });

    if (!suggestion) {
      console.log(`Resource ID: ${resourceId} not found`);
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    // Handle case where resource has no createdById
    if (!suggestion.suggestedById) {
      console.log(`Resource ID: ${resourceId} has no associated user`);
      return NextResponse.json(
        { error: "Cannot delete resource with no associated user" },
        { status: 403 }
      );
    }

    if (suggestion.suggestedById !== userId) {
      console.log(
        `Forbidden: User ID ${userId} does not own resource ID ${resourceId}`
      );
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.resourceEditSuggestion.delete({ where: { id: resourceId } });

    console.log(`Resource ID: ${resourceId} deleted successfully`);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error deleting resource:", {
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const resourceId = parseInt(params.id, 10);
    
    if (isNaN(resourceId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const body = await req.json();
    const { status } = body;

    if (!status || !["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be PENDING, APPROVED, or REJECTED" },
        { status: 400 }
      );
    }

    const updatedSuggestion = await prisma.resourceEditSuggestion.update({
      where: { id: resourceId },
      data: { status },
    });

    return NextResponse.json(updatedSuggestion);
  } catch (error) {
    console.error("Error updating edit suggestion status:", error);
    return NextResponse.json(
      { error: "Failed to update edit suggestion status" },
      { status: 500 }
    );
  }
}
