<<<<<<< HEAD
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight, Instagram, Twitter, Linkedin, Github } from "lucide-react";
=======
// components/layout/Footer.tsx
import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";
import RayoLogo from "@/components/icons/RayoLogo";

function XIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/budgexa", Icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com/company/budgexa", Icon: Linkedin },
  { label: "X", href: "https://x.com/budgexa", Icon: XIcon },
];

const EXPLORE_LINKS = [
  ["Home", "/"],
  ["Features", "/#features"],
  ["How It Works", "/#how-it-works"],
  ["Trust", "/#trust"],
];

const COMPANY_LINKS = [
  ["About", "/about"],
  ["Contact", "/contact"],
  // ["Security", "/security"],
  ["Privacy", "/privacy"],
  ["Terms of Service", "/terms"],
];
>>>>>>> origin/feat/receipt

export default function Footer() {
  const pathname = usePathname();

  return (
<<<<<<< HEAD
    <footer className="bg-[#153813] text-white border-t border-[#1c4219]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#1c4219]/80">
          
          {/* Brand & Description */}
          <div className="lg:col-span-2 max-w-sm">
            <Link href="/" className="inline-block">
              <span className="font-serif font-bold text-white text-3xl tracking-tight">
                Budgexa
              </span>
            </Link>
            <p className="mt-4 text-xs sm:text-sm text-white/60 leading-relaxed font-normal">
              AI-powered personal finance for young adults. Track spending, manage budgets, and understand your money and build better financial habits.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-4">
              EXPLORE
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Features", href: "/#features" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "Trust", href: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-4">
              COMPANY
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Security", href: "/about" },
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
              ].map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-xs sm:text-sm transition-colors",
                        isActive
                          ? "text-[#F5824A] font-semibold hover:text-[#ff9562]"
                          : "text-white/80 hover:text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CONNECT */}
          <div>
            <h4 className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-4">
              CONNECT
            </h4>
            <div className="flex items-center gap-3 mb-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter size={15} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
            </div>

            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#F5824A] hover:text-[#ff9562] transition-colors group"
            >
              <span>Get early access</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6">
          <p className="text-[11px] sm:text-xs text-white/50 leading-relaxed font-normal">
            © {new Date().getFullYear()} Budgexa. All rights reserved. Budgexa is a financial management and insights platform and does not move money. Product features shown are illustrative.
          </p>
=======
    <footer className="border-t border-Budgexa-beige-dark bg-Budgexa-green">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[36%_18%_18%_28%]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <RayoLogo className="text-Budgexa-beige" size={26} />
              </span>
              <span className="font-display text-xl font-bold text-white">Budgexa</span>
            </Link>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/60">
              AI-powered personal finance for young Nigerians. Track spending, manage budgets,
              understand your money, and build better financial habits.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-white/80">
              Explore
            </h4>
            {EXPLORE_LINKS.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="mb-2 block text-xs text-white/60 transition-colors hover:text-Budgexa-orange"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-white/80">
              Company
            </h4>
            {COMPANY_LINKS.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="mb-2 block text-xs text-white/60 transition-colors hover:text-Budgexa-orange"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-white/80">
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
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-Budgexa-orange hover:text-Budgexa-orange"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <a href="/waitlist" className="text-xs font-semibold text-Budgexa-orange">
              Get early access →
            </a>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/15 pt-5 text-[10px] leading-relaxed text-white/40">
          © {new Date().getFullYear()} Budgexa. All rights reserved. Budgexa is a financial
          management and insights platform and does not move money. Product features shown are
          illustrative.
>>>>>>> origin/feat/receipt
        </div>
      </div>
    </footer>
  );
<<<<<<< HEAD
}


=======
}
>>>>>>> origin/feat/receipt
