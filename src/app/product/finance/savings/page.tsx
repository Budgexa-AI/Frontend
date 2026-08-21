"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Plus, Car, ShieldCheck, Home, Palmtree, Monitor, PiggyBank,
  Star, MoreHorizontal, TrendingUp, ChevronRight, Target, BarChart3,
  Trash2, Loader2, RefreshCcw, AlertCircle,
} from "lucide-react";
import { cn, formatCurrency, formatCurrencyCompact } from "@/lib/utils";
import Link from "next/link";
import {
  fetchSavingsGoals,
  deleteSavingsGoal,
} from "@/lib/data-service";
import type { SavingsGoalRow } from "@/lib/api-client";
import { useCurrentUser } from "@/hooks/useUser";

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

/** Format "YYYY-MM-DD" → "Dec 2026" */
function fmtDeadline(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-NG", { month: "short", year: "numeric" });
}

// ─────────────────────────────────────────────────────────────
// Icon mapping — keyed by lowercase first word of goal name
// as a best-effort guess; falls back to PiggyBank
// ─────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  car: Car, emergency: ShieldCheck, house: Home,
  vacation: Palmtree, macbook: Monitor, laptop: Monitor,
  phone: Monitor, savings: PiggyBank,
};

const ICON_BG_MAP: Record<string, string> = {
  car: "bg-blue-50 text-blue-500",
  emergency: "bg-emerald-50 text-emerald-600",
  house: "bg-orange-50 text-orange-500",
  vacation: "bg-cyan-50 text-cyan-500",
  macbook: "bg-purple-50 text-purple-500",
  laptop: "bg-purple-50 text-purple-500",
  phone: "bg-purple-50 text-purple-500",
};

function resolveIcon(name: string): { Icon: React.ElementType; bg: string } {
  const key = name.split(" ")[0].toLowerCase();
  return {
    Icon: ICON_MAP[key] ?? PiggyBank,
    bg:   ICON_BG_MAP[key] ?? "bg-Budgexa-beige-light text-Budgexa-green",
  };
}

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

function GoalIcon({ name }: { name: string }) {
  const { Icon, bg } = resolveIcon(name);
  return (
    <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0", bg)}>
      <Icon size={16} />
    </div>
  );
}

function SummaryCard({ icon, label, value, sub, bg }: {
  icon: React.ReactNode; label: string; value: string; sub: string; bg: string;
}) {
  return (
    <div className="bg-white rounded-2xl px-4 py-3 border border-[#EFEFE8]">
      <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center mb-2", bg)}>
        {icon}
      </div>
      <p className="text-[10px] font-medium uppercase tracking-wide text-Budgexa-green/40">{label}</p>
      <p className="text-[24px] font-bold text-Budgexa-green leading-none mt-1">{value}</p>
      <p className="text-[11px] text-Budgexa-green/45 mt-1">{sub}</p>
    </div>
  );
}

function GoalRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-3.5 animate-pulse">
      <div className="h-9 w-9 rounded-lg bg-[#EEF0EA] shrink-0" />
      <div className="w-44 shrink-0 space-y-1.5">
        <div className="h-3 w-28 rounded bg-[#EEF0EA]" />
        <div className="h-2.5 w-20 rounded bg-[#EEF0EA]" />
      </div>
      <div className="flex-1 space-y-1.5">
        <div className="h-1.5 rounded-full bg-[#EEF0EA]" />
        <div className="h-2.5 w-32 rounded bg-[#EEF0EA]" />
      </div>
      <div className="w-10 shrink-0"><div className="h-3 w-8 rounded bg-[#EEF0EA] mx-auto" /></div>
      <div className="w-20 shrink-0 space-y-1 text-right">
        <div className="h-2.5 w-10 rounded bg-[#EEF0EA] ml-auto" />
        <div className="h-3 w-14 rounded bg-[#EEF0EA] ml-auto" />
      </div>
      <div className="h-7 w-7 rounded-lg bg-[#EEF0EA] shrink-0" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Delete Modal — at root, never clipped by overflow:hidden
// ─────────────────────────────────────────────────────────────

