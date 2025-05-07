// src/app/api/types/response.ts
export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
    status: number;
  }