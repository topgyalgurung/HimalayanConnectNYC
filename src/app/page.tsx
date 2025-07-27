/**
 * Home Page Component - Shell-First Architecture
 *
 * The main landing page that renders immediately with a shell structure,
 * then streams in data using Suspense boundaries for optimal performance.
 * Data is fetched server-side but rendered progressively.
 */

import { Suspense } from "react";
import HomeServer from "@/app/(homepage)/HomeServer";
import { FilterSkeleton,ResourceListSkeleton, MapSkeleton  } from "./ui/skeletons";
import ErrorBoundary from "@/app/components/errors/ErrorBoundary";
import ResourcesError from "@/app/components/errors/ResourcesError";

// Enable dynamic rendering for this route
export const dynamic = "force-dynamic";

// Add revalidation tags for manual revalidation
export const revalidate = 300; // 5 minutes


export default function Home() {
  return (
    <>
      {/* Shell renders immediately, data streams in */}
      <ErrorBoundary fallback={ResourcesError}>
        <Suspense 
          fallback={
            <div className="flex flex-col md:flex-row h-auto text-sm lg:text-sm md:h-[calc(100vh-90px)]">
              <aside className="w-full top-0 left-0 md:w-[30%] lg:w-[25%] bg-white shadow-md flex flex-col h-auto md:h-[calc(100vh-90px)] px-2 sm:px-6">
                <FilterSkeleton />
              </aside>
              <aside className="w-full md:w-[40%] lg:w-[35%] pl-0 md:pl-4 flex flex-col min-h-0 mb-4">
                <ResourceListSkeleton />
              </aside>
              <aside className="w-full md:flex-1 lg:flex-1 bg-white shadow-md flex flex-col h-[500px] md:h-full border-2 border-gray-300">
                <MapSkeleton />
              </aside>
            </div>
          }
        >
          <HomeServer />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
