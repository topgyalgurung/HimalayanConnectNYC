import ResourceActions from "./ResourceActions";
import { formatOpenDays } from "@/app/lib/helpers/formatOpenDays";
import toast from "react-hot-toast";

import { type Resource, User } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface OverviewTabProps {
  resource: Resource;
  user: User | null;
  onSuggestEdit: (resource: Resource) => void;
  router: ReturnType<typeof useRouter>;
  // liked: boolean;
  // toggleFavorite: (id: number) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  resource,
  user,
  onSuggestEdit,
  router,
  // liked,
  // toggleFavorite,
}) => (
  <div>
    <ResourceActions
      resource={resource}
      // liked={liked}
      // onToggleFavorite={toggleFavorite}
      className="mb-4"
    />

    <hr className="my-4 border-gray-300" />
    {resource.address && (
      <p>
        <span className="font-medium">Address:</span> {resource.address}
      </p>
    )}
    {resource.openDays && (
      <p>
        <span className="font-medium">Opens:</span>{" "}
        {formatOpenDays(resource.openDays || null)}
      </p>
    )}
    {resource.openTime && resource.closeTime && (
      <p>
        <span className="font-medium">Business Hours:</span>{" "}
        {dayjs.utc(resource.openTime).format("hh:mm A")} -{" "}
        {dayjs.utc(resource.closeTime).format("hh:mm A")}
      </p>
    )}
    {resource.url && (
      <p>
        <span className="font-medium">Website:</span>{" "}
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {resource.url?.replace(/^https?:\/\//, "")}
        </a>
      </p>
    )}
    {resource.email && (
      <p>
        <span className="font-medium">Email:</span> {resource.email}
      </p>
    )}
    {resource.phone && (
      <p>
        <span className="font-medium">Phone:</span> {resource.phone}
      </p>
    )}

    <hr className="my-4 border-gray-300" />

    <div className="text-white text-center">
      <button
        onClick={() => {
          if (!user) {
            toast.error("Please log in to suggest an edit.");
            router.push("/login");
            return;
          }
          onSuggestEdit(resource);
        }}
        className={`${
          user ? "bg-blue-500" : "bg-blue-500 cursor-not-allowed"
        } text-white py-2 px-3 rounded`}
      >
        Suggest Edit
      </button>
    </div>
  </div>
);
