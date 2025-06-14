/**
 * Map Section Server Component
 * 
 * Server component wrapper for MapView.
 * Currently MapView is a client component that receives data as props,
 * but this provides structure for future server-side map optimizations.
 */

import MapView from "../map/Map";
import type { Resource } from "@/app/lib/types";

interface MapSectionProps {
  resources: Resource[];
  selectedResource: Resource | null;
  editResource: Resource | null;
  onSuggestEditAction: (resource: Resource) => void;
  onCloseAction: () => void;
  onEditCloseAction: () => void;
}

export default function MapSection({
  resources,
  selectedResource,
  editResource,
  onSuggestEditAction,
  onCloseAction,
  onEditCloseAction
}: MapSectionProps) {
  return (
    <MapView
      resources={resources}
      selectedResource={selectedResource}
      editResource={editResource}
      onSuggestEditAction={onSuggestEditAction}
      onCloseAction={onCloseAction}
      onEditCloseAction={onEditCloseAction}
    />
  );
}
