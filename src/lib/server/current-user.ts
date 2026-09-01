import { cache } from "react";
import { normalizeProfile, type UserProfile } from "@/lib/api-client";
import { backendFetch, getAuthTokenFromCookies } from "./backend-fetch";


/** Deduped per request — layout + page won't each hit /auth/me. */
export const getCurrentUserServer = cache(async (): Promise<UserProfile | null> => {
  const token = await getAuthTokenFromCookies();
  if (!token) return null;

  const response = await backendFetch("/auth/me", token);

  if (!response.ok) return null;

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  return normalizeProfile(payload);
});