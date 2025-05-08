import prisma from "@/app/lib/prisma";

// Coordinates for NYC boroughs
const BOROUGH_COORDINATES = {
  "Manhattan": { lat: 40.7831, lng: -73.9712 },
  "Brooklyn": { lat: 40.6782, lng: -73.9442 },
  "Queens": { lat: 40.7282, lng: -73.7949 },
  "Bronx": { lat: 40.8448, lng: -73.8648 },
  "Staten Island": { lat: 40.5795, lng: -74.1502 }
};

export async function addLocations() {
  try {
    // Get all resources without locations
    const resources = await prisma.resource.findMany({
      where: {
        Location: {
          none: {}
        }
      },
      select: {
        id: true,
        name: true,
        city: true,
        address: true
      }
    });

    console.log(`Found ${resources.length} resources without locations`);

    // Add locations for each resource
    for (const resource of resources) {
      // Try to determine coordinates based on borough
      const coordinates = BOROUGH_COORDINATES[resource.city as keyof typeof BOROUGH_COORDINATES] || 
                         BOROUGH_COORDINATES["Manhattan"]; // Default to Manhattan if borough not found

      // Create location
      await prisma.location.create({
        data: {
          resourceId: resource.id,
          latitude: coordinates.lat,
          longitude: coordinates.lng
        }
      });

      console.log(`Added location for resource ${resource.id} (${resource.name})`);
    }

    return { success: true, message: `Added locations for ${resources.length} resources` };
  } catch (error) {
    console.error("Error adding locations:", error);
    return { success: false, error: "Failed to add locations" };
  }
} 