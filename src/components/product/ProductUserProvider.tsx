"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { UserProfile } from "@/lib/api-client";

type ProductUserContextValue = {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
};

const ProductUserContext = createContext<ProductUserContextValue | null>(null);

export function ProductUserProvider({
  initialProfile,
  children,
}: {
  initialProfile: UserProfile | null;
  children: ReactNode;
}) {
  const [profile, setProfile] = useState<UserProfile | null>(initialProfile);

  const value = useMemo(() => ({ profile, setProfile }), [profile]);

  return (
    <ProductUserContext.Provider value={value}>
      {children}
    </ProductUserContext.Provider>
  );
}

export function useProductUserContext() {
  return useContext(ProductUserContext);
}