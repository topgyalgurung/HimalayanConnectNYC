"use client";
import * as React from "react";

import { format } from "date-fns";
import { type Resource } from "@/app/types/resource";
import { useState } from "react";
import { useUser } from "../context/UserProvider";
import { useRouter } from "next/navigation";

import { FaFacebook } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { IoLinkSharp } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { IoNavigateCircleOutline } from "react-icons/io5";

import Rating from "@mui/material/Rating";
import { Box } from "@mui/material";
import toast from "react-hot-toast";

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
  // onSuggestEdit,
  onReviewResource,
  onCloseAction,
}: ResourceDetailsCardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useUser();
  const router = useRouter();
  if (!resource) return null;
  // const [value, setValue] = React.useState<number | null>(5);

  // get average rating
  // getAverageRating = () => {
  //   const sum = (accumulator, currentValue) => accumulator + currentValue;
  //   const ratingsArr = this.props.showPark.reviews.map(reviewObj => reviewObj.rating)
  //   return ratingsArr.reduce(sum)/ratingsArr.length
  // };

  return (
    <div className="absolute top-4 right-4 z-50 w-96 bg-white rounded-lg shadow-xl p-6">
      <button
        onClick={onCloseAction}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      {/* image */}
      <h2 className="text-2xl font-bold mb-4">{resource.name}</h2>
      <div className="space-y-3">
        <p className="text-sm font-medium text-blue-600">
          {resource.ResourceCategory?.name || "No category"}
        </p>
        <Rating name="read-only" value={resource.rating} readOnly />
        {/* <p>{resource.rating}</p> */}
      </div>

      {/* Tab Buttons */}
      <div className="flex space-x-4 mb-4 border-b">
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
          <div className="flex space-x-3">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                resource.address + ", " + resource.city
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              <IoNavigateCircleOutline className="text-red-500 text-xl" />
              Directions
            </a>
            <a
              href={resource.facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              <FaFacebook className="text-blue-600 text-xl" />
              Facebook
            </a>
            <a href={resource.email} className="text-blue-600 hover:underline">
              <TfiEmail className="text-red-600 text-xl" />
              Email
            </a>
            <a href={resource.url} className="text-blue-600 hover:underline">
              <IoLinkSharp className="text-green-600 text-xl" />
              Website
            </a>
            <div className="favorite" className="text-blue-600 hover:underline">
              <MdFavoriteBorder />
              Favorite
            </div>
          </div>
          <hr className="my-4 border-gray-300" />
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
          {/* suggest edit button */}
          {/* <div className="text-white py-2 px-3 bg-blue-600 rounded hover:bg-blue-700"> */}
          {/* NOTE: for now have suggest edit from resource card only, 
            later implement to have it on ResourceDetailsCard not on ResourceCard on the ResourceList  */}

          {/* {editResource.map((res) => (
              <button onClick={() => onSuggestEdit?.(res)}>
                Suggest Edit
              </button>
          ))} */}
          {/* </div> */}
        </div>
      )}

      {activeTab === "review" && (
        <div>
          <Box align="left" mb={1} borderColor="transparent">
            <Rating name="rating" value={resource.rating} readOnly />
            {resource.rating}
          </Box>

          {/* SHOW USER REVIEWS */}

          {/* post review  */}
          <div>
            <button
              // disabled={!user}
              onClick={() => {
                if (!user) {
                  toast.error("Please log in to submit a review.");
                  router.push("/login");
                  return;
                }
                onReviewResource?.(resource);
              }}
              className="text-center bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600"
              // className={`${
              //   user ? "bg-blue-500" : "bg-gray-300 cursor-not-allowed"
              // } text-white py-2 px-3 rounded`}
            >
              Submit a review
            </button>
          </div>
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
