/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
"use client";

import {
  Map,
  APIProvider,
  AdvancedMarker,
  CollisionBehavior,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

import { useState } from "react";
import type { Resource } from "@/app/types/resource";
import ResourceDetailsCard from "../ResourceDetailsCard";

interface MapViewProps {
  resources: Resource[];
}

export default function MapView({ resources }: MapViewProps) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  return (
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
          <Markers 
            points={resources} 
            onSelectResource={setSelectedResource}
          />
        </Map>
      </APIProvider>
      <ResourceDetailsCard 
        resource={selectedResource} 
        onCloseAction={() => setSelectedResource(null)} 
      />
    </div>
  );
}

//each point
// type Point = google.maps.LatLngLiteral & { key: string };
// type Props = { points: Point[] };
interface MarkersProps {
  points: Resource[];
  onSelectResource: (resource: Resource | null) => void;
}

const Markers = ({ points, onSelectResource }: MarkersProps) => {
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);

  return (
    <>
      {points.map((resource) => {
        const location = resource.Location?.[0];
        if (!location) return null;

        // Determine if we should show the InfoWindow
        const shouldShowInfoWindow = activeMarkerId === resource.id;

        // Customize pin background color based on resource category
        let pinBackground = "red"; // Default color
        switch (resource.ResourceCategory?.name) {
          case "Community":
            pinBackground = "blue";
            break;
          case "Legal":
            pinBackground = "green";
            break;
          case "Health":
            pinBackground = "yellow";
            break;
          case "Education":
            pinBackground = "purple";
            break;
          case "Finance":
            pinBackground = "orange";
            break;
          case "Real estate":
            pinBackground = "pink";
            break;
          default:
            pinBackground = "red"; // Default color
        }

        return (
          <div
            key={resource.id}
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
              onClick={() => onSelectResource(resource)}
            >
              {/* customize pin color based on resource category */}
              <Pin
                background={pinBackground}
                borderColor={"white"}
                glyphColor={"white"}
              />
            </AdvancedMarker>

            {/* Show InfoWindow if the marker is clicked or hovered */}
            {shouldShowInfoWindow && (
              <InfoWindow
                position={{
                  lat: location?.latitude ?? 0,
                  lng: location?.longitude ?? 0,
                }}
                onCloseClick={() => setActiveMarkerId(null)}
              >
                <div className="bg-white shadow-lg rounded-lg p-1 w-[250px]">
                  <h1 className="text-lg font-semibold text-gray-800">
                    {resource.name}
                  </h1>
                  <p className="text-sm text-gray-600"> 📍{resource.address}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {resource.description.length > 200
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
