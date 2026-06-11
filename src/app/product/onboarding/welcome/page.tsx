"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
  Wallet,
} from "lucide-react";

export default function WelcomeSetupPage() {
  return (
    <main className="min-h-screen bg-[#EDE4CC] px-6 py-8 md:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:items-center">
        {/* LEFT CONTENT */}
        <div className="w-full max-w-2xl">
          {/* LOGO */}
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#254F22] text-white shadow-sm">
                <Wallet size={22} />
              </div>

              <div>
                <h2 className="text-xl font-semibold tracking-tight text-[#254F22]">
                  Rayo
                </h2>

                <p className="text-sm text-[#254F22]/60">
                  Personal finance made simple
                </p>
              </div>
            </div>
          </div>

          {/* PROGRESS */}
          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-[#254F22]/70">
                Step 1 of 4
              </p>

              <p className="text-sm text-[#254F22]/50">
                Takes about 2 minutes
              </p>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-[#254F22]/10">
              <div className="h-full w-1/4 rounded-full bg-[#254F22]" />
            </div>
          </div>

          {/* HEADLINE */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#254F22]/10 bg-white px-4 py-2 text-sm font-medium text-[#254F22] shadow-sm">
                <Sparkles size={16} className="text-[#F5824A]" />
                Personalized onboarding
              </div>

              <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-[#254F22] md:text-5xl">
                Let’s build your financial workspace.
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-[#254F22]/70 md:text-lg">
                We’ll personalize your dashboard, budgeting style,
                and financial insights based on your habits,
                goals, and experience level.
              </p>
            </div>

            {/* BENEFITS */}
            <div className="space-y-4 pt-2">
              <BenefitItem
                icon={<Target size={18} />}
                title="Personalized budgeting"
                description="Get a budgeting system recommended specifically for you."
              />

              <BenefitItem
                icon={<Sparkles size={18} />}
                title="Smarter insights"
                description="Receive tips and financial guidance tailored to your level."
              />

              <BenefitItem
                icon={<CheckCircle2 size={18} />}
                title="Less complexity"
                description="Beginners get simpler guidance while advanced users unlock deeper analytics."
              />
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center">
              <Link
                href="/product/onboarding/quiz"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#254F22] px-7 text-base font-medium text-white transition-all hover:bg-[#1D3F1B]"
              >
                Personalize My Workspace

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative flex w-full max-w-xl items-center justify-center">
          {/* BACKGROUND BLUR */}
          <div className="absolute h-72 w-72 rounded-full bg-[#F5824A]/10 blur-3xl" />

          {/* MAIN CARD */}
          <div className="relative w-full rounded-[32px] border border-[#254F22]/5 bg-white p-6 shadow-xl shadow-[#254F22]/5">
            {/* TOP */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm text-[#254F22]/50">
                  Monthly Budget Health
                </p>

                <h3 className="mt-1 text-3xl font-semibold tracking-tight text-[#254F22]">
                  82%
                </h3>
              </div>

              <div className="rounded-2xl bg-[#F5824A]/10 px-4 py-2 text-sm font-medium text-[#F5824A]">
                On Track
              </div>
            </div>

            {/* SAVINGS */}
            <div className="mb-6 rounded-3xl bg-[#EDE4CC]/60 p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-[#254F22]">
                  Emergency Fund
                </p>

                <p className="text-sm text-[#254F22]/60">
                  ₦340,000 / ₦500,000
                </p>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white">
                <div className="h-full w-[68%] rounded-full bg-[#254F22]" />
              </div>

              <p className="mt-3 text-sm text-[#254F22]/60">
                You’re making consistent progress this month.
              </p>
            </div>

            {/* SPENDING */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-[#254F22]/50">
                Spending Breakdown
              </h4>

              <SpendRow
                label="Food"
                width="75%"
                amount="₦82,000"
              />

              <SpendRow
                label="Transport"
                width="45%"
                amount="₦38,000"
              />

              <SpendRow
                label="Shopping"
                width="30%"
                amount="₦20,000"
              />
            </div>

            {/* AI INSIGHT */}
            <div className="mt-8 rounded-3xl border border-[#254F22]/5 bg-[#254F22] p-5 text-white">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F5824A]" />

                <p className="text-sm font-medium">
                  Smart Insight
                </p>
              </div>

              <p className="text-sm leading-relaxed text-white/80">
                Your discretionary spending has reduced by 12%
                compared to last month. You’re building healthier
                spending habits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function BenefitItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-[#254F22]/5 bg-white/70 p-4 backdrop-blur-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#254F22]/5 text-[#254F22]">
        {icon}
      </div>

      <div>
        <h3 className="font-medium text-[#254F22]">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-relaxed text-[#254F22]/60">
          {description}
        </p>
      </div>
    </div>
  );
}

function SpendRow({
  label,
  width,
  amount,
}: {
  label: string;
  width: string;
  amount: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-[#254F22]">
          {label}
        </p>

        <p className="text-sm text-[#254F22]/60">
          {amount}
        </p>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-[#254F22]/10">
        <div
          className="h-full rounded-full bg-[#254F22]"
          style={{ width }}
        />
      </div>
    </div>
  );
}