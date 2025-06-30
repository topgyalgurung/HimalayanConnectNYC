/**
 * Rate limiting utility using Upstash Redis and Ratelimit.
 * Implements a sliding window rate limiter that allows 10 requests per 10 seconds per IP address.
 * Returns a 429 response with rate limit headers when the limit is exceeded, or null to allow the request.
 */
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { NextResponse } from 'next/server'

// Create Redis instance using environment variables
const redis = Redis.fromEnv()

// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL!,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN!
// })

// Create a new ratelimiter that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
  prefix: '@upstash/ratelimit'
})

// Create a function that checks the rate limit for a given IP
export async function checkRateLimit(ip: string) {
  try {
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

    return null
  } catch (error) {
    console.error('Rate limit error:', error)
    // If rate limiting fails, we should allow the request to proceed
    // rather than blocking legitimate traffic
    return null
  }
} 