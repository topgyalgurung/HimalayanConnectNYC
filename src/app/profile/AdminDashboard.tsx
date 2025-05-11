/**
 *  Main admin dashboard component that handles resource management, including approval/rejection
 * of new resources and edit suggestions. Provides a tabbed interface for different resource statuses.

 * - Tab-based navigation for different resource statuses (new, edit, approved, rejected)
 * - Resource status management (approve/reject)
 * - Resource details viewing
 * - Real-time updates on status changes

 * - useFetchResources: Hook for fetching regular resources
 * - useFetchResourceEdit: Hook for fetching edit suggestions
 * - usePopup: Hook for managing resource detail popups
 * - AdminResourceTable: Component for displaying resources in a table format
 */

"use client";
import { useState } from "react";
import React from "react";
import { useFetchResources } from "../hooks/useFetchResources";
import { useFetchResourceEdit } from "../hooks/useFetchResourceEdit";

import { usePopup } from "../hooks/usePopup";
import { useLogout } from "../hooks/useLogout";

import { ProfileCard } from "./SharedProfileCard";
import { TabNavigation } from "../components/dashboard/TabNavigation/TabNavigation";
import { AdminResourceTable } from "../components/dashboard/ResourceTable/AdminResourceTable";
import { updateResourceStatus } from "../actions/resources/updateResourceStatus";
import { toast } from "react-hot-toast";
import type { Resource } from "../lib/types";
import ResourceDetailsPopup from "../components/dashboard/ResourcePopup/ResourceDetailsPopup";

// const formatTime = (timeString: string | undefined) => {
//   if (!timeString) return "";
//   try {
//     return format(new Date(timeString), "hh:mm a");
//   } catch (error) {
//     console.error("Invalid date:", timeString);
//     return "Invalid time";
//   }
// };

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("new");
  const [resourceAnchorEl, setResourceAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const { resources, refetch: refetchResources } = useFetchResources();
  const { editResources, refetch: refetchEditResources } =
    useFetchResourceEdit();
  const { isOpen, data: selectedResource, openPopup, closePopup } = usePopup();
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setResourceAnchorEl(null);
    closePopup();
  };

  /**
   * Handles status changes for both new resources and edit suggestions
   */
  const handleStatusChange = async (
    resourceId: string,
    newStatus: string,
    resourceType: "new" | "edit"
  ) => {
    try {
      setIsLoading(true);

      await toast.promise(
        updateResourceStatus(resourceId, newStatus, resourceType),
        {
          loading: "Updating status...",
          success: `Successfully updated ${resourceType} status to ${newStatus}`,
          error: (err: Error) => `Failed to update status: ${err.message}`,
        }
      );

      await Promise.all([refetchResources(), refetchEditResources()]);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the view button click to show resource details

   */
  const handleViewClick = (
    resource: Resource,
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (resourceAnchorEl === event.currentTarget) {
      setResourceAnchorEl(null);
      closePopup();
    } else {
      setResourceAnchorEl(event.currentTarget);
      openPopup(resource);
    }
  };

  const { handleLogout } = useLogout();

  /**
   * Closes the popup and resets the anchor element
   */
  const handleClosePopup = () => {
    setResourceAnchorEl(null);
    closePopup();
  };

  /**
   * Filters resources based on their status
   */
  const filteredByStatus = resources.filter((resource) => {
    if (activeTab === "new") return resource.status === "PENDING";
    if (activeTab === "approved") return resource.status === "APPROVED";
    if (activeTab === "rejected") return resource.status === "REJECTED";
    return false;
  });

  /**
   * Filters edit resources based on their status

   */
  const filteredByEditStatus = editResources.filter((res) => {
    if (activeTab === "edit") return res.status === "PENDING";
    if (activeTab === "approved") return res.status === "APPROVED";
    if (activeTab === "rejected") return res.status === "REJECTED";
    return false;
  });

  const adminTabs = [
    { id: "new", label: "New Submissions", color: "bg-blue-500" },
    { id: "edit", label: "Edit Submissions", color: "bg-blue-500" },
    { id: "approved", label: "Approved", color: "bg-green-500" },
    { id: "rejected", label: "Rejected", color: "bg-red-500" },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row w-full">
        <ProfileCard
          userName="Admin"
          onLogout={handleLogout}
          userType="admin"
        />

        <div className="w-full md:w-2/3 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <p className="text-gray-600 mb-4">Manage your resources</p>

            <TabNavigation
              activeTab={activeTab}
              onTabChange={handleTabChange}
              tabs={adminTabs}
            />

            <AdminResourceTable
              activeTab={activeTab}
              filteredByStatus={filteredByStatus}
              filteredByEditStatus={filteredByEditStatus}
              resourceAnchorEl={resourceAnchorEl}
              onViewClick={handleViewClick}
              onStatusChange={handleStatusChange}
              isLoading={isLoading}
            />

            <ResourceDetailsPopup
              anchor={resourceAnchorEl}
              open={isOpen}
              onClose={handleClosePopup}
              resource={selectedResource}
              editResource={null}
              showSubmission={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
