/**
 * resource header component
 * displays the header section of a resource card, including:
 * - Resource image
 * - Resource name
 * - Category information
 * - Rating display

 */
import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import { motion } from "framer-motion";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import type { Resource, User } from "@/app/lib/definitions";
import toast from "react-hot-toast";

interface ResourceHeaderProps {
  resource: Resource;
  user:User| null;
  liked: boolean;
  onToggleFavorite: (id: number) => void;
  className?: string;
}

const ResourceHeader: React.FC<ResourceHeaderProps> = ({
  resource,
  user,
  liked,
  onToggleFavorite,
  className = "",
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
    <div className={`flex justify-between ${className}`}>

      <div>
        {resource.imageUrl && (
          <div className="relative group">
            <Image
              src={resource.imageUrl}
              alt={resource.name}
              className="w-full h-32 rounded-sm mb-2 cursor-pointer transition-transform duration-300 group-hover:scale-105"
              height={300}
              width={150}
            />
          </div>
        )}
        <div className="flex w-full justify-between items-center">
          <h2 className="text-lg font-bold">{resource.name}</h2>
          {/* if no use don't show favorite button */}
          {user && 
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
          }     

        </div>
      

        <div className="space-y-2">
          <p className="text-sm font-medium text-blue-600">
            {resource.ResourceCategory?.name || "No category"}
          </p>
          {resource.rating === 0 ? (
            <div className="text-yellow-500 text-sm">No ratings yet</div>
          ) : (
            <Box
              sx={{ textAlign: "left", mb: 0.5, borderColor: "transparent" }}
            >
              <div className="flex items-center">
                <Rating
                  name="rating"
                  value={Number(resource.rating)}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <span className="text-sm text-gray-600 ml-2">
                  {Number(resource.rating).toFixed(1)}
                </span>
              </div>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceHeader;
