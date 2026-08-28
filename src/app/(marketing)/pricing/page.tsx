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