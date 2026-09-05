// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import RayoLogo from "@/components/icons/RayoLogo";
import { isAuthenticated } from "@/lib/auth-client";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

type AuthState = "checking" | "authenticated" | "anonymous";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Determine auth state - use a state to allow for potential future updates
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Safe to call on both server and client since isAuthenticated() checks typeof window
    return isAuthenticated() ? "authenticated" : "anonymous";
  });

  // Ensure we only render after mount to prevent hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // The home page opens on a dark-green hero, so the nav needs light text
  // until the user scrolls past it. Every other page starts on a light
  // background, so it always gets the standard beige/green treatment.
  const overDarkHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  // Don't render until mounted to prevent hydration mismatches
  if (!isMounted) return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        overDarkHero
          ? "bg-transparent"
          : scrolled
          ? "border-b border-Budgexa-beige-dark bg-Budgexa-beige/95 shadow-sm backdrop-blur-md"
          : "bg-Budgexa-beige"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg transition-transform group-hover:scale-105",
                overDarkHero ? "bg-white/15" : "bg-Budgexa-green"
              )}
            >
              <RayoLogo className={overDarkHero ? "text-white" : "text-Budgexa-beige"} size={26} />
            </div>
            <span
              className={cn(
                "font-display text-2xl font-bold tracking-tight",
                overDarkHero ? "text-white" : "text-Budgexa-green"
              )}
            >
              Budgexa
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    "border-b-2 pb-0.5 text-sm font-medium transition-colors",
                    overDarkHero
                      ? active
                        ? "border-Budgexa-orange text-white"
                        : "border-transparent text-white/75 hover:text-white"
                      : active
                      ? "border-Budgexa-orange font-semibold text-Budgexa-green"
                      : "border-transparent text-Budgexa-green/70 hover:text-Budgexa-green"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 md:flex">
            {authState === "authenticated" ? (
              <a href="/product/dashboard" className="btn-primary px-5 py-2.5 text-sm">
                Dashboard
              </a>
            ) : authState === "anonymous" ? (
              <>
                <Link
                  href="/auth/login"
                  className={cn(
                    "text-sm font-semibold transition-colors",
                    overDarkHero ? "text-white/85 hover:text-white" : "text-Budgexa-green hover:text-Budgexa-orange"
                  )}
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm font-bold transition-colors",
                    overDarkHero
                      ? "bg-Budgexa-orange text-Budgexa-green"
                      : "bg-Budgexa-green text-white hover:bg-Budgexa-green/90"
                  )}
                >
                  Sign up
                </Link>
              </>
            ) : (
              <div className="h-9 w-24" />
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className={cn("p-2 md:hidden", overDarkHero ? "text-white" : "text-Budgexa-green")}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — always solid, regardless of hero state, for readability */}
      {mobileOpen && (
        <div className="animate-slide-up space-y-1 border-t border-Budgexa-beige-dark bg-Budgexa-beige px-4 pb-6 pt-2 md:hidden">
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center border-l-4 py-2.5 pl-3 text-base font-medium transition-colors",
                  active
                    ? "border-Budgexa-orange font-semibold text-Budgexa-green"
                    : "border-transparent text-Budgexa-green/70 hover:text-Budgexa-green"
                )}
              >
                {label}
              </Link>
            );
          })}
          <div className="flex flex-col gap-3 pt-4">
            {authState === "authenticated" ? (
              <a href="/product/dashboard" className="btn-primary text-center">
                Dashboard
              </a>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-Budgexa-green py-2.5 text-center text-sm font-semibold text-Budgexa-green transition-colors hover:bg-Budgexa-green/5"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary text-center"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}