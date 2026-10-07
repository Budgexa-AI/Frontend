"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Instagram, Linkedin } from "lucide-react";
import RayoLogo from "@/components/icons/RayoLogo";
import { WAITLIST_URL } from "@/lib/constants";

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

function ThreadsIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z"/>
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/budgexa_", Icon: Instagram },
  { label: "Threads", href: "https://www.threads.com/@budgexa_", Icon: ThreadsIcon },
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
            <a
              href={WAITLIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#1b3d18]/25 bg-white text-xs font-semibold text-[#1b3d18] transition-all hover:bg-[#1b3d18]/5 shadow-sm active:scale-[0.99]"
            >
              <span>Join waitlist</span>
              <span>→</span>
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-[#1b3d18]/10 pt-6 text-[11px] leading-relaxed text-[#1b3d18]/50">
          © {new Date().getFullYear()} Budgexa. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
