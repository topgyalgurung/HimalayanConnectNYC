/**
 * Filter Error Component
 * 
 * Error fallback component displayed when filter loading fails.
 * Provides user-friendly error message and basic filter functionality.
 */

"use client";

interface FilterErrorProps {
  error?: Error;
  reset?: () => void;
}

export default function FilterError({ error, reset }: FilterErrorProps) {
  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 p-4">
      <div className="text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-8 w-8 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Filter Loading Error
        </h3>
        
        <p className="text-xs text-gray-500 mb-4">
          Unable to load filter options. You can still browse all resources.
        </p>
        
        {error && (
          <details className="text-xs text-gray-400 mb-4">
            <summary className="cursor-pointer">Details</summary>
            <p className="mt-1 text-left bg-gray-50 p-2 rounded text-xs">
              {error.message}
            </p>
          </details>
        )}
        
        {reset && (
          <button
            onClick={reset}
            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
