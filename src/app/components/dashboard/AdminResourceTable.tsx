/* Table component for displaying resources in the admin dashboard.
 * Handles different views based on the active tab and resource type.
 *
 * @features
 * - Displays resources in a tabular format
 * - Supports different columns based on active tab
 * - Handles both new resources and edit suggestions
 * - Provides status change actions (approve/reject)
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

interface AdminResourceTableProps {
  activeTab: string;
  filteredByStatus: any[];
  filteredByEditStatus: any[];
  resourceAnchorEl: HTMLElement | null;
  onViewClick: (resource: any, event: React.MouseEvent<HTMLElement>) => void;
  onStatusChange: (
    resourceId: string,
    newStatus: string,
    resourceType: string
  ) => void;
}

export const AdminResourceTable = ({
  activeTab,
  filteredByStatus,
  filteredByEditStatus,
  resourceAnchorEl,
  onViewClick,
  onStatusChange,
}: AdminResourceTableProps) => {
  // Combine both types of resources for approved and rejected tabs
  const displayResources =
    activeTab === "approved" || activeTab === "rejected"
      ? [
          ...filteredByStatus.map((resource) => ({ ...resource, type: "new" })),
          ...filteredByEditStatus.map((resource) => ({
            ...resource,
            type: "edit",
          })),
        ]
      : activeTab === "edit"
      ? filteredByEditStatus.map((resource) => ({ ...resource, type: "edit" }))
      : filteredByStatus.map((resource) => ({ ...resource, type: "new" }));

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
                key={`${resource.type}-${resource.id}`}
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
                      >
                        Approve
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          onStatusChange(resource.id, "REJECTED", "new")
                        }
                      >
                        Reject
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
                      >
                        Approve
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          onStatusChange(resource.id, "REJECTED", "edit")
                        }
                      >
                        Reject
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
                    >
                      Reject
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
                    >
                      Approve
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
