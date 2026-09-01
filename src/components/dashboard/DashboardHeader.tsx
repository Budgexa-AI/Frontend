"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bell, Menu, Plus, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import DateRange from "../ui/DateRange";
import type { UserProfile } from "@/lib/api-client";

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

  const name = profile?.name ?? profile?.email ?? "User";
  const firstName = name.split(" ")[0];

  const handleMonthChange = (year: number, month: number, offset: number) => {
    setOffset(offset);
    onMonthChange?.(year, month, offset);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-Budgexa-green/5 bg-Budgexa-beige/80 backdrop-blur-xl">
      {/* ── Main row ── */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* LEFT — greeting */}
        <div className="flex min-w-0 items-center gap-3">
          {showMobileMenuButton && (
            <button
              onClick={onMenuClick}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-Budgexa-green/10 bg-white text-Budgexa-green transition-all hover:bg-Budgexa-ash lg:hidden"
            >
              <Menu size={18} />
            </button>
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-base font-semibold tracking-tight text-Budgexa-green sm:text-xl">
                {getGreeting()}, {firstName} 
              </h1>
            </div>

            <p className="mt-0.5 hidden text-xs text-Budgexa-green/50 sm:block">
              Here&apos;s what&apos;s happening with your money today.
            </p>
          </div>
        </div>

        {/* RIGHT — actions */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <DateRange onMonthChange={handleMonthChange} />
          </div>

          {/* Notifications
          <button className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-Budgexa-green/10 bg-white text-Budgexa-green transition-all hover:bg-Budgexa-ash">
            <Bell size={16} />
            <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-Budgexa-orange" />
          </button> */}

          {/* Insights */}
          <Link
            href="/product/finance/ai"
            className="hidden h-10 items-center gap-2 rounded-2xl border border-Budgexa-orange/20 bg-Budgexa-orange/10 px-3.5 text-sm font-medium text-Budgexa-orange transition-all hover:bg-Budgexa-orange/20 md:inline-flex"
          >
            <Sparkles size={15} />
            Insights
          </Link>

          {/* Add Transaction — desktop */}
          <Link
            href="/product/finance/transactions/new"
            className="hidden h-10 items-center gap-2 rounded-2xl bg-Budgexa-green px-4 text-sm font-medium text-white transition-all hover:bg-Budgexa-green-dark sm:inline-flex"
          >
            <Plus size={15} />
            Add Transaction
          </Link>

          {/* Add Transaction — mobile */}
          <Link
            href="/product/finance/transactions/new"
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-Budgexa-green text-white transition-all hover:bg-Budgexa-green-dark sm:hidden"
          >
            <Plus size={17} />
          </Link>

        </div>
      </div>

      {/* ── Mobile date range ── */}
      <div className="border-t border-Budgexa-green/5 px-4 py-2.5 lg:hidden">
        <DateRange onMonthChange={handleMonthChange} />
      </div>
    </header>
  );
}