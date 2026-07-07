/**
 * resource card for the homepage of the Himalayan Connect NYC application.
 * It displays a single resource in a card format.
 *
 */

"use client";

// import { format } from "date-fns";
// need to research if i can import simply Resource type from prisma

import { type Resource } from "@/app/lib/types";
import {
  formatTimeRange,
  getOpenStatus,
} from "@/app/lib/helpers/formatHours";

interface ResourceCardProps {
  resources: Resource[];
  onViewDetailsAction?: (resource: Resource) => void;
  onResourceHover?: (resourceId: string | null) => void;
}
// ResourceCard component: Displays a list of resources
export default function ResourceCard({
  resources,
  onViewDetailsAction,
  onResourceHover,
}: ResourceCardProps) {
  return (
    <div className="flex flex-col  justify-between space-y-4 pb-20">
      {resources
        .filter((resource) => resource.status === "APPROVED")
        .map((resource) => {
          const hours = formatTimeRange(resource.openTime, resource.closeTime);
          const openStatus = getOpenStatus(
            resource.openDays,
            resource.openTime,
            resource.closeTime
          );

          return (
          <div
            key={resource.id}
            className="flex flex-col md:flex-row space-y-4 justify-between p-4 border rounded-md shadow-md bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]"
            onMouseEnter={() => onResourceHover?.(resource.id)}
            onMouseLeave={() => onResourceHover?.(null)}
          >
            <div className="flex-1">
              <h4 className="text-lg font-bold">{resource.name}</h4>
              <p className="text-blue-500">
                {resource.ResourceCategory?.name || "no category"}
              </p>
              {resource.city && (
                <p>
                  <strong>Borough: </strong> {resource.city}
                </p>
              )}
              <p>
                <strong>Address: </strong>
                {resource.address ? resource.address : "No address available"}
              </p>
              {(openStatus || hours) && (
                <p className="mt-1 flex flex-wrap items-center gap-2">
                  {openStatus && (
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
                        openStatus.isOpen
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          openStatus.isOpen ? "bg-green-600" : "bg-red-600"
                        }`}
                      />
                      {openStatus.label}
                    </span>
                  )}
                  {!openStatus && hours && (
                    <span className="text-sm text-gray-600">{hours}</span>
                  )}
                </p>
              )}
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
          );
        })}
    </div>
  );
}
