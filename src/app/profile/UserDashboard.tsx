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
import { useFetchResources } from "../hooks/useFetchResources";
import { useFetchResourceEdit } from "../hooks/useFetchResourceEdit";
import { useFetchUserResources } from "../hooks/useFetchUserResources";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
// import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Popup from "../components/Popup";
import { format } from "date-fns";

import { ProfileCard } from "./SharedProfileCard";
import { TabNavigation } from "../components/dashboard/TabNavigation";

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

  const { resources, refetch: refetchResources } = useFetchUserResources();
  const { editResources, refetch: refetchEditResources } =
    useFetchResourceEdit();

  const { data: user, refetch } = useFetchUser();
  const { isOpen, data: selectedResource, openPopup, closePopup } = usePopup();

  const { deleteItem, deletingId } = useDeleteItem();

  if (!user) return <p>Loading user data...</p>;

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Close popup when changing tabs
    setAnchorEl(null);
    closePopup();
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

   const handleDeleteResource = async (resourceId: string) => {
    await deleteItem("resources", resourceId, {
      refetchUser: refetch,
      onSuccess: () => {
        refetchResources(); // Refetch the resources list
      }
    });
  };
  const handleDeleteEdit = async (editId: string) => {
    await deleteItem("resources/edit", editId, {
      refetchUser: refetch,
      onSuccess: () => {
        refetchEditResources(); // Refetch the edit suggestions list
      }
    });
  };
  const userTabs = [
    { id: "new", label: "New", color: "bg-blue-500" },
    { id: "suggest", label: "Suggest Edit", color: "bg-green-500" },
    { id: "reviews", label: "Reviews", color: "bg-green-500" },
    { id: "likes", label: "Favorites", color: "bg-green-500" },
  ];

  return (
    <div className="flex flex-col items-center justify-center ">
      {/* Profile card and dashboard container */}
      <div className="flex flex-row w-full">
        {/* Profile card (takes 30% width) */}
        <ProfileCard
          userName={user.firstName}
          onLogout={handleLogout}
          userType="user"
        />

        {/* Dashboard (takes 70% width) */}
        <div className="w-full md:w-2/3 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Your Dashboard</h2>
            <p className="text-gray-600">
              Welcome to your dashboard! Here you can manage your resource
              submissions
            </p>

            <TabNavigation
              activeTab={activeTab}
              onTabChange={handleTabChange}
              tabs={userTabs}
            />

            {/* More dashboard content here */}

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
                      (resources.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5}>
                            No resources submitted yet.
                          </TableCell>
                        </TableRow>
                      ) : (
                        resources.map((res, index) => (
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
                                onClick={() => handleDeleteResource(res.id)}
                        
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
                      (editResources.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5}>
                            No edit suggestions submitted yet.
                          </TableCell>
                        </TableRow>
                      ) : (
                        editResources.map((edit, index) => (
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
                                onClick={() => handleDeleteEdit(edit.id)}
                                  
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
                // Basic Information
                selectedResource?.description &&
                  `Description: ${selectedResource.description}`,
                selectedResource?.city && `City: ${selectedResource.city}`,
                selectedResource?.address &&
                  `Address: ${selectedResource.address}`,

                // Operating Hours
                selectedResource?.openDays &&
                  `Open Days: ${selectedResource.openDays}`,
                selectedResource?.openTime &&
                  `Open Time: ${format(
                    new Date(selectedResource.openTime),
                    "hh:mm a"
                  )}`,
                selectedResource?.closeTime &&
                  `Close Time: ${format(
                    new Date(selectedResource.closeTime),
                    "hh:mm a"
                  )}`,

                // Additional Details
                selectedResource?.status &&
                  `Status: ${selectedResource.status}`,
                selectedResource?.createdAt &&
                  `Created: ${format(
                    new Date(selectedResource.createdAt),
                    "yyyy-MM-dd"
                  )}`,
                selectedResource?.updatedAt &&
                  `Last Updated: ${format(
                    new Date(selectedResource.updatedAt),
                    "yyyy-MM-dd"
                  )}`,

                // Contact Information (if available)
                selectedResource?.phone && `Phone: ${selectedResource.phone}`,
                selectedResource?.email && `Email: ${selectedResource.email}`,
                selectedResource?.website &&
                  `Website: ${selectedResource.website}`,

                // Additional Features (if available)
                selectedResource?.features &&
                  `Features: ${selectedResource.features}`,
                selectedResource?.amenities &&
                  `Amenities: ${selectedResource.amenities}`,
              ]
                .filter(Boolean)
                .join("\n")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
