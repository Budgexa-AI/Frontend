"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ShieldCheck,
  CreditCard,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type BillingPeriod = "monthly" | "yearly";

const PLAN = {
  monthlyPrice: 3500,
  yearlyPrice: 30000,
  features: [
    "Unlimited expense tracking",
    "Unlimited savings goals",
    "AI spending pattern detection",
    "Predict future cash shortages",
    "AI savings recommendations",
    "Automatic transaction categorization",
    "Data export (CSV, PDF)",
    "Priority support",
  ],
};

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  const price =
    billingPeriod === "monthly" ? PLAN.monthlyPrice : PLAN.yearlyPrice;

  return (
    <main className="min-h-screen">
      {/* ── 1. HERO SECTION (Exact 100vh Split Dark Green / Cream with Enforced Bounds) ── */}
      <section className="relative overflow-hidden h-[100dvh] pt-16 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 h-full overflow-hidden">
          
          {/* Left Column: Dark Green background with Heading & Trust (Wider Column & Reduced Wrapping) */}
          <div className="lg:col-span-6 xl:col-span-6 bg-[#153813] text-[#EDE4CC] px-8 sm:px-12 md:px-16 lg:px-20 py-8 sm:py-10 lg:py-12 flex flex-col justify-center h-full z-10">
            <div className="max-w-xl w-full">
              <span className="inline-block bg-[#EDE4CC]/10 text-[#EDE4CC] border border-[#EDE4CC]/20 rounded-full px-3.5 py-1 text-[11px] font-semibold tracking-wider mb-4 sm:mb-5 select-none">
                Pricing
              </span>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] xl:text-[66px] font-black text-[#EDE4CC] leading-[0.98] tracking-tight mb-4 sm:mb-6">
                Smart money<br />
                starts with<br />
                <span
                  className="font-serif inline-block"
                  style={{
                    WebkitTextStroke: "1.5px #EDE4CC",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  clarity.
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-[16px] text-[#EDE4CC]/80 leading-relaxed mb-8 font-normal max-w-lg">
                Start with Budgexa free for 30 days. Cancel anytime. Then choose the plan that works for you.
              </p>

              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#EDE4CC]/85 font-medium">
                  <ShieldCheck size={16} className="text-[#EDE4CC]/80 shrink-0 stroke-[1.75]" />
                  <span>Bank-level encryption</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#EDE4CC]/85 font-medium">
                  <CreditCard size={16} className="text-[#EDE4CC]/80 shrink-0 stroke-[1.75]" />
                  <span>Secure Paystack payments</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-[#EDE4CC]/85 font-medium">
                  <Users size={16} className="text-[#EDE4CC]/80 shrink-0 stroke-[1.75]" />
                  <span>Trusted by students, graduates &amp; young professionals</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cream Background with Extra Large Laptop Display */}
          <div className="lg:col-span-6 xl:col-span-6 bg-[#FAF7EE] p-2 sm:p-4 lg:p-6 flex items-center justify-center relative overflow-hidden h-full">
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/images/L-vie.webp"
                alt="Budgexa Dashboard on Laptop"
                width={1600}
                height={1000}
                priority
                className="w-[125%] sm:w-[135%] lg:w-[145%] xl:w-[155%] max-w-none h-auto max-h-[85vh] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.22)] transform origin-center transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. PRICING PLAN CARD SECTION ── */}
      <section className="bg-[#FAF7EE] py-20 sm:py-28 px-6 border-t border-[#254F22]/10">
        <div className="max-w-md w-full mx-auto rounded-[36px] overflow-hidden border border-[#254F22]/15 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
          
          {/* Top Half of Card (White / Light Cream) */}
          <div className="bg-[#FAF7EE] p-8 sm:p-10 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1b3d18] tracking-tight">
              One plan. Full<br />
              <span
                className="font-serif block"
                style={{
                  WebkitTextStroke: "1.25px #1b3d18",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                clarity.
              </span>
            </h2>
            <p className="text-sm text-[#254F22]/70 mt-2 mb-6">
              Free for the first 30 days.
            </p>

            {/* Monthly / Yearly Toggle */}
            <div className="inline-flex items-center gap-1 rounded-full bg-[#E5DDC7]/60 p-1 border border-[#254F22]/10">
              <button
                type="button"
                onClick={() => setBillingPeriod("monthly")}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer",
                  billingPeriod === "monthly"
                    ? "bg-[#1b3d18] text-white shadow-sm"
                    : "text-[#1b3d18]/70 hover:text-[#1b3d18]"
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingPeriod("yearly")}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer",
                  billingPeriod === "yearly"
                    ? "bg-[#1b3d18] text-white shadow-sm"
                    : "text-[#1b3d18]/70 hover:text-[#1b3d18]"
                )}
              >
                <span>Yearly</span>
                <span className="text-[#F5824A] font-bold text-[10px]">Save 20%</span>
              </button>
            </div>
          </div>

          {/* Bottom Half of Card (Warm Khaki / Sand) */}
          <div className="bg-[#E4DAC3] p-8 sm:p-10 border-t border-[#254F22]/10">
            {/* Price */}
            <div className="text-center">
              <div className="flex items-baseline justify-center gap-1 font-serif text-4xl sm:text-5xl font-black text-[#1b3d18]">
                <span>₦{price.toLocaleString()}</span>
                <span className="text-sm font-body font-normal text-[#1b3d18]/70">
                  /{billingPeriod === "monthly" ? "mo" : "yr"}
                </span>
              </div>

              {/* CTA button */}
              <Link
                href="/auth/signup"
                className="w-full rounded-full bg-[#F5824A] hover:bg-[#E06E35] text-white font-semibold text-sm sm:text-base py-3.5 px-6 mt-6 mb-2 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] text-center block"
              >
                Start 30-Day Free Trial
              </Link>

              <p className="text-[11px] text-[#1b3d18]/60 mb-8">
                No card required
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3.5">
              {PLAN.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-xs sm:text-sm text-[#1b3d18] font-medium"
                >
                  <Check size={16} className="text-[#1b3d18] stroke-[2.5] shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. HOW YOUR FREE TRIAL WORKS (4-Column Grid) ── */}
      <section className="bg-[#EDE4CC]/70 border-t border-b border-[#254F22]/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Header */}
          <div className="bg-[#E0D7BD] p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#254F22]/15">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#1b3d18] leading-tight mb-3">
                How your<br />
                free trial<br />
                <span
                  className="font-serif block"
                  style={{
                    WebkitTextStroke: "1.25px #1b3d18",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  works.
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-[#1b3d18]/70 leading-relaxed">
                Full access from day one. No surprises when it ends.
              </p>
            </div>
          </div>

          {/* Column 2: Step 01 */}
          <div className="bg-[#F5EFE4] p-8 sm:p-10 border-b md:border-b-0 md:border-r border-[#254F22]/15 flex flex-col">
            <span className="text-xs font-mono font-bold text-[#F5824A] mb-3 block">
              01
            </span>
            <h4 className="font-bold text-sm sm:text-base text-[#1b3d18] mb-2">
              Sign up securely
            </h4>
            <p className="text-xs sm:text-sm text-[#1b3d18]/70 leading-relaxed">
              Connect your accounts using bank-grade encryption. We never move your money.
            </p>
          </div>

          {/* Column 3: Step 02 */}
          <div className="bg-[#F5EFE4] p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#254F22]/15 flex flex-col">
            <span className="text-xs font-mono font-bold text-[#F5824A] mb-3 block">
              02
            </span>
            <h4 className="font-bold text-sm sm:text-base text-[#1b3d18] mb-2">
              Get insights instantly
            </h4>
            <p className="text-xs sm:text-sm text-[#1b3d18]/70 leading-relaxed">
              Budgexa starts analyzing your spending patterns and provides actionable advice on day one.
            </p>
          </div>

          {/* Column 4: Step 03 */}
          <div className="bg-[#F5EFE4] p-8 sm:p-10 flex flex-col">
            <span className="text-xs font-mono font-bold text-[#F5824A] mb-3 block">
              03
            </span>
            <h4 className="font-bold text-sm sm:text-base text-[#1b3d18] mb-2">
              Decide later
            </h4>
            <p className="text-xs sm:text-sm text-[#1b3d18]/70 leading-relaxed">
              We&apos;ll remind you 3 days before your trial ends. Cancel anytime with one click.
            </p>
          </div>

        </div>
      </section>

      {/* ── 4. SPLIT BANNER CTA ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Half (Dark Green) */}
        <div className="bg-[#153813] py-16 sm:py-20 px-8 sm:px-14 lg:px-20 flex items-center">
          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Take <span className="text-[#F5824A]">control</span> of<br />
            your money.
          </h3>
        </div>

        {/* Right Half (Ivory Cream) */}
        <div className="bg-[#FAF7EE] py-16 sm:py-20 px-8 sm:px-14 lg:px-20 flex flex-col justify-center items-start border-t lg:border-t-0 border-[#254F22]/10">
          <p className="text-sm sm:text-base text-[#1b3d18]/80 max-w-sm mb-6 leading-relaxed font-normal">
            Join thousands of young professionals building better financial habits with Budgexa.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center rounded-full bg-[#F5824A] hover:bg-[#E06E35] px-7 py-3.5 font-semibold text-sm text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          >
            Start 30-Day Free Trial
          </Link>
        </div>
      </section>
    </main>
  );
}