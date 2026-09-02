// app/api/v1/[...path]/route.ts
import { NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.BACKEND_URL || "http://localhost:3001";

function extractErrorMessage(payload: unknown, fallback: string): string {
  if (!payload) return fallback;

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
      if (extracted) return extracted;
    }

    if (Array.isArray(record.errors) && record.errors.length > 0) {
      const extracted = extractErrorMessage(record.errors[0], "");
      if (extracted) return extracted;
    }
  }

  return fallback;
}

async function proxyRequest(
  request: Request,
  pathSegments: string[]
): Promise<Response> {
  const path = pathSegments.join("/");
  const base = BACKEND_BASE_URL.replace(/\/$/, "");
  const pathUrl = `/api/v1/${path}`;
  const targetUrl = new URL(`${base}${pathUrl}`);

  const incomingUrl = new URL(request.url);
  targetUrl.search = incomingUrl.search;

  // Build forwarding headers — strip cache + encoding headers
  const headers = new Headers(request.headers);
  headers.delete("accept-encoding");
  headers.delete("host");
  headers.delete("content-length");
  headers.delete("if-none-match");
  headers.delete("if-modified-since");
  headers.delete("cache-control");

  const hasBody = !["GET", "HEAD"].includes(request.method.toUpperCase());
  // Read as ArrayBuffer, not text — .text() forces a UTF-8 decode of the
  // entire body, which silently corrupts binary payloads (multipart file
  // uploads, images, etc.) by substituting invalid byte sequences with the
  // U+FFFD replacement character. ArrayBuffer preserves every byte exactly,
  // and works identically for JSON bodies too (JSON is valid UTF-8, so
  // nothing changes for existing endpoints).
  const body = hasBody ? await request.arrayBuffer() : undefined;

  if (process.env.NODE_ENV !== "production") {
    console.info("[proxy] forwarding request", {
      method: request.method,
      target: pathUrl.toString(),
    });
  }

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      redirect: "manual",
      // Required by the fetch spec when passing a body with certain
      // request configurations in Node's fetch implementation.
      duplex: hasBody ? "half" : undefined,
    } as RequestInit);

    // 304 means "use your cache" — backend has no body to send.
    // Treat it as a 200 with empty data so the dashboard doesn't crash.
    if (response.status === 304) {
      return new NextResponse(null, { status: 200 });
    }

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
        target: pathUrl.toString(),
        status: response.status,
        statusText: response.statusText,
        body: responseBody,
      });

      return NextResponse.json(
        { success: false, error: errorMessage, details: responseBody },
        { status: response.status }
      );
    }

    const proxiedResponse = new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      proxiedResponse.headers.set("set-cookie", setCookie);
    }

    return proxiedResponse;
  } catch (error) {
    console.error("[proxy] fetch failed", {
      target: pathUrl.toString(),
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