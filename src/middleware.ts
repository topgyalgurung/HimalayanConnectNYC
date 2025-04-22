import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";
import { cookies } from "next/headers";
import toast from "react-hot-toast";

const authRoutes = ['/login', '/signup'];
const protectedRoutes = ["/dashboard", "/resources/add", "/profile"];
// const publicRoutes = ["/", "/login", "/signup", "/verifyemail", "/forgotpassword", "/resetpassword"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  // get session from cookie 
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

   // If session is undefined or decryption fails, user is treated as NOT logged in
  const isAuthenticated = !!session?.userId;

   // If user is NOT authenticated and tries to access a PROTECTED route → Redirect to /login
  if (isProtectedRoute && !isAuthenticated) {
    // toast.error("🔒 Unauthorized access attempt. Redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // if user authenticated should not be able to access login and signup
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/profile', request.url))
    
  }

// Allow request to continue if no redirection is needed
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};