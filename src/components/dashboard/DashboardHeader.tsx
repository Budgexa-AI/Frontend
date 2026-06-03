"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bell, Menu, Plus, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import DateRange from "../ui/DateRange";
import type { UserProfile } from "@rayo/api-client";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

interface Props {
  profile: UserProfile;
  onMonthChange?: (year: number, month: number, offset: number) => void;
  onMenuClick?: () => void;
  showMobileMenuButton?: boolean;
}

export default function DashboardHeader({
  profile,
  onMonthChange,
  onMenuClick,
  showMobileMenuButton = true,
}: Props) {
  const router = useRouter();
  const [offset, setOffset] = useState(0);

  const name = profile?.fullName ?? profile?.email ?? "User";
  const firstName = name.split(" ")[0];

  const initials = useMemo(
    () =>
      firstName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    [firstName]
  );

  const handleMonthChange = (year: number, month: number, offset: number) => {
    setOffset(offset);
    onMonthChange?.(year, month, offset);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-rayo-green/5 bg-rayo-beige/80 backdrop-blur-xl">
      {/* ── Main row ── */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* LEFT — greeting */}
        <div className="flex min-w-0 items-center gap-3">
          {showMobileMenuButton && (
            <button
              onClick={onMenuClick}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-rayo-green/10 bg-white text-rayo-green transition-all hover:bg-rayo-ash lg:hidden"
            >
              <Menu size={18} />
            </button>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-base font-semibold tracking-tight text-rayo-green sm:text-xl">
                {getGreeting()}, {firstName} 
              </h1>
            </div>

            <p className="mt-0.5 hidden text-xs text-rayo-green/50 sm:block">
              Here&apos;s what&apos;s happening with your money today.
            </p>
          </div>
        </div>

        {/* RIGHT — actions */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <DateRange onMonthChange={handleMonthChange} />
          </div>

          {/* Notifications */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-rayo-green/10 bg-white text-rayo-green transition-all hover:bg-rayo-ash">
            <Bell size={16} />
            <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-rayo-orange" />
          </button>

          {/* Insights */}
          <Link
            href="/product/finance/ai"
            className="hidden h-10 items-center gap-2 rounded-2xl border border-rayo-orange/20 bg-rayo-orange/10 px-3.5 text-sm font-medium text-rayo-orange transition-all hover:bg-rayo-orange/20 md:inline-flex"
          >
            <Sparkles size={15} />
            Insights
          </Link>

          {/* Add Transaction — desktop */}
          <Link
            href="/product/finance/transactions/new"
            className="hidden h-10 items-center gap-2 rounded-2xl bg-rayo-green px-4 text-sm font-medium text-white transition-all hover:bg-rayo-green-dark sm:inline-flex"
          >
            <Plus size={15} />
            Add Transaction
          </Link>

          {/* Add Transaction — mobile */}
          <Link
            href="/product/finance/transactions/new"
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rayo-green text-white transition-all hover:bg-rayo-green-dark sm:hidden"
          >
            <Plus size={17} />
          </Link>

          {/* Avatar */}
          <button
            onClick={() => router.push("/product/settings")}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-rayo-green text-sm font-semibold text-white hover:bg-rayo-green-dark transition-all"
          >
            {initials}
          </button>
        </div>
      </div>

      {/* ── Mobile date range ── */}
      <div className="border-t border-rayo-green/5 px-4 py-2.5 lg:hidden">
        <DateRange onMonthChange={handleMonthChange} />
      </div>
    </header>
  );
}