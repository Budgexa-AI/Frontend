"use client";

import { useState } from "react";
import Link from "next/link";
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
  const [selectedIncome, setSelectedIncome] =
    useState<string>("Salary");

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
    <main className="min-h-screen bg-[#EDE4CC] px-6 py-8 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* TOP */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/product/onboarding/recommendation"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#254F22]/70 transition-colors hover:text-[#254F22]"
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          <div className="rounded-full border border-[#254F22]/10 bg-white px-4 py-2 text-sm font-medium text-[#254F22] shadow-sm">
            Step 4 of 4
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mb-12">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-[#254F22]/70">
              Initial financial setup
            </p>

            <p className="text-sm text-[#254F22]/50">
              100%
            </p>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[#254F22]/10">
            <div className="h-full w-full rounded-full bg-[#254F22]" />
          </div>
        </div>

        {/* HERO */}
        <div className="mb-10 max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#254F22] md:text-5xl">
            Let’s finish setting up your workspace.
          </h1>

          <p className="mt-5 text-base leading-relaxed text-[#254F22]/70 md:text-lg">
            These details help personalize your budgeting,
            savings goals, and financial insights.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* CURRENCY */}
            <section className="rounded-[32px] border border-[#254F22]/5 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#254F22]/5 text-[#254F22]">
                  <CircleDollarSign size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-[#254F22]">
                    Currency
                  </h2>

                  <p className="text-sm text-[#254F22]/60">
                    Your default financial currency
                  </p>
                </div>
              </div>

              <button className="flex h-14 w-full items-center justify-between rounded-2xl border border-[#254F22]/10 px-5 text-left transition-all hover:border-[#254F22]/20">
                <div>
                  <p className="font-medium text-[#254F22]">
                    Nigerian Naira
                  </p>

                  <p className="text-sm text-[#254F22]/50">
                    ₦ NGN
                  </p>
                </div>

                <ChevronRight
                  size={18}
                  className="text-[#254F22]/40"
                />
              </button>
            </section>

            {/* INCOME */}
            <section className="rounded-[32px] border border-[#254F22]/5 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#254F22]/5 text-[#254F22]">
                  <Briefcase size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-[#254F22]">
                    Income Source
                  </h2>

                  <p className="text-sm text-[#254F22]/60">
                    Choose your primary source of income
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Salary",
                  "Business",
                  "Freelance",
                  "Multiple Sources",
                ].map((item) => {
                  const active = selectedIncome === item;

                  return (
                    <button
                      key={item}
                      onClick={() => setSelectedIncome(item)}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        active
                          ? "border-[#254F22] bg-[#254F22] text-white"
                          : "border-[#254F22]/10 hover:border-[#254F22]/20"
                      }`}
                    >
                      <p className="font-medium">
                        {item}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* GOALS */}
            <section className="rounded-[32px] border border-[#254F22]/5 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#254F22]/5 text-[#254F22]">
                  <PiggyBank size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-[#254F22]">
                    Savings Goals
                  </h2>

                  <p className="text-sm text-[#254F22]/60">
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
                          ? "bg-[#254F22] text-white"
                          : "bg-[#EDE4CC]/70 text-[#254F22] hover:bg-[#254F22]/10"
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
            <section className="rounded-[32px] border border-[#254F22]/5 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#254F22]/5 text-[#254F22]">
                  <Wallet size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-[#254F22]">
                    Expense Categories
                  </h2>

                  <p className="text-sm text-[#254F22]/60">
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
                  className="h-14 w-full rounded-2xl border border-[#254F22]/10 bg-[#254F22]/[0.02] px-5 text-[#254F22] outline-none transition-all placeholder:text-[#254F22]/40 focus:border-[#254F22]/30"
                />

                <button
                  onClick={addCategory}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#254F22] px-6 text-sm font-medium text-white transition-all hover:bg-[#1D3F1B]"
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
                    className="inline-flex items-center gap-2 rounded-full bg-[#EDE4CC]/70 px-4 py-3 text-sm font-medium text-[#254F22]"
                  >
                    {category}

                    <button
                      onClick={() =>
                        removeCategory(category)
                      }
                      className="text-[#254F22]/50 transition-colors hover:text-[#A03A13]"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* PREVIEW */}
            <section className="rounded-[32px] border border-[#254F22]/5 bg-[#254F22] p-6 text-white shadow-sm">
              <div className="mb-8">
                <p className="text-sm uppercase tracking-wide text-white/50">
                  Workspace Preview
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  Your setup is ready
                </h2>
              </div>

              <div className="space-y-5">
                <PreviewRow
                  label="Budgeting Style"
                  value="Envelope Budgeting"
                />

                <PreviewRow
                  label="Experience Level"
                  value="Beginner"
                />

                <PreviewRow
                  label="Primary Income"
                  value={selectedIncome}
                />

                <PreviewRow
                  label="Goals Selected"
                  value={`${selectedGoals.length} goals`}
                />
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
          <Link
            href="/product/onboarding/complete"
            className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#254F22] px-7 text-base font-medium text-white transition-all hover:bg-[#1D3F1B]"
          >
            Finish Setup

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <button className="h-14 rounded-2xl px-6 text-sm font-medium text-[#254F22]/60 transition-colors hover:text-[#254F22]">
            Skip for now
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