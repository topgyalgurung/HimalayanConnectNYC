/**
 * resource actions component
 * 
 * displays interactive action buttons for a resource, including:
 * - Navigation link (Google Maps)
 * - Facebook link
 * - Email link
 * - Website link
 * - Favorite toggle button

 */
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { IoLinkSharp } from "react-icons/io5";
import { IoNavigateCircleOutline } from "react-icons/io5";
import type { Resource } from "@/app/lib/types";
import toast from "react-hot-toast";

interface ResourceActionsProps {
  resource: Resource;

  className?: string;
}

const ResourceActions: React.FC<ResourceActionsProps> = ({
  resource,
  // liked,
  // onToggleFavorite,
  className = "",
}) => {

  return (
    <div className={`flex justify-between items-center ${className}`}>
      {/* if no link availble, show toast error, show all icons to be consistent */}
      {/* except address  we will supposed to have by design */}
      {/* <div className="flex space-x-4"> */}
      {resource.address && (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            resource.address
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          <IoNavigateCircleOutline className="text-red-500 text-2xl" />
        </a>
      )}

      {/* {resource.facebookLink && ( */}

      <a
        href={resource.facebookLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 transition-colors"
        onClick={(e) => {
          if (!resource.facebookLink) {
            e.preventDefault();
            toast.error("Facebook link not available");
          }
        }}
      >
        <FaFacebook className="text-blue-600 text-2xl" />
      </a>

      {/* )} */}

      {/* {resource.email && ( */}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`mailto:${resource.email}`}
        className="text-blue-600 hover:text-blue-800 transition-colors"
        onClick={(e) => {
          if (!resource.email) {
            e.preventDefault();
            toast.error("Email link not available");
          }
        }}
      >
        <TfiEmail className="text-red-600 text-2xl" />
      </a>
      {/* )} */}

      {/* {resource.url && ( */}
      <a
        href={
          resource.url?.startsWith("http")
            ? resource.url
            : `https://${resource.url}`
        }
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 transition-colors"
        onClick={(e) => {
          if (!resource.url) {
            e.preventDefault();
            toast.error("Website link not available");
          }
        }}
      >
        <IoLinkSharp className="text-green-600 text-2xl" />
      </a>
      {/* )} */}

    </div>
  );
};

export default ResourceActions;
