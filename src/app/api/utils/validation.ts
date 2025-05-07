/**
 * API Validation Utilities
 * 
 * A collection of utility functions for validating API requests.
 * Provides consistent validation across all route handlers.
 */

import { ApiError } from './error';

export const validateRequiredFields = (data: Record<string, any>, fields: string[]) => {
  const missingFields = fields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    throw new ApiError(
      400,
      `Missing required fields: ${missingFields.join(', ')}`
    );
  }
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, 'Invalid email format');
  }
};

export const validatePassword = (password: string) => {
  if (password.length < 8) {
    throw new ApiError(400, 'Password must be at least 8 characters long');
  }
};

export const validateRequest = (schema: any, data: any) => {
  const { error } = schema.validate(data);
  if (error) {
    throw new ApiError(400, error.details[0].message);
  }
}; 