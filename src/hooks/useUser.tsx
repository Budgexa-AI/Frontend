// hooks/useCurrentUser.ts

"use client";

import { useEffect, useState } from "react";
import { fetchCurrentUser } from "@/lib/data-service";
import { UserProfile } from "@/lib/api-client";
import { useProductUserContext } from "@/components/product/ProductUserProvider";

export function useCurrentUser() {
    const context = useProductUserContext();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(!context);

    if (context) {
        return {
            profile: context.profile,
            loading: false,
            setProfile: context.setProfile,
        };
    }

    useEffect(() => {
        fetchCurrentUser()
            .then(setProfile)
            .catch(() => setProfile(null))
            .finally(() => setLoading(false));
    }, []);

    return { profile, loading, setProfile };
}