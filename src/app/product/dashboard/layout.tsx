"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useCurrentUser } from "@/hooks/useUser";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { profile } = useCurrentUser();

  return (
    <div className="min-h-screen bg-Budgexa-ash flex">
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader profile={profile ?? { id: "" }} />
        <main className="flex-1 overflow-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}