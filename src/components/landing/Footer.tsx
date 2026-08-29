"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight, Instagram, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  return (
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
        </div>
      </div>
    </footer>
  );
}


