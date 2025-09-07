"use client";
import Image from "next/image";
import { getMarkerIconByCategory } from "./utils/markerIcons";
import { AdvancedMarker, CollisionBehavior, InfoWindow } from "@vis.gl/react-google-maps";
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
          const shouldShowInfoWindow = hoveredResourceId === resource.id || activeMarkerId === resource.id;
  
          // Get marker icon based on resource category
          const image = getMarkerIconByCategory(resource.ResourceCategory?.name);
  
          return (
            <div
              key={resource.id}
              data-marker-id={resource.id}
              className="cursor-pointer"
              style={{ position: 'relative' }}
              
              onClick={(e) => {
                e.stopPropagation();
                // Toggle active state on click
                setActiveMarkerId(activeMarkerId === resource.id ? null : resource.id);
              }}
              onMouseOut={(e) => {
                const toElement = e.relatedTarget as HTMLElement;
                if (toElement?.closest(`#infowindow-${resource.id}`)) {
                  return;
                }
                // Add a small delay before closing to allow mouse to reach InfoWindow
                setTimeout(() => {
                  if (!document.querySelector(`#infowindow-${resource.id}:hover`)) {
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
                    background: hoveredResourceId === resource.id 
                      ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                      : "linear-gradient(135deg, #f0f4ff 0%, #e0e7ef 100%)",
                    boxShadow: hoveredResourceId === resource.id
                      ? "0 4px 12px rgba(37, 99, 235, 0.3)"
                      : "0 2px 8px rgba(60, 72, 88, 0.10)",
                    padding: 4,
                    border: hoveredResourceId === resource.id
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
                      filter: hoveredResourceId === resource.id ? "brightness(0) invert(1)" : "none",
                      transform: hoveredResourceId === resource.id ? "scale(1.1)" : "scale(1)",
                      transition: "all 0.2s ease-in-out",
                    }}
                    height={20}
                    width={20}
                  />
                </span>
              </AdvancedMarker>
  
              {shouldShowInfoWindow && (
                <InfoWindow
                  headerContent={
                    <h1 className="text-sm font-semibold text-gray-800">
                      {resource.name}
                    </h1>
                  }
                  position={{
                    lat: location?.latitude ?? 0,
                    lng: location?.longitude ?? 0,
                  }}
                  pixelOffset={[0, -30]} // Increased offset to move it higher above the pin
              onCloseClick={() => {
                setActiveMarkerId(null);
                // Don't clear hover state on close click as it's managed by the card hover
              }}
              shouldFocus={false}
              zIndex={99999}
              disableAutoPan={true}
              className={`transition-opacity duration-200 ${
                shouldShowInfoWindow ? 'opacity-100' : 'opacity-0'
              }`}
                >
                  <div
                    id={`infowindow-${resource.id}`}
                    className="bg-white shadow-lg rounded-lg p-1 w-[250px]"
                    style={{ 
                      position: 'relative',
                      zIndex: 99999,
                      pointerEvents: 'auto'
                    }}
                    onMouseOver={(e) => {
                      e.stopPropagation();
                      setActiveMarkerId(resource.id);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <p className="text-sm text-gray-600"> 📍{resource.address}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        resource.address
                      )}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors no-underline hover:underline"
                    >
                      View on Google Maps
                    </a>
  
                    <p className="text-sm text-gray-500 mt-2">
                      {resource.description && resource.description.length > 200
                        ? `${resource.description.slice(0, 200)}...`
                        : resource.description}
                    </p>
                  </div>
                </InfoWindow>
              )}
            </div>
          );
        })}
      </>
    );
  };