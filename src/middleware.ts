// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_ROUTES = ["/product"];
const AUTH_ROUTES = ["/auth/login", "/auth/signup"];

/** Verify JWT locally — avoids a backend round-trip on every navigation. */
async function isValidAuthToken(token: string): Promise<boolean> {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is not defined");
    return false;
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return typeof (payload as { userId?: unknown }).userId === "number";
  } catch {
    console.error("Invalid JWT token");
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Never run auth logic on API/proxy routes — prevents recursion when
  // other layers forward requests to /api/v1/*
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // Skip token work entirely on public pages that don't need a redirect.
  if (!isProtectedRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  const tokenFromCookie = request.cookies.get("authToken")?.value;
  const tokenFromHeader = request.headers.get("authorization")?.replace("Bearer ", "");
  const token = tokenFromCookie ?? tokenFromHeader;
  const tokenIsValid = token ? await isValidAuthToken(token) : false;
  console.log("Token is valid:", tokenIsValid);

  if (isProtectedRoute && !tokenIsValid) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    console.log("Redirecting to login:", loginUrl.toString() + " with redirect back to " + pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && tokenIsValid) {
    console.log("Redirecting to dashboard because user is already authenticated.");
    return NextResponse.redirect(new URL("/product/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};