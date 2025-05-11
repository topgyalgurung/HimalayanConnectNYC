/**
 * ResourceCard Component
 *
 * This component is the resource card for the homepage of the Himalayan Connect NYC application.
 * It displays a single resource in a card format.
 *
 */

"use client";

import { format } from "date-fns";

import { type Resource } from "@/app/types/resource";
import { formatOpenDays } from "@/app/lib/helpers/formatOpenDays";

interface ResourceCardProps {
  resources: Resource[];
  onViewDetails?: (resource: Resource) => void;
}
// ResourceCard component: Displays a list of resources
export default function ResourceCard({
  resources,
  onViewDetails,
}: ResourceCardProps) {
  return (
    <div className="flex flex-col space-y-4 pb-20">
      {resources
        .filter((resource) => resource.status === "APPROVED")
        .map((resource) => (
          <div
            key={resource.id}
            className="flex justify-between p-4 border rounded-md shadow-md bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]"
          >
            <div className="flex-1">
              <h4 className="text-lg font-bold">{resource.name}</h4>
              <p className="text-gray-500">
                {resource.ResourceCategory?.name || "no category"}
              </p>
              <p>{resource.description}</p>
              <p>
                <strong>Borough: </strong> {resource.city}
              </p>
              <p>
                <strong>Address: </strong>
                {resource.address ? resource.address : "No address available"}
              </p>
              <p>
                <strong>Open Days :</strong>{" "}
                {resource.openDays ? formatOpenDays(resource.openDays) : "N/A"}
              </p>
              <p className="flex items-center gap-1">
                <strong>Hours:</strong>
                <span className="text-gray-700">
                  {resource.openTime
                    ? format(resource.openTime, "hh:mm a")
                    : "N/A"}{" "}
                  -{" "}
                  {resource.closeTime
                    ? format(resource.closeTime, "hh:mm a")
                    : "N/A"}
                </span>
              </p>
            </div>

            <div className="flex items-end ml-4">
              <button
                className="text-white py-2 px-3 bg-blue-600 rounded hover:bg-blue-700"
                onClick={() => onViewDetails?.(resource)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
