/**
 * Resource List Skeleton Component
 * 
 * Provides a loading state that matches the resource list structure
 * while data is being fetched on the server.
 */

export default function ResourceListSkeleton() {
  return (
    <>
      <div className="animate-pulse">
        {/* Search input skeleton */}
        <div className="mb-6">
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>

        {/* Header skeleton - matches ResourceListPanel header */}
        <div className="text-lg text-center font-bold text-black mb-2 top-0 z-10 p-2 shadow bg-white">
          <div className="h-6 bg-gray-200 rounded w-24 mx-auto"></div>
        </div>

        {/* Main content skeleton */}
        <main className="flex-1 bg-gray-50 p-4 overflow-y-auto mb-4">
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                {/* Resource name and category */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                  <div className="h-8 w-8 bg-gray-200 rounded-full ml-2"></div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                </div>

                {/* Address and contact */}
                <div className="mb-3 space-y-1">
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-6 w-6 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
