"use client";
import { useState } from "react";

import {
  Map,
  APIProvider,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  CollisionBehavior,
  InfoWindow,
} from "@vis.gl/react-google-maps";
interface MarkersProps {
  points: Resource[];
}
import Image from "next/image";
import type { Resource } from "@/app/lib/types";
import ResourceDetailsCard from "@/app/components/features/ResourceDetailsCard";
import ResourceSuggestCard from "@/app/components/features/ResourceSuggestCard";
import { getMarkerIconByCategory } from "./utils/markerIcons";

interface MapViewProps {
  resources: Resource[];
  selectedResource: Resource | null;
  editResource: Resource | null;
  onSuggestEditAction: (resource: Resource) => void;
  onCloseAction: (resource: Resource | null) => void;
  onEditCloseAction: (resource: Resource | null) => void;
}

export default function MapView({
  resources,
  selectedResource,
  editResource,
  onSuggestEditAction,
  onCloseAction,
  onEditCloseAction,
}: MapViewProps) {

  return (
    <>
      <div className="h-full w-full relative">
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}>
          <Map
            className="h-full w-full"
            defaultCenter={{ lat: 40.7564298, lng: -73.8872289 }}
            defaultZoom={12}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            mapId={process.env.NEXT_PUBLIC_MAP_ID ?? ""}
          >
            <MapControl position={ControlPosition.TOP_LEFT}>
            </MapControl>
            <Markers points={resources} />
          </Map>
        </APIProvider>

        {selectedResource && (
          <div className="absolute top-2 left-2 h-full w-[90%] sm:w-[400px] z-40 shadow-lg overflow-y-auto">
            <ResourceDetailsCard
              resource={selectedResource}
              editResource={editResource}
              onSuggestEdit={onSuggestEditAction}
              onCloseAction={() => onCloseAction(null)}
            />
          </div>
        )}

        {editResource && (
          <div className="absolute top-0 left-0 h-[calc(100%-16px)] w-[400px] z-30 shadow-md m-4">
            <ResourceSuggestCard
              resource={editResource}
              onEditCloseAction={onEditCloseAction}
            />
          </div>
        )}
      </div>
    </>
  );
}
const Markers = ({ points }: MarkersProps) => {
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
            // onClick={() => setActiveMarkerId(resource.id)}
             onMouseOver={() => setActiveMarkerId(resource.id)}
            onMouseOut={() => setActiveMarkerId(null)}
            className="cursor-pointer"
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
                headerContent={<h1 className="text-sm font-semibold text-gray-800">
                    {resource.name}
                  </h1>}
                position={{
                  lat: location?.latitude ?? 0,
                  lng: location?.longitude ?? 0,
                }}
                pixelOffset={[0, -20]} // so it does not block pin
                onCloseClick={() => setActiveMarkerId(null)}
                shouldFocus={true}
              >
                <div className="bg-white shadow-lg rounded-lg p-1 w-[250px]">
                
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

export { MapView };
