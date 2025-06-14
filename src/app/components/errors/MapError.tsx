/**
 * Map Error Component
 * 
 * Error fallback component displayed when map loading fails.
 * Provides user-friendly error message and fallback content.
 */

"use client";

interface MapErrorProps {
  error?: Error;
  reset?: () => void;
}

export default function MapError({ error, reset }: MapErrorProps) {
  return (
    <div className="flex-1 bg-gray-50 flex items-center justify-center p-8">
      <div className="text-center max-w-sm">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Map Unavailable
        </h3>
        
        <p className="text-sm text-gray-500 mb-6">
          The map couldn&apos;t be loaded. You can still view resources in the list.
        </p>
        
        {error && (
          <details className="text-xs text-gray-400 mb-4">
            <summary className="cursor-pointer">Technical Details</summary>
            <p className="mt-2 text-left bg-gray-100 p-2 rounded">
              {error.message}
            </p>
          </details>
        )}
        
        {reset && (
          <button
            onClick={reset}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reload Map
          </button>
        )}
      </div>
    </div>
  );
}
