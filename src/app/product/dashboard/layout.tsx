"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { getCurrentUser, type UserProfile } from "@/lib/api-client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    getCurrentUser()
      .then(setProfile)
      .catch(() => setProfile(null));
  }, []);

  return (
    <div className="min-h-screen bg-rayo-ash flex">
      <DashboardSidebar profile={profile ?? undefined} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader profile={profile ?? { id: "" }} />
        <main className="flex-1 overflow-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}