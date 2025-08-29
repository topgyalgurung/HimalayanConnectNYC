/**
 * Rate limiting utility using Upstash Redis and Ratelimit.
 * Implements a sliding window rate limiter that allows 10 requests per 10 seconds per IP address.
 * Returns a 429 response with rate limit headers when the limit is exceeded, or null to allow the request.
 */
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { NextResponse } from 'next/server'

// Skip rate limiting entirely in development
const isDevelopment = process.env.NODE_ENV === 'development';

// Only create Redis instance in production
const redis = !isDevelopment ? Redis.fromEnv() : null;

// Only create rate limiter in production
const ratelimit = !isDevelopment 
  ? new Ratelimit({
      redis: redis!, 
      limiter: Ratelimit.slidingWindow(5, '10 s'), // 5 request in 10 seconds 
      analytics: true,
      /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
      prefix: '@upstash/ratelimit'
    })
  : null;

// Create a function that checks the rate limit for a given IP
export async function checkRateLimit(ip: string) {
  // Skip rate limiting in development
  if (isDevelopment) {
    return null;
  }

  try {
    if (!ratelimit) {
      console.warn('Rate limiter not initialized');
      return null;
    }

    const { success, limit, reset, remaining } = await ratelimit.limit(ip || 'anonymous')

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        }
      )
    }
    // do expensive calculation
    return NextResponse.json({message:"Request successful"})
  } catch (error) {
    console.error('Rate limit error:', error)
    // If rate limiting fails, we should allow the request to proceed
    // rather than blocking legitimate traffic
    return null
  }
} 

// handler definition
/**
 * export default async function handler(req, res) {
  const { success } = await rateLimit.limit(req.ip);
  if (!success) {
    return res.status(429).json('Too many requests');
  }
  res.status(200).json({ message: 'Request successful' });
}
 */