"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Plus, ChevronDown, Search, Filter, MoreHorizontal,
  Landmark, TrendingUp, ChevronLeft, ChevronRight, ArrowLeft, Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchTransactions, deleteTransaction } from "@/lib/data-service";
import { mockCategorySpending } from "@/lib/mock-data";
import type { AiInsight, Transaction } from "@/lib/types/src";
import { getAiInsights } from "@/lib/api-client/src/index";

const fmt = (n: number) =>
  `${n < 0 ? "-" : ""}₦${Math.abs(n).toLocaleString("en-NG")}`;

const CATEGORY_SPENDING = mockCategorySpending; // replace with real data when endpoint exists

export default function TransactionsPage() {
  const [activeTab, setActiveTab]   = useState<"all" | "recurring">("all");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [total, setTotal]           = useState(0);
  const [page, setPage]             = useState(1);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [search, setSearch]         = useState("");
  const [typeFilter, setTypeFilter] = useState<"" | "income" | "expense">("");
  const limit = 10;
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchTransactions({
          page,
          limit,
          type: typeFilter || undefined,
        });
        
        setTransactions(result.transactions);
        setTotal(result.total);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load transactions");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page, typeFilter]);

  const [insights, setInsights] = useState<AiInsight[]>([]);
  const [insightsLoading, setInsightsLoading] = useState(true);

  useEffect(() => {
    async function loadInsights() {
      try {
        setInsightsLoading(true);

        const data = await getAiInsights();

        setInsights(data);
      } catch (error) {
        console.error("Failed to load AI insights", error);
        setInsights([]);
      } finally {
        setInsightsLoading(false);
      }
    }

    loadInsights();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return transactions;
    const q = search.toLowerCase();
    return transactions.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [transactions, search]);

  const totalIncome   = transactions.filter((t) => t.type === "income").reduce((s, t) => s + Number(t.amount), 0);
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0);
  const balance       = totalIncome - totalExpenses;
  const totalPages    = Math.ceil(total / limit);

  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!deleteConfirm) return;
    try {
      setDeleting(true);
      await deleteTransaction(deleteConfirm);
      setTransactions((prev) => prev.filter((t) => t.id !== deleteConfirm));
      setTotal((prev) => prev - 1);
      setDeleteConfirm(null);
    } catch {
      // error handled below
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-full mx-auto px-4 md:px-6 py-6">

        {/* HEADER */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between px-5">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-rayo-green">Transactions</h1>
            <p className="text-sm text-rayo-green/50 mt-1">
              Track your income, expenses, and overall budget progress.
            </p>
          </div>
          <Link
            href="/product/finance/transactions/new"
            className="h-11 px-4 rounded-xl bg-rayo-green text-white text-sm font-medium hover:bg-rayo-green-dark transition-colors flex items-center justify-center gap-2 self-start"
          >
            <Plus size={14} />
            Add Transaction
          </Link>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error} — <button className="underline font-medium" onClick={() => setPage(1)}>Retry</button>
          </div>
        )}

        {/* CASHFLOW OVERVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-white border border-[#ECEFE8] rounded-2xl p-5">
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
                <span className={cn("font-bold text-lg", balance >= 0 ? "text-rayo-green" : "text-red-500")}>
                  {fmt(balance)}
                </span>
              </div>
            </div>
          </div>

          {/* AI Insights panel — unchanged from original */}
          <div className="bg-white border border-[#ECEFE8] rounded-2xl p-5 lg:col-span-2">
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
              {insightsLoading ? (
                <p className="text-sm text-rayo-green/50">Loading insights…</p>
              ) : transactions.length === 0 ? (
                <p className="text-sm text-rayo-green/50">Add transactions to get AI-powered spending insights.</p>
              ) : (
                  <div className="space-y-3">
                    {insights.map((insight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2.5"
                      >
                        <span className="w-2 h-2 rounded-full bg-rayo-orange mt-1.5 shrink-0" />
                        <p>{insight.message}</p>
                      </div>
                    ))}
                  </div>
                )
              }
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-white rounded-2xl border border-[#ECEFE8] p-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-rayo-green/70">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => { setTypeFilter(e.target.value as any); setPage(1); }}
                className="h-11 rounded-xl border border-[#E4E9E0] bg-white px-4 text-sm text-rayo-green/70 outline-none"
              >
                <option value="">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 xl:col-span-4">
              <label className="text-xs font-medium text-rayo-green/70">Search</label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rayo-green/30" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by description or category..."
                  className="h-11 w-full rounded-xl border border-[#E4E9E0] bg-white pl-9 pr-4 text-sm outline-none focus:border-rayo-green/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TRANSACTION TABLE */}
        <div className="mt-6">
          <div className="bg-white rounded-2xl border border-[#ECEFE8] overflow-hidden">

            {/* Desktop */}
            <div className="hidden xl:block overflow-x-auto">
              <div className="grid grid-cols-[130px_2fr_1.2fr_110px_130px_80px] px-5 py-3 bg-[#F8FAF7] border-b border-[#ECEFE8]">
                {["DATE", "DESCRIPTION", "CATEGORY", "TYPE", "AMOUNT", "ACTIONS"].map((h) => (
                  <span key={h} className="text-[10px] font-semibold tracking-wider text-rayo-green/35">{h}</span>
                ))}
              </div>

              {loading ? (
                <div className="p-6 space-y-4 animate-pulse">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-12 rounded-xl bg-[#F8FAF7]" />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="p-10 text-center text-sm text-rayo-green/50">No transactions yet.</div>
              ) : (
                <div className="divide-y divide-[#F0F2EE]">
                  {filtered.map((t) => (
                    <div
                      key={t.id}
                      className="grid grid-cols-[130px_2fr_1.2fr_110px_130px_80px] items-center px-5 py-4 hover:bg-[#FAFBF8] transition-colors group"
                    >
                      <div>
                        <p className="text-sm font-medium text-rayo-green">
                          {new Date(t.date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-rayo-green truncate">{t.description}</p>
                      </div>

                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F7F8F5] px-2.5 py-1 text-xs font-medium text-rayo-green">
                          {t.category}
                        </span>
                      </div>

                      <div>
                        <span className={cn(
                          "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold",
                          t.type === "income" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                        )}>
                          {t.type === "income" ? "Income" : "Expense"}
                        </span>
                      </div>

                      <div>
                        <p className={cn("text-sm font-bold", t.type === "income" ? "text-emerald-600" : "text-red-500")}>
                          {t.type === "income" ? "+" : "-"}{fmt(Number(t.amount))}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {deleteConfirm && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
                            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                              <h3 className="text-base font-semibold text-rayo-green">Delete transaction?</h3>
                              <p className="mt-2 text-sm text-rayo-green/60">
                                This action cannot be undone. The transaction will be permanently removed.
                              </p>
                              <div className="mt-6 flex gap-3">
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="flex-1 rounded-xl border border-rayo-green/10 py-2.5 text-sm font-medium text-rayo-green transition hover:bg-rayo-beige"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={handleDelete}
                                  disabled={deleting}
                                  className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-60"
                                >
                                  {deleting ? "Deleting…" : "Delete"}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                        <button className="w-8 h-8 rounded-lg border border-[#E4E9E0] flex items-center justify-center text-rayo-green/40 hover:text-rayo-green transition-colors">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile */}
            <div className="xl:hidden divide-y divide-[#F0F2EE]">
              {loading ? (
                <div className="p-4 space-y-3 animate-pulse">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-16 rounded-xl bg-[#F8FAF7]" />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="p-8 text-center text-sm text-rayo-green/50">No transactions yet.</div>
              ) : (
                filtered.map((t) => (
                  <div key={t.id} className="p-4 hover:bg-[#FAFBF8] transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-rayo-green truncate">{t.description}</p>
                        <p className="text-xs text-rayo-green/40 mt-1">{t.category}</p>
                        <p className="text-xs text-rayo-green/45 mt-1">
                          {new Date(t.date).toLocaleDateString("en-NG")}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <p className={cn("text-sm font-bold", t.type === "income" ? "text-emerald-600" : "text-red-500")}>
                          {t.type === "income" ? "+" : "-"}{fmt(Number(t.amount))}
                        </p>
                        <button
                          onClick={() => setDeleteConfirm(t.id)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-5 py-4 border-t border-[#ECEFE8]">
              <p className="text-xs text-rayo-green/45">
                Showing {Math.min((page - 1) * limit + 1, total)}–{Math.min(page * limit, total)} of {total} transactions
              </p>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-8 h-8 rounded-lg border border-[#E4E9E0] flex items-center justify-center text-rayo-green/40 disabled:opacity-40"
                >
                  <ChevronLeft size={14} />
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={cn(
                      "w-8 h-8 rounded-lg text-sm font-medium",
                      page === n ? "bg-rayo-green text-white" : "border border-[#E4E9E0] text-rayo-green/60"
                    )}
                  >
                    {n}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="w-8 h-8 rounded-lg border border-[#E4E9E0] flex items-center justify-center text-rayo-green/40 disabled:opacity-40"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}