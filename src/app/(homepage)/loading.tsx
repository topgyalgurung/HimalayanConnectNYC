/**
 * Enhanced Loading Component
 * 
 * Provides a better loading experience with visual feedback
 * while data is being fetched on the server.
 */

export const dynamic = 'force-dynamic';

export default function Loading() {
  return (
    <div className="flex flex-col md:flex-row h-auto text-sm lg:text-sm md:h-[calc(100vh-90px)]">
      <div className="flex items-center justify-center flex-1 bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading resources...</p>
          <p className="text-xs text-gray-400 mt-1">This may take a moment</p>
        </div>
      </div>
    </div>
  );
}
