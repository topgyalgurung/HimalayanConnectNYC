"use client";

import Image from "next/image";
import { getMarkerIconByCategory } from "./utils/markerIcons";
import { AdvancedMarker, CollisionBehavior, InfoWindow } from "@vis.gl/react-google-maps";
import { Resource } from "@/app/lib/types";
import { useState } from "react";

interface MarkersProps {
    points: Resource[];
  }
export const Markers = ({ points }: MarkersProps) => {
    const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
    return (
      <>
        {points.map((resource) => {
          const location = resource.Location?.[0];
          
          // Determine if we should show the InfoWindow
          const shouldShowInfoWindow = activeMarkerId === resource.id;
  
          // Get marker icon based on resource category
          const image = getMarkerIconByCategory(resource.ResourceCategory?.name);
  
          return (
            <div
              key={resource.id}
              data-marker-id={resource.id}
              className="cursor-pointer"
              style={{ position: 'relative' }}
              onMouseOver={() => setActiveMarkerId(resource.id)}
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
                    background: "linear-gradient(135deg, #f0f4ff 0%, #e0e7ef 100%)",
                    boxShadow: "0 2px 8px rgba(60, 72, 88, 0.10)",
                    padding: 4,
                    border: "1.5px solid #bfc8d6",
                    width: 28,
                    height: 28,
                  }}
                >
                  <Image
                    src={image}
                    alt={`${resource.ResourceCategory?.name} icon`}
                    style={{
                      objectFit: "contain",
                      backgroundColor: "transparent",
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
                  onCloseClick={() => setActiveMarkerId(null)}
                  shouldFocus={false}
                  zIndex={99999}
                  disableAutoPan={true}
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