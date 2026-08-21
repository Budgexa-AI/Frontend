import { cache } from "react";
import type { UserProfile } from "@/lib/api-client";
import { backendFetch, getAuthTokenFromCookies } from "./backend-fetch";

function normalizeProfile(payload: any): UserProfile | null {
  const source = payload?.data ?? payload?.profile ?? payload ?? {};
  const id = source.id ?? source.userId ?? source.user_id ?? "";

  if (!id && !source.email) return null;

  return {
    id,
    email: source.email ?? undefined,
    name: source.name ?? source.fullName ?? source.full_name ?? undefined,
    avatarUrl: source.profileImage ?? undefined,
    plan: source.plan ?? undefined,
    country: source.country ?? undefined,
    currency: source.currency ?? undefined,
  };
}

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