/**
 * Request Logger Middleware
 * 
 * Logs incoming API requests with relevant information.
 * Includes request method, URL, status code, and response time.
 * 
 * @param {NextRequest} request - The incoming request
 * @param {Response} response - The outgoing response
 * @returns {Promise<void>}
 */

import type { NextRequest } from 'next/server';

export async function logRequest(request: NextRequest, response: Response): Promise<void> {
  const start = Date.now();
  const { method, url } = request;
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  // Log request details
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);
  console.log(`User-Agent: ${userAgent}`);
  console.log(`IP: ${ip}`);

  // Log response details after request completes
  const responseTime = Date.now() - start;
  console.log(`Response Time: ${responseTime}ms`);
  console.log(`Status: ${response.status}`);
  console.log('---');
}
