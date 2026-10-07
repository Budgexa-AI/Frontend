import { cookies } from "next/headers";

/** Direct backend base URL — skips the Next.js self-proxy hop during SSR. */
export function getBackendBaseUrl(): string {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    throw new Error("BACKEND_URL environment variable is not configured.");
  }
  return backendUrl.replace(/\/$/, "");
}

export async function getAuthTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("authToken")?.value ?? null;
}

export async function backendFetch(
  path: string,
  token: string,
  init?: RequestInit
): Promise<Response> {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  return fetch(`${getBackendBaseUrl()}/api/v1${normalized}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
}
