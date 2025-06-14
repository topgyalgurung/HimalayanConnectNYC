/**
 * Map View Skeleton Component
 * 
 * Provides a loading state that matches the map view structure
 * while data is being fetched on the server.
 */

export default function MapSkeleton() {
  return (
    <>
    
            <div className="h-full w-full relative animate-pulse">
        {/* Map container skeleton */}
        <div className="w-full h-full bg-gray-200 relative">
          {/* Map loading overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
            </div>
          </div>

    
    </div>
    </div>
    </>
  );
}
