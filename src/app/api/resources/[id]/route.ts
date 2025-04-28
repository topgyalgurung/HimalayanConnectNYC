// api/resources/[id]/route.ts
// get resource details

// import resources from '@/app/api/db' // for testing

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";

// GET, PATCH, PUT DELETE
export async function PATCH(req: NextRequest,
  // props: { params: Promise<{ id: string }> }
  { params }: { params: { id: string } }
) {
  // const params = await props.params;
  const resourceId = parseInt(params.id);

  try {
    const body = await req.json();
    const { status } = body;

    if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "invalid status" }, { status: 400 });
    }

    const updatedResource = await prisma.resource.update({
      where: { id: resourceId },
      data: { status },
    });
    return NextResponse.json(updatedResource);
  } catch (error) {
    console.error("Error updating resource status: ", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
 
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

    // Fetch the resource to verify existence and ownership
    const resource = await prisma.resource.findUnique({
      where: { id: resourceId },
    });

    if (!resource) {
      console.log(`Resource ID: ${resourceId} not found`);
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    // Handle case where resource has no createdById
    if (!resource.createdById) {
      console.log(`Resource ID: ${resourceId} has no associated user`);
      return NextResponse.json(
        { error: "Cannot delete resource with no associated user" },
        { status: 403 }
      );
    }

    if (resource.createdById !== userId) {
      console.log(`Forbidden: User ID ${userId} does not own resource ID ${resourceId}`);
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete the resource
    await prisma.resource.delete({
      where: { id: resourceId },
    });

    console.log(`Resource ID: ${resourceId} deleted successfully`);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting resource:", {
      message: error.message,
      stack: error.stack,

    });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}