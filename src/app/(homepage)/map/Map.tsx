/**
 * map component for the homepage of the Himalayan Connect NYC application.
 * displays the map and the markers for the resources
 */

"use client";

import {
  Map,
  APIProvider,
  AdvancedMarker,
  CollisionBehavior,
  InfoWindow,
} from "@vis.gl/react-google-maps";

import { useState } from "react";
import type { Resource } from "@/app/lib/types";
import ResourceDetailsCard from "@/app/components/features/ResourceDetailsCard";
import ResourceSuggestCard from "@/app/components/features/ResourceSuggestCard";
import Image from "next/image";

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

  // Add debugging logs
  // console.log('Map Resources:', resources);
  // console.log('Resources with locations:', resources.filter(r => r.Location?.[0]?.latitude && r.Location?.[0]?.longitude));

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
            <Markers points={resources} />
          </Map>
        </APIProvider>
        
        {/* show resource detail card on selectedResource */}
        {/* next todo show resourcedetails pop on top of resourcelist so it does not block map */}
        {selectedResource && (
          <div className="absolute top-2 left-2 h-full w-[90%] sm:w-[400px] z-40 shadow-lg overflow-y-auto">
            <ResourceDetailsCard
              resource={selectedResource}
              editResource={editResource}
              onSuggestEdit={onSuggestEditAction}
              // onReviewResource={onReviewResourceAction}
              onCloseAction={() => onCloseAction(null)}
            />
          </div>
        )}

        {/* show edit resource card */}

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

interface MarkersProps {
  points: Resource[];
}

const Markers = ({ points }: MarkersProps) => {
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);

  return (
    <>
      {points.map((resource) => {
        const location = resource.Location?.[0];

        // once user submits a resource, the location is stored in the database
        // but if does not exist, we need to call geocoding and update the location again
        // this is to ensure that the location is always up to date
        // await only allowed with async function // will do this later
        // if(!location?.latitude || !location?.longitude){
        //   // call the server action to update the location
        //   await updateResourceLocation(Number(resource.id), resource.address);
        //   }
        //   // get the updated location
        //   const updatedLocation = resource.Location?.[0];

        // Determine if we should show the InfoWindow
        const shouldShowInfoWindow = activeMarkerId === resource.id;

        // Customize pin background color based on resource category
        let image = "https://cdn-icons-png.flaticon.com/512/1946/1946436.png"; // default

        switch (resource.ResourceCategory?.name?.toLowerCase()) {
          case "community":
            image = "https://cdn-icons-png.flaticon.com/512/7829/7829198.png";
            break;
          case "legal":
            image = "https://cdn-icons-png.flaticon.com/512/4052/4052204.png";
            break;
          case "health":
            image = "https://cdn-icons-png.flaticon.com/512/2382/2382533.png";
            break;
          case "education":
            image = "https://cdn-icons-png.flaticon.com/512/4406/4406319.png";
            break;
          case "finance":
            image = "https://cdn-icons-png.flaticon.com/512/4256/4256900.png";
            break;
          case "real estate":
            image = "https://cdn-icons-png.flaticon.com/512/2238/2238337.png";
            break;
          case "other":
            image = "https://cdn-icons-png.flaticon.com/512/3195/3195457.png";
            break;
        }

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
              <Image
                src={image}
                alt={`${resource.ResourceCategory?.name} icon`}
                style={{
                  objectFit: "contain",
                  backgroundColor: "#FFEB3B", // Bright yellow background
                }}
                height={20}
                width={20}
              />
            </AdvancedMarker>

            {shouldShowInfoWindow && (
              <InfoWindow
                position={{
                  lat: location?.latitude ?? 0,
                  lng: location?.longitude ?? 0,
                }}
                pixelOffset={[0, -20]} // so it does not block pin
                onCloseClick={() => setActiveMarkerId(null)}
              >
                <div className="bg-white shadow-lg rounded-lg p-1 w-[250px]">
                  <h1 className="text-lg font-semibold text-gray-800">
                    {resource.name}
                  </h1>
                  <p className="text-sm text-gray-600"> 📍{resource.address}</p>
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
