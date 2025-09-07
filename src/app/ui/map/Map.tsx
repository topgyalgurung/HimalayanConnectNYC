
import {
  Map,
  APIProvider,
  ControlPosition,
  MapControl,
} from "@vis.gl/react-google-maps";

import type { Resource } from "@/app/lib/types";
import ResourceDetailsCard from "@/app/components/features/ResourceDetailsCard";
import ResourceSuggestCard from "@/app/components/features/ResourceSuggestCard";
import { Markers } from "./Markers";


interface MapViewProps {
  resources: Resource[];
  selectedResource: Resource | null;
  editResource: Resource | null;
  onSuggestEditAction: (resource: Resource) => void;
  onCloseAction: (resource: Resource | null) => void;
  onEditCloseAction: (resource: Resource | null) => void;
  hoveredResourceId?: string | null;
}

export default function MapView({
  resources,
  selectedResource,
  editResource,
  onSuggestEditAction,
  onCloseAction,
  onEditCloseAction,
  hoveredResourceId,
}: MapViewProps) {
  return (
    <>
      <div className="h-full w-full relative">
        {/* to show the map */}
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
          <div className="m-2 bg-white rounded-lg shadow-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                {resources.length} Resources Found
              </span>
              
            </div>
          </div>
        </MapControl>
            <Markers points={resources} hoveredResourceId={hoveredResourceId} />
          </Map>
        </APIProvider>

        {/* to show selected resource on top of map when clicked */}
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
        {/* to show edit resource on top of map when clicked  */}
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
