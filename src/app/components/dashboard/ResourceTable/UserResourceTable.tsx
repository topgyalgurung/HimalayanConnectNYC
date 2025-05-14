/**
 * UserResourceTable Component
 *
 * A table component for displaying and managing user's resources, edits, reviews, and favorites.
 * Provides different views based on the active tab and resource type.
 *
 * @component
 * @param {Object} props
 * @param {string} props.activeTab - Current active tab ("new", "suggest", "reviews", "likes")
 * @param {Array} props.resources - List of user's resources
 * @param {Array} props.editResources - List of user's edit suggestions
 * @param {Object} props.user - Current user object
 * @param {string|null} props.deletingId - ID of resource being deleted
 * @param {HTMLElement|null} props.anchorEl - Anchor element for popup menus
 * @param {Function} props.onViewClick - Handler for viewing resource details
 * @param {Function} props.onDeleteResource - Handler for deleting a resource
 * @param {Function} props.onDeleteEdit - Handler for deleting an edit suggestion
 * @param {Function} props.onDeleteReview - Handler for deleting a review
 * @param {Function} props.onDeleteFavorite - Handler for removing a favorite
 *
 * @example
 * <UserResourceTable
 *   activeTab="new"
 *   resources={userResources}
 *   editResources={userEditSuggestions}
 *   user={currentUser}
 *   deletingId={null}
 *   anchorEl={null}
 *   onViewClick={handleViewClick}
 *   onDeleteResource={handleDeleteResource}
 *   onDeleteEdit={handleDeleteEdit}
 *   onDeleteReview={handleDeleteReview}
 *   onDeleteFavorite={handleDeleteFavorite}
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
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import type { Resource, ResourceEditSuggestion, User, Location } from "@/app/lib/types";

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

  const renderCell = (row: TableRow, column: Column, index: number) => {
    switch (column.id) {
      case "index":
        return index + 1;
      case "name":
        return activeTab === "likes" || activeTab === "reviews"
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
                onClick={(e) => onViewClickAction(row.resource || row as unknown as Resource, e)}
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
