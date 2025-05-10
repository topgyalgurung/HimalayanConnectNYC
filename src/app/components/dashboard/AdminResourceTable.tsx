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
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import type { Resource } from "@/app/types/resource";

interface AdminResourceTableProps {
  activeTab: string;
  filteredByStatus: Resource[];
  filteredByEditStatus: Resource[];
  onViewClick: (resource: Resource, event: React.MouseEvent<HTMLElement>) => void;
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
          ...filteredByStatus.map((resource) => ({ ...resource, type: "new" as const })),
          ...filteredByEditStatus.map((resource) => ({
            ...resource,
            type: "edit" as const,
          })),
        ]
      : activeTab === "edit"
      ? filteredByEditStatus.map((resource) => ({ ...resource, type: "edit" as const }))
      : filteredByStatus.map((resource) => ({ ...resource, type: "new" as const }));

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            {activeTab === "new" || activeTab === "edit" ? (
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>View Details</TableCell>
                <TableCell>Approve</TableCell>
                <TableCell>Reject</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>View Details</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            )}
          </TableHead>

          <TableBody>
            {displayResources.map((resource, index) => (
              <TableRow
                key={`${resource.type}-${resource.id}`} // unique key 
                hover
                role="checkbox"
                tabIndex={-1}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{resource.name}</TableCell>
                {(activeTab === "approved" || activeTab === "rejected") && (
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-sm font-medium rounded-full ${
                        resource.type === "new"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {resource.type === "new"
                        ? "New Resource"
                        : "Edit Resource"}
                    </span>
                  </TableCell>
                )}
                <TableCell>
                  <Button onClick={(e) => onViewClick(resource, e)}>
                    View
                  </Button>
                </TableCell>
                {activeTab === "new" && (
                  <>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() =>
                          onStatusChange(resource.id, "APPROVED", "new")
                        }
                        disabled={isLoading}
                      >
                        {isLoading ? "Updating..." : "Approve"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          onStatusChange(resource.id, "REJECTED", "new")
                        }
                        disabled={isLoading}
                      >
                        {isLoading ? "Updating..." : "Reject"}
                      </Button>
                    </TableCell>
                  </>
                )}
                {activeTab === "edit" && (
                  <>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() =>
                          onStatusChange(resource.id, "APPROVED", "edit")
                        }
                        disabled={isLoading}
                      >
                        {isLoading ? "Updating..." : "Approve"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          onStatusChange(resource.id, "REJECTED", "edit")
                        }
                        disabled={isLoading}
                      >
                        {isLoading ? "Updating..." : "Reject"}
                      </Button>
                    </TableCell>
                  </>
                )}
                {activeTab === "approved" && (
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        onStatusChange(resource.id, "REJECTED", resource.type)
                      }
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Reject"}
                    </Button>
                  </TableCell>
                )}
                {activeTab === "rejected" && (
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        onStatusChange(resource.id, "APPROVED", resource.type)
                      }
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Approve"}
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
