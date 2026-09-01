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

export default function Footer() {
  return (
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
        </div>
      </div>
    </footer>
  );
}