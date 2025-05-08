/**
 * UserResourceTable Component
 * 
 * A client-side component that displays user resources in a table format.
 * Handles different types of resources (submissions, edits, reviews, favorites).
 * 
 * @component
 * @param {Object} props
 * @param {string} props.activeTab - Current active tab
 * @param {Object} props.user - User data containing resources
 * @param {Function} props.onViewDetails - Handler for viewing resource details
 * @param {Function} props.onDelete - Handler for deleting items
 * @param {string} props.deletingId - ID of item currently being deleted
 * 
 * @example
 * <UserResourceTable
 *   activeTab="new"
 *   user={userData}
 *   onViewDetails={handleViewDetails}
 *   onDelete={handleDelete}
 *   deletingId={currentDeletingId}
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
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";

interface UserResourceTableProps {
  activeTab: string;
  user: any; // TODO: Replace with proper user type
  onViewDetails: (resource: any) => void;
  onDelete: (type: string, id: number, options: any) => void;
  deletingId: string;
}

export const UserResourceTable = ({
  activeTab,
  user,
  onViewDetails,
  onDelete,
  deletingId,
}: UserResourceTableProps) => {
  const renderTableContent = () => {
    switch (activeTab) {
      case "new":
        return renderNewResources();
      case "suggest":
        return renderEditSuggestions();
      case "reviews":
        return renderReviews();
      case "likes":
        return renderFavorites();
      default:
        return null;
    }
  };

  const renderNewResources = () => {
    if (!user.resources?.length) {
      return (
        <TableRow>
          <TableCell colSpan={5}>No resources submitted yet.</TableCell>
        </TableRow>
      );
    }

    return user.resources.map((res: any, index: number) => (
      <TableRow key={res.id} hover role="checkbox" tabIndex={-1}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{res.name}</TableCell>
        <TableCell>{res.status}</TableCell>
        <TableCell>
          <Button onClick={() => onViewDetails(res)}>View</Button>
        </TableCell>
        <TableCell>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            disabled={deletingId === res.id.toString()}
            onClick={() => onDelete("resources", res.id, { refetchUser: true })}
          >
            {deletingId === res.id.toString() ? "Deleting..." : "Delete"}
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  const renderEditSuggestions = () => {
    if (!user.ResourceEditSuggestion?.length) {
      return (
        <TableRow>
          <TableCell colSpan={5}>No edit suggestions submitted yet.</TableCell>
        </TableRow>
      );
    }

    return user.ResourceEditSuggestion.map((edit: any, index: number) => (
      <TableRow key={edit.id} hover role="checkbox" tabIndex={-1}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{edit.name}</TableCell>
        <TableCell>{edit.status}</TableCell>
        <TableCell>
          <Button onClick={() => onViewDetails(edit)}>View</Button>
        </TableCell>
        <TableCell>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            disabled={deletingId === edit.id.toString()}
            onClick={() => onDelete("resources/edit", edit.id, { refetchUser: true })}
          >
            {deletingId === edit.id.toString() ? "Deleting..." : "Delete"}
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  const renderReviews = () => {
    if (!user.reviews?.length) {
      return (
        <TableRow>
          <TableCell colSpan={6}>No reviews submitted yet.</TableCell>
        </TableRow>
      );
    }

    return user.reviews.map((review: any, index: number) => (
      <TableRow key={review.id} hover role="checkbox" tabIndex={-1}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{review.resource?.name}</TableCell>
        <TableCell>{review.content}</TableCell>
        <TableCell>{review.rating}</TableCell>
        <TableCell>
          {format(new Date(review.createdAt), "yyyy-MM-dd")}
        </TableCell>
        <TableCell>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            disabled={deletingId === review.id.toString()}
            onClick={() => onDelete("resources/review", review.id, { refetchUser: true })}
          >
            {deletingId === review.id.toString() ? "Deleting..." : "Delete"}
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  const renderFavorites = () => {
    if (!user.likes?.length) {
      return (
        <TableRow>
          <TableCell colSpan={4}>No favorites yet.</TableCell>
        </TableRow>
      );
    }

    return user.likes.map((like: any, index: number) => (
      <TableRow key={like.resource.id} hover role="checkbox" tabIndex={-1}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{like.resource.name}</TableCell>
        <TableCell>
          <Button onClick={() => onViewDetails(like.resource)}>View</Button>
        </TableCell>
        <TableCell>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            disabled={deletingId === like.id.toString()}
            onClick={() => onDelete("resources/favorite", like.id, { refetchUser: true })}
          >
            {deletingId === like.id.toString() ? "Deleting..." : "Delete"}
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            {(activeTab === "new" || activeTab === "suggest") && (
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            )}
            {activeTab === "reviews" && (
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Resource Name</TableCell>
                <TableCell>Reviews</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            )}
            {activeTab === "likes" && (
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Resource Name</TableCell>
                <TableCell>View Details</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>{renderTableContent()}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}; 