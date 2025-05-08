'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/app/lib/prisma';
import { ResourceStatus } from './types';

export async function updateResourceStatus(
  resourceId: string,
  newStatus: ResourceStatus,
  resourceType: 'new' | 'edit'
) {
  try {
    if (!["PENDING", "APPROVED", "REJECTED"].includes(newStatus)) {
      return { success: false, error: "Invalid status" };
    }

    const resourceIdNum = parseInt(resourceId);
    if (isNaN(resourceIdNum)) {
      return { success: false, error: "Invalid resource ID" };
    }

    if (resourceType === "edit") {
      await prisma.resourceEditSuggestion.update({
        where: { id: resourceIdNum },
        data: { status: newStatus },
      });
    } else {
      await prisma.resource.update({
        where: { id: resourceIdNum },
        data: { status: newStatus },
      });
    }

    // Revalidate the paths that might be affected
    revalidatePath('/profile/admin');
    revalidatePath('/api/resources');
    revalidatePath('/api/resources/edit');

    return { success: true };
  } catch (error) {
    console.error("Error updating resource status:", error);
    return { 
      success: false, 
      error: "Failed to update resource status" 
    };
  }
}
