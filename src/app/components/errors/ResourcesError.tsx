/**
 * Resources Error Component
 * 
 * Error fallback component displayed when resource loading fails.
 * Provides user-friendly error message and retry option.
 */

"use client";

interface ResourcesErrorProps {
  error?: Error;
  reset?: () => void;
}

export default function ResourcesError({ error, reset }: ResourcesErrorProps) {
  return (
    <div className="flex-1 bg-white flex items-center justify-center p-8">
      <div className="text-center max-w-md">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Unable to Load Resources
        </h3>
        
        <p className="text-sm text-gray-500 mb-6">
          We&apos;re having trouble loading the resources. This might be a temporary issue.
        </p>
        
        {error && (
          <details className="text-xs text-gray-400 mb-4">
            <summary className="cursor-pointer">Technical Details</summary>
            <p className="mt-2 text-left bg-gray-50 p-2 rounded">
              {error.message}
            </p>
          </details>
        )}
        
        {reset && (
          <button
            onClick={reset}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
