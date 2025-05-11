import React from "react";
import Popup from "./Popup";
import type { Resource } from "@/app/lib/types";
import dayjs from "dayjs";
import { ResourceEditSuggestion } from "@prisma/client";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface ResourceDetailsPopupProps {
  anchor: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  resource: Resource | null;
  editResource: ResourceEditSuggestion | null;
  showSubmission?: boolean;
}

export default function ResourceDetailsPopup({
  anchor,
  open,
  onClose,
  resource,
  editResource,
  showSubmission = false,
}: ResourceDetailsPopupProps) {
  if (!resource) return null;

  const content = (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
      {resource.description && (
        <div className="bg-gray-50 p-3 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            Description
          </h3>
          <p className="text-gray-600 text-sm">{resource.description}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-2">
        {/* Basic Information */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Basic Information
          </h3>
          <div className="space-y-2">
            {resource.name && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 font-medium min-w-[80px]">
                  Name:
                </span>
                <span className="text-gray-700">{resource.name}</span>
              </div>
            )}
            {resource.address && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 font-medium min-w-[80px]">
                  Address:
                </span>
                <span className="text-gray-700">{resource.address}</span>
              </div>
            )}
            {resource.city && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 font-medium min-w-[80px]">
                  City:
                </span>
                <span className="text-gray-700">{resource.city}</span>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Contact Information
          </h3>
          <div className="space-y-2">
            {resource.phone && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 font-medium min-w-[80px]">
                  Phone:
                </span>
                <span className="text-gray-700">{resource.phone}</span>
              </div>
            )}
            {resource.email && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 font-medium min-w-[80px]">
                  Email:
                </span>
                <span className="text-gray-700">{resource.email}</span>
              </div>
            )}
            {resource.url && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 font-medium min-w-[80px]">
                  Website:
                </span>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm truncate"
                >
                  {resource.url}
                </a>
              </div>
            )}
            {resource.facebookLink && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 font-medium min-w-[80px]">
                  Facebook:
                </span>
                <a
                  href={resource.facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm truncate"
                >
                  {resource.facebookLink}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Operating Hours
          </h3>
          <div className="space-y-2">
            {resource.openDays && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 font-medium min-w-[80px]">
                  Open Days:
                </span>
                <span className="text-gray-700">{resource.openDays}</span>
              </div>
            )}
            {resource.openTime && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 font-medium min-w-[80px]">
                  Open Time:
                </span>
                <span className="text-gray-700">
                  {dayjs.utc(resource.openTime).format("hh:mm A")}
                </span>
              </div>
            )}
            {resource.closeTime && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 font-medium min-w-[80px]">
                  Close Time:
                </span>
                <span className="text-gray-700">
                  {dayjs.utc(resource.closeTime).format("hh:mm A")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Additional Information
          </h3>
          <div className="space-y-2">
            {resource.rating && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 font-medium min-w-[80px]">
                  Rating:
                </span>
                <span className="text-yellow-600 font-medium">
                  {resource.rating}/5
                </span>
              </div>
            )}
            {resource.ResourceCategory && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 font-medium min-w-[80px]">
                  Category:
                </span>
                <span className="text-gray-700">
                  {resource.ResourceCategory.name}
                </span>
              </div>
            )}
            {resource.Location && resource.Location.length > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 font-medium min-w-[80px]">
                  Location:
                </span>
                <span className="text-gray-700">
                  {resource.Location.map(
                    (loc) => `${loc.latitude}, ${loc.longitude}`
                  ).join(", ")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Status (only for non-favorites) */}
        {!editResource && resource.status && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Status</h3>
            <div className="flex items-center gap-2 text-sm">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  resource.status === "APPROVED"
                    ? "bg-green-100 text-green-800"
                    : resource.status === "REJECTED"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {resource.status}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Popup
      anchor={anchor}
      open={open}
      onClose={onClose}
      title={editResource?.name || resource.name || "No Title"}
      content={content}
      showSubmission={showSubmission}
    />
  );
}
