"use client";
import Link from "next/link";
import { format } from "date-fns";
// import { useEffect, useState } from "react";

type Location = {
  id: number;
  latitude: number;
  longitude: number;
};
type Resource = {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  openDays: string;
  openTime: string;
  closeTime: string;
  ResourceCategory?: { name: string } | null;
  Location: Location[];
};

// ResourceCard component: Displays a list of resources
export default function ResourceCard({
  resources,
  onViewDetails,
}: {
  resources: Resource[];
  onViewDetails?: (resource: Resource) => void;
}) {
  // function showDetail() {}

  return (
    <div className="flex flex-col space-y-4 pb-20">
      {resources.map((resource) => (
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
              <strong>Open Days :</strong> {resource.openDays}
            </p>
            <p>
              <strong>Hours :</strong>
              {format(resource.openTime, "hh:mm a")}-
              {format(resource.closeTime, "hh:mm a")}
            </p>
            {/* <p>
                <strong>Location: </strong>
                {Location.map((location) => (
                  <span key={location.id}>
                    Latitude: {location.latitude}, Longitude:{" "}
                    {location.longitude}
                  </span>
                ))}
              </p> */}

            {/* view details */}

            <div className="pt-4 flex items-center justify-between">
              {/* update selectedResource in parent passed down to mapview */}
              <button
                className="text-white py-2 px-3 bg-blue-600 rounded hover:bg-blue-700"
                onClick={() => onViewDetails(resource)}
              >
                {resources?.id === resource.id ? "Close" : "View Details"}
              </button>

              {/* suggest edit  */}

              <div className="text-white py-2 px-3 bg-blue-600 rounded hover:bg-blue-700">
                <Link href={`/suggestions/edit/${resource.id}`}>
                  Suggest Edit
                </Link>
              </div>
            </div>
          </div>

          {/* image section if images are available */}
          {/* <div>
              <img
                src={image ?? "/mememan.webp"}
                alt={`${name}'s profile`}
                className=""
              />
            </div> */}
        </div>
      ))}
    </div>
  );
}
