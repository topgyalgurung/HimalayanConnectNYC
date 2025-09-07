
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


export { MapView };
