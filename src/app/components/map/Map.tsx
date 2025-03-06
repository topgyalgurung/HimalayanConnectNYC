/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
"use client";

import {
  Map,
  APIProvider,
  AdvancedMarker,
  // useAdvancedMarkerRef,
  // ColorScheme,
  // ControlPosition,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

import { useState } from "react";
// import type { Marker } from "@googlemaps/markerclusterer";
import { Resource } from "@/app/types/resource";

// const Map = ({ locations }: { locations: Location[] }) => {
// Map component uses a default-style of width: 100%; height: 100%;
// api provider component to load Google Maps Javascript api
// At least the center and zoom props have to be specified for the map to be shown (Advanced Marker).
export default function MapView({ resources }: { resources: Resource[] }) {
  return (
    <div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ height: "100vh", width: "100%" }}
          defaultCenter={{ lat: 40.7564298, lng: -73.8872289 }}
          defaultZoom={12}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
        >
          <Markers points={resources} />
        </Map>
      </APIProvider>
    </div>
  );
}

//each point
// type Point = google.maps.LatLngLiteral & { key: string };
// type Props = { points: Point[] };
const Markers = ({ points }: { points: Resource[] }) => {
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null); // Single state for both click and hover

  return (
    <>
      {points.map((resource) => {
        const location = resource.Location?.[0];
        if (!location) return null;

        // Determine if we should show the InfoWindow
        const shouldShowInfoWindow = activeMarkerId === resource.id;

        return (
          <div
            key={resource.id}
            onMouseOver={() => setActiveMarkerId(resource.id)}
            onMouseOut={() => setActiveMarkerId(null)}
            style={{ cursor: "pointer" }}
          >
            <AdvancedMarker
              position={{
                lat: location?.latitude ?? 0,
                lng: location?.longitude ?? 0,
              }}
              onClick={() => setActiveMarkerId(resource.id)} // Set the clicked marker ID
            >
              <Pin
                background={"#0f9d58"}
                borderColor={"#006425"}
                glyphColor={"#60d98f"}
              />
            </AdvancedMarker>

            {/* Show InfoWindow if the marker is clicked or hovered */}
            {shouldShowInfoWindow && (
              <InfoWindow
                position={{
                  lat: location?.latitude ?? 0,
                  lng: location?.longitude ?? 0,
                }}
                onCloseClick={() => setActiveMarkerId(null)} // Close the info window
              >
                <p>{resource.name}</p>
                <p>{resource.address}</p>
                <p>{resource.description}</p>
              </InfoWindow>
            )}
          </div>
        );
      })}
    </>
  );
};
export { MapView };
