"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import BillingToggle from "@/components/pricing/BillingToggle";

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
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

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

      {/* ── 2. UNIFIED PAYMENT PLAN SECTION WITH SMOOTH BILLING TOGGLE ── */}
      <section id="plans" className="scroll-mt-16 border-b border-[#e5e2db] bg-[#F7F5EE] min-h-[calc(100dvh-4rem)] flex flex-col justify-center py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d9d6cf] bg-white px-3.5 py-1 mb-3 shadow-2xs">
              <Sparkles size={11} className="text-[#F5824A]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1b3d18]">
                Transparent Pricing
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black">
              Everything you need. <span className="text-[#1b3d18]">One simple plan.</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#1b3d18]/70 leading-relaxed max-w-lg mx-auto">
              Every subscription includes all features and begins with a 30-day free trial. No credit card required upfront. Cancel anytime with zero fees.
            </p>

            {/* Smooth animated Pill Toggle Switch */}
            <div className="mt-8 flex justify-center">
              <BillingToggle billing={billing} onChange={setBilling} />
            </div>
          </div>

          {/* Unified Single Plan Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative rounded-3xl bg-white p-7 sm:p-9 lg:p-12 shadow-xl border border-[#e5e2db] max-w-4xl mx-auto overflow-hidden"
          >
            {/* Ambient accent background glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#F5824A]/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#1b3d18]/5 blur-3xl"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[46%_54%] gap-8 lg:gap-12 items-center">
              {/* Left Column: Plan Details, Dynamic Price, CTA */}
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="rounded-full bg-[#1b3d18]/8 px-3 py-1 text-[10.5px] font-bold text-[#1b3d18] tracking-wider uppercase">
                      Full Access Membership
                    </span>
                    {billing === "yearly" && (
                      <span className="rounded-full bg-[#F5824A]/15 text-[#F5824A] px-2.5 py-0.5 text-[10.5px] font-bold tracking-wide animate-in fade-in">
                        2 Months Free
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1b3d18] tracking-tight">
                    Budgexa All-Access
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1b3d18]/70 mt-1.5 leading-relaxed">
                    Complete access to all intelligent budgeting tools, safe-to-spend forecasting, and personalized AI financial guidance.
                  </p>

                  {/* Dynamic Price Display */}
                  <div className="mt-6 pt-5 border-t border-[#f0eee6]">
                    <div className="flex items-baseline gap-2">
                      <motion.span
                        key={billing}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-sans text-4xl sm:text-5xl font-bold text-[#1b3d18] tracking-tight"
                      >
                        {billing === "monthly" ? "₦3,500" : "₦30,000"}
                      </motion.span>
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

                {/* CTA Button & Risk Reversal */}
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

              {/* Right Column: Included Benefits (Unified list) */}
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
          </motion.div>
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

