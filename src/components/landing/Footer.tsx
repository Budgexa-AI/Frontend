"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Instagram, Linkedin } from "lucide-react";
import RayoLogo from "@/components/icons/RayoLogo";

function TwitterIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/budgexa", Icon: Instagram },
  { label: "Twitter", href: "https://twitter.com/budgexa", Icon: TwitterIcon },
  { label: "LinkedIn", href: "https://linkedin.com/company/budgexa", Icon: Linkedin },
];

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  const pathname = usePathname();

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

  return (
    <footer className="border-t border-[#e5e2db] bg-white text-[#1b3d18]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[36%_18%_18%_28%]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2 group">
              <RayoLogo className="text-[#1b3d18] transition-transform group-hover:scale-105" size={24} />
              <span className="font-serif text-2xl font-bold text-[#1b3d18] tracking-tight">
                Budgexa
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-[#1b3d18]/70">
              AI-powered personal finance for young adults. Track spending, manage budgets,
              and understand your money to build better financial habits.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[#1b3d18]">
              Explore
            </h4>
            <div className="space-y-2.5">
              {EXPLORE_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={(e) => handleLinkClick(e, href)}
                  className="block text-xs text-[#1b3d18]/70 transition-colors hover:text-[#1b3d18]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[#1b3d18]">
              Company
            </h4>
            <div className="space-y-2.5">
              {COMPANY_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    "block text-xs transition-colors",
                    pathname === href
                      ? "font-semibold text-[#1b3d18]"
                      : "text-[#1b3d18]/70 hover:text-[#1b3d18]"
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-[#1b3d18]">
              Connect
            </h4>
            <div className="mb-5 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1b3d18]/5 text-[#1b3d18] transition-colors hover:bg-[#1b3d18] hover:text-white"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#1b3d18]/25 bg-white text-xs font-semibold text-[#1b3d18] transition-all hover:bg-[#1b3d18]/5 shadow-sm active:scale-[0.99]"
            >
              <span>Get early access</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-[#1b3d18]/10 pt-6 text-[11px] leading-relaxed text-[#1b3d18]/50">
          © {new Date().getFullYear()} Budgexa. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
