"use client";
import Image from "next/image";

import { useState } from "react";

import React from "react";

import { useFetchResources } from "../hooks/useFetchResources";
import { useFetchResourceEdit } from "../hooks/useFetchResourceEdit";

import Popup from "../components/Popup";
import { usePopup } from "../hooks/usePopup";
import { useLogout } from "../hooks/useLogout";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import { format } from "date-fns";

import { ProfileCard } from "./SharedProfileCard";
import { TabNavigation } from "../components/dashboard/TabNavigation";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("new");
  const [resourceAnchorEl, setResourceAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const { resources, refetch: refetchResources } = useFetchResources();
  const { editResources, refetch: refetchEditResources } =
    useFetchResourceEdit();
  const { isOpen, data: selectedResource, openPopup, closePopup } = usePopup();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Close popup when changing tabs
    setResourceAnchorEl(null);
    closePopup();
  };

  // Function to update the status of a resource
  const handleStatusChange = async (resourceId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/resources/${resourceId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        console.error(
          `Failed to update resource status: ${response.statusText}`
        );
        return;
      }

      await refetchResources();
      await refetchEditResources();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const { handleLogout } = useLogout();

  // Close popup when modal closes
  const handleClosePopup = () => {
    setResourceAnchorEl(null);
    closePopup();
  };

  const filteredByStatus = resources.filter((resource) => {
    if (activeTab == "new") return resource.status == "PENDING";
    if (activeTab == "approved") return resource.status == "APPROVED";
    if (activeTab == "rejected") return resource.status == "REJECTED";
  });
  const filteredByEditStatus = editResources.filter((res) => {
    if (activeTab == "edit") return res.status == "PENDING";
  });

  const adminTabs = [
    { id: "new", label: "New Submissions", color: "bg-blue-500" },
    { id: "edit", label: "Edit Submissions", color: "bg-blue-500" },
    { id: "approved", label: "Approved", color: "bg-green-500" },
    { id: "rejected", label: "Rejected", color: "bg-red-500" },
  ];

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-row w-full">
        <ProfileCard
          userName="Admin"
          onLogout={handleLogout}
          userType="admin"
        />

        {/* Dashboard (takes 70% width) */}
        <div className="w-full md:w-2/3 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <p className="text-gray-600">Manage your resources</p>

            <TabNavigation
              activeTab={activeTab}
              onTabChange={handleTabChange}
              tabs={adminTabs}
            />

            {/* table header or column names  */}

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

                  {/* table content */}

                  <TableBody>
                    {filteredByStatus.map((resource, index) => (
                      <TableRow
                        key={resource.id}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{resource.name}</TableCell>
                        <TableCell>
                          <Button
                            onClick={(e) => {
                              if (resourceAnchorEl === e.currentTarget) {
                                setResourceAnchorEl(null);
                                closePopup();
                              } else {
                                setResourceAnchorEl(e.currentTarget);
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
                                onClick={() =>
                                  handleStatusChange(resource.id, "APPROVED")
                                }
                              >
                                Approve
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="error"
                                onClick={() =>
                                  handleStatusChange(resource.id, "REJECTED")
                                }
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
                              onClick={() =>
                                handleStatusChange(resource.id, "REJECTED")
                              }
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
                              onClick={() =>
                                handleStatusChange(resource.id, "APPROVED")
                              }
                            >
                              Approve
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}

                    {/* Edit submission */}

                    {filteredByEditStatus.map((resource, index) => (
                      <TableRow
                        key={resource.id}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{resource.name}</TableCell>
                        <TableCell>
                          <Button
                            onClick={(e) => {
                              if (resourceAnchorEl === e.currentTarget) {
                                setResourceAnchorEl(null);
                                closePopup();
                              } else {
                                setResourceAnchorEl(e.currentTarget);
                                openPopup(resource);
                              }
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() =>
                              handleStatusChange(resource.id, "APPROVED")
                            }
                          >
                            Approve
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() =>
                              handleStatusChange(resource.id, "REJECTED")
                            }
                          >
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            <Popup
              anchor={resourceAnchorEl}
              open={isOpen}
              onClose={handleClosePopup}
              title={selectedResource?.name || "No Title"}
              content={[
                selectedResource?.description &&
                  `Description: ${selectedResource.description}`,
                selectedResource?.city && `City: ${selectedResource.city}`,
                selectedResource?.address &&
                  `Address: ${selectedResource.address}`,
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
