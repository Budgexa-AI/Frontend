"use client";

import { useState } from "react";
import DateRange from "@/components/ui/DateRange";
import { cn } from "@/lib/utils";

import {
  Plus,
  ChevronDown,
  ChevronRight,
  Pencil,
  MoreHorizontal,
  ListFilter,
  ScrollText,
  RefreshCcw,
  X,
  ArrowUpRight,
  Wallet,
  TrendingUp,
  PiggyBank,
  Info,
  Sparkles,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface BudgetCategory {
  id: string;
  name: string;
  subtitle: string;
  budget: number;
  spent: number;
  color: string;
  emoji: string;
}

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const CATEGORIES: BudgetCategory[] = [
  {
    id: "food",
    name: "Food & Dining",
    subtitle: "Groceries, Restaurants",
    budget: 99000,
    spent: 67500,
    color: "#F97316",
    emoji: "🍽️",
  },
  {
    id: "housing",
    name: "Housing",
    subtitle: "Rent, Utilities",
    budget: 142000,
    spent: 120000,
    color: "#3B82F6",
    emoji: "🏠",
  },
  {
    id: "transport",
    name: "Transport",
    subtitle: "Taxi, Fuel",
    budget: 80000,
    spent: 36000,
    color: "#8B5CF6",
    emoji: "🚗",
  },
  {
    id: "savings",
    name: "Savings",
    subtitle: "Emergency, Goals",
    budget: 160000,
    spent: 80000,
    color: "#10B981",
    emoji: "💰",
  },
];

const TABS = ["Overview", "Categories", "Rules", "Insights"] as const;

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

const fmt = (n: number) => "₦" + n.toLocaleString("en-NG");

const pct = (spent: number, budget: number) =>
  Math.round((spent / budget) * 100);

// ─────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────

function ProgressBar({
  value,
  color,
}: {
  value: number;
  color: string;
}) {
  return (
    <div className="h-1.5 w-full rounded-full bg-rayo-muted overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${Math.min(value, 100)}%`,
          backgroundColor: color + "CC",
        }}
      />
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  sub,
}: any) {
  return (
    <div className="bg-white rounded-2xl border border-rayo-ash p-4 shadow-sm">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-rayo-beige-dark">
        {icon}
      </div>

      <p className="text-[11px] uppercase tracking-wide text-rayo-green/40">
        {label}
      </p>

      <p className="text-2xl font-bold text-rayo-green mt-1">
        {value}
      </p>

      <p className="text-xs text-rayo-green/45 mt-1">{sub}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────

export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Overview");
  const [viewMode, setViewMode] = useState<"%" | "₦">("%");

  const totalBudgeted = CATEGORIES.reduce((s, c) => s + c.budget, 0);
  const totalSpent = CATEGORIES.reduce((s, c) => s + c.spent, 0);
  const totalRemaining = totalBudgeted - totalSpent;
  const avgUsed = pct(totalSpent, totalBudgeted);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rayo-beige/20 to-white">
      <div className="max-w-[1450px] mx-auto px-4 md:px-6 lg:px-8 py-6">

        <div className="flex flex-col 2xl:flex-row gap-6">

          {/* ───────────────── MAIN ───────────────── */}
          <main className="flex-1 space-y-5 min-w-0">

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-rayo-green">
                  Monthly Budget
                </h1>
                <p className="text-sm text-rayo-green/50 mt-1">
                  Track, control and optimize your spending.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <DateRange />

                <button className="h-11 px-4 rounded-xl bg-rayo-green text-white text-sm font-medium hover:bg-rayo-green-dark flex items-center justify-center gap-2">
                  <Plus size={14} />
                  Create Budget
                </button>
              </div>
            </div>

            {/* TABS */}
            <div className="flex overflow-x-auto border-b border-rayo-ash bg-white/60 backdrop-blur-sm rounded-xl">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-3 text-sm whitespace-nowrap border-b-2 transition",
                    activeTab === tab
                      ? "border-rayo-green text-rayo-green"
                      : "border-transparent text-rayo-green/40 hover:text-rayo-green"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              <SummaryCard
                label="Budgeted"
                value={fmt(totalBudgeted)}
                sub="Total allocation"
                icon={<Wallet size={16} className="text-rayo-green" />}
              />

              <SummaryCard
                label="Spent"
                value={fmt(totalSpent)}
                sub={`${avgUsed}% used`}
                icon={<ArrowUpRight size={16} className="text-rayo-red" />}
              />

              <SummaryCard
                label="Remaining"
                value={fmt(totalRemaining)}
                sub="Available"
                icon={<PiggyBank size={16} className="text-emerald-600" />}
              />

              <SummaryCard
                label="Average"
                value={`${avgUsed}%`}
                sub="Across categories"
                icon={<TrendingUp size={16} className="text-blue-500" />}
              />
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl border border-rayo-ash overflow-hidden shadow-sm">

              {/* Header */}
              <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_2fr_1fr] px-5 py-3 bg-rayo-muted text-[10px] text-rayo-green/40 uppercase tracking-wider">
                <span>Category</span>
                <span>Budget</span>
                <span>Spent</span>
                <span>Progress</span>
                <span>Remaining</span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-rayo-ash">
                {CATEGORIES.map((c) => {
                  const used = pct(c.spent, c.budget);
                  const remaining = c.budget - c.spent;

                  return (
                    <div key={c.id} className="p-4 lg:p-5 hover:bg-rayo-muted/30 transition">

                      {/* Desktop */}
                      <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_2fr_1fr] items-center">

                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: c.color + "22" }}
                          >
                            {c.emoji}
                          </div>

                          <div>
                            <p className="font-medium text-rayo-green">
                              {c.name}
                            </p>
                            <p className="text-xs text-rayo-green/40">
                              {c.subtitle}
                            </p>
                          </div>
                        </div>

                        <span className="text-sm text-rayo-green">
                          {fmt(c.budget)}
                        </span>

                        <span className="text-sm text-rayo-green">
                          {fmt(c.spent)}
                        </span>

                        <div className="flex items-center gap-3 pr-4">
                          <ProgressBar value={used} color={c.color} />
                          <span className="text-xs text-rayo-green/60 w-10 text-right">
                            {used}%
                          </span>
                        </div>

                        <span className={cn(
                          "text-sm font-medium",
                          remaining > 0 ? "text-emerald-600" : "text-red-500"
                        )}>
                          {fmt(remaining)}
                        </span>
                      </div>

                      {/* Mobile */}
                      <div className="lg:hidden space-y-3">

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: c.color + "22" }}
                            >
                              {c.emoji}
                            </div>

                            <div>
                              <p className="font-medium text-rayo-green">
                                {c.name}
                              </p>
                              <p className="text-xs text-rayo-green/40">
                                {c.subtitle}
                              </p>
                            </div>
                          </div>
                        </div>

                        <ProgressBar value={used} color={c.color} />

                        <div className="grid grid-cols-3 text-xs text-rayo-green/60">
                          <span>{fmt(c.budget)}</span>
                          <span>{fmt(c.spent)}</span>
                          <span className="text-right font-medium text-rayo-green">
                            {fmt(remaining)}
                          </span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

          </main>

          {/* ───────────────── SIDEBAR ───────────────── */}
          <aside className="w-full 2xl:w-[340px] flex flex-col gap-4">

            {/* AI HEALTH */}
            <div className="rounded-2xl bg-gradient-to-br from-rayo-green to-rayo-green-dark text-white p-5">
              <p className="text-xs text-white/60 flex items-center gap-1">
                <Sparkles size={12} />
                Rayo Intelligence
              </p>

              <p className="text-xl font-bold mt-2">Good</p>

              <p className="text-sm text-white/70 mt-1">
                You’re on track this month.
              </p>
            </div>

            {/* AI INSIGHT */}
            <div className="bg-white border border-rayo-ash rounded-2xl p-5 shadow-sm">
              <p className="text-sm font-semibold text-rayo-green mb-2">
                AI Insight
              </p>

              <p className="text-sm text-rayo-green/70 leading-relaxed">
                Food spending is slightly higher than usual. Reducing restaurant frequency
                could improve savings this month.
              </p>
            </div>

            {/* MANAGE */}
            <div className="bg-white border border-rayo-ash rounded-2xl overflow-hidden">
              {[
                {
                  label: "Budget Rules",
                  sub: "Alerts & limits",
                  Icon: ScrollText,
                },
                {
                  label: "Rollover",
                  sub: "Unused funds",
                  Icon: RefreshCcw,
                },
              ].map((item) => (
                <button
                  key={item.label}
                  className="flex items-center justify-between w-full px-5 py-4 hover:bg-rayo-muted transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rayo-muted flex items-center justify-center">
                      <item.Icon size={14} className="text-rayo-green/50" />
                    </div>

                    <div>
                      <p className="text-sm text-rayo-green">
                        {item.label}
                      </p>
                      <p className="text-xs text-rayo-green/40">
                        {item.sub}
                      </p>
                    </div>
                  </div>

                  <ChevronRight size={14} className="text-rayo-green/30" />
                </button>
              ))}
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}