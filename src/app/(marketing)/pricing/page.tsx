"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHLY_FEATURES = [
  "Unlimited expense tracking & smart categorization",
  "Unlimited custom savings targets & stashes",
  "Real-time safe-to-spend guidance",
  "AI spending pattern detection & insights",
  "Predict future cash shortages before they happen",
  "Smart monthly & weekly budget planner",
  "Export transaction data anytime (CSV, PDF)",
  "Standard email & in-app support",
];

const YEARLY_FEATURES = [
  "Everything in the Monthly Plan",
  "2 months completely free (Save 20%)",
  "Annual financial health & wealth projections",
  "Priority customer & concierge support",
  "Early access to upcoming AI financial models",
  "Advanced debt payoff & savings simulations",
  "Custom multi-wallet allocation stashes",
  "Export full annual tax & audit reports",
];

const HIGHLIGHTS = [
  { label: "01 · 30-DAY FREE TRIAL", detail: "Full Pro access immediately" },
  { label: "02 · REAL-TIME AI COPILOT", detail: "Personalized naira insights" },
  { label: "03 · UNLIMITED GOALS", detail: "Track every naira safely" },
  { label: "04 · CANCEL IN ONE CLICK", detail: "Zero hassle or lock-in" },
];

const STEPS = [
  {
    number: "01",
    title: "Create your account",
    description:
      "Sign up in less than 60 seconds. No credit card required upfront to begin your 30-day trial.",
  },
  {
    number: "02",
    title: "Experience AI financial guidance",
    description:
      "Log transactions, set flexible budgets, and let Budgexa calculate your real-time safe-to-spend balance.",
  },
  {
    number: "03",
    title: "Decide when you're ready",
    description:
      "We'll notify you 3 days before day 30. Choose monthly or yearly, or cancel with a single click.",
  },
];

