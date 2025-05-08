import React, { useState, useEffect } from 'react';
import {
  Map,
  APIProvider,
  AdvancedMarker,
  CollisionBehavior,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { Resource, Location } from '@prisma/client';
import Image from "next/image";

interface MapProps {
  resources: (Resource & {
    Location: Location[];
    ResourceCategory?: { name: string } | null;
  })[];
  onResourceSelect: (resource: (Resource & {
    Location: Location[];
    ResourceCategory?: { name: string } | null;
  }) | null) => void;
}

export default function Map({
  resources,
  onResourceSelect,
}: MapProps) {
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);

  // Add logging for resources
  useEffect(() => {
    console.log('Map Resources:', resources.map((r) => ({
      id: r.id,
      name: r.name,
      location: r.Location,
      category: r.ResourceCategory?.name
    })));
  }, [resources]);

  return (
    <div className="h-full w-full">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}>
        <Map
          className="h-full w-full"
          defaultCenter={{ lat: 40.7564298, lng: -73.8872289 }}
          defaultZoom={12}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={process.env.NEXT_PUBLIC_MAP_ID ?? ""}
        >
          {resources.map((resource) => {
            const location = resource.Location[0];
            if (!location?.latitude || !location?.longitude) {
              console.log('Resource missing location:', resource.id, resource.name);
              return null;
            }

            // Ensure latitude and longitude are numbers
            const lat = Number(location.latitude);
            const lng = Number(location.longitude);

            // Validate coordinates
            if (isNaN(lat) || isNaN(lng)) {
              console.log('Invalid coordinates for resource:', {
                id: resource.id,
                name: resource.name,
                lat,
                lng
              });
              return null;
            }

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
                onClick={() => {
                  setActiveMarkerId(String(resource.id));
                  onResourceSelect(resource);
                }}
                onMouseOver={() => setActiveMarkerId(String(resource.id))}
                className="cursor-pointer"
              >
                <AdvancedMarker
                  collisionBehavior={CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL}
                  position={{
                    lat,
                    lng,
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

                {activeMarkerId === String(resource.id) && (
                  <InfoWindow
                    position={{
                      lat,
                      lng,
                    }}
                    onCloseClick={() => {
                      setActiveMarkerId(null);
                      onResourceSelect(null);
                    }}
                  >
                    <div className="bg-white shadow-lg rounded-lg p-1 w-[250px]">
                      <h1 className="text-lg font-semibold text-gray-800">
                        {resource.name}
                      </h1>
                      <p className="text-sm text-gray-600"> 📍{resource.address}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {resource.description?.slice(0, 200)}
                        {resource.description && resource.description.length > 200 ? "..." : ""}
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </div>
            );
          })}
        </Map>
        </GoogleMap>
      </APIProvider>
    </div>
  );
} 