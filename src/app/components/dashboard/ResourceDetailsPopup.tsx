import React from 'react';
import { format } from 'date-fns';
import Popup from './Popup';
import type { Resource } from '@/app/types/resource';

interface ResourceDetailsPopupProps {
  anchor: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  resource: Resource | null;
}

export default function ResourceDetailsPopup({
  anchor,
  open,
  onClose,
  resource
}: ResourceDetailsPopupProps) {
  if (!resource) return null;

  const content = (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
      {resource.description && (
        <div className="bg-gray-50 p-3 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Description</h3>
          <p className="text-gray-600 text-sm">{resource.description}</p>
        </div>
      )}
      
      {resource.content && (
        <div className="bg-gray-50 p-3 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Review</h3>
          <p className="text-gray-600 text-sm whitespace-pre-wrap">{resource.content}</p>
          {resource.rating && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-gray-500 font-medium">Rating:</span>
              <span className="text-yellow-600 font-medium">{resource.rating}/5</span>
            </div>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-2">
        {resource.city && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 font-medium min-w-[80px]">City:</span>
            <span className="text-gray-700">{resource.city}</span>
          </div>
        )}
        
        {resource.address && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 font-medium min-w-[80px]">Address:</span>
            <span className="text-gray-700">{resource.address}</span>
          </div>
        )}
        
        {resource.openDays && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 font-medium min-w-[80px]">Open Days:</span>
            <span className="text-gray-700">{resource.openDays}</span>
          </div>
        )}
        
        {resource.openTime && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 font-medium min-w-[80px]">Open Time:</span>
            <span className="text-gray-700">
              {format(new Date(resource.openTime), "hh:mm a")}
            </span>
          </div>
        )}
        
        {resource.closeTime && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 font-medium min-w-[80px]">Close Time:</span>
            <span className="text-gray-700">
              {format(new Date(resource.closeTime), "hh:mm a")}
            </span>
          </div>
        )}
        
        {resource.status && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 font-medium min-w-[80px]">Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              resource.status === "APPROVED" 
                ? "bg-green-100 text-green-800"
                : resource.status === "REJECTED"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}>
              {resource.status}
            </span>
          </div>
        )}
        
        {resource.createdAt && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 font-medium min-w-[80px]">Created:</span>
            <span className="text-gray-700">
              {format(new Date(resource.createdAt), "yyyy-MM-dd")}
            </span>
          </div>
        )}
        
        {resource.updatedAt && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 font-medium min-w-[80px]">Updated:</span>
            <span className="text-gray-700">
              {format(new Date(resource.updatedAt), "yyyy-MM-dd")}
            </span>
          </div>
        )}
        
        {resource.phone && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 font-medium min-w-[80px]">Phone:</span>
            <span className="text-gray-700">{resource.phone}</span>
          </div>
        )}
        
        {resource.email && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 font-medium min-w-[80px]">Email:</span>
            <span className="text-gray-700">{resource.email}</span>
          </div>
        )}
        
        {resource.url && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 font-medium min-w-[80px]">Website:</span>
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
      </div>
    </div>
  );

  return (
    <Popup
      anchor={anchor}
      open={open}
      onClose={onClose}
      title={resource.name || "No Title"}
      content={content}
    />
  );
} 