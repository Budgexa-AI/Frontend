"use client";

import { useEffect } from "react";
import type { UserProfile } from "@/lib/api-client";
import { seedCache } from "@/lib/data-service";
import { useProductUserContext } from "./ProductUserProvider";

/** Pushes a server-fetched profile into the client provider without blocking the page. */
export default function SetProductProfile({ profile }: { profile: UserProfile | null }) {
  const setProfile = useProductUserContext()?.setProfile;

  useEffect(() => {
    if (profile && setProfile) {
      seedCache("current-user", profile, 5 * 60 * 1000);
      setProfile(profile);
    }
  }, [profile, setProfile]);

  return null;
}
