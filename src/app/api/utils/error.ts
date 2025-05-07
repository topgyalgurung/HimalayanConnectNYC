/**
 * API Error Handler
 * 
 * A utility for handling API errors consistently across all route handlers.
 * Provides standardized error responses with proper status codes and messages.
 */

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export const handleApiError = (error: unknown) => {
  if (error instanceof ApiError) {
    return Response.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }

  console.error('Unhandled error:', error);
  return Response.json(
    { error: 'Internal Server Error' },
    { status: 500 }
  );
}; 