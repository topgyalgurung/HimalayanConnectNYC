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

interface UserResourceTableProps {
  activeTab: string;
  resources: any[];
  editResources: any[];
  user: any;
  deletingId: string | null;
  anchorEl: HTMLElement | null;
  onViewClick: (resource: any, event: React.MouseEvent<HTMLElement>) => void;
  onDeleteResource: (id: string) => void;
  onDeleteEdit: (id: string) => void;
  onDeleteReview: (id: string) => void;
  onDeleteFavorite: (id: string) => void;
}

const columns = [
  {
    id: "index",
    label: "Index",
    minWidth: 170,
  },
  {
    id: "name",
    label: "Name",
    minWidth: 100,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
  },
  {
    id: "view",
    label: "view",
    minWidth: 170,
  },
  {
    id: "edit",
    label: "Action",
    minWidth: 100,
  },
];

export const UserResourceTable = ({
  activeTab,
  resources,
  editResources,
  user,
  deletingId,
  anchorEl,
  onViewClick,
  onDeleteResource,
  onDeleteEdit,
  onDeleteReview,
  onDeleteFavorite,
}: UserResourceTableProps) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            {(activeTab === "new" || activeTab === "suggest") && (
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
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

          <TableBody>
            {/* New Resources */}
            {activeTab === "new" &&
              (resources.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>No resources submitted yet.</TableCell>
                </TableRow>
              ) : (
                resources.map((res, index) => (
                  <TableRow key={res.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell className="px6 py-4">{index + 1}</TableCell>
                    <TableCell>{res.name}</TableCell>
                    <TableCell>{res.status}</TableCell>
                    <TableCell>
                      <Button onClick={(e) => onViewClick(res, e)}>View</Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        disabled={deletingId === res.id.toString()}
                        onClick={() => onDeleteResource(res.id)}
                      >
                        {deletingId === res.id.toString() ? "Deleting..." : "Delete"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ))}

            {/* Edit Suggestions */}
            {activeTab === "suggest" &&
              (editResources.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>No edit suggestions submitted yet.</TableCell>
                </TableRow>
              ) : (
                editResources.map((edit, index) => (
                  <TableRow key={edit.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{edit.name}</TableCell>
                    <TableCell>{edit.status}</TableCell>
                    <TableCell>
                      <Button onClick={(e) => onViewClick(edit, e)}>View</Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        disabled={deletingId === edit.id.toString()}
                        onClick={() => onDeleteEdit(edit.id)}
                      >
                        {deletingId === edit.id.toString() ? "Deleting..." : "Delete"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ))}

            {/* Reviews */}
            {activeTab === "reviews" &&
              (user.reviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>No reviews submitted yet.</TableCell>
                </TableRow>
              ) : (
                user.reviews.map((review, index) => (
                  <TableRow key={review.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{review.resource.name}</TableCell>
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
                        onClick={() => onDeleteReview(review.id)}
                      >
                        {deletingId === review.id.toString() ? "Deleting..." : "Delete"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ))}

            {/* Favorites */}
            {activeTab === "likes" &&
              (user.likes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>No favorites yet.</TableCell>
                </TableRow>
              ) : (
                user.likes.map((like, index) => (
                  <TableRow key={like.resource.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{like.resource.name}</TableCell>
                    <TableCell>
                      <Button onClick={(e) => onViewClick(like.resource, e)}>View</Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        disabled={deletingId === like.id.toString()}
                        onClick={() => onDeleteFavorite(like.id)}
                      >
                        {deletingId === like.id.toString() ? "Deleting..." : "Delete"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
