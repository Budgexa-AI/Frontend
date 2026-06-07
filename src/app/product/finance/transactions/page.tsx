// Replace the top of the file — remove the inline TRANSACTIONS and CATEGORY_SPENDING arrays
// and replace the imports section with:

"use client";

import { useState } from "react";
import {
  Plus,
  ChevronDown,
  Search,
  Filter,
  MoreHorizontal,
  Landmark,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockTransactions, mockCategorySpending } from "@/lib/mock-data";

const TRANSACTIONS = mockTransactions;
const CATEGORY_SPENDING = mockCategorySpending;
// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  `${n < 0 ? "-" : ""}₦${Math.abs(n).toLocaleString("en-NG")}`;

const totalIncome = TRANSACTIONS.filter(
  (t) => t.type === "Income"
).reduce((s, t) => s + t.amount, 0);

const totalExpenses = TRANSACTIONS.filter(
  (t) => t.type === "Expense"
).reduce((s, t) => s + Math.abs(t.amount), 0);

const balance = totalIncome - totalExpenses;

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "recurring">("all");
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <div className="max-w-full mx-auto px-4 md:px-6 py-6">
        {/* ── BACK BUTTON ── */}
        <button
          onClick={() => router.back()}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-rayo-green/60 transition-colors hover:text-rayo-green"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        
        {/* ───────────────── HEADER ───────────────── */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-rayo-green">
              Transactions
            </h1>
            <p className="text-sm text-rayo-green/50 mt-1">
              Track your income, expenses, and overall budget progress.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href="/product/finance/transactions/new"
              className="h-11 px-4 rounded-xl bg-rayo-green text-white text-sm font-medium hover:bg-rayo-green-dark transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={14} />
              Add Transaction
            </Link>
          </div>
        </div>

        {/* ───────────────── TOP INSIGHTS (COMBINED OVERVIEW) ───────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          
          {/* Cashflow Overview Card (Dynamic version of Code 2) */}
          <div className="bg-white border border-[#ECEFE8] rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-rayo-green/45">
                Cashflow Overview
              </h3>

              <div className="mt-4 space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-rayo-green/60">Income</span>
                  <span className="text-emerald-600 font-bold">{fmt(totalIncome)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-rayo-green/60">Expenses</span>
                  <span className="text-red-500 font-bold">{fmt(totalExpenses)}</span>
                </div>

                <div className="border-t border-[#ECEFE8] pt-3 flex justify-between items-center">
                  <span className="font-medium text-rayo-green/80">Net Balance</span>
                  <span
                    className={cn(
                      "font-bold text-lg",
                      balance >= 0 ? "text-rayo-green" : "text-red-500"
                    )}
                  >
                    {fmt(balance)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Spending Insight (With Category Palette styling from Code 1) */}
          <div className="bg-white border border-[#ECEFE8] rounded-2xl p-5 lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-rayo-green/45">
                  AI Spending Insights
                </h3>
                <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                  <TrendingUp size={12} />
                  Active Monitor
                </span>
              </div>

              <div className="mt-4 space-y-3.5 text-sm text-rayo-green/70">
                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B] mt-1.5 shrink-0" />
                  <p>
                    <strong className="text-rayo-green font-semibold">Food & Dining</strong> remains your largest expense segment. Consider setting a daily pocket money ceiling on food deliveries to stay inside your weekly target.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#8B5CF6] mt-1.5 shrink-0" />
                  <p>
                    Most of your data consumption peaks during mid-month subscription renewals. Your <strong className="text-rayo-green font-semibold">150GB Plan</strong> makes up a steady chunk of your structural utilities.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#3B82F6] mt-1.5 shrink-0" />
                  <p>
                    Frequent transfers to peers make up <strong className="text-rayo-green font-semibold">22% of outgoing funds</strong>. Adding descriptors to your cash transfers will allow the AI assistant to sort your transactions more precisely.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ───────────────── FILTERS ───────────────── */}
        <div className="bg-white rounded-2xl border border-[#ECEFE8] p-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
            {[
              "Date Range",
              "Type",
              "Category",
              "Payment Method",
            ].map((label, i) => (
              <div key={label} className="flex flex-col gap-2">
                <label className="text-xs font-medium text-rayo-green/70">
                  {label}
                </label>
                <button className="h-11 rounded-xl border border-[#E4E9E0] bg-white px-4 text-sm text-rayo-green/70 flex items-center justify-between hover:border-rayo-green/20 transition-colors">
                  <span>
                    {i === 0
                      ? "May 1 – May 18, 2026"
                      : label === "Type"
                      ? "All"
                      : label === "Category"
                      ? "All Categories"
                      : "All"}
                  </span>
                  <ChevronDown size={14} />
                </button>
              </div>
            ))}

            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-rayo-green/70">
                &nbsp;
              </label>
              <button className="h-11 rounded-xl border border-[#E4E9E0] bg-[#F8FAF7] text-sm font-medium text-rayo-green flex items-center justify-center gap-2 hover:bg-[#F2F5F0] transition-colors">
                <Filter size={14} />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* ───────────────── CONTENT AREA ───────────────── */}
        <div className="grid grid-cols-1 2xl:grid-cols-[1fr_320px] gap-6 mt-6">
          
          {/* ───────────────── LEFT: TRANSACTION TABLE ───────────────── */}
          <div className="min-w-0 space-y-5">
            <div className="bg-white rounded-2xl border border-[#ECEFE8] overflow-hidden">
              
              {/* Top Bar / Search */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-5 py-4 border-b border-[#ECEFE8]">
                
                {/* Tabs */}
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={cn(
                      "pb-3 text-sm font-medium border-b-2 transition-colors",
                      activeTab === "all"
                        ? "border-rayo-green text-rayo-green"
                        : "border-transparent text-rayo-green/45"
                    )}
                  >
                    All Transactions
                  </button>

                  <button
                    onClick={() => setActiveTab("recurring")}
                    className={cn(
                      "pb-3 text-sm font-medium border-b-2 transition-colors",
                      activeTab === "recurring"
                        ? "border-rayo-green text-rayo-green"
                        : "border-transparent text-rayo-green/45"
                    )}
                  >
                    Recurring
                  </button>
                </div>

                {/* Search Fields */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-rayo-green/30"
                    />
                    <input
                      placeholder="Search transactions..."
                      className="h-10 w-full sm:w-[260px] rounded-xl border border-[#E4E9E0] bg-white pl-9 pr-4 text-sm outline-none focus:border-rayo-green/20"
                    />
                  </div>

                  <button className="w-10 h-10 rounded-xl border border-[#E4E9E0] flex items-center justify-center text-rayo-green/50 hover:text-rayo-green transition-colors">
                    <Filter size={14} />
                  </button>
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="hidden xl:block overflow-x-auto">
                <div className="grid grid-cols-[130px_2fr_1.2fr_110px_130px_140px_80px] px-5 py-3 bg-[#F8FAF7] border-b border-[#ECEFE8]">
                  {[
                    "DATE",
                    "DESCRIPTION",
                    "CATEGORY",
                    "TYPE",
                    "AMOUNT",
                    "PAYMENT METHOD",
                    "ACTIONS",
                  ].map((h) => (
                    <span
                      key={h}
                      className="text-[10px] font-semibold tracking-wider text-rayo-green/35"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <div className="divide-y divide-[#F0F2EE]">
                  {TRANSACTIONS.map((t) => (
                    <div
                      key={t.id}
                      className="grid grid-cols-[130px_2fr_1.2fr_110px_130px_140px_80px] items-center px-5 py-4 hover:bg-[#FAFBF8] transition-colors group"
                    >
                      {/* Date */}
                      <div>
                        <p className="text-sm font-medium text-rayo-green">{t.date}</p>
                        <p className="text-xs text-rayo-green/40 mt-1">{t.time}</p>
                      </div>

                      {/* Description */}
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                          style={{ backgroundColor: t.color + "18" }}
                        >
                          {t.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-rayo-green truncate">
                            {t.description}
                          </p>
                          <p className="text-xs text-rayo-green/40 truncate mt-1">
                            {t.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Category */}
                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F7F8F5] px-2.5 py-1 text-xs font-medium text-rayo-green">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: t.color }}
                          />
                          {t.category}
                        </span>
                      </div>

                      {/* Type */}
                      <div>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold",
                            t.type === "Income"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-600"
                          )}
                        >
                          {t.type}
                        </span>
                      </div>

                      {/* Amount */}
                      <div>
                        <p
                          className={cn(
                            "text-sm font-bold",
                            t.amount > 0 ? "text-emerald-600" : "text-red-500"
                          )}
                        >
                          {fmt(t.amount)}
                        </p>
                      </div>

                      {/* Payment Method */}
                      <div className="flex items-center gap-2">
                        <Landmark size={14} className="text-rayo-green/35" />
                        <span className="text-sm text-rayo-green/70">
                          {t.paymentMethod}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 rounded-lg border border-[#E4E9E0] flex items-center justify-center text-rayo-green/40 hover:text-rayo-green transition-colors">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Card Layout View */}
              <div className="xl:hidden divide-y divide-[#F0F2EE]">
                {TRANSACTIONS.map((t) => (
                  <div key={t.id} className="p-4 hover:bg-[#FAFBF8] transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0"
                          style={{ backgroundColor: t.color + "18" }}
                        >
                          {t.icon}
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-rayo-green truncate">
                            {t.description}
                          </p>
                          <p className="text-xs text-rayo-green/40 mt-1 truncate">
                            {t.subtitle}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="text-xs text-rayo-green/45">{t.date}</span>
                            <span className="w-1 h-1 rounded-full bg-rayo-green/20" />
                            <span className="text-xs text-rayo-green/45">
                              {t.paymentMethod}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button className="w-8 h-8 rounded-lg border border-[#E4E9E0] flex items-center justify-center text-rayo-green/40 shrink-0">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F7F8F5] px-2.5 py-1 text-xs font-medium text-rayo-green">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: t.color }}
                          />
                          {t.category}
                        </span>

                        <span
                          className={cn(
                            "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold",
                            t.type === "Income"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-600"
                          )}
                        >
                          {t.type}
                        </span>
                      </div>

                      <p
                        className={cn(
                          "text-sm font-bold",
                          t.amount > 0 ? "text-emerald-600" : "text-red-500"
                        )}
                      >
                        {fmt(t.amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Pagination Footer */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-5 py-4 border-t border-[#ECEFE8]">
                <p className="text-xs text-rayo-green/45">
                  Showing 1 to 10 of 47 transactions
                </p>

                <div className="flex items-center justify-between lg:justify-end gap-4">
                  <div className="flex items-center gap-1">
                    <button className="w-8 h-8 rounded-lg border border-[#E4E9E0] flex items-center justify-center text-rayo-green/40">
                      <ChevronLeft size={14} />
                    </button>

                    {[1, 2, 3].map((n) => (
                      <button
                        key={n}
                        className={cn(
                          "w-8 h-8 rounded-lg text-sm font-medium",
                          n === 1
                            ? "bg-rayo-green text-white"
                            : "border border-[#E4E9E0] text-rayo-green/60"
                        )}
                      >
                        {n}
                      </button>
                    ))}

                    <button className="w-8 h-8 rounded-lg border border-[#E4E9E0] flex items-center justify-center text-rayo-green/40">
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <button className="h-9 px-3 rounded-lg border border-[#E4E9E0] text-xs text-rayo-green/60 flex items-center gap-1">
                    10 per page
                    <ChevronDown size={12} />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ───────────────── RIGHT: SPENDING & REPORT SIDEBAR ───────────────── */}
          <aside className="space-y-5">
            
            {/* Category Breakdown (Donut Chart & Key Metrics) */}
            <div className="bg-white rounded-2xl border border-[#ECEFE8] p-5">
              <h3 className="text-sm font-semibold text-rayo-green mb-5">
                Spending by Category
              </h3>

              {/* Conic Gradient Donut representing category ratios */}
              <div className="relative w-[180px] h-[180px] mx-auto">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `conic-gradient(
                      #F59E0B 0% 28%,
                      #3B82F6 28% 50%,
                      #8B5CF6 50% 62%,
                      #F97316 62% 72%,
                      #2563EB 72% 80%,
                      #CBD5E1 80% 100%
                    )`,
                  }}
                />
                <div className="absolute inset-[22px] bg-white rounded-full flex flex-col items-center justify-center">
                  <p className="text-[20px] font-bold text-rayo-green">
                    {fmt(totalExpenses)}
                  </p>
                  <p className="text-[10px] tracking-wide uppercase text-rayo-green/45 mt-1">
                    Total Outflow
                  </p>
                </div>
              </div>

              {/* Categorical Legend with Color Swatches */}
              <div className="space-y-3 mt-6">
                {CATEGORY_SPENDING.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <p className="text-xs text-rayo-green/70 truncate">{cat.name}</p>
                    </div>
                    <p className="text-xs font-semibold text-rayo-green">
                      {fmt(cat.value)}
                    </p>
                  </div>
                ))}
              </div>

              <button
                //TODO: href="/product/finance/report"
                className="flex h-10 w-full items-center justify-center rounded-xl border border-[#E4E9E0] bg-[#F8FAF7] text-sm font-medium text-rayo-green transition-colors mt-5 hover:bg-[#F1F5EF]"
              >
                View Full Report
              </button>
            </div>

          </aside>
        </div>

      </div>
    </div>
  );
}