/**
 * Rate Limiter Middleware
 * 
 * Implements rate limiting for API routes using a simple in-memory store.
 * Limits requests based on IP address and route.
 * 
 * @param {NextRequest} request - The incoming request
 * @param {number} limit - Maximum requests per window (default: 100)
 * @param {number} windowMs - Time window in milliseconds (default: 15 minutes)
 * @returns {Promise<Response | null>} - Returns null if request is allowed, Response if rate limited
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory store for rate limiting
const store = new Map<string, { count: number; resetTime: number }>();

export async function rateLimit(
  request: NextRequest,
  limit: number = 100,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): Promise<Response | null> {
  const ip = request.ip || 'anonymous';
  const key = `${ip}:${request.nextUrl.pathname}`;
  const now = Date.now();

  // Get or initialize rate limit data
  const rateLimitData = store.get(key) || { count: 0, resetTime: now + windowMs };

  // Reset if window has passed
  if (now > rateLimitData.resetTime) {
    rateLimitData.count = 0;
    rateLimitData.resetTime = now + windowMs;
  }

  // Increment counter
  rateLimitData.count++;
  store.set(key, rateLimitData);

  // Check if rate limit exceeded
  if (rateLimitData.count > limit) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitData.resetTime.toString(),
          'Retry-After': Math.ceil((rateLimitData.resetTime - now) / 1000).toString()
        }
      }
    );
  }

  return null;
}
