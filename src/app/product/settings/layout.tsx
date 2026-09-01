"use client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { type UserProfile, getCurrentUser } from "@/lib/api-client";
import { useEffect, useState } from "react";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
    useEffect(() => {
      getCurrentUser()
        .then(setProfile)
        .catch(() => setProfile(null));
    }, []);

  return (
    <div className="min-h-screen bg-rayo-beige flex">
      <DashboardSidebar profile={profile ?? undefined} />

      {/* ───────────────── MAIN CONTENT ───────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        <main className="flex-1 px-3 sm:px-4 lg:px-6 pb-10 
          overflow-auto 
          scrollbar-thin
          bg-rayo-beige
        ">
          {children}
        </main>

      </div>
    </div>
  );
}