export default function PricingPage() {
  return (
    <main className="relative overflow-x-hidden bg-[#FBF9F5]">
      {/* ── 1. HERO SECTION (Matches Reference Image) ── */}
      <section className="border-b border-[#e5e2db] bg-white min-h-[calc(100dvh-4rem)] flex flex-col justify-center pt-20 pb-12 sm:pt-24 sm:pb-16 overflow-hidden">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column: Copy & Feature Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d9d6cf] bg-[#F7F5EE] px-3.5 py-1 mb-5">
                <Sparkles size={12} className="text-[#1b3d18]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1b3d18]">
                  Actionable Intelligence
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.08] tracking-tight text-black">
                Make an impact on your money,{" "}
                <span className="text-[#1b3d18]">not just your dashboard.</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-[#1b3d18]/75 font-normal">
                Budgexa turns raw transactions into useful decisions. Track every naira, spot
                patterns, and get personalized guidance using your own financial data.
              </p>

              {/* 4 Feature Buttons in 2x2 Grid (Exact Match to Image) */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
                {HIGHLIGHTS.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 * idx,
                      ease: "easeOut",
                    }}
                    className="group flex items-center justify-between rounded-xl border border-[#e5e2db] bg-[#FBF9F5] px-4 py-3 text-[11px] font-bold tracking-wider text-[#1b3d18] transition-all hover:bg-[#1b3d18]/5 hover:border-[#1b3d18]/25"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight
                      size={13}
                      className="text-[#1b3d18]/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-medium text-[#1b3d18]/75">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#1b3d18]" />
                  <span>Bank-grade 256-bit encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-[#1b3d18]" />
                  <span>Secure Paystack payments</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Budgexa Today Card Mockup (Exact layout & hierarchy as Image) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
                {/* Background Glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#F5824A]/10 to-[#1b3d18]/10 blur-xl"
                />

                {/* Today Card */}
                <div className="relative rounded-3xl bg-white p-6 sm:p-7 shadow-lg border border-[#e5e2db] transition-transform hover:-translate-y-1 duration-300">
                  {/* Header Row */}
                  <div className="flex justify-between items-center pb-2 border-b border-[#f0eee6]">
                    <p className="text-[10px] font-bold tracking-wider uppercase text-[#1b3d18]/60">
                      BUDGEXA · TODAY
                    </p>
                    <span className="text-[10px] text-[#1b3d18]/50">Real-time</span>
                  </div>

                  {/* Safe-to-spend balance */}
                  <div className="mt-3">
                    <p className="font-sans text-3xl font-bold text-[#1b3d18]">₦12,000</p>
                    <p className="text-[10px] text-[#1b3d18]/60 mt-0.5">
                      Safe-to-spend balance
                    </p>
                  </div>

                  {/* Categorized spending breakdown */}
                  <div className="mt-4 space-y-2 text-[11px]">
                    <div className="flex justify-between items-center rounded-xl bg-[#F6F5F0] px-3.5 py-2.5">
                      <span className="text-[#1b3d18]/75 font-medium">Groceries</span>
                      <span className="font-bold text-[#1b3d18]">₦6,200</span>
                    </div>
                    <div className="flex justify-between items-center rounded-xl bg-[#F6F5F0] px-3.5 py-2.5">
                      <span className="text-[#1b3d18]/75 font-medium">Transport</span>
                      <span className="font-bold text-[#1b3d18]">₦1,500</span>
                    </div>
                    <div className="flex justify-between items-center rounded-xl bg-[#F5824A] text-white px-3.5 py-2.5 font-semibold shadow-xs">
                      <span>Saving goal</span>
                      <span>72%</span>
                    </div>
                  </div>

                  {/* AI guidance banner */}
                  <div className="mt-3.5 rounded-2xl bg-[#1b3d18] px-4 py-3 text-white text-xs leading-snug">
                    <p className="font-bold text-[#F5824A] text-[11px] mb-0.5">
                      AI Guidance
                    </p>
                    <p className="text-white/85 text-[11px]">
                      You&apos;re still on track this week. Keep your dining under ₦3,000 to hit your target.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. DEDICATED 2 SIDE-BY-SIDE PAYMENT PLAN CARDS (Fits 100vh) ── */}
      <section id="plans" className="scroll-mt-16 border-b border-[#e5e2db] bg-[#F7F5EE] min-h-[calc(100dvh-4rem)] flex flex-col justify-center py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d9d6cf] bg-white px-3 py-1 mb-3">
              <Sparkles size={11} className="text-[#1b3d18]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1b3d18]">
                Transparent Pricing
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-black">
              Choose the plan that fits <span className="text-[#1b3d18]">your pace.</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#1b3d18]/70 leading-relaxed max-w-lg mx-auto">
              Every plan begins with a 30-day free trial. No credit card required upfront. Cancel anytime with zero fees.
            </p>
          </div>

          {/* 2 Side-by-Side Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
            
            {/* ── CARD 1: MONTHLY PLAN ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-7 lg:p-8 shadow-md border border-[#e5e2db] hover:border-[#1b3d18]/30 transition-all duration-300"
            >
              <div>
                {/* Plan Header */}
                <div className="flex justify-between items-start pb-4 border-b border-[#f0eee6]">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18]">
                      Monthly Plan
                    </h3>
                    <p className="text-xs text-[#1b3d18]/60 mt-0.5">
                      Pay month-to-month with total flexibility.
                    </p>
                  </div>
                  <span className="rounded-full bg-[#1b3d18]/8 px-2.5 py-0.5 text-[10.5px] font-bold text-[#1b3d18]">
                    Flexible
                  </span>
                </div>

                {/* Price Display */}
                <div className="mt-4 sm:mt-5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-sans text-3xl sm:text-4xl font-bold text-[#1b3d18]">
                      ₦3,500
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#1b3d18]/60">
                      / month
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#1b3d18]/60 mt-1 font-medium">
                    Free for 30 days • ₦0 due today
                  </p>
                </div>

                {/* Features List */}
                <div className="mt-5 sm:mt-6 space-y-2.5">
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#1b3d18]/60">
                    What&apos;s Included:
                  </p>
                  {MONTHLY_FEATURES.map((feature) => (
                    <div key={feature} className="flex items-start gap-2 text-xs text-[#1b3d18] font-medium">
                      <div className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#1b3d18]/10 text-[#1b3d18] mt-0.5">
                        <Check size={10} strokeWidth={2.5} />
                      </div>
                      <span className="leading-snug text-[#1b3d18]/85">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button & Disclaimer */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-[#f0eee6]">
                <Link
                  href="/auth/signup"
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-[#1b3d18] hover:bg-[#254F22] text-white font-semibold text-xs sm:text-sm py-3 px-5 transition-all shadow-sm active:scale-[0.99]"
                >
                  <span>Start 30-Day Free Trial</span>
                  <ArrowRight size={14} />
                </Link>
                <p className="text-center text-[10.5px] text-[#1b3d18]/50 mt-2">
                  No card required • Billed ₦3,500/mo after trial
                </p>
              </div>
            </motion.div>

            {/* ── CARD 2: YEARLY PLAN (Best Value) ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="relative flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-7 lg:p-8 shadow-xl border-2 border-[#1b3d18] hover:shadow-2xl transition-all duration-300"
            >
              {/* Best Value Badge */}
              <div className="absolute -top-3 right-6 sm:right-8">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5824A] text-white px-3 py-0.5 text-[10px] font-bold tracking-wide shadow-sm uppercase">
                  <Sparkles size={10} />
                  Best Value · Save 20%
                </span>
              </div>

              <div>
                {/* Plan Header */}
                <div className="flex justify-between items-start pb-4 border-b border-[#f0eee6]">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18]">
                      Yearly Plan
                    </h3>
                    <p className="text-xs text-[#1b3d18]/60 mt-0.5">
                      Full year of peace of mind with 2 months free.
                    </p>
                  </div>
                  <span className="rounded-full bg-[#F5824A]/10 text-[#F5824A] px-2.5 py-0.5 text-[10.5px] font-bold">
                    Save ₦12,000/yr
                  </span>
                </div>

                {/* Price Display */}
                <div className="mt-4 sm:mt-5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-sans text-3xl sm:text-4xl font-bold text-[#1b3d18]">
                      ₦30,000
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#1b3d18]/60">
                      / year
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#F5824A] mt-1 font-bold">
                    Equivalent to ₦2,500/month (₦0 due today)
                  </p>
                </div>

                {/* Features List */}
                <div className="mt-5 sm:mt-6 space-y-2.5">
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#1b3d18]/60">
                    Everything in Monthly, Plus:
                  </p>
                  {YEARLY_FEATURES.map((feature, idx) => (
                    <div key={feature} className="flex items-start gap-2 text-xs text-[#1b3d18] font-medium">
                      <div className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#1b3d18] text-white mt-0.5">
                        <Check size={10} strokeWidth={2.5} />
                      </div>
                      <span className={cn("leading-snug", idx < 2 ? "font-bold text-[#1b3d18]" : "text-[#1b3d18]/85")}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button & Disclaimer */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-[#f0eee6]">
                <Link
                  href="/auth/signup"
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-[#F5824A] hover:bg-[#d96a34] text-white font-bold text-xs sm:text-sm py-3 px-5 transition-all shadow-sm active:scale-[0.99]"
                >
                  <span>Start 30-Day Free Trial</span>
                  <ArrowRight size={14} />
                </Link>
                <p className="text-center text-[10.5px] text-[#1b3d18]/50 mt-2">
                  No card required • Billed ₦30,000/yr after 30-day trial
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 3. HOW YOUR FREE TRIAL WORKS ── */}
      <section className="border-b border-[#e5e2db] bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d9d6cf] bg-[#F7F5EE] px-3.5 py-1 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1b3d18]">
                Simple &amp; Predictable
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-black">
              How your <span className="text-[#1b3d18]">free trial</span> works.
            </h2>
            <p className="mt-3 text-sm text-[#1b3d18]/70 leading-relaxed">
              Full access to every single feature from day one. No hidden barriers and no surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.1 * idx, ease: "easeOut" }}
                className="rounded-2xl border border-[#e5e2db] bg-[#FBF9F5] p-6 sm:p-8 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1b3d18] text-white text-xs font-bold font-mono mb-5">
                    {step.number}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#1b3d18] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1b3d18]/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. BOTTOM CTA BANNER ── */}
      <section className="border-b border-[#e5e2db] bg-white py-16 sm:py-24 text-center overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black">
              Take control of your money,{" "}
              <span className="font-serif italic font-normal text-transparent [-webkit-text-stroke:1.2px_#1b3d18]">
                starting today.
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base text-[#1b3d18]/75">
              Join thousands of young adults building clarity and confidence with Budgexa.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-full bg-[#F5824A] hover:bg-[#d96a34] px-8 py-3.5 text-sm font-bold text-white shadow-sm transition-all active:scale-[0.99]"
              >
                <span>Start 30-Day Free Trial</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <p className="mt-4 text-[11px] text-[#1b3d18]/50">
              No credit card required • Instant access • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

