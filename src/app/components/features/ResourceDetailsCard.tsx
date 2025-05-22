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

import * as React from "react";

import { useState, useEffect } from "react";
import { useUser } from "../../context/UserProvider";
import { useRouter } from "next/navigation";
import { formatOpenDays } from "@/app/lib/helpers/formatOpenDays";
import toast from "react-hot-toast";

import { useFavorites } from "../../hooks/useFavorites";
import { useFetchResourceReview } from "../../hooks/useFetchResourceReview";

import { type Resource } from "@/app/lib/types";
import { type User } from "@/app/lib/types";
import { type ResourceReview } from "@/app/lib/types";

import TabButton from "./ResourceDetailCommon/TabButton";
import Rating from "@mui/material/Rating";
import ResourceHeader from "./ResourceDetailCommon/ResourceHeader";
import ResourceActions from "./ResourceDetailCommon/ResourceActions";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface ResourceDetailsCardProps {
  resource: Resource | null;
  editResource: Resource | null;
  onSuggestEdit?: (resource: Resource) => void;
  onReviewResource?: (resource: Resource) => void;
  onCloseAction: () => void;
}

interface OverviewTabProps {
  resource: Resource;
  user: User | null;
  onSuggestEdit: (resource: Resource) => void;
  router: ReturnType<typeof useRouter>;
  liked: boolean;
  toggleFavorite: (id: number) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  resource,
  user,
  onSuggestEdit,
  router,
  liked,
  toggleFavorite,
}) => (
  <div>
    <ResourceActions
      resource={resource}
      liked={liked}
      onToggleFavorite={toggleFavorite}
      className="mb-4"
    />

    <hr className="my-4 border-gray-300" />
    {resource.address && (
      <p>
        <span className="font-medium">Address:</span> {resource.address}
      </p>
    )}
    {resource.openDays && (
      <p>
        <span className="font-medium">Opens:</span>{" "}
        {formatOpenDays(resource.openDays || null)}
      </p>
    )}
    {resource.openTime && resource.closeTime && (
      <p>
        <span className="font-medium">Business Hours:</span>{" "}
        {dayjs.utc(resource.openTime).format("hh:mm A")} -{" "}
        {dayjs.utc(resource.closeTime).format("hh:mm A")}
      </p>
    )}
    {resource.url && (
      <p>
        <span className="font-medium">Website:</span>{" "}
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {resource.url?.replace(/^https?:\/\//, "")}
        </a>
      </p>
    )}
    {resource.email && (
      <p>
        <span className="font-medium">Email:</span> {resource.email}
      </p>
    )}
    {resource.phone && (
      <p>
        <span className="font-medium">Phone:</span> {resource.phone}
      </p>
    )}

    <hr className="my-4 border-gray-300" />

    <div className="text-white text-center">
      <button
        onClick={() => {
          if (!user) {
            toast.error("Please log in to suggest an edit.");
            router.push("/login");
            return;
          }
          onSuggestEdit(resource);
        }}
        className={`${
          user ? "bg-blue-500" : "bg-blue-500 cursor-not-allowed"
        } text-white py-2 px-3 rounded`}
      >
        Suggest Edit
      </button>
    </div>
  </div>
);

interface ReviewTabProps {
  resource: Resource;
  user: User | null;
  onReviewResource: (resource: Resource) => void;
  router: ReturnType<typeof useRouter>;
  reviews: ResourceReview[];
}

const ReviewTab: React.FC<ReviewTabProps> = ({
  resource,
  user,
  onReviewResource,
  router,
  reviews,
}) => (
  <div>
    <div className="self-start text-center">
      <button
        onClick={() => {
          if (!user) {
            toast.error("Please log in to submit a review.");
            router.push("/login");
            return;
          }
          onReviewResource(resource);
        }}
        className="text-center bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600"
      >
        Write a Review
      </button>
    </div>
    <hr className="my-4 border-gray-300" />

    {reviews.length === 0 && <p>No reviews yet.</p>}

    {reviews.map((r) => (
      <div key={r.id}>
        <p>{r.User?.firstName || "anonymous"}</p>
        <p>{r.User?.createdAt}</p>
        <Rating value={Number(r.rating)} readOnly precision={0.5} />
        <p className="text-sm text-gray-600">
          Rating: {Number(r.rating).toFixed(1)}
        </p>
        <p>{r.content}</p>
        <hr className="my-4 border-gray-300" />
      </div>
    ))}
  </div>
);

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
    <div className="fixed md:absolute top-0 md:top-4 right-0 md:right-4 z-50 w-full md:w-96 bg-white rounded-lg shadow-xl p-4 md:p-6 max-h-screen md:max-h-[90vh] overflow-y-auto">
      <button
        onClick={() => onCloseAction()}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      <ResourceHeader resource={resource} />

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
            liked={liked}
            toggleFavorite={toggleFavorite}
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
