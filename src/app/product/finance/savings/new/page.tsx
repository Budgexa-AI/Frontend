"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  Calendar,
  Car,
  ChevronDown,
  Goal,
  HeartHandshake,
  Home,
  Info,
  Lock,
  MoreHorizontal,
  PiggyBank,
  Plane,
  Sparkles,
  Target,
  Wallet,
 Zap,
  Briefcase,
  GraduationCap,
  Loader2,
} from "lucide-react";

import { cn, formatCurrency } from "@/lib/utils";
import { createSavingsGoal } from "@/lib/api-client/src/client";
import { fetchCategories } from "@/lib/data-service";
import type { Category } from "@/lib/types/src";
import { useCurrentUser } from "@/hooks/useUser";

// ─────────────────────────────────────────────────────────────────────────────
// Goal Templates
// ─────────────────────────────────────────────────────────────────────────────

const GOAL_TYPES = [
  {
    id: "car",
    label: "Car",
    icon: Car,
  },
  {
    id: "home",
    label: "House",
    icon: Home,
  },
  {
    id: "travel",
    label: "Vacation",
    icon: Plane,
  },
  {
    id: "business",
    label: "Business",
    icon: Briefcase,
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
  },
  {
    id: "emergency",
    label: "Emergency",
    icon: HeartHandshake,
  },
];

const GOAL_TYPE_TO_SLUG: Record<string, string> = {
  car:       "transport",
  home:      "bills_utilities",
  travel:    "travel",
  business:  "business_income",
  education: "education",
  emergency: "savings_investment",
};

