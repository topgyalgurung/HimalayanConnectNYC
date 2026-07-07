import ResourceActions from "./ResourceActions";
import { formatOpenDays } from "@/app/lib/helpers/formatOpenDays";
import {
  formatTimeRange,
  getOpenStatus,
} from "@/app/lib/helpers/formatHours";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

import { type Resource, User } from "@/app/lib/types";
import { useRouter } from "next/navigation";

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
}) => {
  const t = useTranslations("details");
  const tHours = useTranslations("hours");
  const hours = formatTimeRange(resource.openTime, resource.closeTime);
  const openStatus = getOpenStatus(
    resource.openDays,
    resource.openTime,
    resource.closeTime
  );

  return (
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
        <span className="font-medium">{t("address")}:</span> {resource.address}
      </p>
    )}
    {resource.openDays && (
      <p>
        <span className="font-medium">{t("open")}:</span>{" "}
        {formatOpenDays(resource.openDays || null)}
        {hours ? `, ${hours}` : ""}
      </p>
    )}
    {!resource.openDays && hours && (
      <p>
        <span className="font-medium">{t("hours")}:</span> {hours}
      </p>
    )}
    {openStatus && (
      <p>
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
          {openStatus.isOpen
            ? `${tHours("open")} · ${tHours("closes", { time: openStatus.time })}`
            : `${tHours("closed")} · ${tHours("opens", { time: openStatus.time })}`}
        </span>
      </p>
    )}
    {resource.url && (
      <p>
        <span className="font-medium">{t("website")}:</span>{" "}
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
        <span className="font-medium">{t("email")}:</span> {resource.email}
      </p>
    )}
    {resource.phone && (
      <p>
        <span className="font-medium">{t("phone")}:</span> {resource.phone}
      </p>
    )}

    <hr className="my-4 border-gray-300" />

    <div className="text-white text-center">
      <button
        onClick={() => {
          if (!user) {
            toast.error(t("loginToSuggest"));
            router.push("/login");
            return;
          }
          onSuggestEdit(resource);
        }}
        className={`${
          user ? "bg-blue-500" : "bg-blue-500 cursor-not-allowed"
        } text-white py-2 px-3 rounded`}
      >
        {t("suggestEdit")}
      </button>
    </div>
  </div>
  );
};
