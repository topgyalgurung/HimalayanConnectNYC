/**
 * ResourceHeader Component
 *
 * A component that displays the header section of a resource card, including:
 * - Resource image
 * - Resource name
 * - Category information
 * - Rating display
 *
 * @component
 * @param {Object} props
 * @param {Resource} props.resource - The resource object containing display information
 * @param {string} [props.className] - Optional additional CSS classes
 *
 * @example
 * <ResourceHeader
 *   resource={resourceData}
 *   className="mb-4"
 * />
 */
import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import type { Resource } from "@/app/lib/types";

interface ResourceHeaderProps {
  resource: Resource;
  className?: string;
}

const ResourceHeader: React.FC<ResourceHeaderProps> = ({
  resource,
  className = "",
}) => {
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
        <h2 className="text-lg font-bold mb-2">{resource.name}</h2>
        <div className="space-y-2">
          <p className="text-sm font-medium text-blue-600">
            {resource.ResourceCategory?.name || "No category"}
          </p>
          {resource.rating === 0 ? (
            <div className="text-yellow-500 text-sm">No ratings yet</div>
          ) : (
            <Box sx={{ textAlign: "left", mb: 0.5, borderColor: "transparent" }}>
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
