"use client";
import * as React from "react";

import { format } from "date-fns";
import { type Resource } from "@/app/types/resource";
import { useState } from "react";
import { useUser } from "../context/UserProvider";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

import { FaFacebook } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { IoLinkSharp } from "react-icons/io5";
import { IoNavigateCircleOutline } from "react-icons/io5";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite"; // filled heart
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // empty heart

import Rating from "@mui/material/Rating";
import { Box } from "@mui/material";
import toast from "react-hot-toast";
import { useFavorites } from "../hooks/useFavorites";
import { useFetchResourceReview } from "../hooks/useFetchResourceReview";

interface ResourceDetailsCardProps {
  resource: Resource | null;
  editResource: Resource[];
  onSuggestEdit?: (resource: Resource) => void;
  onReviewResource?: (resource: Resource) => void;
  onCloseAction: (resource: Resource | null) => void;
}

export default function ResourceDetailsCard({
  resource,
  // editResource,
  onSuggestEdit,
  onReviewResource,
  onCloseAction,
}: ResourceDetailsCardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useUser();
  const router = useRouter();

  const { isFavorite, toggleFavorite } = useFavorites();
  const { reviews } = useFetchResourceReview(Number(resource?.id) || null);
  if (!resource) return null;
  const liked = isFavorite(Number(resource.id));

  // Removed handleLikeToggle and likedResourceId state

  // const cloudinaryBase = "https://res.cloudinary.com/dxzee5uah/image/upload/";
  // const imageUrl = resource?.imageUrl
  //   ? `${cloudinaryBase}${resource.imageUrl}`
  //   : null;

  return (
    <div className="absolute top-4 right-4 z-50 w-96 bg-white rounded-lg shadow-xl p-6">
      <button
        onClick={onCloseAction}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <div className="flex justify-between">
        <div>
          {/* show image from cloudinary her  */}
          {resource.imageUrl && (
            <Image
              src={resource?.imageUrl}
              alt={resource.name}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
              height={400}
              width={200}
            />
          )}
          <h2 className="text-2xl font-bold mb-4">{resource.name}</h2>
          <div className="space-y-3">
            <p className="text-sm font-medium text-blue-600">
              {resource.ResourceCategory?.name || "No category"}
            </p>

            <Box align="left" mb={1} borderColor="transparent">
              <Rating
                name="rating"
                value={resource.rating}
                precision={0.5}
                readOnly
              />
              {resource.rating}
            </Box>
          </div>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex justify-around mb-4 border-b">
        {["overview", "review", "about"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium ${
              activeTab == tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}

      {activeTab === "overview" && (
        <div>
          <div className="flex justify-around">
            {resource.address && resource.city && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  resource.address + ", " + resource.city
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                <IoNavigateCircleOutline className="text-red-500 text-2xl" />
              </a>
            )}

            {resource.facebookLink && (
              <a
                href={resource.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                <FaFacebook className="text-blue-600 text-2xl" />
              </a>
            )}

            {resource.email && (
              <a
                href={`mailto:${resource.email}`}
                className="text-blue-600 hover:underline"
              >
                <TfiEmail className="text-red-600 text-2xl" />
              </a>
            )}

            {resource.url && (
              <a
                href={
                  resource.url?.startsWith("http")
                    ? resource.url
                    : `https://${resource.url}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                <IoLinkSharp className="text-green-600 text-2xl" />
              </a>
            )}
            {/* favorite on click, it should call api to register into database user favorite resource */}
            <motion.div
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <IconButton
                onClick={() => {
                  toggleFavorite(Number(resource.id));
                  toast("Added to your favorite", {
                    icon: "👏",
                  });
                }}
                color="error"
              >
                {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </motion.div>
          </div>

          <hr className="my-4 border-gray-300" />

          {/* details */}

          <p className="text-gray-600">
            <span className="font-medium">Address:</span> {resource.address},{" "}
            {resource.city}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Open:</span> {resource.openDays}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Hours:</span>{" "}
            {format(resource.openTime, "hh:mm a")} -{" "}
            {format(resource.closeTime, "hh:mm a")}
          </p>
          <hr className="my-4 border-gray-300" />

          {/* suggest edit button */}

          <div className="text-white text-center">
            <button
              // disabled={!user}
              onClick={() => {
                if (!user) {
                  toast.error("Please log in to suggest an edit.");
                  router.push("/login");
                  return;
                }

                onSuggestEdit?.(resource);
              }}
              className={`${
                user ? "bg-blue-500" : "bg-blue-500 cursor-not-allowed"
              } text-white py-2 px-3 rounded`}
            >
              Suggest Edit
            </button>
          </div>
        </div>
      )}

      {activeTab === "review" && (
        <div>
          <div className="self-start text-center">
            <button
              onClick={() => {
                if (!user) {
                  toast.error("Please log in to submit a review.");
                  router.push("/login");
                  return;
                }
                onReviewResource?.(resource);
              }}
              className="text-center bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600"
            >
              Write a Review
            </button>
          </div>
          <hr className="my-4 border-gray-300" />

          {reviews.length === 0 && <p> No reviews yet.</p>}

          {reviews.map((r) => (
            <div key={r.id}>
              <p>{r.User?.firstName || "anonymous"}</p>
              <p>{r.User?.createdAt}</p>
              <Rating value={r.rating} readOnly precision={0.5} />
              <p> {r.content}</p>
              <hr className="my-4 border-gray-300" />
            </div>
          ))}
        </div>
      )}

      {activeTab === "about" && (
        <div>
          <p> {resource.description}</p>
        </div>
      )}
    </div>
  );
}
