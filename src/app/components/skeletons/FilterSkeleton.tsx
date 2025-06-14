/**
 * Filter Sidebar Skeleton Component
 * 
 * Provides a loading state that matches the filter sidebar structure
 * while data is being fetched on the server.
 */

export default function FilterSkeleton() {
  return (
    <>
      <div className="flex flex-col h-full">
        <h2 className="text-lg text-center font-bold text-black p-2 top-0 z-10 bg-white border-b">
          <div className="h-6 bg-gray-200 rounded w-16 mx-auto"></div>
        </h2>
        <div className="flex-1 text-sm overflow-y-auto px-2 py-1">
          <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2">
            {/* Resource filter skeleton */}
            <div className="w-1/2 md:w-full">
              <div className="p-3 pr-4 border-2 rounded-md">
                <div className="flex items-center justify-center mb-1">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <hr className="mb-1" />
                <div className="space-y-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="h-4 w-4 bg-gray-200 rounded"></div>
                      <div className="h-6 w-6 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Borough filter skeleton */}
            <div className="w-1/2 md:w-full">
              <div className="p-3 pr-4 border-2 rounded-md">
                <div className="flex items-center justify-center mb-1">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <hr className="mb-1" />
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="h-4 w-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </> 
  );
}
