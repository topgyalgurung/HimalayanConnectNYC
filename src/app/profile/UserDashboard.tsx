/**
  User dashboard component for managing personal resources, edits, reviews and favorites
  */

"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { logout } from "../actions/auth";
import { useFetchUser } from "../hooks/useFetchUsers";
import { useUser } from "../context/UserProvider";
import { usePopup } from "../hooks/usePopup";
import { useDeleteItem } from "../hooks/useDeleteResource";
import { useFetchResourceEdit } from "../hooks/useFetchResourceEdit";
import { useFetchUserResources } from "../hooks/useFetchUserResources";

import Popup from "../components/dashboard/Popup";
import { ProfileCard } from "./SharedProfileCard";
import { TabNavigation } from "../components/dashboard/TabNavigation";
import { UserResourceTable } from "../components/dashboard/UserResourceTable";
import ResourceDetailsPopup from '../components/dashboard/ResourceDetailsPopup';

/**
 * Main dashboard component for users to manage their resources, edits, reviews and favorites.
 * Provides functionality for viewing, editing, and deleting user-related content.
 */
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
    setAnchorEl(null);
    closePopup();
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("logout failed", error);
    }
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
    closePopup();
  };

  const handleViewClick = (
    resource: Resource,
    event: React.MouseEvent<HTMLElement>
  ) => {
    if (anchorEl === event.currentTarget) {
      setAnchorEl(null);
      closePopup();
    } else {
      setAnchorEl(event.currentTarget);
      openPopup(resource);
    }
  };

  /**
   * Deletes a resource and refreshes the data
   */
  const handleDeleteResource = async (resourceId: string) => {
    await deleteItem("resources", resourceId, {
      refetchUser: refetch,
      onSuccess: () => {
        refetchResources();
      },
    });
  };

  const handleDeleteEdit = async (editId: string) => {
    await deleteItem("resources/edit", editId, {
      refetchUser: refetch,
      onSuccess: () => {
        refetchEditResources();
      },
    });
  };

  const handleDeleteReview = async (reviewId: string) => {
    await deleteItem("resources/review", reviewId, {
      refetchUser: refetch,
    });
  };

  const handleDeleteFavorite = async (favoriteId: string) => {
    await deleteItem("resources/favorite", favoriteId, {
      refetchUser: refetch,
    });
  };

  const userTabs = [
    { id: "new", label: "New", color: "bg-blue-500" },
    { id: "suggest", label: "Suggest Edit", color: "bg-green-500" },
    { id: "reviews", label: "Reviews", color: "bg-green-500" },
    { id: "likes", label: "Favorites", color: "bg-green-500" },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row w-full">
        <ProfileCard
          userName={user.firstName}
          onLogout={handleLogout}
          userType="user"
        />

        <div className="w-full md:w-2/3 p-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Your Dashboard</h2>
            <p className="text-gray-600 mb-4">
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

            <ResourceDetailsPopup
              anchor={anchorEl}
              open={isOpen}
              onClose={handleClosePopup}
              resource={selectedResource}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
