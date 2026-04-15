"use client";
import Image from "next/image";
import { getMarkerIconByCategory } from "./utils/markerIcons";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import {
  AdvancedMarker,
  CollisionBehavior,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import { Resource } from "@/app/lib/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface MarkersProps {
  points: Resource[];
  hoveredResourceId?: string | null;
}
export const Markers = ({ points, hoveredResourceId }: MarkersProps) => {
  // Keep track of which marker was clicked
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
  const map = useMap();
  const markersRef = useRef<Record<string, google.maps.marker.AdvancedMarkerElement>>(
    {}
  );

  const clusterer = useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({
      map,
      renderer: {
        render: ({ count, position }) =>
          new google.maps.Marker({
            position,
            zIndex: 1000 + count,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: "#2563eb",
              fillOpacity: 0.9,
              strokeColor: "#ffffff",
              strokeOpacity: 1,
              strokeWeight: 2,
              scale: count >= 20 ? 24 : count >= 10 ? 20 : 17,
            },
            label: {
              text: String(count),
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: "700",
            },
          }),
      },
    });
  }, [map]);

  useEffect(() => {
    return () => {
      clusterer?.clearMarkers();
    };
  }, [clusterer]);

  const setMarkerRef = useCallback(
    (
      marker: google.maps.marker.AdvancedMarkerElement | null,
      resourceId: string
    ) => {
      if (!clusterer) return;

      const currentMarker = markersRef.current[resourceId];

      if (marker && currentMarker === marker) {
        return;
      }

      if (!marker && !currentMarker) {
        return;
      }

      if (currentMarker) {
        clusterer.removeMarker(currentMarker);
        delete markersRef.current[resourceId];
      }

      if (marker) {
        markersRef.current[resourceId] = marker;
        clusterer.addMarker(marker);
      }
    },
    [clusterer]
  );

  return (
    <>
      <style>{`
        @keyframes marker-pulse {
          0% {
            transform: scale(0.95);
            opacity: 0.95;
          }
          70% {
            transform: scale(1.14);
            opacity: 0.2;
          }
          100% {
            transform: scale(1.22);
            opacity: 0;
          }
        }
      `}</style>
      {points.map((resource) => {
        const location = resource.Location?.[0];
        if (
          !location ||
          location.latitude === null ||
          location.longitude === null
        ) {
          return null;
        }

        const isHighlighted =
          hoveredResourceId === resource.id || activeMarkerId === resource.id;

        // Show InfoWindow on either hover or click
        const shouldShowInfoWindow = isHighlighted;

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
              ref={(marker) => setMarkerRef(marker, resource.id)}
              collisionBehavior={CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL}
              position={{
                lat: location.latitude,
                lng: location.longitude,
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transform: isHighlighted ? "scale(1.04)" : "scale(1)",
                  transition: "transform 0.2s ease-in-out",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: -2,
                    width: isHighlighted ? 30 : 24,
                    height: isHighlighted ? 30 : 24,
                    borderRadius: "9999px",
                    background: isHighlighted
                      ? "rgba(37, 99, 235, 0.16)"
                      : "rgba(37, 99, 235, 0.08)",
                    border: isHighlighted
                      ? "1px solid rgba(37, 99, 235, 0.28)"
                      : "1px solid rgba(37, 99, 235, 0.12)",
                    boxShadow: "0 0 0 3px rgba(255,255,255,0.26)",
                    animation: isHighlighted
                      ? "marker-pulse 1.6s ease-out infinite"
                      : "none",
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isHighlighted ? 24 : 20,
                    height: isHighlighted ? 24 : 20,
                    borderRadius: "9999px",
                    background: isHighlighted
                      ? "#2563eb"
                      : "#3b82f6",
                    border: "2px solid #ffffff",
                    boxShadow: isHighlighted
                      ? "0 6px 12px rgba(37, 99, 235, 0.24)"
                      : "0 3px 8px rgba(15, 23, 42, 0.20)",
                  }}
                >
                  <Image
                    src={image}
                    alt={`${resource.ResourceCategory?.name} icon`}
                    style={{
                      objectFit: "contain",
                      backgroundColor: "transparent",
                      filter: "brightness(0) invert(1)",
                    }}
                    height={isHighlighted ? 12 : 10}
                    width={isHighlighted ? 12 : 10}
                  />
                </div>
                <span
                  style={{
                    position: "relative",
                    zIndex: 0,
                    marginTop: -1,
                    width: 0,
                    height: 0,
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderTop: isHighlighted
                      ? "10px solid #2563eb"
                      : "9px solid #3b82f6",
                    filter: "drop-shadow(0 2px 3px rgba(15, 23, 42, 0.16))",
                  }}
                />
              </div>
            </AdvancedMarker>

            {shouldShowInfoWindow && (
              <InfoWindow
                position={{
                  lat: location.latitude,
                  lng: location.longitude,
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
                        resource.address || ""
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
