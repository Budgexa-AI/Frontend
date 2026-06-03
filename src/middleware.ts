// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // TODO: Implement authentication middleware once backend is ready
  // 
  // Authentication pattern to implement:
  // 1. Get auth token from cookies (e.g., from API client login response)
  // 2. Validate token against backend API or using JWT verification
  // 3. For protected routes (/dashboard), check if token is valid
  // 4. If invalid/missing, redirect to /auth/login
  // 5. For auth routes (/auth/login, /auth/signup), redirect authenticated users to /dashboard
  //
  // Example implementation:
  // const token = request.cookies.get('authToken')?.value;
  // const { pathname } = request.nextUrl;
  //
  // if (pathname.startsWith("/dashboard") && !token) {
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }
  //
  // if ((pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup")) && token) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  // Currently allow all requests for development
  // Mock data will be displayed from API client
  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    // Apply middleware to all routes except static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