// Helpers

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(
    "en-NG",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

// Page

export default function CreateSavingsGoalPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const { profile } = useCurrentUser();
  const currency = profile?.currency ?? "NGN";

  const [selectedGoalType, setSelectedGoalType] =
    useState("car");

  const [goalName, setGoalName] =
    useState("New Car");

  const [goalDescription, setGoalDescription] =
    useState(
      "I want to buy a reliable car for daily commuting and road trips."
    );

  const [targetAmount, setTargetAmount] =
    useState(4000000);

  const [initialDeposit, setInitialDeposit] =
    useState(200000);

  const [targetDate, setTargetDate] =
    useState("2026-12-31");

  const [monthlyContribution, setMonthlyContribution] =
    useState(100000);

  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setCategoriesLoading(false));
  }, []);

  const selectedGoal = GOAL_TYPES.find(
    (g) => g.id === selectedGoalType
  );

  const selectedCategory = categoryId
    ? categories.find((category) => String(category.id) === categoryId)
    : null;

  const categoryDisplayLabel =
    selectedCategory?.name || categoryName.trim() || "Select a category";

  const Icon =
    selectedGoal?.icon || Goal;

  const monthsLeft = useMemo(() => {
    return Math.max(
      1,
      Math.round(
        (new Date(targetDate).getTime() -
          new Date().getTime()) /
          (1000 * 60 * 60 * 24 * 30)
      )
    );
  }, [targetDate]);

  const suggestedMonthly = Math.ceil(
    (targetAmount - initialDeposit) /
      monthsLeft
  );

  const remaining =
    targetAmount - initialDeposit;

  const progress = Math.round(
    (initialDeposit / targetAmount) *
      100
  );

  async function handleCreate() {
    setSubmitting(true);
    setError(null);
    setCategoryError(null);

    const trimmedCategoryName = categoryName.trim();
    const selectedCategoryId = categoryId ? Number(categoryId) : null;

    if (!selectedCategoryId && !trimmedCategoryName) {
      setCategoryError("Please select a category or enter a custom category name.");
      setSubmitting(false);
      return;
    }

    try {
      await createSavingsGoal({
        name:          goalName,
        targetAmount:  targetAmount,
        // Was missing entirely — the schema's `currentAmount` column defaults
        // to "0" if this isn't sent, so every goal silently started at zero
        // regardless of what was typed into "Initial Deposit" above.
        currentAmount: initialDeposit,
        deadline:      targetDate,           // already "YYYY-MM-DD"
        // No goalType selector exists in this UI yet (group/ajo logic isn't
        // built), so every goal created here is personal. Set it explicitly
        // rather than relying on the schema default, so this stays correct
        // even if a GROUP/AJO picker gets added later and someone forgets
        // to wire this field through.
        goalType:      "PERSONAL",
        ...(selectedCategoryId
          ? { categoryId: selectedCategoryId }
          : {
              categoryName: trimmedCategoryName,
              parentSlug: selectedGoalType === "emergency" ? "savings_investment" : GOAL_TYPE_TO_SLUG[selectedGoalType] ?? "savings_investment",
            }),
      });
      router.push("/product/finance/savings");
      router.refresh();
    } catch (e: any) {
      setError(e.message || "Failed to create goal");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[1450px] mx-auto px-4 md:px-6 py-5 md:py-7">
        {/* ───────────────── Card Container ───────────────── */}

        <div className="rounded-[32px] border border-[#E6ECE2] bg-white shadow-[0_10px_40px_rgba(15,23,42,0.03)] overflow-hidden">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px]">
            {/* ───────────────── LEFT ───────────────── */}

            <div className="p-5 md:p-7 border-b xl:border-b-0 xl:border-r border-[#EDF1EA]">
              {/* Header */}

              <a
                href="/product/finance/savings"
                className="inline-flex items-center gap-2 text-sm font-medium text-Budgexa-green/60 hover:text-Budgexa-green transition-colors"
              >
                <ArrowLeft size={15} />
                Back to Goals
              </a>

              <h1 className="mt-5 text-[28px] md:text-[32px] leading-none font-bold tracking-tight text-Budgexa-green">
                Create a New Savings Goal
              </h1>

              <p className="mt-2 text-sm text-Budgexa-green/50">
                Set a goal, track your progress,
                and achieve your dreams.
              </p>

              {/* Form Sections */}

              <div className="mt-8 space-y-7">
                {/* ───────────────── 1. Goal Details ───────────────── */}

                <section className="rounded-3xl border border-[#E8EDE5] bg-white p-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-Budgexa-green text-white flex items-center justify-center text-xs font-bold">
                      1
                    </div>

                    <h2 className="text-sm font-bold text-Budgexa-green">
                      Goal Details
                    </h2>
                  </div>

                  <div className="mt-5">
                    {/* Goal Name */}

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-Budgexa-green/45 mb-2">
                        Goal Name
                      </label>

                      <input
                        type="text"
                        value={goalName}
                        onChange={(e) =>
                          setGoalName(
                            e.target.value
                          )
                        }
                        className="w-full h-12 rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] px-4 text-sm text-Budgexa-green outline-none focus:border-Budgexa-green/30"
                      />
                    </div>

                    {/* Goal Icons */}

                    <div className="mt-5">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-Budgexa-green/45 mb-3">
                        Goal Icon
                      </label>

                      <div className="flex flex-wrap gap-2">
                        {GOAL_TYPES.map(
                          (goal) => {
                            const GoalIcon =
                              goal.icon;

                            const active =
                              selectedGoalType ===
                              goal.id;

                            return (
                              <button
                                key={goal.id}
                                onClick={() =>
                                  setSelectedGoalType(
                                    goal.id
                                  )
                                }
                                className={cn(
                                  "w-12 h-12 rounded-2xl border flex items-center justify-center transition-all",
                                  active
                                    ? "bg-Budgexa-green border-Budgexa-green text-white shadow-sm"
                                    : "bg-white border-[#E6ECE2] text-Budgexa-green/50 hover:border-Budgexa-green/25"
                                )}
                              >
                                <GoalIcon
                                  size={18}
                                />
                              </button>
                            );
                          }
                        )}

                        <button className="h-12 px-4 rounded-2xl border border-[#E6ECE2] text-Budgexa-green/50 text-xs font-medium flex items-center gap-2 hover:border-Budgexa-green/25">
                          <MoreHorizontal
                            size={14}
                          />
                          More
                        </button>
                      </div>
                    </div>

                    {/* Description */}

                    <div className="mt-5">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-Budgexa-green/45 mb-2">
                        Goal Description
                        (Optional)
                      </label>

                      <div className="relative">
                        <textarea
                          rows={4}
                          maxLength={120}
                          value={
                            goalDescription
                          }
                          onChange={(e) =>
                            setGoalDescription(
                              e.target.value
                            )
                          }
                          className="w-full rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] px-4 py-3 text-sm text-Budgexa-green outline-none resize-none focus:border-Budgexa-green/30"
                        />

                        <span className="absolute bottom-3 right-4 text-xs text-Budgexa-green/35">
                          {
                            goalDescription.length
                          }
                          /120
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ───────────────── 2. Target ───────────────── */}

                <section className="rounded-3xl border border-[#E8EDE5] bg-white p-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-Budgexa-green text-white flex items-center justify-center text-xs font-bold">
                      2
                    </div>

                    <h2 className="text-sm font-bold text-Budgexa-green">
                      Target
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    {/* Target Amount */}

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-Budgexa-green/45 mb-2">
                        Target Amount
                      </label>

                      <div className="relative">
                        <Wallet
                          size={15}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-Budgexa-green/30"
                        />

                        <input
                          type="number"
                          value={
                            targetAmount
                          }
                          onChange={(e) =>
                            setTargetAmount(
                              Number(
                                e.target.value
                              )
                            )
                          }
                          className="w-full h-12 rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] pl-11 pr-4 text-sm text-Budgexa-green outline-none focus:border-Budgexa-green/30"
                        />
                      </div>

                      <p className="mt-2 text-xs text-Budgexa-green/40">
                        How much do you want
                        to save?
                      </p>
                    </div>

                    {/* Date */}

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-Budgexa-green/45 mb-2">
                        Target Date
                      </label>

                      <div className="relative">
                        <Calendar
                          size={15}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-Budgexa-green/30"
                        />

                        <input
                          type="date"
                          value={targetDate}
                          onChange={(e) =>
                            setTargetDate(
                              e.target.value
                            )
                          }
                          className="w-full h-12 rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] pl-11 pr-4 text-sm text-Budgexa-green outline-none focus:border-Budgexa-green/30"
                        />
                      </div>

                      <p className="mt-2 text-xs text-Budgexa-green/40">
                        By when do you want
                        to achieve this?
                      </p>
                    </div>
                  </div>
                </section>

                {/* ───────────────── 3. Funding Plan ───────────────── */}

                <section className="rounded-3xl border border-[#E8EDE5] bg-white p-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-Budgexa-green text-white flex items-center justify-center text-xs font-bold">
                      3
                    </div>

                    <h2 className="text-sm font-bold text-Budgexa-green">
                      Funding Plan
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    {/* Initial Deposit */}

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-Budgexa-green/45 mb-2">
                        Initial Deposit
                        (Optional)
                      </label>

                      <div className="relative">
                        <PiggyBank
                          size={15}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-Budgexa-green/30"
                        />

                        <input
                          type="number"
                          value={
                            initialDeposit
                          }
                          onChange={(e) =>
                            setInitialDeposit(
                              Number(
                                e.target.value
                              )
                            )
                          }
                          className="w-full h-12 rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] pl-11 pr-4 text-sm text-Budgexa-green outline-none focus:border-Budgexa-green/30"
                        />
                      </div>

                      <p className="mt-2 text-xs text-Budgexa-green/40">
                        How much are you
                        saving right now?
                      </p>
                    </div>

                    {/* Monthly */}

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-Budgexa-green/45 mb-2">
                        Monthly Contribution
                      </label>

                      <div className="relative">
                        <Wallet
                          size={15}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-Budgexa-green/30"
                        />

                        <input
                          type="number"
                          value={
                            monthlyContribution
                          }
                          onChange={(e) =>
                            setMonthlyContribution(
                              Number(
                                e.target.value
                              )
                            )
                          }
                          className="w-full h-12 rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] pl-11 pr-4 text-sm text-Budgexa-green outline-none focus:border-Budgexa-green/30"
                        />
                      </div>

                      <p className="mt-2 text-xs text-Budgexa-green/40">
                        How much can you
                        save each month?
                      </p>
                    </div>
                  </div>

                  {/* Suggested */}

                  <div className="mt-5 rounded-2xl border border-[#E8EDE5] bg-[#F7FAF5] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-Budgexa-green">
                        Suggested Monthly
                        Contribution
                      </p>

                      <p className="text-xs text-Budgexa-green/50 mt-1 leading-relaxed">
                        To reach your goal
                        by{" "}
                        {formatDate(
                          targetDate
                        )}
                        , you need to save at
                        least{" "}
                        <span className="font-semibold text-Budgexa-green">
                          {formatCurrency(
                            suggestedMonthly,
                            currency
                          )}
                        </span>{" "}
                        per month.
                      </p>
                    </div>

                    <button className="h-10 px-4 rounded-xl border border-[#DCE5D5] bg-white text-xs font-semibold text-Budgexa-green hover:border-Budgexa-green/20 whitespace-nowrap">
                      Use Suggested
                    </button>
                  </div>
                </section>

                {/* ───────────────── 4. Goal Settings ───────────────── */}

                <section className="rounded-3xl border border-[#E8EDE5] bg-white p-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-Budgexa-green text-white flex items-center justify-center text-xs font-bold">
                      4
                    </div>

                    <h2 className="text-sm font-bold text-Budgexa-green">
                      Goal Settings
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-5 mt-5">
                    {/* Category */}

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-Budgexa-green/45 mb-2">
                        Goal Category
                      </label>

                      <div className="space-y-3">
                        <div className="relative">
                          <select
                            value={categoryId}
                            onChange={(e) => {
                              setCategoryId(e.target.value);
                              if (e.target.value) setCategoryName("");
                            }}
                            disabled={categoriesLoading}
                            className="w-full h-12 rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] px-4 pr-10 text-sm text-Budgexa-green outline-none focus:border-Budgexa-green/30 disabled:opacity-60"
                          >
                            <option value="">Select an existing category</option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.emoji ? `${category.emoji} ` : ""}{category.name}
                              </option>
                            ))}
                          </select>

                          <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-Budgexa-green/30"
                          />
                        </div>

                        <div className="flex items-center gap-2 text-xs text-Budgexa-green/40">
                          <span className="h-px flex-1 bg-[#E8EDE5]" />
                          <span>or</span>
                          <span className="h-px flex-1 bg-[#E8EDE5]" />
                        </div>

                        <input
                          type="text"
                          value={categoryName}
                          onChange={(e) => {
                            setCategoryName(e.target.value);
                            if (e.target.value.trim()) setCategoryId("");
                          }}
                          placeholder="Custom category name"
                          className="w-full h-12 rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] px-4 text-sm text-Budgexa-green outline-none focus:border-Budgexa-green/30"
                        />

                        <p className="text-xs text-Budgexa-green/40">
                          Pick an existing category or type a custom one. The backend needs one of them.
                        </p>
                      </div>

                      {categoryError && (
                        <p className="mt-2 text-xs text-red-600">{categoryError}</p>
                      )}
                    </div>

                  </div>
                </section>

                {/* Footer Actions */}

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3">
                  <button className="flex-1 h-12 rounded-2xl border border-[#E4E9E0] bg-white text-sm font-semibold text-Budgexa-green/70 hover:border-Budgexa-green/20 transition-colors">
                    Cancel
                  </button>

                  <button
                    onClick={handleCreate}
                    disabled={submitting}
                    className="flex-[1.5] h-12 rounded-2xl bg-Budgexa-green text-white text-sm font-semibold hover:bg-Budgexa-green-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {submitting
                      ? <><Loader2 size={15} className="animate-spin" /> Creating...</>
                      : <><Target size={15} /> Create Goal</>
                    }
                  </button>
                </div>
              </div>
            </div>

            {/* ───────────────── RIGHT ───────────────── */}

            <aside className="bg-[#FCFDFC] p-5 md:p-6">
              <div className="sticky top-6">
                <div className="rounded-3xl border border-[#E8EDE5] bg-white overflow-hidden">
                  {/* Header */}

                  <div className="p-5 border-b border-[#EDF1EA]">
                    <h2 className="text-base font-bold text-Budgexa-green">
                      Goal Preview
                    </h2>

                    <p className="text-xs text-Budgexa-green/45 mt-1">
                      Here&apos;s how your goal
                      will look.
                    </p>
                  </div>

                  {/* Content */}

                  <div className="p-5">
                    {/* Card */}

                    <div className="rounded-3xl border border-[#E8EDE5] overflow-hidden">
                      {/* Top */}

                      <div className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-[#EEF5EB] text-Budgexa-green flex items-center justify-center shrink-0">
                            <Icon size={24} />
                          </div>

                          <div className="min-w-0">
                            <h3 className="text-lg font-bold text-Budgexa-green truncate">
                              {goalName}
                            </h3>

                            <p className="text-sm text-Budgexa-green/55 leading-relaxed mt-1">
                              {
                                goalDescription
                              }
                            </p>

                            <span className="inline-flex items-center rounded-lg bg-[#EEF5EB] px-2.5 py-1 text-xs font-medium text-Budgexa-green mt-3">
                              {categoryDisplayLabel}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}

                      <div className="grid grid-cols-2 border-t border-[#EDF1EA]">
                        {[
                          {
                            label:
                              "Target Amount",
                            value:
                              formatCurrency(
                                targetAmount,
                                currency
                              ),
                          },
                          {
                            label:
                              "Target Date",
                            value:
                              formatDate(
                                targetDate
                              ),
                          },
                        ].map(
                          ({
                            label,
                            value,
                          }) => (
                            <div
                              key={
                                label
                              }
                              className="p-4 border-r last:border-r-0 border-[#EDF1EA]"
                            >
                              <p className="text-xs uppercase tracking-wide text-Budgexa-green/35">
                                {label}
                              </p>

                              <p className="text-sm font-bold text-Budgexa-green mt-1">
                                {value}
                              </p>
                            </div>
                          )
                        )}
                      </div>

                      {/* Progress */}

                      <div className="p-5 border-t border-[#EDF1EA]">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-Budgexa-green/35">
                              Initial Deposit
                            </p>

                            <p className="text-sm font-bold text-Budgexa-green mt-1">
                              {formatCurrency(
                                initialDeposit,
                                currency
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-wide text-Budgexa-green/35">
                              Monthly
                              Contribution
                            </p>

                            <p className="text-sm font-bold text-Budgexa-green mt-1">
                              {formatCurrency(
                                monthlyContribution,
                                currency
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-Budgexa-green/45">
                            Saved So Far
                          </p>

                          <p className="text-sm font-bold text-Budgexa-green">
                            {progress}%
                          </p>
                        </div>

                        <div className="h-3 rounded-full bg-[#E8EEE4] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-Budgexa-green"
                            style={{
                              width: `${progress}%`,
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between mt-2 text-xs text-Budgexa-green/45">
                          <span>
                            Saved So Far:{" "}
                            {formatCurrency(
                              initialDeposit,
                              currency
                            )}
                          </span>

                          <span>
                            Remaining:{" "}
                            {formatCurrency(
                              remaining,
                              currency
                            )}
                          </span>
                        </div>
                      </div>

                      {/* At A Glance */}

                      <div className="p-5 border-t border-[#EDF1EA]">
                        <h4 className="text-sm font-bold text-Budgexa-green mb-4">
                          At a glance
                        </h4>

                        <div className="space-y-3">
                          {[
                            {
                              label:
                                "Total Goal Amount",
                              value:
                                formatCurrency(
                                  targetAmount,
                                  currency
                                ),
                            },
                            {
                              label:
                                "Initial Deposit",
                              value:
                                formatCurrency(
                                  initialDeposit,
                                  currency
                                ),
                            },
                            {
                              label:
                                "Monthly Contribution",
                              value:
                                formatCurrency(
                                  monthlyContribution,
                                  currency
                                ),
                            },
                            {
                              label:
                                "Duration",
                              value: `${monthsLeft} months left`,
                            },
                            {
                              label:
                                "You'll reach your goal by",
                              value:
                                formatDate(
                                  targetDate
                                ),
                            },
                          ].map(
                            ({
                              label,
                              value,
                            }) => (
                              <div
                                key={
                                  label
                                }
                                className="flex items-center justify-between gap-3"
                              >
                                <span className="text-xs text-Budgexa-green/45">
                                  {
                                    label
                                  }
                                </span>

                                <span className="text-xs font-semibold text-Budgexa-green text-right">
                                  {
                                    value
                                  }
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Tip */}

                      {/* <div className="p-5 border-t border-[#EDF1EA]">
                        <div className="rounded-2xl bg-[#F8FAF6] border border-[#E8EDE5] p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                              <Info
                                size={16}
                              />
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-Budgexa-green">
                                Pro Tip
                              </p>

                              <p className="text-xs leading-relaxed text-Budgexa-green/55 mt-1">
                                Automate your
                                monthly
                                contributions
                                to stay on
                                track and
                                reach your
                                goal faster.
                              </p>

                              <button className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-Budgexa-green hover:underline">
                                Setup
                                Automation
                                <Zap
                                  size={12}
                                  fill="currentColor"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}