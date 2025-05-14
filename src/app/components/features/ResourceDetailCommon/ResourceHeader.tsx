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
          <Image
            src={resource.imageUrl}
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
          {resource.rating === 0 ? (
            <div className="text-yellow-500">No ratings yet</div>
          ) : (
            <Box sx={{ textAlign: "left", mb: 1, borderColor: "transparent" }}>
              <Rating
                name="rating"
                value={Number(resource.rating)}
                precision={0.5}
                readOnly
              />
              <span className="text-sm text-gray-600 ml-2">
                {Number(resource.rating).toFixed(1)}
              </span>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceHeader;
