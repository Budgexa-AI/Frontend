<<<<<<< HEAD
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
=======
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Check,
  ShieldCheck,
  Sparkles,
  Lock,
  Rocket,
  TrendingUp,
  FileText,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PhoneMockCard from "@/components/landing/MockCard";

type BillingPeriod = "monthly" | "yearly";

const TRIAL_DAYS = 30;

const TRUST_ITEMS = [
  { icon: Lock, label: "Bank-level\nencryption" },
  { icon: ShieldCheck, label: "Secure PayStack\npayments" },
  { icon: ShieldCheck, label: "Your financial\ndata is never sold" },
  { icon: Sparkles, label: "Trusted by\nstudents, graduates & young professionals" },
];

const PLAN = {
  name: "Budgexa",
  monthlyPrice: 3500,
  yearlyPrice: 30000,
  description: "Your personal AI financial assistant with forecasting and smart insights.",
  features: [
    "Unlimited expense tracking",
    "Unlimited savings goals",
    "Unlimited connected bank accounts",
    "AI spending pattern detection",
    "Predict future cash shortages",
    "AI savings recommendations",
    "Automatic transaction categorization",
    "Data export",
    "Priority support",
  ],
};

const TRIAL_STEPS = [
  {
    icon: Rocket,
    title: "Start free",
    description: "Sign up in less than a minute and get full access to all features.",
  },
  {
    icon: TrendingUp,
    title: "Explore & track",
    description: "Connect your accounts, set goals, and let Budgexa do the rest.",
  },
  {
    icon: ShieldCheck,
    title: "Decide what's next",
    description: "Continue with a plan that works for you. Cancel anytime.",
  },
];

// Scroll-reveal wrapper. Fades and lifts content into place once it enters
// the viewport, then leaves it alone.
function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
    >
      {children}
    </div>
  );
}

function MountFade({
  children,
  isMounted,
  delayMs = 0,
  className,
  from = "up",
}: {
  children: React.ReactNode;
  isMounted: boolean;
  delayMs?: number;
  className?: string;
  from?: "up" | "down";
}) {
  return (
    <div
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        isMounted
          ? "opacity-100 translate-y-0"
          : cn("opacity-0", from === "up" ? "translate-y-4" : "-translate-y-2"),
        className
      )}
    >
      {children}
    </div>
  );
}

