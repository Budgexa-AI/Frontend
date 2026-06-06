"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  PiggyBank,
  Sparkles,
  Target,
  Wallet,
} from "lucide-react";

export default function OnboardingCompletePage() {
  const searchParams = useSearchParams();

  // Extract values from the URL, providing fallbacks just in case
  const level = searchParams.get("level") || "Beginner";
  const methodRaw = searchParams.get("method") || "Envelope Budgeting";
  const goalsRaw = searchParams.get("goals") || "";
  
  // Clean up "50-30-20" into "50/30/20" for display
  const method = methodRaw.replace(/-/g, "/");
  
  // Calculate how many goals were passed in the comma-separated string
  const goalsCount = goalsRaw ? goalsRaw.split(",").length : 0;
  
  // Reconstruct the query string so the "Review setup" button remembers their data
  const queryString = searchParams.toString();

  return (
    <main className="flex min-h-screen items-center justify-center bg-rayo-beige px-6 py-10">
      <div className="w-full max-w-3xl">
        <div className="overflow-hidden rounded-[40px] border border-rayo-green/5 bg-white shadow-2xl shadow-rayo-green/5">
          {/* TOP SECTION */}
          <div className="relative overflow-hidden bg-rayo-green px-8 py-14 text-white md:px-12">
            {/* GLOW */}
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-rayo-orange/20 blur-3xl" />

            {/* CONTENT */}
            <div className="relative">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-[28px] bg-white/10 backdrop-blur-sm">
                <BadgeCheck size={42} />
              </div>

              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-white/60">
                Setup Complete
              </p>

              <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                Your financial workspace is ready.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                Your dashboard, budgeting system, and financial
                insights have been personalized based on your
                experience level and goals.
              </p>
            </div>
          </div>

          {/* BODY */}
          <div className="px-8 py-10 md:px-12">
            {/* SUMMARY */}
            <div className="grid gap-4 md:grid-cols-3">
              <SummaryCard
                icon={<Wallet size={22} />}
                title="Budgeting Style"
                value={method}
              />

              <SummaryCard
                icon={<Target size={22} />}
                title="Experience Level"
                value={level}
              />

              <SummaryCard
                icon={<PiggyBank size={22} />}
                title="Goals Added"
                value={`${goalsCount} Active Goal${goalsCount !== 1 ? 's' : ''}`}
              />
            </div>

            {/* INSIGHT */}
            <div className="mt-8 rounded-[28px] border border-rayo-orange/10 bg-rayo-orange/5 p-6">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-rayo-green shadow-sm">
                <Sparkles
                  size={16}
                  className="text-rayo-orange"
                />
                Smart Insight
              </div>

              <h2 className="text-2xl font-semibold tracking-tight text-rayo-green">
                We’ll help you build consistency first.
              </h2>

              <p className="mt-3 max-w-2xl text-base leading-relaxed text-rayo-green/70">
                Your workspace is optimized to reduce overwhelm
                while helping you improve your budgeting and
                savings habits gradually over time.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/product/dashboard"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-rayo-green px-7 text-base font-medium text-white transition-all hover:bg-[#1D3F1B]"
              >
                Go to Dashboard

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link 
                // Pass the query string back so the previous page retains their choices
                href={`/product/onboarding/setup${queryString ? `?${queryString}` : ''}`}
                className="inline-flex h-14 items-center justify-center rounded-2xl px-6 text-base font-medium text-rayo-green/60 transition-all hover:bg-rayo-green/5 hover:text-rayo-green"
              >
                Review setup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function SummaryCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-[28px] border border-rayo-green/5 bg-rayo-green/[0.02] p-5">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-rayo-green/5 text-rayo-green">
        {icon}
      </div>

      <p className="text-sm text-rayo-green/50">
        {title}
      </p>

      <h3 className="mt-2 text-lg font-semibold text-rayo-green">
        {value}
      </h3>
    </div>
  );
}