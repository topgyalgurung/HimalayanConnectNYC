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
import type { Resource, ResourceEditSuggestion } from "@/app/lib/types";

interface AdminResourceTableProps {
  activeTab: string;
  filteredByStatus: Resource[];
  filteredByEditStatus: ResourceEditSuggestion[];
  onViewClickAction: (
    resource: Resource | ResourceEditSuggestion,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  onStatusChangeAction: (
    resourceId: string,
    newStatus: string,
    resourceType: "new" | "edit"
  ) => void;
  loadingResourceId?: string | null;
}

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
}

export const AdminResourceTable = ({
  activeTab,
  filteredByStatus,
  filteredByEditStatus,
  onViewClickAction,
  onStatusChangeAction,
  loadingResourceId,
}: AdminResourceTableProps) => {
  const getColumns = (): Column[] => {
    if (activeTab === "new" || activeTab === "edit") {
      return [
        { id: "index", label: "Index", minWidth: 70 },
        { id: "name", label: "Name", minWidth: 100 },
        { id: "view", label: "View Details", minWidth: 100 },
        { id: "approve", label: "Approve", minWidth: 100 },
        { id: "reject", label: "Reject", minWidth: 100 },
      ];
    } else {
      return [
        { id: "index", label: "Index", minWidth: 70 },
        { id: "name", label: "Name", minWidth: 100 },
        { id: "type", label: "Type", minWidth: 100 },
        { id: "view", label: "View Details", minWidth: 100 },
        { id: "action", label: "Actions", minWidth: 100 },
      ];
    }
  };

  const getData = () => {
    if (activeTab === "approved" || activeTab === "rejected") {
      return [
        ...filteredByStatus.map((resource) => ({
          ...resource,
          type: "new" as const,
        })),
        ...filteredByEditStatus.map((resource) => ({
          ...resource,
          type: "edit" as const,
        })),
      ];
    } else if (activeTab === "edit") {
      return filteredByEditStatus.map((resource) => ({
        ...resource,
        type: "edit" as const,
      }));
    } else {
      return filteredByStatus.map((resource) => ({
        ...resource,
        type: "new" as const,
      }));
    }
  };

  const renderCell = (
    row: Resource & { type?: "new" | "edit" },
    column: Column,
    index: number
  ) => {
    switch (column.id) {
      case "index":
        return index + 1;
      case "name":
        return row.name;
      case "type":
        return (
          <span
            className={`px-2 py-1 text-sm font-medium rounded-full ${
              row.type === "new"
                ? "bg-blue-100 text-blue-800"
                : "bg-purple-100 text-purple-800"
            }`}
          >
            {row.type === "new" ? "New Resource" : "Edit Resource"}
          </span>
        );
      case "view":
        return <Button onClick={(e) => onViewClickAction(row, e)}>View</Button>;
      case "approve":
        return (
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              onStatusChangeAction(
                row.id.toString(),
                "APPROVED",
                row.type || "new"
              )
            }
            disabled={loadingResourceId == row.id}
          >
            {loadingResourceId == row.id ? "Updating..." : "Approve"}
          </Button>
        );
      case "reject":
        return (
          <Button
            variant="contained"
            color="error"
            onClick={() =>
              onStatusChangeAction(
                row.id.toString(),
                "REJECTED",
                row.type || "new"
              )
            }
            disabled={loadingResourceId == row.id}
          >
            {loadingResourceId == row.id ? "Updating..." : "Reject"}
          </Button>
        );
      case "action":
        if (activeTab === "approved") {
          return (
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                onStatusChangeAction(
                  row.id.toString(),
                  "REJECTED",
                  row.type || "new"
                )
              }
              disabled={loadingResourceId == row.id}
            >
              {loadingResourceId == row.id ? "Updating..." : "Reject"}
            </Button>
          );
        } else if (activeTab === "rejected") {
          return (
            <Button
              variant="contained"
              color="success"
              onClick={() =>
                onStatusChangeAction(
                  row.id.toString(),
                  "APPROVED",
                  row.type || "new"
                )
              }
              disabled={loadingResourceId == row.id}
            >
              {loadingResourceId == row.id ? "Updating..." : "Approve"}
            </Button>
          );
        }
        return null;
      default:
        return null;
    }
  };

  const columns = getColumns();
  const data = getData();

  return (
    <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align || "left"}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                {`No ${activeTab} resources found.`}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align || "left"}>
                    {renderCell(row, column, index)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
