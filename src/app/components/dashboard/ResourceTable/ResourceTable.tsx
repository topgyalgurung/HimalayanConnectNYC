/**
 * ResourceTable component
 *
 * This component displays a table of resources with various actions and statuses.
 * It supports different types of resources (new, suggestions, reviews, likes, admin)
 * and provides functionality for viewing, deleting, and approving/rejecting resources.
 *
 */

import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";

export interface Resource {
  id: string;
  name: string;
  status?: string;
  content?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
  type?: "new" | "edit";
  description?: string;
  address?: string;
  city?: string;
  openDays?: string;
  openTime?: string;
  closeTime?: string;
  phone?: string;
  email?: string;
  url?: string;
  facebookLink?: string;
  imageUrl?: string;
  ResourceCategory?: {
    name: string;
  };
  Location?: Array<{
    latitude: number;
    longitude: number;
  }>;
  resource?: {
    id: string;
    name: string;
    description?: string;
    address?: string;
    city?: string;
    openDays?: string;
    openTime?: string;
    closeTime?: string;
    phone?: string;
    email?: string;
    url?: string;
    facebookLink?: string;
    rating?: number;
    imageUrl?: string;
    ResourceCategory?: {
      name: string;
    };
    Location?: Array<{
      latitude: number;
      longitude: number;
    }>;
    createdAt: string;
    updatedAt: string;
  };
}

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
}

interface ResourceTableProps {
  type: "new" | "suggest" | "reviews" | "likes" | "admin";
  data: Resource[];
  deletingId?: string | null;
  onViewClick: (
    resource: Resource,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (
    resourceId: string,
    newStatus: string,
    resourceType: "new" | "edit"
  ) => void;
  emptyMessage: string;
  isLoading?: boolean;
  adminTab?: string;
}

const getColumns = (type: string, adminTab?: string): Column[] => {
  if (type === "admin") {
    if (adminTab === "new" || adminTab === "edit") {
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
  }

  switch (type) {
    case "new":
    case "suggest":
      return [
        { id: "index", label: "Index", minWidth: 70 },
        { id: "name", label: "Name", minWidth: 100 },
        { id: "status", label: "Status", minWidth: 100 },
        { id: "view", label: "Details", minWidth: 100 },
        { id: "action", label: "Action", minWidth: 100 },
      ];
    case "reviews":
      return [
        { id: "index", label: "Index", minWidth: 70 },
        { id: "name", label: "Resource Name", minWidth: 100 },
        { id: "content", label: "Reviews", minWidth: 150 },
        { id: "rating", label: "Rating", minWidth: 70 },
        { id: "date", label: "Date", minWidth: 100 },
        { id: "action", label: "Action", minWidth: 100 },
      ];
    case "likes":
      return [
        { id: "index", label: "Index", minWidth: 70 },
        { id: "name", label: "Resource Name", minWidth: 100 },
        { id: "view", label: "View Details", minWidth: 100 },
        { id: "action", label: "Action", minWidth: 100 },
      ];
    default:
      return [];
  }
};

export const ResourceTable: React.FC<ResourceTableProps> = ({
  type,
  data,
  deletingId,
  onViewClick,
  onDelete,
  onStatusChange,
  emptyMessage,
  isLoading,
  adminTab,
}) => {
  const columns = getColumns(type, adminTab);

  const renderCell = (row: Resource, column: Column, index: number) => {
    switch (column.id) {
      case "index":
        return index + 1;
      case "name":
        return type === "likes" || type === "reviews"
          ? row.resource?.name
          : row.name;
      case "status":
        return row.status;
      case "content":
        return (
          <div className="flex items-center gap-2">
            <span className="line-clamp-2">{row.content}</span>
            {row.content && row.content.length > 30 && (
              <Button
                size="small"
                onClick={(e) => onViewClick(row, e)}
                className="ml-2"
              >
                View Full
              </Button>
            )}
          </div>
        );
      case "rating":
        return row.rating;
      case "date":
        return row.createdAt
          ? format(new Date(row.createdAt), "yyyy-MM-dd")
          : "";
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
        return (
          <Button
            onClick={(e) => {
              if (type === "likes" && row.resource) {
                onViewClick(
                  {
                    ...row.resource,
                    id: row.resource.id.toString(),
                    name: row.resource.name,
                    description: row.resource.description || "",
                    address: row.resource.address || "",
                    city: row.resource.city || "",
                    openDays: row.resource.openDays || "",
                    openTime: row.resource.openTime,
                    closeTime: row.resource.closeTime,
                    phone: row.resource.phone || "",
                    email: row.resource.email || "",
                    url: row.resource.url || "",
                    facebookLink: row.resource.facebookLink || "",
                    rating: row.resource.rating,
                    imageUrl: row.resource.imageUrl,
                    ResourceCategory: row.resource.ResourceCategory,
                    Location: row.resource.Location,
                    createdAt: row.resource.createdAt,
                    updatedAt: row.resource.updatedAt,
                  },
                  e
                );
                // } else if (type === "suggest") {
                //   onViewClick({
                //   })
              } else {
                onViewClick(row, e);
              }
            }}
          >
            View
          </Button>
        );
      case "action":
        if (type === "admin") {
          if (adminTab === "approved") {
            return (
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  onStatusChange?.(
                    row.id.toString(),
                    "REJECTED",
                    row.type || "new"
                  )
                }
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Reject"}
              </Button>
            );
          } else if (adminTab === "rejected") {
            return (
              <Button
                variant="contained"
                color="success"
                onClick={() =>
                  onStatusChange?.(
                    row.id.toString(),
                    "APPROVED",
                    row.type || "new"
                  )
                }
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Approve"}
              </Button>
            );
          }
        }
        return (
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            disabled={deletingId === row.id.toString()}
            onClick={() => onDelete?.(row.id)}
          >
            {deletingId === row.id.toString()
              ? "Deleting..."
              : type === "likes"
              ? "UnFavorite"
              : "Delete"}
          </Button>
        );
      case "approve":
        return (
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              onStatusChange?.(row.id.toString(), "APPROVED", row.type || "new")
            }
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Approve"}
          </Button>
        );
      case "reject":
        return (
          <Button
            variant="contained"
            color="error"
            onClick={() =>
              onStatusChange?.(row.id.toString(), "REJECTED", row.type || "new")
            }
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Reject"}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
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
                <TableCell colSpan={columns.length}>{emptyMessage}</TableCell>
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
    </Paper>
  );
};
