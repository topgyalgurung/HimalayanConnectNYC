/**
 * Resources Section Server Component
 * 
 * Server component that fetches resources data and renders the ResourceListPanel.
 * This component suspends while fetching data, allowing for streaming.
 */

import { getResources } from "@/app/actions/resources/getResources";
import ResourceListPanel from "../resources/ResourceListPanel";
import type { Resource } from "@/app/lib/types";

interface ResourcesSectionProps {
  onViewDetailsAction: (resource: Resource) => void;
}

export default async function ResourcesSection({ 
  onViewDetailsAction 
}: ResourcesSectionProps) {
  // This will suspend and stream when ready
  const resources = await getResources();
  
  return (
    <ResourceListPanel
      filteredResources={resources}
      onViewDetailsAction={onViewDetailsAction}
    />
  );
}
