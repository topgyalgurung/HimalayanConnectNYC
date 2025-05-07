/**
 * Resource Service
 * 
 * A service layer that handles all API calls related to resources.
 * This service abstracts away the direct API calls and provides
 * a clean interface for resource-related operations.
 * 
 * @module resourceService
 */

// handle all api calls for resources 

export const resourceService = {
  /**
   * Updates the status of a resource
   * 
   * @param {string} resourceId - The ID of the resource to update
   * @param {string} newStatus - The new status to set (APPROVED/REJECTED)
   * @returns {Promise<any>} The updated resource data
   * @throws {Error} If the API call fails
   * 
   * @example
   * await resourceService.updateResourceStatus("123", "APPROVED");
   */
  async updateResourceStatus(resourceId: string, newStatus: string) {
    const response = await fetch(`/api/resources/${resourceId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update resource status: ${response.statusText}`);
    }

    return response.json();
  }
}; 