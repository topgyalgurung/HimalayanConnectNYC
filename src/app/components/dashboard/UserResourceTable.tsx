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
  onViewClick: (resource: any, event: React.MouseEvent<HTMLElement>) => void;
  onDeleteClick: (type: string, id: string, options: any) => void;
  deletingId: string;
}

export const UserResourceTable = ({
  activeTab,
  resources,
  editResources,
  user,
  onViewClick,
  onDeleteClick,
  deletingId,
}: UserResourceTableProps) => {
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

          <TableBody>
            {/* New Resources */}
            {activeTab === "new" && (
              resources.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>No resources submitted yet.</TableCell>
                </TableRow>
              ) : (
                resources.map((res, index) => (
                  <TableRow key={res.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell>{index + 1}</TableCell>
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
                        onClick={() => onDeleteClick("resources", res.id, { refetchUser: true })}
                      >
                        {deletingId === res.id.toString() ? "Deleting..." : "Delete"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )
            )}

            {/* Edit Suggestions */}
            {activeTab === "suggest" && (
              editResources.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>No edit suggestions submitted yet.</TableCell>
                </TableRow>
              ) : (
                editResources
                  .filter(edit => edit && edit.id)
                  .map((edit, index) => (
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
                          onClick={() => onDeleteClick("resources/edit", edit.id, { refetchUser: true })}
                        >
                          {deletingId === edit.id.toString() ? "Deleting..." : "Delete"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              )
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              user.reviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>No reviews submitted yet.</TableCell>
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
                        onClick={() => onDeleteClick("resources/review", review.id, { refetchUser: true })}
                      >
                        {deletingId === review.id.toString() ? "Deleting..." : "Delete"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )
            )}

            {/* Favorites */}
            {activeTab === "likes" && (
              user.likes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>No favorites yet.</TableCell>
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
                        onClick={() => onDeleteClick("resources/favorite", like.id, { refetchUser: true })}
                      >
                        {deletingId === like.id.toString() ? "Deleting..." : "Delete"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
