/**
 * ResourceActions Component
 * 
 * A component that displays interactive action buttons for a resource, including:
 * - Navigation link (Google Maps)
 * - Facebook link
 * - Email link
 * - Website link
 * - Favorite toggle button
 * 
 * @component
 * @param {Object} props
 * @param {Resource} props.resource - The resource object containing action links
 * @param {boolean} props.liked - Current favorite status of the resource
 * @param {Function} props.onToggleFavorite - Handler for toggling favorite status
 * @param {string} [props.className] - Optional additional CSS classes
 * 
 * @example
 * <ResourceActions
 *   resource={resourceData}
 *   liked={isFavorite}
 *   onToggleFavorite={handleToggleFavorite}
 *   className="flex justify-between"
 * />
 */
import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { IoLinkSharp } from "react-icons/io5";
import { IoNavigateCircleOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import type { Resource } from '@/app/lib/types';
import toast from "react-hot-toast";

interface ResourceActionsProps {
  resource: Resource;
  liked: boolean;
  onToggleFavorite: (id: number) => void;
  className?: string;
}

const ResourceActions: React.FC<ResourceActionsProps> = ({
  resource,
  liked,
  onToggleFavorite,
  className = ''
}) => {
  const handleFavoriteClick = () => {
    onToggleFavorite(Number(resource.id));
    if (!liked) {
      toast("Added to your favorite", { icon: "👏" });
    } else {
      toast("Removed from your favorite", { icon: "❌" });
    }
  };

  return (
    <div className={`flex justify-between items-center ${className}`}>
      {/* <div className="flex space-x-4"> */}
        {resource.address && resource.city && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              resource.address + ", " + resource.city
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <IoNavigateCircleOutline className="text-red-500 text-2xl" />
          </a>
        )}

        {resource.facebookLink && (
          <a
            href={resource.facebookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FaFacebook className="text-blue-600 text-2xl" />
          </a>
        )}

        {resource.email && (
          <a
            href={`mailto:${resource.email}`}
            className="text-blue-600 hover:text-blue-800 transition-colors"
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
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <IoLinkSharp className="text-green-600 text-2xl" />
          </a>
        )}

      <motion.div
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <IconButton
          onClick={handleFavoriteClick}
          color="error"
          className="hover:bg-red-50"
        >
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </motion.div>
      {/* </div> */}
    </div>
  );
};

export default ResourceActions; 