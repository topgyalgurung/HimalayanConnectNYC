"use client";

import React from "react";

import Image from "next/image";
import { useState } from "react";
import { logout } from "../actions/auth";
import { useRouter } from "next/navigation";

import { useFetchUser } from "../hooks/useFetchUsers";
import { useUser } from "../context/UserProvider";
import { usePopup } from "../hooks/usePopup";
import { useDeleteItem } from "../hooks/useDeleteResource";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
// import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Popup from "../components/Popup";
import { format } from "date-fns";

interface resourceColumn {
  id: "index" | "name" | "status" | "view" | "edit";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly resourceColumn[] = [
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

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("new");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const router = useRouter();
  const { setUser } = useUser();

  const { data: user, refetch } = useFetchUser();
  const { isOpen, data: selectedResource, openPopup, closePopup } = usePopup();

  const { deleteItem, deletingId } = useDeleteItem();

  if (!user) return <p>Loading user data...</p>;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null); // Clear user session for NavMenu
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("logout failed", error);
    }
  };

  // Close popup when modal closes
  const handleClosePopup = () => {
    setAnchorEl(null);
    closePopup();
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      {/* Profile card and dashboard container */}
      <div className="flex flex-row w-full">
        {/* Profile card (takes 30% width) */}
        <div className="w-full md:w-1/3 p-4">
          <h1 className="text-4xl font-bold text-center mt-1">Profile</h1>
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={"/default-avatar.jpg"}
                alt="Profile Picture"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>
            <h2 className="text-xl font-bold mb-4">
              Hello User: {user.firstName}
            </h2>

            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-500 rounded-lg border border-red-500 hover:bg-red-500 hover:text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard (takes 70% width) */}
        <div className="w-full md:w-2/3 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Your Dashboard</h2>
            <p className="text-gray-600">
              Welcome to your dashboard! Here you can manage your resource
              submissions
            </p>

            {/* More dashboard content here */}
            <div className=" flex space-x-4 mb-4">
              <button
                className={`px-4 py-2 ${
                  activeTab === "new" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleTabChange("new")}
              >
                New
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "suggest"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTabChange("suggest")}
              >
                Suggest Edit
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "reviews"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTabChange("reviews")}
              >
                Reviews
              </button>
              <button
                className={`px-4 py-2 ${
                  activeTab === "likes"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleTabChange("likes")}
              >
                Favorites
              </button>
            </div>

            {/* table headers  */}

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

                  {/* table content */}

                  <TableBody>
                    {/* new Resources submitted by user */}
                    {activeTab === "new" &&
                      (user.resources.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5}>
                            No resources submitted yet.
                          </TableCell>
                        </TableRow>
                      ) : (
                        user.resources.map((res, index) => (
                          <TableRow
                            key={res.id}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                          >
                            <TableCell className="px6 py-4">
                              {index + 1}
                            </TableCell>
                            <TableCell>{res.name}</TableCell>
                            <TableCell>{res.status}</TableCell>
                            <TableCell>
                              <Button
                                onClick={(e) => {
                                  if (anchorEl === e.currentTarget) {
                                    setAnchorEl(null);
                                    closePopup();
                                  } else {
                                    setAnchorEl(e.currentTarget);
                                    openPopup(res);
                                  }
                                }}
                              >
                                View
                              </Button>
                            </TableCell>
                            {/* delete button */}
                            <TableCell>
                              <Button
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                disabled={deletingId === res.id.toString()}
                                onClick={() =>
                                  deleteItem("resources", res.id, {
                                    refetchUser: refetch,
                                  })
                                }
                              >
                                {deletingId === res.id.toString()
                                  ? "Deleting..."
                                  : "Delete"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ))}

                    {/* Edit suggestions by user */}
                    {activeTab === "suggest" &&
                      (user.ResourceEditSuggestion.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5}>
                            No edit suggestions submitted yet.
                          </TableCell>
                        </TableRow>
                      ) : (
                        user.ResourceEditSuggestion.map((edit, index) => (
                          <TableRow
                            key={edit.id}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                          >
                            <TableCell>{index + 1} </TableCell>
                            <TableCell>{edit.name}</TableCell>
                            <TableCell>{edit.status}</TableCell>
                            <TableCell>
                              <Button
                                onClick={(e) => {
                                  if (anchorEl === e.currentTarget) {
                                    setAnchorEl(null);
                                    closePopup();
                                  } else {
                                    setAnchorEl(e.currentTarget);
                                    openPopup(edit);
                                  }
                                }}
                              >
                                View
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                disabled={deletingId === edit.id.toString()}
                                onClick={() =>
                                  deleteItem("resources/edit", edit.id, {
                                    refetchUser: refetch,
                                  })
                                }
                              >
                                {deletingId === edit.id.toString()
                                  ? "Deleting..."
                                  : "Delete"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ))}

                    {/* reviews */}
                    {activeTab === "reviews" &&
                      (user.reviews.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5}>
                            No reviews submitted yet.
                          </TableCell>
                        </TableRow>
                      ) : (
                        user.reviews.map((review, index) => (
                          <TableRow
                            key={review.id}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                          >
                            <TableCell>{index + 1} </TableCell>
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
                                onClick={() =>
                                  deleteItem("resources/review", review.id, {
                                    refetchUser: refetch,
                                  })
                                }
                              >
                                {deletingId === review.id.toString()
                                  ? "Deleting..."
                                  : "Delete"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ))}

                    {/* favorites */}
                    {activeTab === "likes" &&
                      (user.likes.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5}>No favorites yet.</TableCell>
                        </TableRow>
                      ) : (
                        user.likes.map((like, index) => (
                          <TableRow
                            key={like.resource.id}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{like.resource.name}</TableCell>
                            <TableCell>
                              <Button
                                onClick={(e) => {
                                  if (anchorEl === e.currentTarget) {
                                    setAnchorEl(null);
                                    closePopup();
                                  } else {
                                    setAnchorEl(e.currentTarget);
                                    openPopup(like.resource);
                                  }
                                }}
                              >
                                View
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                disabled={deletingId === like.id.toString()}
                                onClick={() =>
                                  deleteItem("resources/favorite", like.id, {
                                    refetchUser: refetch,
                                  })
                                }
                              >
                                {deletingId === like.id.toString()
                                  ? "Deleting..."
                                  : "Delete"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={user.ResourceEditSuggestion.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              /> */}
            </Paper>
            {/* Popup for resource details */}
            <Popup
              anchor={anchorEl}
              open={isOpen}
              onClose={handleClosePopup}
              title={selectedResource?.name || "No Title"}
              content={[
                selectedResource?.description,
                selectedResource?.city,
                selectedResource?.address,
              ]
                .filter(Boolean)
                .join(" - ")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
