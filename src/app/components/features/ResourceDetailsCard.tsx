/**
 * resource details card component
 * displays comprehensive information about a resource.
 * features multiple tabs for different types of information:
 * - Overview: Basic details and actions
 * - Review: User reviews and rating system
 * - About: Detailed description
 *
 */
"use client";

import React from "react";

import { useState, useEffect } from "react";
import { useUser } from "../../context/UserProvider";
import { useRouter } from "next/navigation";
import { useFavorites } from "../../hooks/useFavorites";
import { useFetchResourceReview } from "../../hooks/useFetchResourceReview";
import { type Resource, User } from "@/app/lib/types";
import TabButton from "./ResourceDetailCommon/TabButton";
import ResourceHeader from "./ResourceDetailCommon/ResourceHeader";
import { ReviewTab } from "./ResourceDetailCommon/ReviewTab";
import { OverviewTab } from "./ResourceDetailCommon/Overview";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface ResourceDetailsCardProps {
  resource: Resource | null;
  editResource: Resource | null;
  onSuggestEdit?: (resource: Resource) => void;
  onReviewResource?: (resource: Resource) => void;
  onCloseAction: () => void;
  liked?: boolean;
  toggleFavorite?: (id: number) => void;
}

export default function ResourceDetailsCard({
  resource,
  onSuggestEdit,
  onReviewResource,
  onCloseAction,
}: ResourceDetailsCardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useUser();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { reviews, refetch: refetchReviews } = useFetchResourceReview(
    Number(resource?.id) || null
  );

  // Refetch reviews when review tab is active or when a review is submitted
  useEffect(() => {
    if (activeTab === "review") {
      refetchReviews();
    }
  }, [activeTab, refetchReviews]);

  // Listen for review submission
  // Refetch reviews when a review is submitted
  useEffect(() => {
    const handleReviewSubmitted = () => {
      if (activeTab === "review") {
        refetchReviews();
        router.refresh();
      }
    };

    window.addEventListener("reviewSubmitted", handleReviewSubmitted);
    return () => {
      window.removeEventListener("reviewSubmitted", handleReviewSubmitted);
    };
  }, [activeTab, refetchReviews, router]);

  if (!resource) return null;
  const liked = isFavorite(Number(resource.id));

  return (
    <div className="fixed md:absolute md:top-8 md:right-6 md:p-6 md:w-96 md:max-h-[90vh] top-12 right-2 left-2 z-50 w-full  bg-white rounded-lg shadow-xl p-4 max-h-screen  overflow-y-auto">
      <button
        onClick={() => onCloseAction()}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      <ResourceHeader
        resource={resource}
        liked={liked}
        onToggleFavorite={toggleFavorite}
      />

      <div className="flex justify-around mb-4 border-b overflow-x-auto">
        {["overview", "review", "about"].map((tab) => (
          <TabButton
            key={tab}
            label={tab}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          />
        ))}
      </div>

      <div className="overflow-y-auto">
        {activeTab === "overview" && (
          <OverviewTab
            resource={resource}
            user={user as unknown as User | null}
            onSuggestEdit={onSuggestEdit!}
            router={router}
            // liked={liked}
            // toggleFavorite={toggleFavorite}
          />
        )}

        {activeTab === "review" && (
          <ReviewTab
            resource={resource}
            user={user as unknown as User | null}
            onReviewResource={onReviewResource!}
            router={router}
            reviews={reviews}
          />
        )}

        {activeTab === "about" && (
          <div>
            <p>{resource.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
