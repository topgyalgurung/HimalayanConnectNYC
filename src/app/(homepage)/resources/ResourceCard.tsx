"use client";

import { format } from "date-fns";

import { type Resource } from "@/app/types/resource";
import { formatOpenDays } from "@/app/helpers/formatOpenDays";
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
            className="flex p-4 border rounded-md shadow-md bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]"
          >
            <div>
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
                <strong>Open Days :</strong> {formatOpenDays(resource.openDays)}
              </p>
              <p>
                <strong>Hours :</strong>
                {format(resource.openTime, "hh:mm a")}-
                {format(resource.closeTime, "hh:mm a")}
              </p>

              <div className=" flex item-end">
                {/* view details */}
                <button
                  className="text-white py-2 px-3 bg-blue-600 rounded hover:bg-blue-700"
                  onClick={() => onViewDetails?.(resource)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
