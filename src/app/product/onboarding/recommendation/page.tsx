"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  PiggyBank,
  Sparkles,
  Target,
  Wallet,
} from "lucide-react";

const recommendations = [
  {
    id: "envelope",
    title: "Envelope Budgeting",
    subtitle: "Best for beginners",
    recommended: true,

    description:
      "Allocate money into spending categories so you always know how much is left for each part of your life.",

    reasons: [
      "Simple and easy to follow",
      "Reduces overspending",
      "Great for building discipline",
      "Visual and beginner-friendly",
    ],

    features: [
      "Category spending limits",
      "Rollover support",
      "Simple monthly planning",
    ],

    icon: Wallet,
  },

  {
    id: "50-30-20",
    title: "50 / 30 / 20",
    subtitle: "Balanced and flexible",

    description:
      "Split your income into needs, wants, and savings using a simple percentage-based framework.",

    reasons: [
      "Easy monthly structure",
      "Flexible budgeting",
      "Good balance of freedom and control",
    ],

    features: [
      "Automated allocations",
      "Flexible spending",
      "Savings-focused planning",
    ],

    icon: Target,
  },

  {
    id: "zero-based",
    title: "Zero-Based Budgeting",
    subtitle: "Detailed financial control",

    description:
      "Assign every naira a purpose before the month begins for maximum financial awareness and control.",

    reasons: [
      "Deep financial visibility",
      "Advanced planning",
      "Excellent for intentional spending",
    ],

    features: [
      "Detailed transaction planning",
      "Advanced tracking",
      "Precise cash flow control",
    ],

    icon: PiggyBank,
  },
];

export default function BudgetRecommendationPage() {
  const searchParams = useSearchParams();
  const level = searchParams.get("level") || "beginner";
  const [selectedMethod, setSelectedMethod] = useState("envelope");

  const levelLabel = useMemo(() => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  }, [level]);

  const setupHref = `/product/onboarding/setup?level=${encodeURIComponent(level)}&method=${encodeURIComponent(selectedMethod)}`;

  return (
    <main className="min-h-screen bg-[#EDE4CC] px-6 py-8 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* TOP */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/product/onboarding/welcome"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#254F22]/70 transition-colors hover:text-[#254F22]"
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          <div className="rounded-full border border-[#254F22]/10 bg-white px-4 py-2 text-sm font-medium text-[#254F22] shadow-sm">
            Step 3 of 4
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mb-12">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-[#254F22]/70">
              Budget recommendation
            </p>

            <p className="text-sm text-[#254F22]/50">
              75%
            </p>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#254F22]/10">
            <div className="h-full w-3/4 rounded-full bg-[#254F22]" />
          </div>
        </div>

        {/* HERO */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#254F22]/10 bg-white px-4 py-2 text-sm font-medium text-[#254F22] shadow-sm">
            <Sparkles size={16} className="text-[#F5824A]" />
            Personalized recommendation
          </div>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#254F22] md:text-5xl">
            We found a budgeting style that fits you.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#254F22]/70 md:text-lg">
            Based on your financial habits and experience level,
            we recommend starting with a system designed to help
            you stay consistent without feeling overwhelmed.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#254F22]/10 bg-white px-4 py-2 text-sm font-medium text-[#254F22] shadow-sm">
            <Sparkles size={16} className="text-[#F5824A]" />
            {levelLabel} profile detected
          </div>
        </div>

        {/* RECOMMENDATION GRID */}
        <div className="grid gap-6 lg:grid-cols-3">
          {recommendations.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col rounded-[32px] border bg-white p-6 shadow-sm transition-all ${
                  selectedMethod === item.id
                    ? "border-[#254F22] shadow-xl shadow-[#254F22]/5"
                    : "border-[#254F22]/5"
                }`}
              >
                {/* BADGE */}
                {(item.recommended || selectedMethod === item.id) && (
                  <div className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-[#254F22] px-3 py-1.5 text-xs font-medium text-white">
                    <BadgeCheck size={14} />
                    {item.recommended ? "Recommended" : "Selected"}
                  </div>
                )}

                {/* ICON */}
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-3xl ${
                    selectedMethod === item.id
                      ? "bg-[#254F22] text-white"
                      : "bg-[#254F22]/5 text-[#254F22]"
                  }`}
                >
                  <Icon size={26} />
                </div>

                {/* TITLE */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-[#F5824A]">
                    {item.subtitle}
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#254F22]">
                    {item.title}
                  </h2>

                  <p className="mt-4 text-sm leading-relaxed text-[#254F22]/65">
                    {item.description}
                  </p>
                </div>

                {/* WHY */}
                <div className="mb-6">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#254F22]/50">
                    Why this works for you
                  </h3>

                  <div className="space-y-3">
                    {item.reasons.map((reason) => (
                      <div
                        key={reason}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#254F22]/5 text-[#254F22]">
                          <Check size={12} />
                        </div>

                        <p className="text-sm text-[#254F22]/70">
                          {reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FEATURES */}
                <div className="mb-8 flex flex-wrap gap-2">
                  {item.features.map((feature) => (
                    <div
                      key={feature}
                      className="rounded-full bg-[#EDE4CC]/70 px-3 py-2 text-xs font-medium text-[#254F22]"
                    >
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                  <button
                    type="button"
                    onClick={() => setSelectedMethod(item.id)}
                  className={`group mt-auto inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-6 text-sm font-medium transition-all ${
                    selectedMethod === item.id
                      ? "bg-[#254F22] text-white hover:bg-[#1D3F1B]"
                      : "border border-[#254F22]/10 text-[#254F22] hover:border-[#254F22]/20 hover:bg-[#254F22]/5"
                  }`}
                >
                  {selectedMethod === item.id
                    ? "Selected"
                    : item.recommended
                      ? "Use Recommended Budget"
                      : "Choose This Method"}

                  <ChevronRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="mt-12 rounded-[32px] border border-[#254F22]/5 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-semibold tracking-tight text-[#254F22]">
                You can always change this later.
              </h3>

              <p className="mt-3 text-base leading-relaxed text-[#254F22]/65">
                Your budgeting system is flexible. As your financial
                habits improve, Rayo can adapt your experience and
                recommendations over time.
              </p>
            </div>

            <Link
              href={setupHref}
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#254F22] px-7 text-base font-medium text-white transition-all hover:bg-[#1D3F1B]"
            >
              Continue Setup

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}