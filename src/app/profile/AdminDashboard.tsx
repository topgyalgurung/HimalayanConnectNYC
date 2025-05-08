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
import { AdminResourceTable } from "../components/dashboard/AdminResourceTable";

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
  const handleStatusChange = async (resourceId: string, newStatus: string, resourceType: string) => {
    try {
      // Use different endpoint based on resource type
      const endpoint = resourceType === "edit" 
        ? `/api/resources/edit/${resourceId}`
        : `/api/resources/${resourceId}`;

      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Failed to update status: ${response.statusText}`);
      }

      // Refetch both resources and edit suggestions
      await refetchResources();
      await refetchEditResources();
    } catch (error) {
      console.error("Error updating status:", error);
      alert(error instanceof Error ? error.message : "Failed to update status. Please try again.");
    }
  };

  const handleViewClick = (resource: any, event: React.MouseEvent<HTMLElement>) => {
    if (resourceAnchorEl === event.currentTarget) {
      setResourceAnchorEl(null);
      closePopup();
    } else {
      setResourceAnchorEl(event.currentTarget);
      openPopup(resource);
    }
  };

  const { handleLogout } = useLogout();

  // Close popup when modal closes
  const handleClosePopup = () => {
    setResourceAnchorEl(null);
    closePopup();
  };

  const filteredByStatus = resources.filter((resource) => {
    if (activeTab === "new") return resource.status === "PENDING";
    if (activeTab === "approved") return resource.status === "APPROVED";
    if (activeTab === "rejected") return resource.status === "REJECTED";
    return false;
  });

  const filteredByEditStatus = editResources.filter((res) => {
    if (activeTab === "edit") return res.status === "PENDING";
    if (activeTab === "approved") return res.status === "APPROVED";
    if (activeTab === "rejected") return res.status === "REJECTED";
    return false;
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

            <AdminResourceTable
              activeTab={activeTab}
              filteredByStatus={filteredByStatus}
              filteredByEditStatus={filteredByEditStatus}
              resourceAnchorEl={resourceAnchorEl}
              onViewClick={handleViewClick}
              onStatusChange={handleStatusChange}
            />

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
