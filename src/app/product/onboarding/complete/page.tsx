"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  PiggyBank,
  Sparkles,
  Target,
  Wallet,
} from "lucide-react";

export default function OnboardingCompletePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EDE4CC] px-6 py-10">
      <div className="w-full max-w-3xl">
        <div className="overflow-hidden rounded-[40px] border border-[#254F22]/5 bg-white shadow-2xl shadow-[#254F22]/5">
          {/* TOP SECTION */}
          <div className="relative overflow-hidden bg-[#254F22] px-8 py-14 text-white md:px-12">
            {/* GLOW */}
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#F5824A]/20 blur-3xl" />

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
                value="Envelope Budgeting"
              />

              <SummaryCard
                icon={<Target size={22} />}
                title="Experience Level"
                value="Beginner"
              />

              <SummaryCard
                icon={<PiggyBank size={22} />}
                title="Goals Added"
                value="3 Active Goals"
              />
            </div>

            {/* INSIGHT */}
            <div className="mt-8 rounded-[28px] border border-[#F5824A]/10 bg-[#F5824A]/5 p-6">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#254F22] shadow-sm">
                <Sparkles
                  size={16}
                  className="text-[#F5824A]"
                />
                Smart Insight
              </div>

              <h2 className="text-2xl font-semibold tracking-tight text-[#254F22]">
                We’ll help you build consistency first.
              </h2>

              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#254F22]/70">
                Your workspace is optimized to reduce overwhelm
                while helping you improve your budgeting and
                savings habits gradually over time.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/product/dashboard"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#254F22] px-7 text-base font-medium text-white transition-all hover:bg-[#1D3F1B]"
              >
                Go to Dashboard

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <button className="h-14 rounded-2xl px-6 text-sm font-medium text-[#254F22]/60 transition-colors hover:text-[#254F22]">
                Review setup
              </button>
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
    <div className="rounded-[28px] border border-[#254F22]/5 bg-[#254F22]/[0.02] p-5">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#254F22]/5 text-[#254F22]">
        {icon}
      </div>

      <p className="text-sm text-[#254F22]/50">
        {title}
      </p>

      <h3 className="mt-2 text-lg font-semibold text-[#254F22]">
        {value}
      </h3>
    </div>
  );
}