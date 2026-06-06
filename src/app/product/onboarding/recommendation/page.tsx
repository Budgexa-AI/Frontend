"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
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
    forLevel: "Intermidate",
    description:
      "Allocate money into spending categories so you always know how much is left for each part of your life.",
    reasons: [
      "Simple and easy to follow",
      "Reduces overspending",
      "Great for building discipline",
      "Visual and beginner-friendly",
    ],
    features: ["Category spending limits", "Rollover support", "Simple monthly planning"],
    icon: Wallet,
  },
  {
    id: "50-30-20",
    title: "50 / 30 / 20",
    subtitle: "Balanced and flexible",
    forLevel: "Beginner",
    description:
      "Split your income into needs, wants, and savings using a simple percentage-based framework.",
    reasons: [
      "Easy monthly structure",
      "Flexible budgeting",
      "Good balance of freedom and control",
    ],
    features: ["Automated allocations", "Flexible spending", "Savings-focused planning"],
    icon: Target,
  },
  {
    id: "zero-based",
    title: "Zero-Based Budgeting",
    subtitle: "Detailed financial control",
    forLevel: "Advanced",
    description:
      "Assign every naira a purpose before the month begins for maximum financial awareness and control.",
    reasons: [
      "Deep financial visibility",
      "Advanced planning",
      "Excellent for intentional spending",
    ],
    features: ["Detailed transaction planning", "Advanced tracking", "Precise cash flow control"],
    icon: PiggyBank,
  },
];

function getLevel(score: number): string {
  if (score <= 6) return "Beginner";
  if (score <= 11) return "Intermediate";
  return "Advanced";
}

function BudgetRecommendationContent() {
  const searchParams = useSearchParams();
  const score = Number(searchParams.get("score") ?? 0);
  const level = getLevel(score);

  // Sort so the recommended one always appears first
  const sorted = [...recommendations].sort((a, b) => {
    if (a.forLevel === level) return -1;
    if (b.forLevel === level) return 1;
    return 0;
  });

  return (
    <main className="min-h-screen bg-rayo-beige px-6 py-8 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* TOP */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/product/onboarding/quiz"
            className="inline-flex items-center gap-2 text-sm font-medium text-rayo-green/70 transition-colors hover:text-rayo-green"
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          <div className="rounded-full border border-rayo-green/10 bg-white px-4 py-2 text-sm font-medium text-rayo-green shadow-sm">
            Step 3 of 4
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mb-12">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-rayo-green/70">
              Budget recommendation
            </p>
            <p className="text-sm text-rayo-green/50">75%</p>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-rayo-green/10">
            <div className="h-full w-3/4 rounded-full bg-rayo-green" />
          </div>
        </div>

        {/* HERO */}
        <div className="mb-12 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rayo-green/10 bg-white px-4 py-2 text-sm font-medium text-rayo-green shadow-sm">
            <Sparkles size={16} className="text-[#F5824A]" />
            Personalized for {level} level
          </div>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-rayo-green md:text-5xl">
            We found a budgeting style that fits you.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-rayo-green/70 md:text-lg">
            Based on your financial habits and experience level, we recommend
            starting with a system designed to help you stay consistent without
            feeling overwhelmed.
          </p>
        </div>

        {/* RECOMMENDATION GRID */}
        <div className="grid gap-6 lg:grid-cols-3">
          {sorted.map((item) => {
            const Icon = item.icon;
            const isRecommended = item.forLevel === level;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col rounded-[32px] border bg-white p-6 shadow-sm transition-all ${
                  isRecommended
                    ? "border-rayo-green shadow-xl shadow-rayo-green/5"
                    : "border-rayo-green/5"
                }`}
              >
                {/* BADGE */}
                {isRecommended && (
                  <div className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-rayo-green px-3 py-1.5 text-xs font-medium text-white">
                    <BadgeCheck size={14} />
                    Recommended
                  </div>
                )}

                {/* ICON */}
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-3xl ${
                    isRecommended
                      ? "bg-rayo-green text-white"
                      : "bg-rayo-green/5 text-rayo-green"
                  }`}
                >
                  <Icon size={26} />
                </div>

                {/* TITLE */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-rayo-orange">{item.subtitle}</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-rayo-green">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-rayo-green/65">
                    {item.description}
                  </p>
                </div>

                {/* WHY */}
                <div className="mb-6">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-rayo-green/50">
                    Why this works for you
                  </h3>
                  <div className="space-y-3">
                    {item.reasons.map((reason) => (
                      <div key={reason} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-rayo-green/5 text-rayo-green">
                          <Check size={12} />
                        </div>
                        <p className="text-sm text-rayo-green/70">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FEATURES */}
                <div className="mb-8 flex flex-wrap gap-2">
                  {item.features.map((feature) => (
                    <div
                      key={feature}
                      className="rounded-full bg-rayo-beige/70 px-3 py-2 text-xs font-medium text-rayo-green"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="mt-12 rounded-[32px] border border-rayo-green/5 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-semibold tracking-tight text-rayo-green">
                You can always change this later.
              </h3>
              <p className="mt-3 text-base leading-relaxed text-rayo-green/65">
                Your budgeting system is flexible. As your financial habits
                improve, Rayo can adapt your experience and recommendations
                over time.
              </p>
            </div>

            <Link
              href={`/product/onboarding/setup?budget=${level.toLowerCase()}&method=${
                sorted.find((r) => r.forLevel === level)?.id
              }`}
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-rayo-green px-7 text-base font-medium text-white transition-all hover:bg-[#1D3F1B]"
            >
              Use Recommended Budget
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

// useSearchParams requires Suspense when used in a page component
export default function BudgetRecommendationPage() {
  return (
    <Suspense>
      <BudgetRecommendationContent />
    </Suspense>
  );
}