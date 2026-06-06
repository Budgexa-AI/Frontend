"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  ChevronRight,
  CircleDollarSign,
  PiggyBank,
  Plus,
  Wallet,
  X,
} from "lucide-react";

const defaultCategories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
];

const goals = [
  "Emergency Fund",
  "Vacation",
  "Rent",
  "Car",
  "Business",
  "School Fees",
];

export default function FinancialSetupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const level = searchParams.get("level") ?? "Beginner";
  const method = searchParams.get("method") ?? "50/30/20";
  const [selectedIncome, setSelectedIncome] =
    useState<string>("Salary");

  const [customIncome, setCustomIncome] = useState("");

  const [categories, setCategories] =
    useState(defaultCategories);

  const [customCategory, setCustomCategory] =
    useState("");

  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    "Emergency Fund",
  ]);

  const addCategory = () => {
    if (!customCategory.trim()) return;

    setCategories((prev) => [...prev, customCategory]);

    setCustomCategory("");
  };

  const removeCategory = (name: string) => {
    setCategories((prev) =>
      prev.filter((item) => item !== name)
    );
  };

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals((prev) =>
        prev.filter((item) => item !== goal)
      );
    } else {
      setSelectedGoals((prev) => [...prev, goal]);
    }
  };

  return (
    <main className="min-h-screen bg-rayo-beige px-6 py-8 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* TOP */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/product/onboarding/recommendation"
            className="inline-flex items-center gap-2 text-sm font-medium text-rayo-green/70 transition-colors hover:text-rayo-green"
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          <div className="rounded-full border border-rayo-green/10 bg-white px-4 py-2 text-sm font-medium text-rayo-green shadow-sm">
            Step 4 of 4
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mb-12">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-rayo-green/70">
              Initial financial setup
            </p>

            <p className="text-sm text-rayo-green/50">
              100%
            </p>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-rayo-green/10">
            <div className="h-full w-full rounded-full bg-rayo-green" />
          </div>
        </div>

        {/* HERO */}
        <div className="mb-10 max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-rayo-green md:text-5xl">
            Let’s finish setting up your workspace.
          </h1>

          <p className="mt-5 text-base leading-relaxed text-rayo-green/70 md:text-lg">
            These details help personalize your budgeting,
            savings goals, and financial insights.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* CURRENCY */}
            <section className="rounded-[32px] border border-rayo-green/5 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rayo-green/5 text-rayo-green">
                  <CircleDollarSign size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-rayo-green">
                    Currency
                  </h2>

                  <p className="text-sm text-rayo-green/60">
                    Your default financial currency
                  </p>
                </div>
              </div>

              <button className="flex h-14 w-full items-center justify-between rounded-2xl border border-rayo-green/10 px-5 text-left transition-all hover:border-rayo-green/20">
                <div>
                  <p className="font-medium text-rayo-green">
                    Nigerian Naira
                  </p>

                  <p className="text-sm text-rayo-green/50">
                    ₦ NGN
                  </p>
                </div>
              </button>
            </section>

            {/* INCOME */}
            <section className="rounded-[32px] border border-rayo-green/5 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rayo-green/5 text-rayo-green">
                  <Briefcase size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-rayo-green">
                    Income Source
                  </h2>

                  <p className="text-sm text-rayo-green/60">
                    Choose your primary source of income
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {["Salary", "Business", "Freelance", "Multiple Sources"].map((item) => {
                  const active = selectedIncome === item;

                  return (
                    <button
                      key={item}
                      onClick={() => {
                        setSelectedIncome(item);
                        setCustomIncome("");
                      }}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        active
                          ? "border-rayo-green bg-rayo-green text-white"
                          : "border-rayo-green/10 hover:border-rayo-green/20"
                      }`}
                    >
                      <p className="font-medium">{item}</p>
                    </button>
                  );
                })}

                {/* Other — Styled to look like a selected button when active */}
                {selectedIncome === "Other" ? (
                  <input
                    value={customIncome}
                    onChange={(e) => setCustomIncome(e.target.value)}
                    placeholder="Describe your income source"
                    autoFocus
                    className="col-span-1 h-full min-h-[56px] rounded-2xl border border-rayo-green bg-rayo-green px-4 font-medium text-white outline-none transition-all placeholder:text-white/60 active:bg-grey focus:ring-2 focus:ring-rayo-green/50 sm:col-span-2"
                  />
                ) : (
                  <button
                    onClick={() => setSelectedIncome("Other")}
                    className="rounded-2xl border border-rayo-green/10 p-4 text-left transition-all hover:border-rayo-green/20"
                  >
                    <p className="font-medium text-rayo-green">Other</p>
                  </button>
                )}
              </div>
            </section>

            {/* GOALS */}
            <section className="rounded-[32px] border border-rayo-green/5 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rayo-green/5 text-rayo-green">
                  <PiggyBank size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-rayo-green">
                    Savings Goals
                  </h2>

                  <p className="text-sm text-rayo-green/60">
                    Select what you want to work toward
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {goals.map((goal) => {
                  const active =
                    selectedGoals.includes(goal);

                  return (
                    <button
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-all ${
                        active
                          ? "bg-rayo-green text-white"
                          : "bg-rayo-beige/70 text-rayo-green hover:bg-rayo-green/10"
                      }`}
                    >
                      {active && <Check size={14} />}
                      {goal}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* CATEGORIES */}
            <section className="rounded-[32px] border border-rayo-green/5 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rayo-green/5 text-rayo-green">
                  <Wallet size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-rayo-green">
                    Expense Categories
                  </h2>

                  <p className="text-sm text-rayo-green/60">
                    Customize how your spending is organized
                  </p>
                </div>
              </div>

              {/* INPUT */}
              <div className="mb-5 flex flex-col gap-3 sm:flex-row">
                <input
                  value={customCategory}
                  onChange={(e) =>
                    setCustomCategory(e.target.value)
                  }
                  placeholder="Add a custom category"
                  className="h-14 w-full rounded-2xl border border-rayo-green/10 bg-rayo-green/[0.02] px-5 text-rayo-green outline-none transition-all placeholder:text-rayo-green/40 focus:border-rayo-green/30"
                />

                <button
                  onClick={addCategory}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-rayo-green px-6 text-sm font-medium text-white transition-all hover:bg-[#1D3F1B]"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>

              {/* CATEGORY TAGS */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="inline-flex items-center gap-2 rounded-full bg-rayo-beige/70 px-4 py-3 text-sm font-medium text-rayo-green"
                  >
                    {category}

                    <button
                      onClick={() =>
                        removeCategory(category)
                      }
                      className="text-rayo-green/50 transition-colors hover:text-rayo-alert"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* PREVIEW */}
            <section className="rounded-[32px] border border-rayo-green/5 bg-rayo-green p-6 text-white shadow-sm">
              <div className="mb-8">
                <p className="text-sm uppercase tracking-wide text-white/50">
                  Workspace Preview
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  Your setup is ready
                </h2>
              </div>

              <div className="space-y-5">
                <PreviewRow label="Budgeting Style" value={method} />
                <PreviewRow label="Experience Level" value={level} />
                <PreviewRow label="Primary Income" value={selectedIncome === "Other" ? customIncome : selectedIncome} />
                <PreviewRow label="Goals Selected" value={`${selectedGoals.length} goals`} />
              </div>

              <div className="mt-8 rounded-2xl bg-white/10 p-4">
                <p className="text-sm leading-relaxed text-white/75">
                  Your dashboard, insights, and recommendations
                  will adapt based on this setup.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* FOOTER CTA */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            onClick={() => {
              const params = new URLSearchParams({
                level,
                method,
                income: selectedIncome === "Other" ? customIncome : selectedIncome,
                goals: selectedGoals.join(","),
                categories: categories.join(","),
              });
              router.push(`/product/onboarding/complete?${params.toString()}`);
            }}
            className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#254F22] px-7 text-base font-medium text-white transition-all hover:bg-[#1D3F1B]"
          >
            Finish Setup
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </main>
  );
}

function PreviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-4">
      <p className="text-sm text-white/60">
        {label}
      </p>

      <p className="font-medium">
        {value}
      </p>
    </div>
  );
}