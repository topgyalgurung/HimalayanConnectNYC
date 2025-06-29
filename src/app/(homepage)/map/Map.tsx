/**
 * map component for the homepage of the Himalayan Connect NYC application.
 * displays the map and the markers for the resources
 */

"use client";

import {
  Map,
  APIProvider,
  ControlPosition,
  MapControl
} from "@vis.gl/react-google-maps";

import {Markers} from "./Markers";
import type { Resource } from "@/app/lib/types";
import ResourceDetailsCard from "@/app/components/features/ResourceDetailsCard";
import ResourceSuggestCard from "@/app/components/features/ResourceSuggestCard";


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
  // const mapStyles=[
  //     {
  //       featureType:"poi", // Target all Points of Interest
  //       stylers: [{ visibility: "off" }], // Hide them
  //     }
  // ];
  // Define map options using the MapOptions type
  // const mapOptions: MapOptions = {
  //   styles: mapStyles,
  // Add other map options as needed (e.g., zoomControl, streetViewControl, etc.)
  // };

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
            // Enable reuseMaps only if:
            // 1. The map is shown in multiple routes/pages
            // 2. The map is frequently mounted/unmounted (e.g., mobile toggle)
            // 3. Features cause frequent map component remounts
            // reuseMaps={true}
            // options={mapOptions}
          >
            <MapControl position={ControlPosition.TOP_LEFT}>

            </MapControl>
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

export { MapView };
