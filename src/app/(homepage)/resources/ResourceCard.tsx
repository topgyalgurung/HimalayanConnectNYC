"use client";
import Link from "next/link";
import { format } from "date-fns";

import { type Resource } from "@/app/types/resource";
import { useUser } from "@/app/context/UserProvider";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// type Location = {
//   id: number;
//   latitude: number;
//   longitude: number;
// };
// type Resource = {
//   id: string;
//   name: string;
//   description: string;
//   address: string;
//   city: string;
//   openDays: string;
//   openTime: string;
//   closeTime: string;
//   ResourceCategory?: { name: string } | null;
//   Location: Location[];
// };
interface ResourceCardProps {
  resources: Resource[];
  onViewDetails?: (resource: Resource) => void;
  onSuggestEdit?: (resource: Resource) => void;
}
// ResourceCard component: Displays a list of resources
export default function ResourceCard({
  resources,
  onViewDetails,
  onSuggestEdit,
}: ResourceCardProps) {
  // function showDetail() {}
  const { user } = useUser();
  const router = useRouter();

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

              <div className="pt-4 flex items-center justify-between">
                {/* view details */}

                <button
                  className="text-white py-2 px-3 bg-blue-600 rounded hover:bg-blue-700"
                  onClick={() => onViewDetails?.(resource)}
                >
                  View Details
                  {/* {resource?.id === resource.id ? "Close" : "View Details"} */}
                </button>

                {/* suggest edit  */}
                {/* make active only user logged in  */}
                <div
                // className="text-white py-2 px-3 bg-blue-600 rounded hover:bg-blue-700"
                >
                  <button
                    // disabled={!user}
                    onClick={() => {
                      if (!user) {
                        toast.error("Please log in to suggest an edit.");
                        router.push("/login");
                        return;
                      }

                      onSuggestEdit?.(resource);
                    }}
                    className={`${
                      user ? "bg-blue-500" : "bg-blue-500 cursor-not-allowed"
                    } text-white py-2 px-3 rounded`}
                  >
                    Suggest Edit
                  </button>
                  {/* <Link href={`/suggestions/edit/${resource.id}`}>
                  Suggest Edit
                </Link> */}
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
