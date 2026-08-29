"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import RayoLogo from "@/components/icons/RayoLogo";
import { isAuthenticated } from "@/lib/auth-client";

const NAV_LINKS = [
  { label: "Features",     href: "/#features" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "Pricing",      href: "/pricing" },
  { label: "About",        href: "/about" },
];

type AuthState = "checking" | "authenticated" | "anonymous";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [authState, setAuthState]   = useState<AuthState>("checking");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setAuthState(isAuthenticated() ? "authenticated" : "anonymous");
  }, []);

  const isActive = (href: string) => {
    // Hash links (#features etc.) are never "active" in the router sense
    if (href.startsWith("#")) return false;
    return pathname === href;
  };

  const isDarkTheme =
    pathname === "/contact" ||
    pathname === "/pricing" ||
    pathname?.startsWith("/auth");

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        isDarkTheme
          ? "bg-[#153813] border-b border-[#1c4219]"
          : scrolled
          ? "bg-Budgexa-beige/95 backdrop-blur-md shadow-sm border-b border-Budgexa-beige-dark"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {!isDarkTheme && (
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-Budgexa-green group-hover:scale-105 transition-transform">
                <RayoLogo className="text-Budgexa-beige" size={26} />
              </div>
            )}
            <span
              className={cn(
                "font-bold text-2xl tracking-tight transition-colors",
                isDarkTheme
                  ? "font-serif text-white text-3xl"
                  : "font-display text-Budgexa-green"
              )}
            >
              Budgexa
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    "text-sm font-medium transition-colors pb-0.5",
                    isDarkTheme
                      ? active
                        ? "text-[#F5824A] font-semibold border-b-2 border-Budgexa-orange"
                        : "text-white/80 hover:text-white border-b-2 border-transparent"
                      : active
                      ? "text-Budgexa-green font-semibold border-b-2 border-Budgexa-orange"
                      : "text-Budgexa-green/70 hover:text-Budgexa-green border-b-2 border-transparent"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {isDarkTheme ? (
              <Link
                href="/product/dashboard"
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            ) : authState === "authenticated" ? (
              <a
                href="/product/dashboard"
                className="btn-primary text-sm px-5 py-2.5"
              >
                Dashboard
              </a>
            ) : authState === "anonymous" ? (
              <a
                href="/waitlist"
                className="btn-primary text-sm px-5 py-2.5"
              >
                Join Waitlist
              </a>
            ) : (
              // "checking" — reserve the space so the header doesn't jump
              <div className="h-9 w-24" />
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              isDarkTheme ? "text-white hover:bg-white/10" : "text-Budgexa-green hover:bg-Budgexa-green/10"
            )}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className={cn(
            "md:hidden px-4 pb-6 pt-2 space-y-1 animate-slide-up border-t",
            isDarkTheme
              ? "bg-[#153813] border-[#1c4219] text-white"
              : "bg-Budgexa-beige border-Budgexa-beige-dark"
          )}
        >
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center text-base font-medium py-2.5 border-l-4 pl-3 transition-colors",
                  isDarkTheme
                    ? active
                      ? "border-Budgexa-orange text-[#F5824A] font-semibold"
                      : "border-transparent text-white/80 hover:text-white"
                    : active
                    ? "border-Budgexa-orange text-Budgexa-green font-semibold"
                    : "border-transparent text-Budgexa-green/70 hover:text-Budgexa-green"
                )}
              >
                {label}
              </Link>
            );
          })}
          <div className="flex flex-col gap-3 pt-4">
            {isDarkTheme ? (
              <Link
                href="/product/dashboard"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-Budgexa-orange text-center py-2.5 text-sm font-semibold text-white hover:bg-Budgexa-orange-dark transition-colors"
              >
                Dashboard
              </Link>
            ) : authState === "authenticated" ? (
              <a href="/product/dashboard" className="btn-primary text-center">
                Dashboard
              </a>
            ) : (
              <a href="/waitlist" className="btn-primary text-center">
                Join Waitlist
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}