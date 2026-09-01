"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
import {
  getCurrencySymbol,
} from "@/lib/utils";
import { defaultCurrencyForCountry, getCurrencyDefinition, SUPPORTED_COUNTRIES } from "@/lib/currency";

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

  const level = searchParams.get("level") || "beginner";
  const method = searchParams.get("method") || "envelope";

  const [selectedIncome, setSelectedIncome] =
    useState<string>("Salary");

  const [customIncomeSource, setCustomIncomeSource] =
    useState("");

  const [categories, setCategories] =
    useState(defaultCategories);

  const [customCategory, setCustomCategory] =
    useState("");

  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    "Emergency Fund",
  ]);

  // ── Country / currency ────────────────────────────────────
  const [countryCode, setCountryCode] = useState("NG");
  const [currencyCode, setCurrencyCode] = useState(
    defaultCurrencyForCountry("NG")
  );

  const countryOptions = useMemo(() => {
    const regionNames =
      typeof Intl !== "undefined" && "DisplayNames" in Intl
        ? new Intl.DisplayNames(["en"], { type: "region" })
        : null;

    return SUPPORTED_COUNTRIES.map((code: any) => ({
      code,
      name: regionNames?.of(code) ?? code,
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  function handleCountryChange(code: string) {
    setCountryCode(code);
    setCurrencyCode(defaultCurrencyForCountry(code));
  }

  const completionHref = useMemo(() => {
    const params = new URLSearchParams();
    const hasCustomIncomeSource = selectedIncome.toLowerCase() === "other";
    params.set("level", level);
    params.set("method", method);
    params.set(
      "incomeSource",
      hasCustomIncomeSource ? customIncomeSource.trim() || "Other" : selectedIncome
    );
    params.set(
      "financialGoals",
      selectedGoals.map((goal) => goal.replace(/\s+Fund$/i, "")).join(",")
    );
    params.set("categories", categories.join(","));
    params.set("country", countryCode);
    params.set("currency", currencyCode);

    return `/product/onboarding/complete?${params.toString()}`;
  }, [
    categories,
    customIncomeSource,
    level,
    method,
    selectedGoals,
    selectedIncome,
    countryCode,
    currencyCode,
  ]);

  const selectedIncomeDisplay = selectedIncome.toLowerCase() === "other"
    ? customIncomeSource.trim() || "Other"
    : selectedIncome;

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
            className="inline-flex items-center gap-2 text-sm font-medium text-Budgexa-green/70 transition-colors hover:text-Budgexa-green"
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          <div className="rounded-full border border-Budgexa-green/10 bg-white px-4 py-2 text-sm font-medium text-Budgexa-green shadow-sm">
            Step 4 of 4
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mb-12">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-Budgexa-green/70">
              Initial financial setup
            </p>

            <p className="text-sm text-Budgexa-green/50">
              100%
            </p>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-Budgexa-green/10">
            <div className="h-full w-full rounded-full bg-Budgexa-green" />
          </div>
        </div>

        {/* HERO */}
        <div className="mb-10 max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-Budgexa-green md:text-5xl">
            Let’s finish setting up your workspace.
          </h1>

          <p className="mt-5 text-base leading-relaxed text-Budgexa-green/70 md:text-lg">
            These details help personalize your budgeting,
            savings goals, and financial insights.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* CURRENCY */}
            <section className="rounded-[32px] border border-Budgexa-green/5 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-Budgexa-green/5 text-Budgexa-green">
                  <CircleDollarSign size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-Budgexa-green">
                    Country & Currency
                  </h2>

                  <p className="text-sm text-Budgexa-green/60">
                    We'll use this to set your default currency
                  </p>
                </div>
              </div>

              <div className="relative">
                <select
                  value={countryCode}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="h-14 w-full appearance-none rounded-2xl border border-Budgexa-green/10 bg-white px-5 pr-12 text-left font-medium text-Budgexa-green outline-none transition-all hover:border-Budgexa-green/20 focus:border-Budgexa-green/30"
                >
                  {countryOptions.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronRight
                  size={18}
                  className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-Budgexa-green/40"
                />
              </div>

              <p className="mt-3 text-sm text-Budgexa-green/50">
                {getCurrencyDefinition(currencyCode).name} · {getCurrencySymbol(currencyCode)} {currencyCode}
              </p>
            </section>

            {/* INCOME */}
            <section className="rounded-[32px] border border-Budgexa-green/5 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-Budgexa-green/5 text-Budgexa-green">
                  <Briefcase size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-Budgexa-green">
                    Income Source
                  </h2>

                  <p className="text-sm text-Budgexa-green/60">
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
                  "Other"
                ].map((item) => {
                  const active = selectedIncome === item;

                  return (
                    <button
                      key={item}
                      onClick={() => setSelectedIncome(item)}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        active
                          ? "border-Budgexa-green bg-Budgexa-green text-white"
                          : "border-Budgexa-green/10 hover:border-Budgexa-green/20"
                      }`}
                    >
                      <p className="font-medium">
                        {item}
                      </p>
                    </button>
                  );
                })}

                {selectedIncome === "Other" && (
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-Budgexa-green/70">
                      Write your income source
                    </label>

                    <input
                      value={customIncomeSource}
                      onChange={(e) => setCustomIncomeSource(e.target.value)}
                      placeholder="e.g. Allowance"
                      className="h-14 w-full rounded-2xl border border-Budgexa-green/10 bg-Budgexa-green/[0.02] px-5 text-Budgexa-green outline-none transition-all placeholder:text-Budgexa-green/40 focus:border-Budgexa-green/30"
                    />
                  </div>
                )}
              </div>
            </section>

            {/* GOALS */}
            <section className="rounded-[32px] border border-Budgexa-green/5 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-Budgexa-green/5 text-Budgexa-green">
                  <PiggyBank size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-Budgexa-green">
                    Savings Goals
                  </h2>

                  <p className="text-sm text-Budgexa-green/60">
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
                          ? "bg-Budgexa-green text-white"
                          : "bg-[#EDE4CC]/70 text-Budgexa-green hover:bg-Budgexa-green/10"
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
            <section className="rounded-[32px] border border-Budgexa-green/5 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-Budgexa-green/5 text-Budgexa-green">
                  <Wallet size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-Budgexa-green">
                    Expense Categories
                  </h2>

                  <p className="text-sm text-Budgexa-green/60">
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
                  className="h-14 w-full rounded-2xl border border-Budgexa-green/10 bg-Budgexa-green/[0.02] px-5 text-Budgexa-green outline-none transition-all placeholder:text-Budgexa-green/40 focus:border-Budgexa-green/30"
                />

                <button
                  onClick={addCategory}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-Budgexa-green px-6 text-sm font-medium text-white transition-all hover:bg-[#1D3F1B]"
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
                    className="inline-flex items-center gap-2 rounded-full bg-[#EDE4CC]/70 px-4 py-3 text-sm font-medium text-Budgexa-green"
                  >
                    {category}

                    <button
                      onClick={() =>
                        removeCategory(category)
                      }
                      className="text-Budgexa-green/50 transition-colors hover:text-[#A03A13]"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* PREVIEW */}
            <section className="rounded-[32px] border border-Budgexa-green/5 bg-Budgexa-green p-6 text-white shadow-sm">
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
                  label="Currency"
                  value={`${currencyCode} (${getCurrencySymbol(currencyCode)})`}
                />

                <PreviewRow
                  label="Primary Income"
                  value={selectedIncomeDisplay}
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
            href={completionHref}
            className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-Budgexa-green px-7 text-base font-medium text-white transition-all hover:bg-[#1D3F1B]"
          >
            Finish Setup

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <button
            onClick={() => router.push("/product/dashboard")}
            className="h-14 rounded-2xl px-6 text-sm font-medium text-Budgexa-green/60 transition-colors hover:text-Budgexa-green"
          >
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