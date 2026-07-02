"use client";

import { useState, useEffect, useCallback } from "react";
import DateRange from "@/components/ui/DateRange";
import { cn } from "@/lib/utils";
import {
  Plus, Pencil, Trash2, ArrowUpRight, Wallet, TrendingUp,
  PiggyBank, Sparkles, Loader2, RefreshCcw, X, Check,
} from "lucide-react";
import { fetchBudgets, createBudget, updateBudget, deleteBudget } from "@/lib/api-client/src";
import { CHART_PALETTE } from "@/lib/chart-colors";
import { useRouter } from "next/navigation";
import { Budget, Category } from "@/lib/types/src";
import { CategoryPicker, CategoryPickerValue } from "@/components/product/CategoryPicker";
import { fetchCategories } from "@/lib/data-service";

// Constants

const TABS = ["Overview", "Categories", "Insights"] as const;

const CATEGORY_EMOJI: Record<string, string> = {
  food: "🍔", transport: "🚗", entertainment: "🎬", utilities: "💡",
  health: "💊", savings: "🐷", clothing: "👗", education: "📚",
  travel: "✈️", fitness: "🏋️", party: "🎉", rent: "🏠", data: "📱",
  default: "💰",
};

function getCategoryEmoji(category: string) {
  return CATEGORY_EMOJI[category.toLowerCase()] ?? CATEGORY_EMOJI.default;
}

function getBudgetCategoryLabel(budget: Pick<Budget, "categoryId" | "categoryName">) {
  return budget.categoryName ?? budget.categoryId?.toString() ?? "Unknown";
}

function getCategoryColor(index: number) {
  return CHART_PALETTE[index % CHART_PALETTE.length];
}

// Helpers

const fmt = (n: number) => "₦" + n.toLocaleString("en-NG");

function ProgressBar({ value, color }: { value: number; color: string }) {
  const isOver = value > 100;
  return (
    <div className="h-1.5 w-full rounded-full bg-rayo-muted overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.min(value, 100)}%`, backgroundColor: isOver ? "#ef4444" : color + "CC" }}
      />
    </div>
  );
}

function SummaryCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="bg-white rounded-2xl border border-rayo-ash p-4 shadow-sm">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-rayo-beige-dark">{icon}</div>
      <p className="text-[11px] uppercase tracking-wide text-rayo-green/40">{label}</p>
      <p className="text-2xl font-bold text-rayo-green mt-1">{value}</p>
      <p className="text-xs text-rayo-green/45 mt-1">{sub}</p>
    </div>
  );
}

// Delete Modal

