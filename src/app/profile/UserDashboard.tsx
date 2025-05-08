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
import { UserResourceTable } from "../components/dashboard/UserResourceTable";

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

  const handleViewClick = (resource: any, event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl === event.currentTarget) {
      setAnchorEl(null);
      closePopup();
    } else {
      setAnchorEl(event.currentTarget);
      openPopup(resource);
    }
  };

  const handleDeleteResource = async (resourceId: string) => {
    await deleteItem("resources", resourceId, {
      refetchUser: refetch,
      onSuccess: () => {
        refetchResources();
      }
    });
  };

  const handleDeleteEdit = async (editId: string) => {
    await deleteItem("resources/edit", editId, {
      refetchUser: refetch,
      onSuccess: () => {
        refetchEditResources();
      }
    });
  };

  const handleDeleteReview = async (reviewId: string) => {
    await deleteItem("resources/review", reviewId, {
      refetchUser: refetch
    });
  };

  const handleDeleteFavorite = async (favoriteId: string) => {
    await deleteItem("resources/favorite", favoriteId, {
      refetchUser: refetch
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

            <UserResourceTable
              activeTab={activeTab}
              resources={resources}
              editResources={editResources}
              user={user}
              deletingId={deletingId}
              anchorEl={anchorEl}
              onViewClick={handleViewClick}
              onDeleteResource={handleDeleteResource}
              onDeleteEdit={handleDeleteEdit}
              onDeleteReview={handleDeleteReview}
              onDeleteFavorite={handleDeleteFavorite}
            />

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
