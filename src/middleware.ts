// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/product"];
const AUTH_ROUTES = ["/auth/login", "/auth/signup"];

const IS_DEV = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export async function middleware(request: NextRequest) {
  // In development with mock data, skip all auth checks
  if (IS_DEV) return NextResponse.next({ request });

  const { pathname } = request.nextUrl;
  const token = request.cookies.get("authToken")?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/product/dashboard", request.url));
  }

  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};