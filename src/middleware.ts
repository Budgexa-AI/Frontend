// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/product"];
const AUTH_ROUTES = ["/auth/login", "/auth/signup"];

async function isValidAuthToken(request: NextRequest, token: string): Promise<boolean> {
  try {
    const response = await fetch(new URL("/api/v1/auth/me", request.url), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;

  // Check both cookie and Authorization header
  const tokenFromCookie = request.cookies.get("authToken")?.value;
  const tokenFromHeader = request.headers.get("authorization")?.replace("Bearer ", "");
  const token = tokenFromCookie ?? tokenFromHeader;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const tokenIsValid = token ? await isValidAuthToken(request, token) : false;

  if (isProtectedRoute && !tokenIsValid) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && tokenIsValid) {
    return NextResponse.redirect(new URL("/product/dashboard", request.url));
  }

  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};