/**
 * API Messages
 * 
 * Centralized collection of API response messages.
 * Ensures consistency across all route handlers.
 */

export const API_MESSAGES = {
  // Authentication
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    UNAUTHORIZED: 'Unauthorized access',
    TOKEN_EXPIRED: 'Token has expired',
    INVALID_TOKEN: 'Invalid token',
  },
  
  // Resources
  RESOURCE: {
    NOT_FOUND: 'Resource not found',
    CREATED: 'Resource created successfully',
    UPDATED: 'Resource updated successfully',
    DELETED: 'Resource deleted successfully',
    ALREADY_EXISTS: 'Resource already exists',
  },
  
  // User
  USER: {
    NOT_FOUND: 'User not found',
    CREATED: 'User created successfully',
    UPDATED: 'User updated successfully',
    DELETED: 'User deleted successfully',
    ALREADY_EXISTS: 'User already exists',
  },
  
  // General
  GENERAL: {
    SERVER_ERROR: 'Internal server error',
    VALIDATION_ERROR: 'Validation error',
    INVALID_REQUEST: 'Invalid request',
  },
} as const; 