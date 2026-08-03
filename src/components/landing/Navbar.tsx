"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import RayoLogo from "@/components/icons/RayoLogo";
import { fetchCurrentUser } from "@/lib/data-service";

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
    fetchCurrentUser()
      .then(() => setAuthState("authenticated"))
      .catch(() => setAuthState("anonymous"));
  }, []);

  const isActive = (href: string) => {
    // Hash links (#features etc.) are never "active" in the router sense
    if (href.startsWith("#")) return false;
    return pathname === href;
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-rayo-beige/95 backdrop-blur-md shadow-sm border-b border-rayo-beige-dark"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-rayo-green group-hover:scale-105 transition-transform">
              <RayoLogo className="text-rayo-beige" size={26} />
            </div>
            <span className="font-display font-bold text-rayo-green text-2xl tracking-tight">
              Rayo AI
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
                    active
                      ? "text-rayo-green font-semibold border-b-2 border-rayo-orange"
                      : "text-rayo-green/70 hover:text-rayo-green border-b-2 border-transparent"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {authState === "authenticated" ? (
              <a
                href="/product/dashboard"
                className="btn-primary text-sm px-5 py-2.5"
              >
                Dashboard
              </a>
            ) : authState === "anonymous" ? (
              <div className="flex items-center gap-4">
                <a
                  href={"/auth/login"}
                  className="btn-secondary text-sm px-5 py-2.5 hover:bg-rayo-beige/60 hover:text-rayo-green transition-colors"
                  rel="noopener noreferrer"
                >
                  Log In
                </a>

                <a
                  href={"/auth/signup"}
                  className="btn-primary text-sm px-5 py-2.5"
                  rel="noopener noreferrer"
                >
                  Sign Up
                </a>
              </div>
            ) : (
              // "checking" — reserve the space so the header doesn't jump
              // once auth state resolves
              <div className="h-9 w-24" />
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-rayo-green"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-rayo-beige border-t border-rayo-beige-dark px-4 pb-6 pt-2 space-y-1 animate-slide-up">
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center text-base font-medium py-2.5 border-l-4 pl-3 transition-colors",
                  active
                    ? "border-rayo-orange text-rayo-green font-semibold"
                    : "border-transparent text-rayo-green/70 hover:text-rayo-green"
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
                <a
                  href={"/auth/login"}
                  className="btn-secondary text-center hover:bg-rayo-beige/60 hover:text-rayo-green transition-colors"
                  rel="noopener noreferrer"
                >
                  Log In
                </a>

                <a
                  href={"/auth/signup"}
                  className="btn-primary text-center"
                  rel="noopener noreferrer"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}