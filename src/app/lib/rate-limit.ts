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

// Extract the client IP from request headers. The first hop of X-Forwarded-For
// is whatever the client sent and can be spoofed, so prefer x-real-ip / the
// platform-appended x-vercel-proxied-for, falling back to the *last* hop of
// X-Forwarded-For (appended by our own proxy, not attacker-controlled).
export function getClientIp(headersLike: { get(name: string): string | null }): string {
  const trusted = headersLike.get('x-real-ip') || headersLike.get('x-vercel-proxied-for');
  if (trusted) return trusted;

  const forwardedFor = headersLike.get('x-forwarded-for');
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map((ip) => ip.trim()).filter(Boolean);
    if (ips.length > 0) return ips[ips.length - 1];
  }

  return 'unknown';
}

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
    // Within limits: return null so the caller proceeds with its own logic.
    return null
  } catch (error) {
    console.error('Rate limit error:', error)
    // If rate limiting fails, we should allow the request to proceed
    // rather than blocking legitimate traffic
    return null
  }
}