function DeleteModal({
  category,
  onCancel,
  onConfirm,
  deleting,
}: {
  category: string;
  onCancel: () => void;
  onConfirm: () => void;
  deleting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-base font-semibold text-rayo-green">Delete budget?</h3>
        <p className="mt-2 text-sm text-rayo-green/60">
          The <span className="font-medium text-rayo-green">"{category}"</span> budget will be permanently removed. This cannot be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-rayo-green/10 py-2.5 text-sm font-medium text-rayo-green transition hover:bg-rayo-beige"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-60"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Budget Modal (Create / Edit)

interface BudgetModalProps {
  initial?: Budget;
  categories: Category[];
  onClose: () => void;
  onSave: (payload: {
    name: string;
    categoryId?: number;
    category?: string;
    parentSlug?: string;
    monthlyLimit: number;
    rollover: boolean;
  }) => Promise<void>;
}

function BudgetModal({ initial, categories, onClose, onSave }: BudgetModalProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [selectedCategory, setSelectedCategory] = useState<CategoryPickerValue>(
    initial?.categoryId
      ? { type: "existing", category: categories.find((c) => c.id === initial.categoryId)! }
      : null
  );
  const [limitStr, setLimitStr] = useState(
    initial ? initial.monthlyLimit.toLocaleString("en-NG") : ""
  );
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  async function handleSubmit() {
    const limit = Number(limitStr.replace(/,/g, ""));
    if (!name.trim())         return setError("Budget name is required.");
    if (!selectedCategory)    return setError("Please select a category.");
    if (!limit || limit <= 0) return setError("Enter a valid monthly limit.");
    setError(null);
    setSaving(true);
    try {
      const categoryPayload =
        selectedCategory.type === "existing"
          ? { categoryId: selectedCategory.category.id }
          : { category: selectedCategory.name, parentSlug: selectedCategory.parentSlug };

      await onSave({ name: name.trim(), ...categoryPayload, monthlyLimit: limit, rollover: true });
      onClose();
    } catch (e: any) {
      setError(e?.message || "Failed to save budget");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-rayo-green">
            {initial ? "Edit Budget" : "New Budget"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-rayo-green/40 hover:text-rayo-green transition">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Budget name */}
          <div>
            <label className="block text-xs font-medium text-rayo-green/60 mb-1.5">
              Budget Name <span className="text-red-400">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Monthly Groceries, Fuel Money, Netflix"
              className="w-full h-11 px-3 rounded-xl border border-rayo-ash text-sm text-rayo-green bg-white focus:outline-none focus:ring-2 focus:ring-rayo-green/20"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-rayo-green/60 mb-1.5">
              Category <span className="text-red-400">*</span>
            </label>
            {initial ? (
              <div className="h-11 px-3 rounded-xl border border-rayo-ash bg-rayo-muted text-sm text-rayo-green/50 flex items-center">
                {initial.categoryName ?? initial.categoryName ?? "Unknown"}
              </div>
            ) : (
              <CategoryPicker
                categories={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
            )}
            {initial && (
              <p className="text-[11px] text-rayo-green/40 mt-1">Category cannot be changed after creation.</p>
            )}
          </div>

          {/* Monthly limit */}
          <div>
            <label className="block text-xs font-medium text-rayo-green/60 mb-1.5">Monthly Limit</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-rayo-green/40 font-medium">₦</span>
              <input
                value={limitStr}
                onChange={(e) => {
                  const digits = e.target.value.replace(/[^0-9]/g, "");
                  setLimitStr(digits ? Number(digits).toLocaleString("en-NG") : "");
                }}
                placeholder="0"
                className="w-full h-11 pl-7 pr-3 rounded-xl border border-rayo-ash text-sm text-rayo-green bg-white focus:outline-none focus:ring-2 focus:ring-rayo-green/20"
              />
            </div>
          </div>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}

        <div className="flex gap-2 pt-1">
          <button onClick={onClose}
            className="flex-1 h-11 rounded-xl border border-rayo-ash text-sm text-rayo-green/60 hover:bg-rayo-muted transition">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={saving}
            className="flex-1 h-11 rounded-xl bg-rayo-green text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-rayo-green/90 transition disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            {saving ? "Saving…" : "Save Budget"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Overview");
  const [budgets, setBudgets]     = useState<Budget[]>([]);
  const [loading, setLoading]     = useState(true);
  const [errorMsg, setErrorMsg]   = useState<string | null>(null);

  // undefined = closed, null = create, Budget = edit
  const [modalTarget, setModalTarget]   = useState<Budget | null | undefined>(undefined);
  // null = closed, Budget = pending delete
  const [deleteTarget, setDeleteTarget] = useState<Budget | null>(null);
  const [deleting, setDeleting]         = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await fetchBudgets();
      setBudgets(data);
    } catch {
      setErrorMsg("Failed to load your budgets. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleSave(payload: {
    categoryId?: number;
    category?: string;
    parentSlug?: string;
    monthlyLimit: number;
    rollover: boolean;
  }) {
    if (modalTarget) {
      const updated = await updateBudget(modalTarget.id, { monthlyLimit: payload.monthlyLimit });
      setBudgets((prev) => prev.map((b) => (b.id === modalTarget.id ? { ...b, ...updated } : b)));
    } else {
      const created = await createBudget(payload);
      setBudgets((prev) => [...prev, created]);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await deleteBudget(deleteTarget.id);
      setBudgets((prev) => prev.filter((b) => b.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (e: any) {
      alert(e.message || "Failed to delete budget.");
    } finally {
      setDeleting(false);
    }
  }

  const totalBudgeted  = budgets.reduce((s, b) => s + b.monthlyLimit, 0);
  const totalSpent     = budgets.reduce((s, b) => s + b.totalSpent, 0);
  const totalRemaining = budgets.reduce((s, b) => s + b.remaining, 0);
  const avgUsed        = totalBudgeted === 0 ? 0 : Math.round((totalSpent / totalBudgeted) * 100);
  const overBudgetCount = budgets.filter((b) => b.percentUsed > 100).length;

  return (
    <>
      {/* Modals rendered at root — never clipped by overflow:hidden containers */}
      {modalTarget !== undefined && (
        <BudgetModal
          initial={modalTarget ?? undefined}
          categories={categories}
          onClose={() => setModalTarget(undefined)}
          onSave={handleSave}
        />
      )}
      {deleteTarget && (
        <DeleteModal
          category={getBudgetCategoryLabel(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          deleting={deleting}
        />
      )}

      <div className="min-h-screen bg-gradient-to-b from-rayo-beige/20 to-white rounded-2xl">
        <div className="max-w-[1450px] mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-col 2xl:flex-row gap-6">

            {/* ── Main ── */}
            <main className="flex-1 space-y-5 min-w-0">

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-rayo-green">Monthly Budget</h1>
                  <p className="text-sm text-rayo-green/50 mt-1">Track, control, and optimize your spending.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <DateRange />
                  <button
                    onClick={() => setModalTarget(null)}
                    className="h-11 px-4 rounded-xl bg-rayo-green text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-rayo-green/90 transition"
                  >
                    <Plus size={14} /> Create Budget
                  </button>
                </div>
              </div>

              {/* Tabs */}
              {/* <div className="flex overflow-x-auto border-b border-rayo-ash bg-white/60 backdrop-blur-sm rounded-t-xl">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-4 py-3 text-sm whitespace-nowrap border-b-2 transition",
                      activeTab === tab
                        ? "border-rayo-green text-rayo-green font-medium"
                        : "border-transparent text-rayo-green/40"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div> */}

              {errorMsg && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-center gap-2">
                  {errorMsg}
                  <button onClick={load} className="ml-auto flex items-center gap-1 text-red-400 hover:text-red-600 text-xs">
                    <RefreshCcw size={12} /> Retry
                  </button>
                </div>
              )}

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                <SummaryCard label="Budgeted"    value={fmt(totalBudgeted)}  sub="Total allocation"            icon={<Wallet      size={16} className="text-rayo-green"  />} />
                <SummaryCard label="Spent"       value={fmt(totalSpent)}     sub={`${avgUsed}% of budget used`} icon={<ArrowUpRight size={16} className="text-rayo-red"    />} />
                <SummaryCard label="Remaining"   value={fmt(totalRemaining)} sub="Across all categories"       icon={<PiggyBank   size={16} className="text-emerald-600" />} />
                <SummaryCard
                  label="Over Budget"
                  value={String(overBudgetCount)}
                  sub={overBudgetCount === 0 ? "All categories on track" : `${overBudgetCount} categor${overBudgetCount === 1 ? "y" : "ies"} exceeded`}
                  icon={<TrendingUp size={16} className={overBudgetCount > 0 ? "text-red-500" : "text-blue-500"} />}
                />
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-rayo-ash overflow-hidden shadow-sm">
                <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_2fr_1fr_auto] px-5 py-3 bg-rayo-muted text-[10px] text-rayo-green/40 uppercase tracking-wider">
                  <span>Category</span>
                  <span>Monthly Limit</span>
                  <span>Spent</span>
                  <span>Progress</span>
                  <span>Remaining</span>
                  <span className="w-16" />
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 size={24} className="animate-spin text-rayo-green/40" />
                  </div>
                ) : budgets.length === 0 ? (
                  <div className="text-center py-16 text-sm text-rayo-green/40">
                    No budgets yet. Tap "Create Budget" to set your spending limits.
                  </div>
                ) : (
                  <div className="divide-y divide-rayo-ash">
                    {budgets.map((b, i) => {
                      const color  = getCategoryColor(i);
                      const label  = getBudgetCategoryLabel(b);
                      const emoji  = b.categoryEmoji ?? getCategoryEmoji(label);
                      const isOver = b.percentUsed > 100;

                      return (
                        <div key={b.id} className="p-4 lg:p-5 hover:bg-rayo-muted/30 transition group">

                          {/* Desktop */}
                          <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_2fr_1fr_auto] items-center">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: color + "22" }}>
                                {emoji}
                              </div>
                              <div>
                                <p className="font-medium text-rayo-green">{label}</p>
                                {b.rollover && <p className="text-[11px] text-rayo-green/40">Rollover enabled</p>}
                              </div>
                            </div>
                            <span className="text-sm text-rayo-green">{fmt(b.monthlyLimit)}</span>
                            <span className="text-sm text-rayo-green">{fmt(b.totalSpent)}</span>
                            <div className="flex items-center gap-3 pr-4">
                              <ProgressBar value={b.percentUsed} color={color} />
                              <span className={cn("text-xs w-10 text-right", isOver ? "text-red-500 font-medium" : "text-rayo-green/60")}>
                                {Math.round(b.percentUsed)}%
                              </span>
                            </div>
                            <span className={cn("text-sm font-medium", b.remaining >= 0 ? "text-emerald-600" : "text-red-500")}>
                              {fmt(b.remaining)}
                            </span>
                            {/* Actions always at root level — not nested inside overflow containers */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition w-16 justify-end">
                              <button
                                onClick={() => setModalTarget(b)}
                                className="p-1.5 rounded-lg text-rayo-green/40 hover:text-rayo-green transition"
                              >
                                <Pencil size={13} />
                              </button>
                              <button
                                onClick={() => setDeleteTarget(b)}
                                className="p-1.5 rounded-lg text-rayo-green/40 hover:text-red-500 transition"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>

                          {/* Mobile */}
                          <div className="lg:hidden space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ backgroundColor: color + "22" }}>
                                  {emoji}
                                </div>
                                <div>
                                  <p className="font-medium text-rayo-green">{label}</p>
                                  {b.rollover && <p className="text-[11px] text-rayo-green/40">Rollover enabled</p>}
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <button onClick={() => setModalTarget(b)} className="p-1.5 rounded-lg text-rayo-green/40 hover:text-rayo-green transition">
                                  <Pencil size={13} />
                                </button>
                                <button onClick={() => setDeleteTarget(b)} className="p-1.5 rounded-lg text-rayo-green/40 hover:text-red-500 transition">
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                            <ProgressBar value={b.percentUsed} color={color} />
                            <div className="grid grid-cols-3 text-xs text-rayo-green/60">
                              <span>{fmt(b.monthlyLimit)}</span>
                              <span>{fmt(b.totalSpent)}</span>
                              <span className={cn("text-right font-medium", b.remaining >= 0 ? "text-emerald-600" : "text-red-500")}>
                                {fmt(b.remaining)}
                              </span>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </main>

            {/* ── Sidebar ── */}
            <aside className="w-full 2xl:w-[340px] flex flex-col gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-rayo-green to-rayo-green-dark text-white p-5">
                <p className="text-xs text-white/60 flex items-center gap-1"><Sparkles size={12} /> Rayo Intelligence</p>
                <p className="text-xl font-bold mt-2">
                  {overBudgetCount === 0 ? "Looking good 💪" : `${overBudgetCount} over budget`}
                </p>
                <p className="text-sm text-white/70 mt-1">
                  {overBudgetCount === 0
                    ? "You're within limits across all categories."
                    : "Some categories need attention this month."}
                </p>
              </div>

              <div className="bg-white border border-rayo-ash rounded-2xl p-5 shadow-sm space-y-3">
                <p className="text-sm font-semibold text-rayo-green">Budget Breakdown</p>
                {loading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 size={20} className="animate-spin text-rayo-green/30" />
                  </div>
                ) : budgets.length === 0 ? (
                  <p className="text-xs text-rayo-green/40">No budgets to display.</p>
                ) : (
                  budgets.map((b, i) => (
                    <div key={b.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-rayo-green/70">{getBudgetCategoryLabel(b)}</span>
                        <span className="text-xs text-rayo-green/50">{Math.round(b.percentUsed)}%</span>
                      </div>
                      <ProgressBar value={b.percentUsed} color={getCategoryColor(i)} />
                    </div>
                  ))
                )}
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}