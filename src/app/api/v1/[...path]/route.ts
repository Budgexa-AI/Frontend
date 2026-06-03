import { NextResponse } from "next/server";

// Server-side only — never exposed to the browser.
// Set BACKEND_URL=https://rayotypebackend-production.up.railway.app in your env.
const BACKEND_BASE_URL =
  process.env.BACKEND_URL || "http://localhost:3001";

function extractErrorMessage(payload: unknown, fallback: string): string {
  if (!payload) {
    return fallback;
  } 

  if (typeof payload === "string") {
    return payload.trim() || fallback;
  }
  
  if (Array.isArray(payload)) {
    const first = payload.find((item) => typeof item === "string");
    return typeof first === "string" && first.trim().length > 0
      ? first
      : fallback;
  }

  if (typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    for (const candidate of [
      record.error,
      record.message,
      record.detail,
      record.reason,
    ]) {
      const extracted = extractErrorMessage(candidate, "");
      if (extracted) {
        return extracted;
      }
    }

    if (Array.isArray(record.errors) && record.errors.length > 0) {
      const extracted = extractErrorMessage(record.errors[0], "");
      if (extracted) {
        return extracted;
      }
    }
  }

  return fallback;
}

async function proxyRequest(
  request: Request,
  pathSegments: string[]
): Promise<Response> {
  // pathSegments comes in without the /api/v1 prefix (Next.js strips the
  // route folder path). We re-add /api/v1 when forwarding to Railway.
  const path = pathSegments.join("/");
  const base = BACKEND_BASE_URL.replace(/\/$/, "");
  const targetUrl = new URL(`${base}/api/v1/${path}`);

  console.log("BACKEND_BASE_URL =", BACKEND_BASE_URL);
  console.log("TARGET_URL =", targetUrl.toString());

  // Forward query string from the incoming request
  const incomingUrl = new URL(request.url);
  targetUrl.search = incomingUrl.search;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("content-length");

  const hasBody = !["GET", "HEAD"].includes(request.method.toUpperCase());
  const body = hasBody ? await request.text() : undefined;

  console.info("[proxy] forwarding request", {
    method: request.method,
    target: targetUrl.toString(),
  });

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      redirect: "manual",
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type") || "";
      const responseBody = contentType.includes("application/json")
        ? await response.clone().json().catch(() => null)
        : await response.clone().text().catch(() => "");
      const errorMessage = extractErrorMessage(
        responseBody,
        `Request failed (${response.status})`
      );

      console.error("[proxy] backend rejected request", {
        method: request.method,
        target: targetUrl.toString(),
        status: response.status,
        statusText: response.statusText,
        body: responseBody,
      });

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          details: responseBody,
        },
        { status: response.status }
      );
    }

    return response;
  } catch (error) {
    console.error("[proxy] fetch failed", {
      target: targetUrl.toString(),
      error,
    });
    return NextResponse.json(
      { success: false, error: "Failed to reach backend" },
      { status: 502 }
    );
  }
}

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}