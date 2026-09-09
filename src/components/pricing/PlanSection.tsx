"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import BillingToggle from "./BillingToggle";

const ALL_FEATURES = [
  "Real-time AI Financial Copilot & Safe-to-Spend balance",
  "Unlimited expense tracking & smart auto-categorization",
  "Custom flexible budgets for irregular & variable incomes",
  "Unlimited savings targets, milestone dates & stash allocations",
  "AI spending pattern detection & overdraft predictions",
  "Smart weekly & monthly financial health summaries",
  "Full data export anytime (CSV, PDF, Tax/Audit reports)",
  "Bank-grade 256-bit AES encryption & NDPR-aligned privacy",
  "Priority support & continuous access to new AI models",
];

export default function PricingPlanSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="border-b border-[#e5e2db] bg-[#F7F5EE] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d9d6cf] bg-white px-3.5 py-1 mb-3 shadow-2xs">
          <Sparkles size={11} className="text-[#F5824A]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1b3d18]">
            Simple Pricing
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black">
          Free 30-day trial. <span className="text-[#1b3d18]">One simple plan.</span>
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-[#1b3d18]/70 leading-relaxed max-w-lg mx-auto">
          Every subscription includes full access to all features. Cancel anytime before your trial ends with zero fees.
        </p>

        <div className="mt-8 flex justify-center">
          <BillingToggle billing={billing} onChange={setBilling} />
        </div>
      </div>

      {/* Plan card */}
      <div className="mx-auto mt-10 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#e5e2db] bg-white p-7 sm:p-9 lg:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-[46%_54%] gap-8 lg:gap-12 items-center">
            {/* Left side */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded-full bg-[#1b3d18]/8 px-3 py-1 text-[10.5px] font-bold text-[#1b3d18] tracking-wider uppercase">
                    Full Access Membership
                  </span>
                  {billing === "yearly" && (
                    <span className="rounded-full bg-[#F5824A]/15 text-[#F5824A] px-2.5 py-0.5 text-[10.5px] font-bold tracking-wide">
                      2 Months Free
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1b3d18] tracking-tight">
                  Budgexa All-Access
                </h3>
                <p className="text-xs sm:text-sm text-[#1b3d18]/70 mt-1.5 leading-relaxed">
                  Everything you need to take control of your money and build better financial habits.
                </p>

                <div className="mt-6 pt-5 border-t border-[#f0eee6]">
                  <div className="flex items-baseline gap-2">
                    <span className="font-sans text-4xl sm:text-5xl font-bold text-[#1b3d18] tracking-tight">
                      {billing === "monthly" ? "₦3,500" : "₦30,000"}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#1b3d18]/60">
                      {billing === "monthly" ? "/ month" : "/ year"}
                    </span>
                  </div>

                  <p className="text-xs text-[#1b3d18]/60 mt-1.5 font-medium">
                    {billing === "monthly" ? (
                      <>Free for 30 days • ₦0 due today • Billed monthly after trial</>
                    ) : (
                      <>Equivalent to <span className="font-bold text-[#F5824A]">₦2,500/mo</span> • Save ₦12,000/year (₦0 due today)</>
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href="/auth/signup"
                  className="group flex items-center justify-center gap-2 w-full rounded-full bg-[#F5824A] hover:bg-[#e06d34] text-white font-bold text-sm sm:text-base py-3.5 px-6 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Start 30-Day Free Trial</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <p className="text-center text-[11px] text-[#1b3d18]/50 mt-2.5">
                  No credit card required upfront • 1-click cancellation anytime
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="rounded-2xl bg-[#FBF9F5] border border-[#e5e2db] p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1b3d18] mb-4">
                Everything included in your free trial:
              </p>

              <div className="space-y-3">
                {ALL_FEATURES.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#1b3d18] font-medium">
                    <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1b3d18] text-white mt-0.5">
                      <Check size={11} strokeWidth={2.5} />
                    </div>
                    <span className="leading-snug text-[#1b3d18]/85">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}