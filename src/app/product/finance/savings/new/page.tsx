"use client";

import { useMemo, useState } from "react";

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
} from "lucide-react";

import { cn } from "@/lib/utils";

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

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  "₦" + n.toLocaleString("en-NG");

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(
    "en-NG",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function CreateSavingsGoalPage() {
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

  const [goalCategory, setGoalCategory] =
    useState("Personal Goals");

  const [makePrivate, setMakePrivate] =
    useState(false);

  const selectedGoal = GOAL_TYPES.find(
    (g) => g.id === selectedGoalType
  );

  const Icon =
    selectedGoal?.icon || Goal;

  const monthsLeft = useMemo(() => {
    return Math.max(
      1,
      Math.round(
        (new Date(targetDate).getTime() -
          Date.now()) /
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

  return (
    <div className="min-h-screen bg-[#F5F6F2]">
      <div className="max-w-[1450px] mx-auto px-4 md:px-6 py-5 md:py-7">
        {/* ───────────────── Card Container ───────────────── */}

        <div className="rounded-[32px] border border-[#E6ECE2] bg-white shadow-[0_10px_40px_rgba(15,23,42,0.03)] overflow-hidden">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px]">
            {/* ───────────────── LEFT ───────────────── */}

            <div className="p-5 md:p-7 border-b xl:border-b-0 xl:border-r border-[#EDF1EA]">
              {/* Header */}

              <a
                href="/product/finance/savings"
                className="inline-flex items-center gap-2 text-sm font-medium text-rayo-green/60 hover:text-rayo-green transition-colors"
              >
                <ArrowLeft size={15} />
                Back to Goals
              </a>

              <h1 className="mt-5 text-[28px] md:text-[32px] leading-none font-bold tracking-tight text-rayo-green">
                Create a New Savings Goal
              </h1>

              <p className="mt-2 text-sm text-rayo-green/50">
                Set a goal, track your progress,
                and achieve your dreams.
              </p>

              {/* Form Sections */}

              <div className="mt-8 space-y-7">
                {/* ───────────────── 1. Goal Details ───────────────── */}

                <section className="rounded-3xl border border-[#E8EDE5] bg-white p-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-rayo-green text-white flex items-center justify-center text-xs font-bold">
                      1
                    </div>

                    <h2 className="text-sm font-bold text-rayo-green">
                      Goal Details
                    </h2>
                  </div>

                  <div className="mt-5">
                    {/* Goal Name */}

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-rayo-green/45 mb-2">
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
                        className="w-full h-12 rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] px-4 text-sm text-rayo-green outline-none focus:border-rayo-green/30"
                      />
                    </div>

                    {/* Goal Icons */}

                    <div className="mt-5">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-rayo-green/45 mb-3">
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
                                    ? "bg-rayo-green border-rayo-green text-white shadow-sm"
                                    : "bg-white border-[#E6ECE2] text-rayo-green/50 hover:border-rayo-green/25"
                                )}
                              >
                                <GoalIcon
                                  size={18}
                                />
                              </button>
                            );
                          }
                        )}

                        <button className="h-12 px-4 rounded-2xl border border-[#E6ECE2] text-rayo-green/50 text-xs font-medium flex items-center gap-2 hover:border-rayo-green/25">
                          <MoreHorizontal
                            size={14}
                          />
                          More
                        </button>
                      </div>
                    </div>

                    {/* Description */}

                    <div className="mt-5">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-rayo-green/45 mb-2">
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
                          className="w-full rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] px-4 py-3 text-sm text-rayo-green outline-none resize-none focus:border-rayo-green/30"
                        />

                        <span className="absolute bottom-3 right-4 text-xs text-rayo-green/35">
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
                    <div className="w-6 h-6 rounded-full bg-rayo-green text-white flex items-center justify-center text-xs font-bold">
                      2
                    </div>

                    <h2 className="text-sm font-bold text-rayo-green">
                      Target
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    {/* Target Amount */}

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-rayo-green/45 mb-2">
                        Target Amount
                      </label>

                      <div className="relative">
                        <Wallet
                          size={15}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-rayo-green/30"
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
                          className="w-full h-12 rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] pl-11 pr-4 text-sm text-rayo-green outline-none focus:border-rayo-green/30"
                        />
                      </div>

                      <p className="mt-2 text-xs text-rayo-green/40">
                        How much do you want
                        to save?
                      </p>
                    </div>

                    {/* Date */}

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-rayo-green/45 mb-2">
                        Target Date
                      </label>

                      <div className="relative">
                        <Calendar
                          size={15}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-rayo-green/30"
                        />

                        <input
                          type="date"
                          value={targetDate}
                          onChange={(e) =>
                            setTargetDate(
                              e.target.value
                            )
                          }
                          className="w-full h-12 rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] pl-11 pr-4 text-sm text-rayo-green outline-none focus:border-rayo-green/30"
                        />
                      </div>

                      <p className="mt-2 text-xs text-rayo-green/40">
                        By when do you want
                        to achieve this?
                      </p>
                    </div>
                  </div>
                </section>

                {/* ───────────────── 3. Funding Plan ───────────────── */}

                <section className="rounded-3xl border border-[#E8EDE5] bg-white p-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-rayo-green text-white flex items-center justify-center text-xs font-bold">
                      3
                    </div>

                    <h2 className="text-sm font-bold text-rayo-green">
                      Funding Plan
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    {/* Initial Deposit */}

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-rayo-green/45 mb-2">
                        Initial Deposit
                        (Optional)
                      </label>

                      <div className="relative">
                        <PiggyBank
                          size={15}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-rayo-green/30"
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
                          className="w-full h-12 rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] pl-11 pr-4 text-sm text-rayo-green outline-none focus:border-rayo-green/30"
                        />
                      </div>

                      <p className="mt-2 text-xs text-rayo-green/40">
                        How much are you
                        saving right now?
                      </p>
                    </div>

                    {/* Monthly */}

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-rayo-green/45 mb-2">
                        Monthly Contribution
                      </label>

                      <div className="relative">
                        <Wallet
                          size={15}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-rayo-green/30"
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
                          className="w-full h-12 rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] pl-11 pr-4 text-sm text-rayo-green outline-none focus:border-rayo-green/30"
                        />
                      </div>

                      <p className="mt-2 text-xs text-rayo-green/40">
                        How much can you
                        save each month?
                      </p>
                    </div>
                  </div>

                  {/* Suggested */}

                  <div className="mt-5 rounded-2xl border border-[#E8EDE5] bg-[#F7FAF5] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-rayo-green">
                        Suggested Monthly
                        Contribution
                      </p>

                      <p className="text-xs text-rayo-green/50 mt-1 leading-relaxed">
                        To reach your goal
                        by{" "}
                        {formatDate(
                          targetDate
                        )}
                        , you need to save at
                        least{" "}
                        <span className="font-semibold text-rayo-green">
                          {fmt(
                            suggestedMonthly
                          )}
                        </span>{" "}
                        per month.
                      </p>
                    </div>

                    <button className="h-10 px-4 rounded-xl border border-[#DCE5D5] bg-white text-xs font-semibold text-rayo-green hover:border-rayo-green/20 whitespace-nowrap">
                      Use Suggested
                    </button>
                  </div>
                </section>

                {/* ───────────────── 4. Goal Settings ───────────────── */}

                <section className="rounded-3xl border border-[#E8EDE5] bg-white p-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-rayo-green text-white flex items-center justify-center text-xs font-bold">
                      4
                    </div>

                    <h2 className="text-sm font-bold text-rayo-green">
                      Goal Settings
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-5 mt-5">
                    {/* Category */}

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wide text-rayo-green/45 mb-2">
                        Goal Category
                      </label>

                      <button className="w-full h-12 rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] px-4 flex items-center justify-between text-sm text-rayo-green">
                        <div className="flex items-center gap-2">
                          <Target size={15} />
                          {goalCategory}
                        </div>

                        <ChevronDown
                          size={16}
                          className="text-rayo-green/30"
                        />
                      </button>
                    </div>

                    {/* Private */}

                    {/* <div className="flex items-center justify-between rounded-2xl border border-[#E8EDE5] bg-[#FBFCFA] px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-rayo-green">
                          Make Goal Private
                        </p>

                        <p className="text-xs text-rayo-green/45 mt-1">
                          Only you can see
                          this goal
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          setMakePrivate(
                            !makePrivate
                          )
                        }
                        className={cn(
                          "relative w-11 h-6 rounded-full transition-colors",
                          makePrivate
                            ? "bg-rayo-green"
                            : "bg-[#D7DED2]"
                        )}
                      >
                        <div
                          className={cn(
                            "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                            makePrivate
                              ? "left-6"
                              : "left-1"
                          )}
                        />
                      </button>
                    </div> */}
                  </div>
                </section>

                {/* Footer Actions */}

                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3">
                  <button className="flex-1 h-12 rounded-2xl border border-[#E4E9E0] bg-white text-sm font-semibold text-rayo-green/70 hover:border-rayo-green/20 transition-colors">
                    Cancel
                  </button>

                  <button className="flex-[1.5] h-12 rounded-2xl bg-rayo-green text-white text-sm font-semibold hover:bg-rayo-green-dark transition-colors flex items-center justify-center gap-2">
                    <Target size={15} />
                    Create Goal
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
                    <h2 className="text-base font-bold text-rayo-green">
                      Goal Preview
                    </h2>

                    <p className="text-xs text-rayo-green/45 mt-1">
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
                          <div className="w-14 h-14 rounded-2xl bg-[#EEF5EB] text-rayo-green flex items-center justify-center shrink-0">
                            <Icon size={24} />
                          </div>

                          <div className="min-w-0">
                            <h3 className="text-lg font-bold text-rayo-green truncate">
                              {goalName}
                            </h3>

                            <p className="text-sm text-rayo-green/55 leading-relaxed mt-1">
                              {
                                goalDescription
                              }
                            </p>

                            <span className="inline-flex items-center rounded-lg bg-[#EEF5EB] px-2.5 py-1 text-xs font-medium text-rayo-green mt-3">
                              {goalCategory}
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
                              fmt(
                                targetAmount
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
                              <p className="text-xs uppercase tracking-wide text-rayo-green/35">
                                {label}
                              </p>

                              <p className="text-sm font-bold text-rayo-green mt-1">
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
                            <p className="text-xs uppercase tracking-wide text-rayo-green/35">
                              Initial Deposit
                            </p>

                            <p className="text-sm font-bold text-rayo-green mt-1">
                              {fmt(
                                initialDeposit
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-wide text-rayo-green/35">
                              Monthly
                              Contribution
                            </p>

                            <p className="text-sm font-bold text-rayo-green mt-1">
                              {fmt(
                                monthlyContribution
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-rayo-green/45">
                            Saved So Far
                          </p>

                          <p className="text-sm font-bold text-rayo-green">
                            {progress}%
                          </p>
                        </div>

                        <div className="h-3 rounded-full bg-[#E8EEE4] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-rayo-green"
                            style={{
                              width: `${progress}%`,
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between mt-2 text-xs text-rayo-green/45">
                          <span>
                            Saved So Far:{" "}
                            {fmt(
                              initialDeposit
                            )}
                          </span>

                          <span>
                            Remaining:{" "}
                            {fmt(
                              remaining
                            )}
                          </span>
                        </div>
                      </div>

                      {/* At A Glance */}

                      <div className="p-5 border-t border-[#EDF1EA]">
                        <h4 className="text-sm font-bold text-rayo-green mb-4">
                          At a glance
                        </h4>

                        <div className="space-y-3">
                          {[
                            {
                              label:
                                "Total Goal Amount",
                              value:
                                fmt(
                                  targetAmount
                                ),
                            },
                            {
                              label:
                                "Initial Deposit",
                              value:
                                fmt(
                                  initialDeposit
                                ),
                            },
                            {
                              label:
                                "Monthly Contribution",
                              value:
                                fmt(
                                  monthlyContribution
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
                                <span className="text-xs text-rayo-green/45">
                                  {
                                    label
                                  }
                                </span>

                                <span className="text-xs font-semibold text-rayo-green text-right">
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
                              <p className="text-sm font-semibold text-rayo-green">
                                Pro Tip
                              </p>

                              <p className="text-xs leading-relaxed text-rayo-green/55 mt-1">
                                Automate your
                                monthly
                                contributions
                                to stay on
                                track and
                                reach your
                                goal faster.
                              </p>

                              <button className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-rayo-green hover:underline">
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