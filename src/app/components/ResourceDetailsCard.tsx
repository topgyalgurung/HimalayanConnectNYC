"use client";

import { format } from "date-fns";
import { type Resource } from "../types/resource";

interface ResourceDetailsCardProps {
  resource: Resource | null;
  onCloseAction: () => void;
}

export default function ResourceDetailsCard({ resource, onCloseAction }: ResourceDetailsCardProps) {
  if (!resource) return null;

  return (
    <div className="absolute top-4 right-4 z-50 w-96 bg-white rounded-lg shadow-xl p-6">
      <button 
        onClick={onCloseAction}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      
      <h2 className="text-2xl font-bold mb-4">{resource.name}</h2>
      <div className="space-y-3">
        <p className="text-sm font-medium text-blue-600">
          {resource.ResourceCategory?.name || "No category"}
        </p>
        <p className="text-gray-600">{resource.description}</p>
        
        <div className="border-t pt-3">
          <h3 className="font-semibold mb-2">Location & Hours</h3>
          <p className="text-gray-600">
            <span className="font-medium">Address:</span> {resource.address}, {resource.city}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Open:</span> {resource.openDays}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Hours:</span>{" "}
            {format(resource.openTime, "hh:mm a")} - {format(resource.closeTime, "hh:mm a")}
          </p>
        </div>
      </div>
    </div>
  );
}
