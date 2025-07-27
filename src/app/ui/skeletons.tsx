// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';
export  function ResourceListSkeleton() {
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


export  function FilterSkeleton() {
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

export  function MapSkeleton() {
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

export function DashboardSkeleton() {
  return (
    <>
     <div className={`${shimmer}flex flex-col md:flex-row h-auto text-sm lg:text-sm md:h-[calc(100vh-90px)] w-full`}>
        <aside className="w-full md:w-[30%] lg:w-[25%] bg-white shadow-md flex flex-col h-auto md:h-[calc(100vh-90px)] px-2 sm:px-6">
            <FilterSkeleton/>
        </aside>

        <aside className="w-full md:w-[40%] lg:w-[35%] pl-0 md:pl-4 flex flex-col min-h-0 mb-4">
            <ResourceListSkeleton/>
        </aside>
      <aside className="w-full md:w-[40%] lg:w-[45%] bg-white shadow-md flex flex-col h-[500px] md:h-full border-2 border-gray-300">

        <MapSkeleton/>
    </aside>
    
      </div>
      </>
  );
}


