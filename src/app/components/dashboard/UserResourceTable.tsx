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
import { ResourceTable, Resource } from "./ResourceTable";

interface UserResourceTableProps {
  activeTab: string;
  resources: Resource[];
  editResources: Resource[];
  user: {
    reviews: Resource[];
    likes: Resource[];
  };
  deletingId: string | null;
  anchorEl: HTMLElement | null;
  onViewClick: (resource: Resource, event: React.MouseEvent<HTMLElement>) => void;
  onDeleteResource: (id: string) => void;
  onDeleteEdit: (id: string) => void;
  onDeleteReview: (id: string) => void;
  onDeleteFavorite: (id: string) => void;
}

export const UserResourceTable = ({
  activeTab,
  resources,
  editResources,
  user,
  deletingId,
  onViewClick,
  onDeleteResource,
  onDeleteEdit,
  onDeleteReview,
  onDeleteFavorite,
}: UserResourceTableProps) => {
  
  const getTableProps = () => {
    switch (activeTab) {
      case "new":
        return {
          type: "new" as const,
          data: resources,
          onDelete: onDeleteResource,
          emptyMessage: "No resources submitted yet.",
        };
      case "suggest":
        return {
          type: "suggest" as const,
          data: editResources,
          onDelete: onDeleteEdit,
          emptyMessage: "No edit suggestions submitted yet.",
        };
      case "reviews":
        return {
          type: "reviews" as const,
          data: user.reviews,
          onDelete: onDeleteReview,
          emptyMessage: "No reviews submitted yet.",
        };
      case "likes":
        return {
          type: "likes" as const,
          data: user.likes,
          onDelete: onDeleteFavorite,
          emptyMessage: "No favorites yet.",
        };
      default:
        return {
          type: "new" as const,
          data: [],
          onDelete: () => {},
          emptyMessage: "No data available.",
        };
    }
  };

  const tableProps = getTableProps();

  return (
    <ResourceTable
      {...tableProps}
      deletingId={deletingId}
      onViewClick={onViewClick}
    />
  );
};
