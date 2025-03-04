/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
// "use client";

// import { GoogleMap } from "@react-google-maps/api";
import { Map, APIProvider, AdvancedMarker } from "@vis.gl/react-google-maps";
// import type { Marker } from "@googlemaps/markerclusterer";
import { Resource } from "@/app/types/resource";
// google maps need 4 necessary props to display a map
/***
 * 1. width and height
 * 2. map center
 * 3. map zoom level
 * 4. map options
 */

//Map's styling
export const defaultMapContainerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "15px 0px 0px 15px",
};

// Set the map's center to the first location's coordinates
const defaultMapCenter = {
  lat: 40.7564298,
  lng: -73.8872289,
};

const defaultMapZoom = 13;

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "roadmap", //other options: satellite, hybriid, terrain
};

// const Map = ({ locations }: { locations: Location[] }) => {
export default function MapView({ resources }: { resources: Resource[] }) {
  return (
    // <div style={{ height: "100vh", width: "100%" }}>
    <div>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          center={defaultMapCenter}
          style={defaultMapContainerStyle}
          zoom={defaultMapZoom}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          // options={defaultMapOptions}
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
  return (
    <>
      {points.map((resource) => {
        const location = resource.Location?.[0];
        if (!location) return null;

        return (
          <AdvancedMarker
            position={{
              lat: location?.latitude ?? 0,
              lng: location?.longitude ?? 0,
            }}
            key={resource.id}
          >
            <span className="text-4xl"> 📍 </span>
          </AdvancedMarker>
        );
      })}
    </>
  );
};

export { MapView };