function DeleteModal({ name, onCancel, onConfirm, deleting }: {
  name: string; onCancel: () => void; onConfirm: () => void; deleting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-base font-semibold text-Budgexa-green">Delete goal?</h3>
        <p className="mt-2 text-sm text-Budgexa-green/60">
          The <span className="font-medium text-Budgexa-green">"{name}"</span> goal will be permanently removed. This cannot be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-Budgexa-green/10 py-2.5 text-sm font-medium text-Budgexa-green transition hover:bg-Budgexa-beige"
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

// ─────────────────────────────────────────────────────────────
// Donut Chart
// ─────────────────────────────────────────────────────────────

const R = 50;
const C = 2 * Math.PI * R;

function OverallDonut({ percentage }: { percentage: number }) {
  const filled = (percentage / 100) * C;
  return (
    <svg viewBox="10 0 120 120" className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
      <circle cx="65" cy="60" r={R} fill="none" stroke="#EEF0EA" strokeWidth="10" />
      <circle
        cx="65" cy="60" r={R} fill="none" stroke="#2F6B2F" strokeWidth="10"
        strokeDasharray={`${filled} ${C - filled}`} strokeLinecap="round"
      />
      <text x="60" y="56" textAnchor="middle" style={{ transform: "rotate(90deg)", transformOrigin: "60px 60px", fontSize: "24px", fontWeight: 700, fill: "#254F22" }}>
        {percentage}%
      </text>
      <text x="60" y="72" textAnchor="middle" style={{ transform: "rotate(90deg)", transformOrigin: "60px 60px", fontSize: "16px", fill: "#6B7B69" }}>
        overall
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────

export default function SavingsGoalsPage() {
  const [goals, setGoals]             = useState<SavingsGoalRow[]>([]);
  const [loading, setLoading]         = useState(true);
  const [errorMsg, setErrorMsg]       = useState<string | null>(null);
  const [openMenuId, setOpenMenuId]   = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SavingsGoalRow | null>(null);
  const [deleting, setDeleting]       = useState(false);
  const { profile } = useCurrentUser();
  const currency = profile?.currency ?? "NGN";
  const menuRef = useRef<HTMLDivElement>(null);

  // ── Close menu on outside click ───────────────────────────
  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setOpenMenuId(null);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  // ── Fetch ─────────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const rows = await fetchSavingsGoals();
      setGoals(rows);
    } catch (e: any) {
      setErrorMsg(e.message || "Failed to load your goals. Please check your connection.");
      setGoals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── Delete ────────────────────────────────────────────────
  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    // Optimistic update
    setGoals((prev) => prev.filter((g) => g.id !== deleteTarget.id));
    setDeleteTarget(null);
    try {
      await deleteSavingsGoal(deleteTarget.id);
    } catch {
      load(); // roll back on failure
    } finally {
      setDeleting(false);
    }
  }

  // ── Derived stats ─────────────────────────────────────────
  const totalSaved   = goals.reduce((s, g) => s + g.currentAmount, 0);
  const totalTarget  = goals.reduce((s, g) => s + g.targetAmount, 0);
  const avgProgress  = goals.length === 0
    ? 0
    : Math.round(goals.reduce((s, g) => s + g.percentComplete, 0) / goals.length);

  return (
    <>
      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.name}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          deleting={deleting}
        />
      )}

      <div className="max-w-[1180px] pt-8 mx-auto space-y-5">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-Budgexa-green tracking-tight">Savings Goals</h1>
            <p className="text-sm text-Budgexa-green/50 mt-1">Track your progress and achieve your financial dreams.</p>
          </div>
          <Link
            href="/product/finance/savings/new"
            className="h-10 px-4 rounded-xl bg-Budgexa-green text-white text-sm font-medium hover:bg-Budgexa-green-dark transition-colors flex items-center gap-2 shrink-0"
          >
            <Plus size={14} /> New Goal
          </Link>
        </div>

        {/* ── Error banner ── */}
        {errorMsg && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            <AlertCircle size={15} className="text-red-500 shrink-0" />
            <p className="text-sm text-red-700 flex-1">{errorMsg}</p>
            <button onClick={load} className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline shrink-0">
              <RefreshCcw size={12} /> Retry
            </button>
          </div>
        )}

        {/* ── Summary cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <SummaryCard label="Total Goals"   value={loading ? "—" : String(goals.length)} sub="Active goals"     bg="bg-Budgexa-beige-light" icon={<Target     size={14} className="text-Budgexa-green"   />} />
          <SummaryCard label="Total Saved"   value={loading ? "—" : formatCurrencyCompact(totalSaved, currency)}  sub="Across all goals" bg="bg-emerald-50"      icon={<PiggyBank  size={14} className="text-emerald-600" />} />
          <SummaryCard label="Total Target"  value={loading ? "—" : formatCurrencyCompact(totalTarget, currency)} sub="Goal amount"      bg="bg-blue-50"         icon={<TrendingUp size={14} className="text-blue-500"    />} />
          <SummaryCard label="Avg. Progress" value={loading ? "—" : `${avgProgress}%`}    sub="Across all goals" bg="bg-orange-50"       icon={<BarChart3  size={14} className="text-orange-500"  />} />
        </div>

        {/* ── Overview ── */}
        <div className="bg-white rounded-2xl border border-[#EFEFE8] p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-Budgexa-green">Goals Overview</h2>
            <button className="flex items-center gap-1 text-xs font-medium text-Budgexa-green/50 hover:text-Budgexa-green transition-colors">
              View Analytics <ChevronRight size={13} />
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32 text-Budgexa-green/30">
              <Loader2 size={22} className="animate-spin" />
            </div>
          ) : goals.length === 0 ? (
            <p className="text-sm text-Budgexa-green/40 text-center py-8">No savings goals yet. Create your first one!</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
              {/* Donut */}
              <div className="flex flex-col items-center justify-center">
                <div className="h-28 w-28"><OverallDonut percentage={avgProgress} /></div>
                <div className="text-center mt-3">
                  <p className="text-xl font-bold text-Budgexa-green">{formatCurrency(totalSaved, currency)}</p>
                  <p className="text-xs text-Budgexa-green/45 mt-1">of {formatCurrency(totalTarget, currency)}</p>
                </div>
              </div>

              {/* Progress list */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-Budgexa-green/45 mb-5">
                  Progress by Goal
                </p>
                <div className="space-y-4">
                  {goals.map((g) => (
                    <div key={g.id}>
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-xs font-medium text-Budgexa-green">{g.name}</p>
                        <p className="text-xs font-semibold text-Budgexa-green">{g.percentComplete}%</p>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#EEF0EA] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${Math.min(g.percentComplete, 100)}%`, background: "#3E7B3E" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Goals List ── */}
        <div className="bg-white rounded-2xl border border-[#EFEFE8] overflow-hidden">
          <div className="px-5 pt-5 pb-4 border-b border-[#EFEFE8]">
            <h2 className="text-lg font-semibold text-Budgexa-green">All Goals</h2>
          </div>

          <div className="divide-y divide-[#F1F3EE]">
            {loading ? (
              <><GoalRowSkeleton /><GoalRowSkeleton /><GoalRowSkeleton /></>
            ) : goals.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-Budgexa-green/35">
                <PiggyBank size={32} />
                <p className="text-sm">You have no savings goals yet.</p>
              </div>
            ) : (
              goals.map((goal) => (
                <div
                  key={goal.id}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#FAFBF8] transition-colors"
                >
                  <GoalIcon name={goal.name} />

                  {/* Name */}
                  <div className="w-44 shrink-0">
                    <p className="text-sm font-semibold text-Budgexa-green leading-tight">{goal.name}</p>
                    <p className="text-[11px] text-Budgexa-green/40 mt-0.5">{fmtDeadline(goal.deadline)}</p>
                  </div>

                  {/* Progress bar */}
                  <div className="flex-1 min-w-0">
                    <div className="h-1.5 rounded-full bg-[#EEF0EA] overflow-hidden mb-1.5">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(goal.percentComplete, 100)}%`, background: "#3E7B3E" }}
                      />
                    </div>
                    <p className="text-[11px] text-Budgexa-green/50 font-medium truncate">
                      {formatCurrency(goal.currentAmount, currency)} / {formatCurrency(goal.targetAmount, currency)}
                    </p>
                  </div>

                  {/* Percentage */}
                  <div className="w-10 shrink-0 text-center">
                    <p className="text-sm font-semibold text-Budgexa-green">{goal.percentComplete}%</p>
                  </div>

                  {/* Target date */}
                  <div className="w-20 shrink-0 text-right">
                    <p className="text-[10px] uppercase tracking-wide text-Budgexa-green/35">Target</p>
                    <p className="text-xs font-medium text-Budgexa-green mt-0.5">{fmtDeadline(goal.deadline)}</p>
                  </div>

                  {/* Menu */}
                  <div className="relative" ref={goal.id === openMenuId ? menuRef : undefined}>
                    <button
                      onClick={() => setOpenMenuId(openMenuId === goal.id ? null : goal.id)}
                      className="p-1.5 rounded-lg text-Budgexa-green/30 hover:text-Budgexa-green hover:bg-Budgexa-beige transition-colors shrink-0"
                    >
                      <MoreHorizontal size={15} />
                    </button>
                    {openMenuId === goal.id && (
                      <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-md border border-Budgexa-ash z-50 min-w-[120px]">
                        <button
                          onClick={() => { setDeleteTarget(goal); setOpenMenuId(null); }}
                          className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-3 rounded-lg"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-[#EFEFE8]">
            <Link
              href="/product/finance/savings/new"
              className="w-full h-11 rounded-xl border border-dashed border-Budgexa-green text-sm font-medium text-Budgexa-green/60 hover:bg-[#FAFBF8] transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={14} /> Create New Goal
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}