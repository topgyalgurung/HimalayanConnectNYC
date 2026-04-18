import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session-edge";
import { getToken } from "next-auth/jwt";

const authRoutes = ['/login', '/signup'];
const protectedRoutes = ["/dashboard", "/resources/add", "/profile"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip middleware for NextAuth API routes
  if (path.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  // Check custom JWT session
  const cookie = request.cookies.get("session")?.value;
  const customSession = await decrypt(cookie);
  const hasCustomSession = !!customSession?.userId;

  // Validate the Auth.js JWT instead of trusting mere cookie presence.
  let hasNextAuthSession = false;
  try {
    const nextAuthToken = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
      secureCookie: request.nextUrl.protocol === "https:",
    });
    hasNextAuthSession = !!nextAuthToken;
  } catch {
    hasNextAuthSession = false;
  }

  const isAuthenticated = hasCustomSession || hasNextAuthSession;

  // If user is NOT authenticated and tries to access a PROTECTED route → Redirect to /login
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // if user authenticated should not be able to access login and signup
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // Allow request to continue if no redirection is needed
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|.*\\.png$).*)"],
};
