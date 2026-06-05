"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  ArrowLeftRight,
  PieChart,
  Target,
  Sparkles,
  Settings,
  Crown,
  ChevronRight,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";
import RayoLogo from "../icons/RayoLogo";

const NAV = [
  { label: "Dashboard", href: "/product/dashboard", icon: LayoutDashboard },
  { label: "Transactions", href: "/product/finance/transactions", icon: ArrowLeftRight },
  { label: "Budget", href: "/product/finance/budget", icon: PieChart },
  { label: "Goals", href: "/product/finance/savings", icon: Target },
  { label: "Insights", href: "/product/finance/ai", icon: Sparkles },
];

interface Props {
  profile?: {
    fullName?: string;
    email?: string;
    plan?: string;
    avatarUrl?: string;
  };
}

export default function DashboardSidebar({ profile }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const name = profile?.fullName ?? profile?.email ?? "Test User";
  const email = profile?.email ?? "user@example.com";

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isPro =
    profile?.plan?.toLowerCase?.() === "pro" ||
    profile?.plan?.toLowerCase?.() === "premium";

  function handleLogOut() {
    document.cookie = "authToken=; path=/; max-age=0; SameSite=Lax";
    router.push("/auth/login");
  }

  const SidebarContent = () => (
    <>
      {/* LOGO */}
      <div className="px-6 pt-6">
        <Link href="/product/dashboard" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
            <RayoLogo size={24} className="text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Rayo AI</h2>
            <p className="text-xs text-muted-foreground">
              Your Path to Financial Freedom
            </p>
          </div>
        </Link>
      </div>

      {/* NAV */}
      <div className="mt-8 flex-1 px-4">
        <div className="mb-3 px-3">
          <p className="text-sm font-semibold uppercase tracking-sm text-muted-foreground">
            Overview
          </p>
        </div>

        <nav className="space-y-1.5">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "group flex items-center justify-between rounded-2xl px-4 py-3 transition-all",
                  active ? "bg-card shadow-card" : "hover:bg-rayo-beige/60"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl transition-all",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary group-hover:bg-primary/20"
                    )}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p
                      className={cn(
                        "text-sm font-medium",
                        active ? "text-primary" : "text-foreground/70"
                      )}
                    >
                      {label}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {getNavDescription(label)}
                    </p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </Link>
            );
          })}
        </nav>

        {/* PREMIUM */}
        {!isPro && (
          <div className="mt-8 rounded-3xl bg-primary p-5 text-primary-foreground">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Crown size={18} />
              </div>
              <p className="text-sm font-semibold leading-snug">
                Unlock AI insights & unlimited goals.
              </p>
            </div>
            <button className="w-full rounded-3xl bg-accent py-3 text-sm font-semibold text-accent-foreground">
              Upgrade to Pro from ₦3,500
            </button>
          </div>
        )}
      </div>

      {/* PROFILE */}
      <div className="border-t border-border p-4 space-y-1">
        <Link
          href="/product/settings"
          onClick={() => setMobileOpen(false)}
          className={cn(
            "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 transition-all",
            pathname.startsWith("/product/settings")
              ? "bg-card shadow-card"
              : "hover:bg-rayo-beige/60"
          )}
        >
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-xl transition-all",
            pathname.startsWith("/product/settings")
              ? "bg-primary text-primary-foreground"
              : "bg-primary/10 text-primary"
          )}>
            <Settings size={16} />
          </div>
          <span className={cn(
            "text-sm font-medium",
            pathname.startsWith("/product/settings") ? "text-primary" : "text-foreground/70"
          )}>
            Settings
          </span>
        </Link>

        <button
          onClick={handleLogOut}
          className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 transition-all hover:bg-rayo-alert/10 group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rayo-alert/10 text-rayo-alert group-hover:bg-rayo-alert/20 transition-all">
            <LogOut size={16} />
          </div>
          <span className="text-sm font-medium text-rayo-alert">Log out</span>
        </button>

        <button className="flex w-full items-center gap-3 rounded-2xl p-3 hover:bg-card mt-1">
          {profile?.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              className="h-12 w-12 rounded-2xl object-cover"
              alt="User avatar"
              width={48}
              height={48}
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold">
              {initials}
            </div>
          )}
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-semibold">{name}</p>
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          </div>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* DESKTOP */}
      <aside className="hidden lg:flex w-60 flex-col border-r border-border bg-rayo-beige-light">
        <SidebarContent />
      </aside>

      {/* MOBILE TRIGGER */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border"
      >
        <Menu size={20} />
      </button>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-80 shadow-card-lg bg-rayo-beige-light border-r border-border flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <p className="font-semibold">Menu</p>
              <button
                onClick={() => setMobileOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-lg bg-card border border-border"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <SidebarContent />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

function getNavDescription(label: string) {
  switch (label) {
    case "Dashboard": return "Your financial progress at a glance";
    case "Transactions": return "Track every money movement";
    case "Budget": return "Plan and control your spending";
    case "Goals": return "Build toward financial milestones";
    case "Insights": return "AI guidance to improve decisions";
    case "Reports": return "Understand your financial patterns";
    default: return "";
  }
}