// Small illustrative phone mockup — swap for a real product screenshot when ready.
function PhoneMockup({ isMounted }: { isMounted: boolean }) {
  return (
    <div
      className={cn(
        "relative mx-auto w-64 sm:w-72 transition-all duration-1000 ease-out motion-reduce:transition-none",
        isMounted ? "opacity-100 translate-y-0 rotate-2" : "opacity-0 translate-y-8 rotate-6"
      )}
    >
      {/* soft blob behind phone */}
      <div
        className="absolute -top-10 -right-10 h-72 w-72 bg-Budgexa-orange/10 blur-2xl"
        style={{ borderRadius: "62% 38% 55% 45% / 45% 55% 45% 55%" }}
      />

      {/* phone mockup */}
      <div className="flex justify-center lg:justify-end pt-12 mt-6 lg:mt-2">
        <PhoneMockCard />
      </div>

      {/* floating dot accent */}
      <div
        className={cn(
          "absolute -bottom-4 -left-4 h-6 w-6 rounded-full bg-Budgexa-orange shadow-lg transition-all duration-1000 delay-500 motion-reduce:transition-none",
          isMounted ? "opacity-100 scale-100" : "opacity-0 scale-0"
        )}
      />
    </div>
  );
}

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
        setIsMounted(true);
      }, 0);
  }, []);

  const price = billingPeriod === "monthly" ? PLAN.monthlyPrice : PLAN.yearlyPrice;

  return (
    <div className="min-h-screen bg-Budgexa-beige overflow-hidden">

      {/* HERO */}
      <section className="relative px-5 md:px-10 pt-8 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left">
            <MountFade isMounted={isMounted} from="down">
              <span className="inline-flex items-center gap-2 rounded-full border border-Budgexa-orange/20 bg-Budgexa-orange/10 px-4 py-2 text-sm font-medium text-Budgexa-orange mb-6">
                <Sparkles size={14} />
                {TRIAL_DAYS} days free, full access. No card required
              </span>
            </MountFade>

            <MountFade isMounted={isMounted} delayMs={100}>
              <h1 className="font-display text-4xl sm:text-5xl font-black text-Budgexa-green leading-[1.1] mb-5">
                Smarter money
                <span className="text-Budgexa-orange block">starts with clarity.</span>
              </h1>
            </MountFade>

            <MountFade isMounted={isMounted} delayMs={200}>
              <p className="text-Budgexa-green/60 text-base sm:text-lg mb-8 max-w-md mx-auto md:mx-0">
                Budgexa helps you understand spending habits, forecast future
                expenses, and make smarter financial decisions automatically.
              </p>
            </MountFade>

            <MountFade isMounted={isMounted} delayMs={300}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 max-w-md mx-auto md:mx-0">
                {TRUST_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-2 text-left">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-Budgexa-orange/10">
                        <Icon size={15} className="text-Budgexa-orange" />
                      </span>
                      <span className="text-xs text-Budgexa-green/60 whitespace-pre-line leading-snug pt-1">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </MountFade>
          </div>

          <PhoneMockup isMounted={isMounted} />
        </div>
      </section>

      {/* BILLING + PLAN CARD */}
      {isMounted && (
        <section className="px-5 md:px-10 pb-16">
          <div className="max-w-2xl mx-auto text-center">
            <MountFade isMounted={isMounted} delayMs={100}>
              <div className="inline-flex items-center gap-1 rounded-full bg-white border border-Budgexa-beige-dark p-1 mb-3">
                <button
                  onClick={() => setBillingPeriod("monthly")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    billingPeriod === "monthly"
                      ? "bg-Budgexa-green text-white"
                      : "text-Budgexa-green/50 hover:text-Budgexa-green"
                  )}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod("yearly")}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors flex items-center gap-2",
                    billingPeriod === "yearly"
                      ? "bg-Budgexa-green text-white"
                      : "text-Budgexa-green/50 hover:text-Budgexa-green"
                  )}
                >
                  Yearly
                  <span
                    className={cn(
                      "text-xs font-bold",
                      billingPeriod === "yearly" ? "text-Budgexa-orange" : "text-Budgexa-orange/60"
                    )}
                  >
                    Save 20%
                  </span>
                </button>
              </div>

              <p className="text-sm text-Budgexa-green/50 mb-8">
                Prices shown apply after your {TRIAL_DAYS}-day free trial ends.
              </p>
            </MountFade>

            <Reveal>
              <div className="relative rounded-3xl border border-Budgexa-beige-dark bg-white p-6 sm:p-8 shadow-xl transition-transform duration-300 hover:-translate-y-1 text-left">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-Budgexa-orange px-4 py-1 text-xs font-bold text-white">
                    {TRIAL_DAYS}-DAY FREE TRIAL
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-display text-xl font-bold text-Budgexa-green mb-2">
                      {PLAN.name}
                    </h3>
                    <p className="text-sm text-Budgexa-green/60 mb-6">{PLAN.description}</p>

                    <div className="flex items-end gap-1 mb-2">
                      <span className="text-4xl font-semibold text-Budgexa-green">
                        ₦{price.toLocaleString()}
                      </span>
                      <span className="text-Budgexa-green/50 mb-1 text-sm">
                        /{billingPeriod === "monthly" ? "mo" : "year"}
                      </span>
                    </div>

                    <p className="text-xs text-Budgexa-green/50 mb-6">
                      Free for the first {TRIAL_DAYS} days. Cancel anytime before your trial ends and you won't be charged.
                    </p>

                    <button className="w-full rounded-full py-3.5 font-semibold bg-Budgexa-orange text-white transition-all hover:bg-Budgexa-orange/90 hover:scale-[1.02] active:scale-[0.98]">
                      Start Your Free Trial
                    </button>
                    <p className="flex items-center justify-center gap-1.5 text-xs text-Budgexa-green/40 mt-3">
                      <Clock size={12} />
                      No card required
                    </p>
                  </div>

                  <div className="space-y-3">
                    {PLAN.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-Budgexa-orange">
                          <Check size={12} className="text-white" strokeWidth={3} />
                        </span>
                        <span className="text-sm text-Budgexa-green">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={150}>
              <div className="flex items-center justify-center gap-3 mt-8">
                <div className="flex -space-x-2">
                  {["#254F22", "#A03A13", "#F5824A"].map((color, i) => (
                    <span
                      key={i}
                      className="h-7 w-7 rounded-full border-2 border-Budgexa-beige"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-sm text-Budgexa-green/50">
                  Trusted by students and young professionals building smarter financial habits.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* HOW THE TRIAL WORKS */}
      <section className="px-5 md:px-10 pb-16">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-Budgexa-green mb-2">
              How your free trial works
            </h2>
            <p className="text-Budgexa-green/60">Full access from day one. No surprises when it ends.</p>
          </Reveal>

          <div className="relative grid gap-10 sm:grid-cols-3 text-center">
            {/* connecting line, desktop only */}
            <div className="hidden sm:block absolute top-8 left-[16.5%] right-[16.5%] border-t-2 border-dashed border-Budgexa-orange/30" />

            {TRIAL_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delayMs={idx * 150}>
                  <div className="relative flex flex-col items-center">
                    <div className="relative mb-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-Budgexa-orange/10">
                        <Icon size={26} className="text-Budgexa-orange" />
                      </div>
                      <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-Budgexa-orange text-xs font-bold text-white">
                        {idx + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-Budgexa-green mb-1.5">{step.title}</h3>
                    <p className="text-sm text-Budgexa-green/60 max-w-[220px]">{step.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="px-5 md:px-10 pb-16">
        <Reveal className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl bg-Budgexa-green px-6 sm:px-10 py-8">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <span className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                <FileText size={22} className="text-white" />
              </span>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                  Take control of your money.
                </h3>
                <p className="text-white/70 text-sm sm:text-base">
                  Start your {TRIAL_DAYS}-day free trial today.
                </p>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/auth/signup"
                className="inline-flex items-center justify-center rounded-full bg-Budgexa-orange px-7 py-3.5 font-semibold text-white transition-all hover:bg-Budgexa-orange/90 hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started Free
              </a>
              <p className="text-xs text-white/50 mt-2">No card required</p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
>>>>>>> origin/feat/receipt
