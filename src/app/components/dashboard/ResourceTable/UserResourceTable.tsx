/**
 * user resource table component for the dashboard
 * displays and manages user's resources, edits, reviews, and favorites.
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
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import type {
  Resource,
  ResourceEditSuggestion,
  User,
  Location,
} from "@/app/lib/types";

interface UserResourceTableProps {
  activeTab: string;
  resources: Resource[];
  editResources: ResourceEditSuggestion[];
  user: User;
  deletingId: string | null;
  onViewClickAction: (
    resource: Resource | ResourceEditSuggestion,
    event: React.MouseEvent<HTMLElement>
  ) => void;
  onDeleteResourceAction: (id: string) => void;
  onDeleteEditAction: (id: string) => void;
  onDeleteReviewAction: (id: string) => void;
  onDeleteFavoriteAction: (id: string) => void;
}

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
}

interface TableRow {
  id: string;
  name: string;
  status?: string;
  content?: string | null;
  rating?: number | null;
  createdAt?: string | Date;
  resource?: Resource;
  Location?: Location[];
}

export const UserResourceTable = ({
  activeTab,
  resources,
  editResources,
  user,
  deletingId,
  onViewClickAction,
  onDeleteResourceAction,
  onDeleteEditAction,
  onDeleteReviewAction,
  onDeleteFavoriteAction,
}: UserResourceTableProps) => {
  const getColumns = (): Column[] => {
    switch (activeTab) {
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

  const getData = () => {
    switch (activeTab) {
      case "new":
        return resources.map((resource) => ({
          ...resource,
          id: resource.id.toString(),
        }));
      case "suggest":
        return editResources.map((resource) => ({
          ...resource,
          id: resource.id.toString(),
        }));
      case "reviews":
        return user.reviews.map((review) => ({
          id: review.id.toString(),
          name: review.resource.name,
          content: review.content,
          rating: review.rating,
          createdAt: review.createdAt,
          resource: review.resource,
        }));
      case "likes":
        return (
          user.likes as unknown as Array<{ id: number; resource: Resource }>
        ).map((like) => ({
          id: like.id.toString(),
          name: like.resource.name,
          resource: like.resource,
        }));
      default:
        return [];
    }
  };

   /**
   * Renders a cell in the table
   * @param row - The row of the table
   * @param column - The column of the table
   * @param index - The index of the row
   * @returns The rendered cell
   */
   const renderCell = (row: TableRow, column: Column, index: number) => {
    switch (column.id) {
      case "index":
        return index + 1;
      case "name":
        return activeTab === "likes" || activeTab === "reviews"
          ? row.resource?.name
          : row.name;
      case "status":
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              row.status === "APPROVED"
                ? "bg-green-100 text-green-800"
                : row.status === "REJECTED"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {row.status}
          </span>
        );
      case "content":
        return (
          <div className="flex items-center gap-2">
            <span className="line-clamp-2">{row.content}</span>
            {/* {row.content && row.content.length > 30 && (
              <Button
                size="small"
                onClick={(e) =>
                  onViewClickAction(
                    row.resource || (row as unknown as Resource),
                    e
                  )
                }
                className="ml-2"
              >
                View Full
              </Button>
            )} */}
          </div>
        );
      case "rating":
        return row.rating;
      case "date":
        return row.createdAt
          ? format(new Date(row.createdAt), "yyyy-MM-dd")
          : "";
      case "view":
        return (
          <Button
            onClick={(e) => {
              if (activeTab === "likes" && row.resource) {
                onViewClickAction(row.resource, e);
              } else {
                onViewClickAction(row as unknown as Resource, e);
              }
            }}
          >
            View
          </Button>
        );
      case "action":
        return (
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            disabled={deletingId === row.id}
            onClick={() => {
              switch (activeTab) {
                case "new":
                  onDeleteResourceAction(row.id);
                  break;
                case "suggest":
                  onDeleteEditAction(row.id);
                  break;
                case "reviews":
                  onDeleteReviewAction(row.id);
                  break;
                case "likes":
                  onDeleteFavoriteAction(row.id);
                  break;
              }
            }}
          >
            {deletingId === row.id
              ? "Deleting..."
              : activeTab === "likes"
              ? "UnFavorite"
              : "Delete"}
          </Button>
        );
      default:
        return null;
    }
  };

  const columns = getColumns();
  const data = getData();

  return (
    <div className="max-h-[calc(100vh-300px)] overflow-y-auto mb-5">
      <TableContainer component={Paper}>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {/* TableHead is the header of the table that displays the column names */}
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
          {/* TableBody is the body of the table that displays the data */}
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  {`No ${activeTab} resources found.`}
                </TableCell>
              </TableRow>
            ) : (
              // data.map is used to map the data to the table rows
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
