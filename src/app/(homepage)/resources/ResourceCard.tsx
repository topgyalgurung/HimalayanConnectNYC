/**
 * resource card for the homepage of the Himalayan Connect NYC application.
 * It displays a single resource in a card format.
 *
 */

"use client";

// import { format } from "date-fns";
// need to research if i can import simply Resource type from prisma

import { type Resource } from "@/app/lib/types";
// import { formatOpenDays } from "@/app/lib/helpers/formatOpenDays";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface ResourceCardProps {
  resources: Resource[];
  onViewDetailsAction?: (resource: Resource) => void;
}
// ResourceCard component: Displays a list of resources
export default function ResourceCard({
  resources,
  onViewDetailsAction,
}: ResourceCardProps) {
  return (
    <div className="flex flex-col  justify-between space-y-4 pb-20">
      {resources
        .filter((resource) => resource.status === "APPROVED")
        .map((resource) => (
          <div
            key={resource.id}
            className="flex flex-col md:flex-row space-y-4 justify-between p-4 border rounded-md shadow-md bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]"
          >
            <div className="flex-1">
              <h4 className="text-lg font-bold">{resource.name}</h4>
              <p className="text-blue-500">
                {resource.ResourceCategory?.name || "no category"}
              </p>
              {resource.description && (
                <p><strong>Description: </strong>{resource.description}</p>
              )}
              {resource.city && (
                <p>
                  <strong>Borough: </strong> {resource.city}
                </p>
              )}
              <p>
                <strong>Address: </strong>
                {resource.address ? resource.address : "No address available"}
              </p>
              {/* <p>
                <strong>Open Days :</strong>{" "}
                {resource.openDays ? formatOpenDays(resource.openDays) : "N/A"}
              </p> */}
              {/* <p className="flex items-center gap-1">
                <strong>Hours:</strong> */}
                {/* this format does not work for openTime DateTime? @db.Time(6) in db */}
                {/* <span className="text-gray-700">
                  {resource.openTime
                    ? format(resource.openTime, "hh:mm a")
                    : "N/A"}{" "}
                  -{" "}
                  {resource.closeTime
                    ? format(resource.closeTime, "hh:mm a")
                    : "N/A"}
                </span> */}
                {/* <span className="text-gray-700">
                  {resource.openTime
                    ? dayjs.utc(resource.openTime).format("hh:mm a")
                    : "N/A"}{" "}
                  -{" "}
                  {resource.closeTime
                    ? dayjs.utc(resource.closeTime).format("hh:mm a")
                    : "N/A"}
                </span> */}
              {/* </p> */}
            </div>

            <div className="flex items-end ml-4">
              <button
                className="text-white py-2 px-3 bg-blue-600 rounded hover:bg-blue-700"
                onClick={() => onViewDetailsAction?.(resource)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
