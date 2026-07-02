"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  PiggyBank,
  Sparkles,
  Loader2,
  Target,
  Wallet,
} from "lucide-react";
import { completeOnboarding } from "@/lib/api-client/src/client";

const METHOD_LABELS: Record<string, string> = {
  envelope: "Envelope Budgeting",
  "50-30-20": "50 / 30 / 20",
  "zero-based": "Zero-Based Budgeting",
};

const BACKEND_METHODS: Record<string, string> = {
  envelope: "envelope",
  "50-30-20": "50/30/20",
  "50/30/20": "50/30/20",
  "zero-based": "zero-based",
  other: "other",
};

const BACKEND_LEVELS: Record<string, string> = {
  beginer: "beginner",
  beginner: "beginner",
  intermediate: "intermediate",
  expert: "expert",
  advanced: "expert",
};

export default function OnboardingCompletePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const level = searchParams.get("level") || "beginner";
  const method = searchParams.get("method") || "envelope";
  const incomeSource = searchParams.get("incomeSource") || "Salary";

  const financialGoals = useMemo(
    () =>
      (searchParams.get("financialGoals") || searchParams.get("goals") || "")
        .split(",")
        .map((goal) => goal.trim())
        .filter(Boolean),
    [searchParams]
  );

  const categories = useMemo(
    () =>
      (searchParams.get("categories") || "Food")
        .split(",")
        .map((category) => category.trim())
        .filter(Boolean),
    [searchParams]
  );

  const methodLabel = useMemo(() => {
    if (METHOD_LABELS[method]) return METHOD_LABELS[method];
    return method
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join(" ");
  }, [method]);
  const normalizedMethodForBackend = BACKEND_METHODS[method] ?? method;
  const normalizedLevelForBackend = BACKEND_LEVELS[level] ?? level;

  const levelLabel = useMemo(() => level[0].toUpperCase() + level.slice(1), [level]);

  async function handleComplete() {
    setSaving(true);
    setError(null);

    try {
      await completeOnboarding({
        level: normalizedLevelForBackend,
        method: normalizedMethodForBackend,
        incomeSource,
        financialGoals,
        categories,
      });

      router.push("/product/dashboard");
    } catch (err: any) {
      setError(err?.message || "Failed to save onboarding data.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-rayo-beige px-6 py-8 md:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:items-center">
        <div className="w-full max-w-2xl">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rayo-green text-white shadow-sm">
              <Wallet size={22} />
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight text-rayo-green">Rayo</h2>
              <p className="text-sm text-rayo-green/60">Personal finance made simple</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-rayo-green/10 bg-white px-4 py-2 text-sm font-medium text-rayo-green shadow-sm">
                <BadgeCheck size={16} className="text-[#F5824A]" />
                Setup complete
              </div>

              <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-rayo-green md:text-5xl">
                Your financial workspace is ready.
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-rayo-green/70 md:text-lg">
                We’ve personalized your dashboard using your level, budgeting style, income source, goals, and categories.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <SummaryCard icon={<Wallet size={22} />} title="Budgeting Style" value={methodLabel} />
              <SummaryCard icon={<Target size={22} />} title="Experience Level" value={levelLabel} />
              <SummaryCard icon={<PiggyBank size={22} />} title="Income Source" value={incomeSource} />
              <SummaryCard icon={<Sparkles size={22} />} title="Goals Added" value={`${financialGoals.length} Active Goal${financialGoals.length !== 1 ? "s" : ""}`} />
            </div>

            <div className="space-y-4 pt-2">
              <div className="rounded-2xl border border-rayo-green/5 bg-white/70 p-4 backdrop-blur-sm">
                <p className="text-sm font-medium text-rayo-green">Selected goals</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {financialGoals.map((goal) => (
                    <span key={goal} className="rounded-full bg-rayo-beige/70 px-3 py-2 text-xs font-medium text-rayo-green">{goal}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-rayo-green/5 bg-white/70 p-4 backdrop-blur-sm">
                <p className="text-sm font-medium text-rayo-green">Categories</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <span key={category} className="rounded-full bg-white px-3 py-2 text-xs font-medium text-rayo-green shadow-sm">{category}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-rayo-green p-5 text-white">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#F5824A]" />
                <p className="text-sm font-medium">Smart Insight</p>
              </div>

              <p className="text-sm leading-relaxed text-white/80">
                Your onboarding choices are now ready to power personalized budgets and recommendations.
              </p>
            </div>

            {error && <p className="text-sm text-[#A03A13]">{error}</p>}

            <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleComplete}
                disabled={saving}
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-rayo-green px-7 text-base font-medium text-white transition-all hover:bg-[#1D3F1B] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : "Finish Setup"}
                {!saving && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
              </button>

              <button
                type="button"
                onClick={() => router.push("/product/dashboard")}
                className="inline-flex h-14 items-center justify-center rounded-2xl px-6 text-base font-medium text-rayo-green/60 transition-all hover:bg-rayo-green/5 hover:text-rayo-green"
              >
                Skip onboarding
              </button>
            </div>
          </div>
        </div>

        <div className="relative flex w-full max-w-xl items-center justify-center">
          <div className="absolute h-72 w-72 rounded-full bg-[#F5824A]/10 blur-3xl" />

          <div className="relative w-full rounded-[32px] border border-rayo-green/5 bg-white p-6 shadow-xl shadow-rayo-green/5">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm text-rayo-green/50">Onboarding Snapshot</p>
                <h3 className="mt-1 text-3xl font-semibold tracking-tight text-rayo-green">Ready to launch</h3>
              </div>

              <div className="rounded-2xl bg-[#F5824A]/10 px-4 py-2 text-sm font-medium text-[#F5824A]">Complete</div>
            </div>

            <div className="mb-6 rounded-3xl bg-rayo-beige/60 p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-rayo-green">Profile</p>
                <p className="text-sm text-rayo-green/60">{levelLabel}</p>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white">
                <div className="h-full w-full rounded-full bg-rayo-green" />
              </div>

              <p className="mt-3 text-sm text-rayo-green/60">
                Your onboarding data will be sent to the backend before you reach the dashboard.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { label: "Budgeting style", value: methodLabel },
                { label: "Income source", value: incomeSource },
                { label: "Goals", value: financialGoals.join(", ") || "None" },
                { label: "Categories", value: categories.join(", ") || "None" },
              ].map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4 rounded-2xl border border-rayo-green/5 bg-rayo-green/[0.02] p-4">
                  <p className="text-sm text-rayo-green/50">{row.label}</p>
                  <p className="max-w-[60%] text-right text-sm font-medium text-rayo-green">{row.value}</p>
                </div>
              ))}
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