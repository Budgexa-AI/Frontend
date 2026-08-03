import { cookies } from "next/headers";
import type { UserProfile } from "@/lib/api-client";

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

export async function getCurrentUserServer(): Promise<UserProfile | null> {
  const token = cookies().get("authToken")?.value;
  if (!token) return null;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) return null;

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  return normalizeProfile(payload);
}