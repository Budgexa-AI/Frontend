"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useCurrentUser } from "@/hooks/useUser";
import type { UserProfile } from "@/lib/api-client";
import { ProductUserProvider } from "./ProductUserProvider";

function ProductShellContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { profile } = useCurrentUser();
  const showSidebar = !pathname.startsWith("/product/onboarding");

  return (
    <div className="min-h-screen bg-rayo-beige flex">
      {showSidebar && <DashboardSidebar profile={profile ?? undefined} />}

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-3 sm:px-4 lg:px-6 pb-10 overflow-auto scrollbar-thin bg-rayo-beige">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function ProductShell({
  initialProfile,
  children,
}: {
  initialProfile: UserProfile | null;
  children: ReactNode;
}) {
  return (
    <ProductUserProvider initialProfile={initialProfile}>
      <ProductShellContent>{children}</ProductShellContent>
    </ProductUserProvider>
  );
}