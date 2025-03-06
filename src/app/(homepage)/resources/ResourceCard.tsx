"use client";
import Link from "next/link";
import { format } from "date-fns";
import { useEffect, useState } from "react";

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
export default function ResourceCard({ resources }: { resources: Resource[] }) {
  const [data, setData] = useState<Resource[]>(resources);

  useEffect(() => {
    setData(resources);
  }, [resources]);

  return (
    <div className="flex flex-col space-y-4">
      {resources.map(
        ({
          id,
          name,
          description,
          ResourceCategory,
          address,
          city,
          Location,
          openDays,
          openTime,
          closeTime,
          phone,
        }) => (
          <div
            key={id}
            className="flex p-4 border rounded-md shadow-md bg-white"
          >
            <div>
              <h4 className="text-lg font-bold">{name}</h4>
              <p className="text-gray-500">
                {ResourceCategory?.name || "no category"}
              </p>
              <p>{description}</p>
              <p>
                <strong>Borough: </strong> {city}
              </p>
              <p>
                <strong>Address: </strong>
                {address ? address : "No address available"}
              </p>
              <p>
                <strong>Open Days :</strong> {openDays}
              </p>
              <p>
                <strong>Hours :</strong>
                {format(openTime, "hh:mm a")}-{format(closeTime, "hh:mm a")}
              </p>

              <p>
                <strong>Phone:</strong> {phone}
              </p>
              {/* Handle multiple locations */}

              {Location && Location.length > 0 ? (
                Location.map(({ id, latitude, longitude }) => (
                  <p key={id}>
                    <strong>Location {id + 1}:</strong> Lat {latitude}, Lng
                    {longitude}
                  </p>
                ))
              ) : (
                <p>No location data</p>
              )}

              {/* Navigation links for resource details and suggestions */}
              <div className="pt-4 flex items-center justify-between">
                <div className=" text-white py-2 px-3 bg-blue-600">
                  <Link href={`/resources/${id}`}>View Details</Link>
                </div>
                <div className="text-white py-2 px-3 bg-blue-600">
                  <Link href={`/suggestions/edit/${id}`}>Edit Resource</Link>
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
        )
      )}
    </div>
  );
}
