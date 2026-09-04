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
  { label: "About", href: "/#about" },
];

type AuthState = "checking" | "authenticated" | "anonymous";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authState, setAuthState] = useState<AuthState>("checking");
  const pathname = usePathname();

  const isAuthPage = pathname?.startsWith("/auth");
  const isDarkTheme = !isAuthPage && pathname === "/contact";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAuthState(isAuthenticated() ? "authenticated" : "anonymous");
    }, 0);
  }, []);

  // Handle hash scroll on initial page load / refresh and hash change
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace(/^#/, "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Delay slightly to allow DOM layout / Framer motion to settle
    const timer = setTimeout(scrollToHash, 150);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") || href.startsWith("#")) {
      const id = href.replace(/^\/?#/, "");
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${id}`);
        }
      }
    }
  };

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isAuthPage
          ? "bg-white border-b border-[#e5e2db]"
          : isDarkTheme
          ? "bg-[#153813] border-b border-[#1c4219]"
          : scrolled
          ? "border-b border-[#e5e2db] bg-[#FBF9F5]/95 shadow-sm backdrop-blur-md"
          : "bg-[#FBF9F5]/80 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <RayoLogo
              className={cn(
                "transition-transform group-hover:scale-105",
                isDarkTheme ? "text-white" : "text-[#1b3d18]"
              )}
              size={26}
            />
            <span
              className={cn(
                "text-2xl font-bold tracking-tight transition-colors",
                isDarkTheme
                  ? "font-serif text-white text-3xl"
                  : "font-serif text-[#1b3d18] text-2xl"
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
                  onClick={(e) => handleLinkClick(e, href)}
                  className={cn(
                    "border-b-2 pb-0.5 text-sm font-medium transition-colors",
                    isDarkTheme
                      ? active
                        ? "border-Budgexa-orange font-semibold text-[#F5824A]"
                        : "border-transparent text-white/80 hover:text-white"
                      : active
                      ? "border-[#1b3d18] font-semibold text-[#1b3d18]"
                      : "border-transparent text-[#1b3d18]/75 hover:text-[#1b3d18]"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 md:flex">
            {isAuthPage ? (
              <Link
                href="/product/dashboard"
                className="text-sm font-semibold text-[#1b3d18] hover:text-[#1b3d18]/70 transition-colors"
              >
                Dashboard
              </Link>
            ) : isDarkTheme ? (
              <Link
                href="/product/dashboard"
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            ) : authState === "authenticated" ? (
              <a
                href="/product/dashboard"
                className="rounded-full bg-[#1b3d18] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#254F22] transition-colors shadow-sm"
              >
                Dashboard
              </a>
            ) : (
              <a
                href="#waitlist"
                onClick={(e) => handleLinkClick(e, "#waitlist")}
                className="rounded-full bg-[#1b3d18] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#254F22] transition-colors shadow-sm"
              >
                Join Waitlist
              </a>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className={cn(
              "p-2 rounded-lg transition-colors md:hidden",
              isDarkTheme
                ? "text-white hover:bg-white/10"
                : "text-[#1b3d18] hover:bg-[#1b3d18]/5"
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
            "animate-slide-up space-y-1 border-t px-4 pb-6 pt-2 md:hidden",
            isAuthPage
              ? "bg-white border-[#e5e2db] text-[#1b3d18]"
              : isDarkTheme
              ? "bg-[#153813] border-[#1c4219] text-white"
              : "border-[#e5e2db] bg-[#FBF9F5] text-[#1b3d18]"
          )}
        >
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                onClick={(e) => {
                  handleLinkClick(e, href);
                  setMobileOpen(false);
                }}
                className={cn(
                  "flex items-center border-l-4 py-2.5 pl-3 text-base font-medium transition-colors",
                  isDarkTheme
                    ? active
                      ? "border-Budgexa-orange font-semibold text-[#F5824A]"
                      : "border-transparent text-white/80 hover:text-white"
                    : active
                    ? "border-[#1b3d18] font-semibold text-[#1b3d18]"
                    : "border-transparent text-[#1b3d18]/75 hover:text-[#1b3d18]"
                )}
              >
                {label}
              </Link>
            );
          })}
          <div className="flex flex-col gap-3 pt-4">
            {isAuthPage || isDarkTheme ? (
              <Link
                href="/product/dashboard"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-full text-center py-2.5 text-sm font-semibold transition-colors",
                  isAuthPage
                    ? "bg-[#1b3d18] text-white hover:bg-[#254F22]"
                    : "bg-Budgexa-orange text-white hover:bg-Budgexa-orange-dark"
                )}
              >
                Dashboard
              </Link>
            ) : authState === "authenticated" ? (
              <a
                href="/product/dashboard"
                className="rounded-full bg-[#1b3d18] text-center py-2.5 text-sm font-semibold text-white"
              >
                Dashboard
              </a>
            ) : (
              <a
                href="#waitlist"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-[#1b3d18] text-center py-2.5 text-sm font-semibold text-white"
              >
                Join Waitlist
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}