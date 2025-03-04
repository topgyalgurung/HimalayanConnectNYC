"use client";
import Link from "next/link";
import { format } from "date-fns";

type Resource = {
  id: string;
  name: string;
  address: string;
  city: string;
  openDays: string;
  openTime: string;
  closeTime: string;
  ResourceCategory?: { name: string } | null;
  Location?: [
    {
      latitude: number;
      longitude: number;
    }
  ];
  phone?: string;
  rating: number;
};

// ResourceCard component: Displays a list of resources
export default function ResourceCard({ resources }: { resources: Resource[] }) {
  return (
    <div className="flex flex-col space-y-4">
      {resources.map(
        ({
          id,
          name,
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
