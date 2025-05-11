/**
 * AdminResourceTable Component
 *
 * A table component for displaying and managing resources in the admin dashboard.
 * Handles different views based on the active tab and resource type (new/edit).
 *
 * @component
 * @param {Object} props
 * @param {string} props.activeTab - Current active tab ("new", "edit", "approved", "rejected")
 * @param {Resource[]} props.filteredByStatus - List of resources filtered by status
 * @param {Resource[]} props.filteredByEditStatus - List of edit suggestions filtered by status
 * @param {Function} props.onViewClick - Handler for viewing resource details
 * @param {Function} props.onStatusChange - Handler for changing resource status
 * @param {boolean} [props.isLoading] - Loading state indicator
 *
 * @example
 * <AdminResourceTable
 *   activeTab="new"
 *   filteredByStatus={resources}
 *   filteredByEditStatus={editSuggestions}
 *   onViewClick={handleViewClick}
 *   onStatusChange={handleStatusChange}
 *   isLoading={false}
 * />
 */
"use client";

import React from "react";
import { ResourceTable, Resource } from "./ResourceTable";

interface AdminResourceTableProps {
  activeTab: string;
  filteredByStatus: Resource[];
  filteredByEditStatus: Resource[];
  onViewClick: (
    resource: Resource,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  onStatusChange: (
    resourceId: string,
    newStatus: string,
    resourceType: "new" | "edit"
  ) => void;
  isLoading?: boolean;
}

export const AdminResourceTable = ({
  activeTab,
  filteredByStatus,
  filteredByEditStatus,
  onViewClick,
  onStatusChange,
  isLoading,
}: AdminResourceTableProps) => {
  // Combine both types of resources for approved and rejected tabs
  const displayResources =
    activeTab === "approved" || activeTab === "rejected"
      ? [
          ...filteredByStatus.map((resource) => ({
            ...resource,
            type: "new" as const,
          })),
          ...filteredByEditStatus.map((resource) => ({
            ...resource,
            type: "edit" as const,
          })),
        ]
      : activeTab === "edit"
      ? filteredByEditStatus.map((resource) => ({
          ...resource,
          type: "edit" as const,
        }))
      : filteredByStatus.map((resource) => ({
          ...resource,
          type: "new" as const,
        }));

  return (
    <ResourceTable
      type="admin"
      data={displayResources}
      onViewClick={onViewClick}
      onStatusChange={onStatusChange}
      isLoading={isLoading}
      adminTab={activeTab}
      emptyMessage={`No ${activeTab} resources found.`}
    />
  );
};
