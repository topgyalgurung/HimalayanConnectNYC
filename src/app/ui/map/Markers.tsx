"use client";
import Image from "next/image";
import { getMarkerIconByCategory } from "./utils/markerIcons";
import {
  AdvancedMarker,
  CollisionBehavior,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { Resource } from "@/app/lib/types";
import { useState } from "react";

interface MarkersProps {
  points: Resource[];
  hoveredResourceId?: string | null;
}
export const Markers = ({ points, hoveredResourceId }: MarkersProps) => {
  // Keep track of which marker was clicked
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
  return (
    <>
      {points.map((resource) => {
        const location = resource.Location?.[0];

        // Show InfoWindow on either hover or click
        const shouldShowInfoWindow =
          hoveredResourceId === resource.id || activeMarkerId === resource.id;

        // Get marker icon based on resource category
        const image = getMarkerIconByCategory(resource.ResourceCategory?.name);

        return (
          <div
            key={resource.id}
            data-marker-id={resource.id}
            className="cursor-pointer"
            style={{ position: "relative" }}
            onClick={(e) => {
              e.stopPropagation();
              // Toggle active state on click
              setActiveMarkerId(
                activeMarkerId === resource.id ? null : resource.id
              );
            }}
            onMouseOut={(e) => {
              const toElement = e.relatedTarget as HTMLElement;
              if (toElement?.closest(`#infowindow-${resource.id}`)) {
                return;
              }
              // Add a small delay before closing to allow mouse to reach InfoWindow
              setTimeout(() => {
                if (
                  !document.querySelector(`#infowindow-${resource.id}:hover`)
                ) {
                  setActiveMarkerId(null);
                }
              }, 100);
            }}
          >
            <AdvancedMarker
              collisionBehavior={CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL}
              position={{
                lat: location?.latitude ?? 0,
                lng: location?.longitude ?? 0,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  background:
                    hoveredResourceId === resource.id
                      ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                      : "linear-gradient(135deg, #f0f4ff 0%, #e0e7ef 100%)",
                  boxShadow:
                    hoveredResourceId === resource.id
                      ? "0 4px 12px rgba(37, 99, 235, 0.3)"
                      : "0 2px 8px rgba(60, 72, 88, 0.10)",
                  padding: 4,
                  border:
                    hoveredResourceId === resource.id
                      ? "1.5px solid #2563eb"
                      : "1.5px solid #bfc8d6",
                  width: hoveredResourceId === resource.id ? 32 : 28,
                  height: hoveredResourceId === resource.id ? 32 : 28,
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <Image
                  src={image}
                  alt={`${resource.ResourceCategory?.name} icon`}
                  style={{
                    objectFit: "contain",
                    backgroundColor: "transparent",
                    filter:
                      hoveredResourceId === resource.id
                        ? "brightness(0) invert(1)"
                        : "none",
                    transform:
                      hoveredResourceId === resource.id
                        ? "scale(1.1)"
                        : "scale(1)",
                    transition: "all 0.2s ease-in-out",
                  }}
                  height={20}
                  width={20}
                />
              </span>
            </AdvancedMarker>

            {shouldShowInfoWindow && (
              <InfoWindow
                position={{
                  lat: location?.latitude ?? 0,
                  lng: location?.longitude ?? 0,
                }}
                pixelOffset={[0, -35]}
                onCloseClick={() => {
                  setActiveMarkerId(null);
                }}
                shouldFocus={false}
                zIndex={99999}
                disableAutoPan={true}
                className={`transition-opacity duration-200 ${
                  shouldShowInfoWindow ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  id={`infowindow-${resource.id}`}
                  className="bg-white rounded-lg overflow-hidden w-[300px]"
                  style={{
                    position: "relative",
                    zIndex: 99999,
                    pointerEvents: "auto",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  }}
                  onMouseOver={(e) => {
                    e.stopPropagation();
                    setActiveMarkerId(resource.id);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {/* Header Section */}
                  <div className="bg-blue-50 p-3 border-b border-gray-100">
                    <h1 className="text-base font-semibold text-gray-800 mb-1">
                      {resource.name}
                    </h1>
                    <div className="flex items-center text-sm text-gray-600">
                      <Image
                        src={getMarkerIconByCategory(resource.ResourceCategory?.name)}
                        alt={`${resource.ResourceCategory?.name} icon`}
                        width={16}
                        height={16}
                        className="mr-2"
                      />
                      <span>{resource.ResourceCategory?.name}</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-3">
                    <div className="flex items-start mb-2">
                      <span className="text-gray-500 mr-2">📍</span>
                      <p className="text-sm text-gray-600 flex-1">{resource.address}</p>
                    </div>
                    
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        resource.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors mb-2"
                    >
                      <Image 
                        src="https://cdn-icons-png.flaticon.com/512/2991/2991231.png"
                        alt="directions"
                        width={16}
                        height={16}
                        className="mr-1"
                      />
                      Get Directions
                    </a>

                    {resource.description && (
                      <div className="mt-2 border-t border-gray-100 pt-2">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {/* {resource.description.length > 150
                            ? `${resource.description.slice(0, 150)}...`
                            : resource.description} */}
                            {resource.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </InfoWindow>
            )}
          </div>
        );
      })}
    </>
  );
};
