/**
 * ResourceTable Component
 * 
 * A client-side component that displays a table of resources with their details and actions.
 * Features:
 * - Displays resources in a Material-UI table format
 * - Provides view details functionality with a popup
 * - Handles resource status changes (approve/reject)
 * - Supports different table layouts based on active tab
 * 
 * @component
 * @param {Resource[]} resources - Array of resources to display
 * @param {Function} onStatusChange - Callback function to handle status changes
 * @param {string} activeTab - Current active tab to determine table layout
 * 
 * @example
 * <ResourceTable 
 *   resources={resources}
 *   onStatusChange={handleStatusChange}
 *   activeTab="new"
 * />
 */
"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import Popup from "../Popup";
import { usePopup } from "../../hooks/usePopup";

interface Resource {
  id: string;
  name: string;
  description?: string;
  city?: string;
  address?: string;
  openDays?: string;
  openTime?: string;
  closeTime?: string;
  status: string;
}

interface ResourceTableProps {
  resources: Resource[];
  onStatusChange: (resourceId: string, newStatus: string) => Promise<void>;
  activeTab: string;
}

export const ResourceTable = ({ resources, onStatusChange, activeTab }: ResourceTableProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isOpen, data: selectedResource, openPopup, closePopup } = usePopup();

  const handleClosePopup = () => {
    setAnchorEl(null);
    closePopup();
  };

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
                <TableCell>View Details</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            )}
          </TableHead>

          <TableBody>
            {resources.map((resource, index) => (
              <TableRow key={resource.id} hover role="checkbox" tabIndex={-1}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{resource.name}</TableCell>
                <TableCell>
                  <Button
                    onClick={(e) => {
                      if (anchorEl === e.currentTarget) {
                        setAnchorEl(null);
                        closePopup();
                      } else {
                        setAnchorEl(e.currentTarget);
                        openPopup(resource);
                      }
                    }}
                  >
                    View
                  </Button>
                </TableCell>
                {activeTab === "new" && (
                  <>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => onStatusChange(resource.id, "APPROVED")}
                      >
                        Approve
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => onStatusChange(resource.id, "REJECTED")}
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
                      onClick={() => onStatusChange(resource.id, "REJECTED")}
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
                      onClick={() => onStatusChange(resource.id, "APPROVED")}
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

      <Popup
        anchor={anchorEl}
        open={isOpen}
        onClose={handleClosePopup}
        title={selectedResource?.name || "No Title"}
        content={[
          selectedResource?.description && `Description: ${selectedResource.description}`,
          selectedResource?.city && `City: ${selectedResource.city}`,
          selectedResource?.address && `Address: ${selectedResource.address}`,
          selectedResource?.openDays && `Open Days: ${selectedResource.openDays}`,
          selectedResource?.openTime &&
            `Open Time: ${format(new Date(selectedResource.openTime), "hh:mm a")}`,
          selectedResource?.closeTime &&
            `Close Time: ${format(new Date(selectedResource.closeTime), "hh:mm a")}`,
        ]
          .filter(Boolean)
          .join("\n")}
      />
    </Paper>
  );
}; 