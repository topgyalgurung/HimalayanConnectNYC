/**
 * @file Map.tsx
 * @description Interactive map component for displaying community resources with custom markers and info windows.
 * Implements Google Maps integration with custom markers for different resource categories.
 *
 * @component MapView
 * @description Main map container component that renders the Google Maps interface and handles resource display.
 * Manages the display of resource details, edit forms, and review forms in overlay cards.
 *
 * @component Markers
 * @description Renders custom markers for each resource on the map with category-specific icons.
 * Handles marker interaction hover now but can close with x now (hover/click) and displays info windows with resource details.
 *
 * @requires @vis.gl/react-google-maps - Google Maps React components
 * @requires next/image - Image optimization
 * @requires Resource type - Resource data structure
 * @requires ResourceDetailsCard - Resource details display component
 * @requires ResourceSuggestCard - Resource edit form component
 * @requires ReviewSubmitCard - Review submission component
 *
 * @todo - on hover on each resource card in resourcelist, light up the marker on the map
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
import ReviewSubmitCard from "@/app/components/features/ReviewSubmitCard";
import Image from "next/image";

interface MapViewProps {
  resources: Resource[];
  selectedResource: Resource | null;
  editResource: Resource | null;
  reviewResource: Resource | null;
  onSuggestEdit: (resource: Resource) => void;
  onReviewResource: (resource: Resource | null) => void;
  onCloseAction: (resource: Resource | null) => void;
  onEditCloseAction: (resource: Resource | null) => void;
  onReviewCloseAction: (resource: Resource | null) => void;
}

export default function MapView({
  resources,
  selectedResource,
  editResource,
  reviewResource,
  onSuggestEdit,
  onReviewResource,
  onCloseAction,
  onReviewCloseAction,
  onEditCloseAction,
}: MapViewProps) {
  // Add debugging logs
  console.log('Map Resources:', resources);
  console.log('Resources with locations:', resources.filter(r => r.Location?.[0]?.latitude && r.Location?.[0]?.longitude));
  
  return (
    <aside className="w-[50%] bg-white shadow-md pl-4 flex flex-col h-full border-2 border-gray-300 ">
      <div className="flex-1 relative border border-gray-400 rounded-lg overflow-hidden"></div>
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
        {selectedResource && (
          <div className="absolute top-0 left-0 h-full w-[400px] z-40 shadow-lg overflow-y-auto">
            <ResourceDetailsCard
              resource={selectedResource}
              editResource={editResource}
              onSuggestEdit={onSuggestEdit}
              onReviewResource={onReviewResource}
              onCloseAction={onCloseAction}
            />
          </div>
        )}
        {/* show edit resource card */}
        {editResource && (
          <div className="absolute top-0 left-0 h-full w-[400px] z-50 shadow-lg overflow-y-auto">
            <ResourceSuggestCard
              resource={editResource}
              onSuggestEdit={onSuggestEdit}
              onEditCloseAction={onEditCloseAction}
            />
          </div>
        )}

        {/* show submit review card */}
        {reviewResource && (
          <ReviewSubmitCard
            resource={reviewResource}
            onReviewCloseAction={onReviewCloseAction}
          />
        )}
      </div>
    </aside>
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

        // todo: update the resource Location table with the new latitude and longitude

        // if (!location) {
        //   // convert address to latitude and longitude
        //   // and update the resource Location table with the new latitude and longitude
          
        //   const geocoder = new google.maps.Geocoder();
        //   geocoder.geocode({ address: resource.address }, async (results, status) => {
        //     if (status === 'OK' && results?.[0]) {
        //       const location = results[0].geometry.location;
        //       try {
        //         const response = await fetch('/api/resources/location', {
        //           method: 'POST',
        //           headers: {
        //             'Content-Type': 'application/json',
        //           },
        //           body: JSON.stringify({
        //             resourceId: resource.id,
        //             latitude: location.lat(),
        //             longitude: location.lng(),
        //           }),
        //         });
                
        //         if (response.ok) {
        //           resource.Location = [{
        //             latitude: location.lat(),
        //             longitude: location.lng(),
        //             id: resource.id,
        //             resourceId: resource.id
        //           }];
        //         }
        //       } catch (error) {
        //         console.error('Error updating resource location:', error);
        //       }
        //     }
        //   });
        // }
        

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
        }

        return (
          <div
            key={resource.id}
            onClick={() => setActiveMarkerId(resource.id)}
            onMouseOver={() => setActiveMarkerId(resource.id)}
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
                style={{ width: "30px", height: "30px", objectFit: "contain" }}
                height={30}
                width={30}
              />
            </AdvancedMarker>

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
                    {resource.description?.length > 200
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
