'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/app/lib/prisma';
import { ResourceStatus, Resource } from '@prisma/client';

type ResourceUpdateData = Partial<Pick<Resource, 'name' | 'address' | 'phone' | 'url' | 'openDays' | 'openTime' | 'closeTime'>>;

// this is the action for the admin to update the status of the resource
// todo: when edit status is approved, update the resource with the new values
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
      // First fetch the edit suggestion
      const resourceEditSuggestion = await prisma.resourceEditSuggestion.findUnique({
        where: { id: resourceIdNum }
      });

      if (!resourceEditSuggestion) {
        return { success: false, error: "Edit suggestion not found" };
      }

      await prisma.resourceEditSuggestion.update({
        where: { id: resourceIdNum },
        data: { status: newStatus },
      });

      // If the suggestion is approved, update the resource
      if (newStatus === "APPROVED") {
        // Create an update object with only the fields that have values
        const updateData: ResourceUpdateData = {};
        
        if (resourceEditSuggestion.name) updateData.name = resourceEditSuggestion.name;
        if (resourceEditSuggestion.address) updateData.address = resourceEditSuggestion.address;
        if (resourceEditSuggestion.phone) updateData.phone = resourceEditSuggestion.phone;
        if (resourceEditSuggestion.url) updateData.url = resourceEditSuggestion.url;
        if (resourceEditSuggestion.openDays) updateData.openDays = resourceEditSuggestion.openDays;
        if (resourceEditSuggestion.openTime) updateData.openTime = resourceEditSuggestion.openTime;
        if (resourceEditSuggestion.closeTime) updateData.closeTime = resourceEditSuggestion.closeTime;

        console.log('Updating resource with data:', updateData);

        // Update the resource with the changed fields
        await prisma.resource.update({
          where: { id: resourceEditSuggestion.resourceId },
          data: updateData
        });
      }
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
