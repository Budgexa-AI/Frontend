"use client";

import React, { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  Wallet,
  PieChart,
  Layers,
  Target,
  ArrowLeft,
  ChevronRight,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createBudget } from "@/lib/api-client/src/client";
import { CATEGORIES } from "@/lib/category";

type Mode = "guided" | "zero" | "envelope" | "hybrid";
type HybridSub = "zero" | "envelope";
type OverspendBehavior = "block" | "warn" | "allow";

// ─── Shared helpers ────────────────────────────────────────────────────────────

function fmt(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

// ─── Zero-Based Editor ────────────────────────────────────────────────────────

interface Cat {
  name: string;
  value: number;
}

function ZeroBasedEditor({ income }: { income: number }) {
  const [cats, setCats] = useState<Cat[]>([
    { name: "Rent", value: 0 },
    { name: "Food", value: 0 },
  ]);

  const total = cats.reduce((a, c) => a + c.value, 0);
  const remaining = income - total;

  const update = (i: number, field: keyof Cat, val: string | number) => {
    setCats((prev) => {
      const copy = [...prev];
      copy[i] = { ...copy[i], [field]: val };
      return copy;
    });
  };

  return (
    <div className="space-y-3">
      {cats.map((c, i) => (
        <div key={i} className="flex items-center gap-3">
          <input
            className="flex-1 border border-[#E4E9E0] rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rayo-green/20"
            value={c.name}
            onChange={(e) => update(i, "name", e.target.value)}
          />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-rayo-green/40 text-sm">₦</span>
            <input
              type="number"
              min={0}
              className="w-36 border border-[#E4E9E0] rounded-xl pl-7 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rayo-green/20"
              value={c.value || ""}
              onChange={(e) => update(i, "value", Number(e.target.value))}
            />
          </div>
        </div>
      ))}

      <button
        className="text-sm text-rayo-green/60 hover:text-rayo-green transition-colors flex items-center gap-1"
        onClick={() => setCats((p) => [...p, { name: "New Category", value: 0 }])}
      >
        + Add category
      </button>

      <div
        className={cn(
          "flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium",
          remaining < 0
            ? "bg-red-50 text-red-600"
            : remaining === 0
            ? "bg-emerald-50 text-emerald-700"
            : "bg-[#F3F6F0] text-rayo-green/70"
        )}
      >
        <span>Remaining to assign</span>
        <span>{fmt(remaining)}</span>
      </div>
    </div>
  );
}

// ─── Envelope Editor ──────────────────────────────────────────────────────────

interface Env {
  name: string;
  limit: number;
}

function EnvelopeEditor({ income }: { income: number }) {
  const [envs, setEnvs] = useState<Env[]>([
    { name: "Food", limit: 0 },
    { name: "Transport", limit: 0 },
  ]);

  const total = envs.reduce((a, e) => a + e.limit, 0);
  const remaining = income - total;

  const update = (i: number, field: keyof Env, val: string | number) => {
    setEnvs((prev) => {
      const copy = [...prev];
      copy[i] = { ...copy[i], [field]: val };
      return copy;
    });
  };

  return (
    <div className="space-y-3">
      {envs.map((e, i) => (
        <div key={i} className="flex items-center gap-3">
          <input
            className="flex-1 border border-[#E4E9E0] rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rayo-green/20"
            value={e.name}
            onChange={(ev) => update(i, "name", ev.target.value)}
          />
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-rayo-green/40 text-sm">₦</span>
            <input
              type="number"
              min={0}
              className="w-36 border border-[#E4E9E0] rounded-xl pl-7 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rayo-green/20"
              value={e.limit || ""}
              onChange={(ev) => update(i, "limit", Number(ev.target.value))}
            />
          </div>
        </div>
      ))}

      <button
        className="text-sm text-rayo-green/60 hover:text-rayo-green transition-colors flex items-center gap-1"
        onClick={() => setEnvs((p) => [...p, { name: "New Envelope", limit: 0 }])}
      >
        + Add envelope
      </button>

      <div
        className={cn(
          "flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium",
          remaining < 0
            ? "bg-red-50 text-red-600"
            : remaining === 0
            ? "bg-emerald-50 text-emerald-700"
            : "bg-[#F3F6F0] text-rayo-green/70"
        )}
      >
        <span>Remaining to allocate</span>
        <span>{fmt(remaining)}</span>
      </div>
    </div>
  );
}

// ─── 50/30/20 Allocation Editor ───────────────────────────────────────────────

function GuidedEditor({ income }: { income: number }) {
  const defaults = [
    { label: "Needs (50%)", key: "needs", pct: 0.5 },
    { label: "Wants (30%)", key: "wants", pct: 0.3 },
    { label: "Savings (20%)", key: "savings", pct: 0.2 },
  ];

  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(defaults.map((d) => [d.key, Math.round(income * d.pct)]))
  );

  const total = Object.values(values).reduce((a, v) => a + v, 0);
  const diff = income - total;

  return (
    <div className="space-y-3">
      {defaults.map((d) => (
        <div key={d.key} className="flex items-center justify-between gap-4">
          <span className="text-sm text-rayo-green/80 font-medium w-36">{d.label}</span>
          <div className="flex-1 h-1.5 rounded-full bg-[#EEF2EB] overflow-hidden">
            <div
              className="h-full rounded-full bg-rayo-green/50 transition-all"
              style={{ width: `${Math.min((values[d.key] / income) * 100, 100)}%` }}
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-rayo-green/40 text-sm">₦</span>
            <input
              type="number"
              min={0}
              className="w-36 border border-[#E4E9E0] rounded-xl pl-7 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rayo-green/20"
              value={values[d.key] || ""}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, [d.key]: Number(e.target.value) }))
              }
            />
          </div>
        </div>
      ))}

      <div
        className={cn(
          "flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium mt-1",
          Math.abs(diff) > 0
            ? "bg-amber-50 text-amber-700"
            : "bg-emerald-50 text-emerald-700"
        )}
      >
        <span>{diff === 0 ? "Fully allocated ✓" : diff > 0 ? "Still unallocated" : "Over-allocated"}</span>
        <span>{diff !== 0 ? fmt(Math.abs(diff)) : ""}</span>
      </div>
    </div>
  );
}

// ─── Step progress bar ─────────────────────────────────────────────────────────

const STEPS = [
  { step: 1, title: "Mode", desc: "Choose budgeting style" },
  { step: 2, title: "Income", desc: "Enter monthly income" },
  { step: 3, title: "Allocation", desc: "Distribute your budget" },
  { step: 4, title: "Controls", desc: "Set spending rules" },
];

function StepIndicator({ current }: { current: number }) {
  const currentStep = STEPS.find((s) => s.step === current);
  const progress = (current / STEPS.length) * 100;

  return (
    <>
      {/* MOBILE */}
      <div className="mt-6 md:hidden space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-rayo-green/45">
              Step {current} of {STEPS.length}
            </p>

            <h3 className="mt-1 text-sm font-semibold text-rayo-green">
              {currentStep?.title}
            </h3>

            <p className="mt-0.5 text-xs text-rayo-green/45">
              {currentStep?.desc}
            </p>
          </div>

          <div className="w-9 h-9 rounded-full bg-rayo-green text-white flex items-center justify-center text-sm font-semibold shrink-0">
            {current}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-[#EEF2EB] overflow-hidden">
          <div
            className="h-full rounded-full bg-rayo-green transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:grid mt-8 grid-cols-4 gap-3">
        {STEPS.map(({ step, title, desc }) => {
          const active = current === step;
          const completed = current > step;

          return (
            <div
              key={step}
              className={cn(
                "rounded-xl border p-4 flex items-start gap-3 transition-all",
                active
                  ? "border-[#C8D9C0] bg-white shadow-sm"
                  : "border-[#EEF2EB] bg-white/60"
              )}
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5",
                  active || completed
                    ? "bg-rayo-green text-white"
                    : "bg-[#F3F5F1] text-rayo-green/50"
                )}
              >
                {completed ? <Check size={13} /> : step}
              </div>

              <div>
                <p className="text-sm font-semibold text-rayo-green">
                  {title}
                </p>

                <p className="mt-0.5 text-xs text-rayo-green/45">
                  {desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BudgetSetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<Mode | null>(null);
  const [hybridSub, setHybridSub] = useState<HybridSub>("zero");

  // Use a string so the user can type freely (e.g. "50000") without
  // the input resetting mid-entry when we coerce to Number.
  const [incomeStr, setIncomeStr] = useState("");
  const income = parseFloat(incomeStr.replace(/,/g, "")) || 0;
  const incomeInputRef = useRef<HTMLInputElement>(null);

  const handleIncomeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const cursorPos = e.currentTarget.selectionStart || 0;
    
    // Allow only digits; strip formatting on change
    const raw = e.target.value.replace(/[^0-9]/g, "");
    // Re-format with commas as user types
    const formatted = raw ? Number(raw).toLocaleString("en-NG") : "";
    
    setIncomeStr(formatted);

    // Restore focus and cursor position
    setTimeout(() => {
      if (incomeInputRef.current) {
        incomeInputRef.current.focus();
        // Calculate the new cursor position based on formatted length
        const oldLength = e.target.value.length;
        const newLength = formatted.length;
        const diff = newLength - oldLength;
        const newPos = Math.max(0, cursorPos + diff);
        incomeInputRef.current.setSelectionRange(newPos, newPos);
      }
    }, 0);
  }, []);

  const [controls, setControls] = useState({
    rollover: true,
    overspend: "warn" as OverspendBehavior,
    aiReallocation: false,
  });

  const [budgetCategory, setBudgetCategory] = useState("School");
  const [monthlyLimit, setMonthlyLimit] = useState("75000");
  const [parentSlug, setParentSlug] = useState("entertainment");
  const [creatingBudget, setCreatingBudget] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleCreateBudget = useCallback(async () => {
    const limit = Number(monthlyLimit.replace(/,/g, ""));

    if (!budgetCategory.trim()) {
      setCreateError("Please enter a budget category.");
      return;
    }

    if (!Number.isFinite(limit) || limit <= 0) {
      setCreateError("Please enter a valid monthly limit.");
      return;
    }

    setCreatingBudget(true);
    setCreateError(null);

    try {
      await createBudget({
        monthlyLimit: limit,
        category: budgetCategory.trim(),
        ...(parentSlug ? { parentSlug } : {}),
      });

      router.push("/product/finance/budget");
      router.refresh();
    } catch (error: any) {
      setCreateError(error?.message || "Failed to create budget");
    } finally {
      setCreatingBudget(false);
    }
  }, [budgetCategory, monthlyLimit, parentSlug, router]);

  // ── Mode cards ────────────────────────────────────────────────────────────

  const MODES = [
    {
      id: "guided" as Mode,
      title: "50/30/20 Guided",
      desc: "We structure your money into needs, wants, and savings automatically.",
      icon: PieChart,
    },
    {
      id: "zero" as Mode,
      title: "Zero-Based Planner",
      desc: "Every naira gets a job — you assign each category manually.",
      icon: Target,
    },
    {
      id: "envelope" as Mode,
      title: "Envelope Control",
      desc: "Strict per-category spending limits with enforcement rules.",
      icon: Wallet,
    },
    {
      id: "hybrid" as Mode,
      title: "Hybrid System",
      desc: "Start with 50/30/20, then refine using zero-based or envelopes.",
      icon: Layers,
    },
  ];

  // ── Shared card wrapper ───────────────────────────────────────────────────

  function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
      <div
        className={cn(
          "bg-white border border-[#E7ECE3] rounded-2xl p-6 space-y-5",
          className
        )}
      >
        {children}
      </div>
    );
  }

  function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
      <h2 className="text-base font-semibold text-rayo-green">{children}</h2>
    );
  }

  return (
    <div className="min-h-screen mt-6 md:px-6 py-6 rounded-[20px] border border-[#E6ECE2] bg-white shadow-[0_10px_40px_rgba(15,23,42,0.03)]">
      <div className="w-full mx-auto">

        {/* Back to budget */}
        <Link
          href="/product/finance/budget"
          className="inline-flex items-center gap-1.5 text-sm text-rayo-green/55 hover:text-rayo-green transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Budget
        </Link>

        {/* Page title */}
        <div className="mt-4">
          <h1 className="text-2xl font-bold tracking-tight text-rayo-green">
            Create your budget system
          </h1>
          <p className="mt-1.5 text-sm text-rayo-green/50">
            Build how Rayo will structure and control your money
          </p>
        </div>

        {/* Step indicator */}
        <StepIndicator current={step} />

        {/* ══ STEP 1: MODE ══════════════════════════════════════════════════ */}
        {step === 1 && (
          <div className="mt-6">
            <Card>
              <SectionTitle>Choose your budgeting style</SectionTitle>

              <div className="grid gap-2.5">
                {MODES.map((m) => {
                  const Icon = m.icon;
                  const selected = mode === m.id;

                  return (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id)}
                      className={cn(
                        "flex items-center gap-4 w-full p-4 rounded-xl border text-left transition-all",
                        selected
                          ? "border-rayo-green/30 bg-rayo-green/5"
                          : "border-[#EEF2EB] hover:border-rayo-green/20 hover:bg-rayo-green/[0.03]"
                      )}
                    >
                      <div
                        className={cn(
                          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                          selected ? "bg-rayo-green text-white" : "bg-[#F3F6F0] text-rayo-green/60"
                        )}
                      >
                        <Icon size={17} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-rayo-green">{m.title}</p>
                        <p className="mt-0.5 text-xs text-rayo-green/45 leading-relaxed">{m.desc}</p>
                      </div>
                      {selected && (
                        <div className="w-5 h-5 rounded-full bg-rayo-green flex items-center justify-center shrink-0">
                          <Check size={11} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Hybrid sub-choice — only shown when hybrid is selected */}
              {mode === "hybrid" && (
                <div className="pt-2 border-t border-[#EEF2EB] space-y-3">
                  <p className="text-xs font-medium text-rayo-green/60 uppercase tracking-wider">
                    Pair 50/30/20 with…
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(["zero", "envelope"] as HybridSub[]).map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setHybridSub(sub)}
                        className={cn(
                          "flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all",
                          hybridSub === sub
                            ? "border-rayo-green/30 bg-rayo-green/5"
                            : "border-[#EEF2EB] hover:border-rayo-green/20"
                        )}
                      >
                        {sub === "zero" ? <Target size={15} /> : <Wallet size={15} />}
                        <div>
                          <p className="text-xs font-semibold text-rayo-green">
                            {sub === "zero" ? "Zero-Based" : "Envelopes"}
                          </p>
                          <p className="text-[11px] text-rayo-green/45 mt-0.5">
                            {sub === "zero"
                              ? "Assign every naira manually"
                              : "Hard limits per category"}
                          </p>
                        </div>
                        {hybridSub === sub && (
                          <Check size={13} className="ml-auto text-rayo-green shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button
                disabled={!mode}
                onClick={next}
                className="w-full flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
                <ArrowRight size={15} />
              </Button>
            </Card>
          </div>
        )}

        {/* ══ STEP 2: INCOME ════════════════════════════════════════════════ */}
        {step === 2 && (
          <div className="mt-6">
            <Card>
              <button
                onClick={back}
                className="inline-flex items-center gap-1.5 text-sm text-rayo-green/50 hover:text-rayo-green transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </button>

              <SectionTitle>Your monthly income</SectionTitle>

              <div className="space-y-2">
                <label className="text-sm font-medium text-rayo-green/80">
                  Total monthly budget
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rayo-green/40 font-medium text-sm select-none">
                    ₦
                  </span>
                  <input
                    ref={incomeInputRef}
                    type="text"
                    inputMode="numeric"
                    placeholder="e.g. 50,000"
                    value={incomeStr}
                    onChange={handleIncomeChange}
                    className="w-full h-12 rounded-2xl border border-[#E4E9E0] pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-rayo-green/20 focus:border-rayo-green/30 transition-all"
                  />
                </div>
                {income > 0 && (
                  <p className="text-xs text-rayo-green/50">
                    {fmt(income)} / month
                  </p>
                )}
              </div>

              {/* Quick preview when income is entered */}
              {income > 0 && (
                <div className="rounded-xl bg-[#F6F9F4] border border-[#EEF2EB] p-4 space-y-2">
                  <p className="text-xs font-medium text-rayo-green/60 uppercase tracking-wider">
                    Preview — 50/30/20 split
                  </p>
                  {[
                    { label: "Needs (50%)", val: income * 0.5 },
                    { label: "Wants (30%)", val: income * 0.3 },
                    { label: "Savings (20%)", val: income * 0.2 },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-xs text-rayo-green/70">{label}</span>
                      <span className="text-xs font-semibold text-rayo-green">
                        {fmt(Math.round(val))}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={next}
                disabled={income <= 0}
                className="w-full flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Generate allocation
                <ArrowRight size={15} />
              </Button>
            </Card>
          </div>
        )}

        {/* ══ STEP 3: ALLOCATION ════════════════════════════════════════════ */}
        {step === 3 && (
          <div className="mt-6 space-y-4">
            <Card>
              <button
                onClick={back}
                className="inline-flex items-center gap-1.5 text-sm text-rayo-green/50 hover:text-rayo-green transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </button>

              {/* 50/30/20 block — always shown for guided & hybrid */}
              {(mode === "guided" || mode === "hybrid") && (
                <div className="space-y-4">
                  <div>
                    <SectionTitle>50/30/20 allocation</SectionTitle>
                    <p className="mt-0.5 text-xs text-rayo-green/45">
                      Auto-generated from your income — adjust as needed.
                    </p>
                  </div>
                  <GuidedEditor income={income} />
                </div>
              )}

              {/* Zero-based block */}
              {(mode === "zero" || (mode === "hybrid" && hybridSub === "zero")) && (
                <div
                  className={cn(
                    "space-y-4",
                    mode === "hybrid" && "pt-5 border-t border-[#EEF2EB]"
                  )}
                >
                  <div>
                    <SectionTitle>
                      {mode === "hybrid"
                        ? "Then assign every naira"
                        : "Assign every naira"}
                    </SectionTitle>
                    <p className="mt-0.5 text-xs text-rayo-green/45">
                      Create categories and give each naira a specific job.
                    </p>
                  </div>
                  <ZeroBasedEditor income={mode === "hybrid" ? income * 0.5 : income} />
                </div>
              )}

              {/* Envelope block */}
              {(mode === "envelope" || (mode === "hybrid" && hybridSub === "envelope")) && (
                <div
                  className={cn(
                    "space-y-4",
                    mode === "hybrid" && "pt-5 border-t border-[#EEF2EB]"
                  )}
                >
                  <div>
                    <SectionTitle>
                      {mode === "hybrid" ? "Set envelope limits" : "Define spending limits"}
                    </SectionTitle>
                    <p className="mt-0.5 text-xs text-rayo-green/45">
                      {mode === "hybrid"
                        ? "Carve your 'needs' bucket into strict per-category caps."
                        : "Each envelope enforces a hard monthly spending cap."}
                    </p>
                  </div>
                  <EnvelopeEditor income={mode === "hybrid" ? income * 0.5 : income} />
                </div>
              )}

              <Button
                onClick={next}
                className="w-full flex items-center justify-center gap-2"
              >
                Configure controls
                <ArrowRight size={15} />
              </Button>
            </Card>
          </div>
        )}

        {/* ══ STEP 4: CONTROLS ══════════════════════════════════════════════ */}
        {step === 4 && (
          <div className="mt-6">
            <Card>
              <button
                onClick={back}
                className="inline-flex items-center gap-1.5 text-sm text-rayo-green/50 hover:text-rayo-green transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </button>

              <SectionTitle>Spending controls</SectionTitle>

              <div className="space-y-4 border-b border-[#EEF2EB] pb-5">
                <div>
                  <p className="text-sm font-medium text-rayo-green">Budget details</p>
                  <p className="text-xs text-rayo-green/45 mt-0.5">
                    These values become the request body sent to create your budget.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-rayo-green/45">
                      Category
                    </label>
                    <input
                      type="text"
                      value={budgetCategory}
                      onChange={(e) => setBudgetCategory(e.target.value)}
                      placeholder="School"
                      className="w-full h-12 rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] px-4 text-sm text-rayo-green outline-none focus:border-rayo-green/30"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-rayo-green/45">
                      Monthly Limit
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-rayo-green/40 font-medium text-sm select-none">
                        ₦
                      </span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={monthlyLimit}
                        onChange={(e) =>
                          setMonthlyLimit(e.target.value.replace(/[^0-9,]/g, ""))
                        }
                        placeholder="75,000"
                        className="w-full h-12 rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] pl-9 pr-4 text-sm text-rayo-green outline-none focus:border-rayo-green/30"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-rayo-green/45">
                      Parent slug <span className="font-normal lowercase">(optional)</span>
                    </label>
                    <select
                      value={parentSlug}
                      onChange={(e) => setParentSlug(e.target.value)}
                      className="w-full h-12 rounded-2xl border border-[#E4E9E0] bg-[#FBFCFA] px-4 text-sm text-rayo-green outline-none focus:border-rayo-green/30"
                    >
                      <option value="">No parent slug</option>
                      {CATEGORIES.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.emoji} {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {createError && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {createError}
                  </div>
                )}
              </div>

              {/* Rollover */}
              <div className="flex items-center justify-between py-3 border-b border-[#EEF2EB]">
                <div>
                  <p className="text-sm font-medium text-rayo-green">Envelope rollover</p>
                  <p className="text-xs text-rayo-green/45 mt-0.5">
                    Unspent money carries over into next month
                  </p>
                </div>
                <button
                  onClick={() =>
                    setControls((prev) => ({ ...prev, rollover: !prev.rollover }))
                  }
                  className={cn(
                    "w-11 h-6 flex items-center rounded-full p-0.5 transition-colors",
                    controls.rollover ? "bg-rayo-green" : "bg-[#DDE3D8]"
                  )}
                  role="switch"
                  aria-checked={controls.rollover}
                >
                  <div
                    className={cn(
                      "w-5 h-5 bg-white rounded-full shadow-sm transition-transform",
                      controls.rollover ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {/* Overspend behavior */}
              <div className="space-y-3 py-3 border-b border-[#EEF2EB]">
                <div>
                  <p className="text-sm font-medium text-rayo-green">Overspend behavior</p>
                  <p className="text-xs text-rayo-green/45 mt-0.5">
                    What happens when you exceed a category limit
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(["block", "warn", "allow"] as OverspendBehavior[]).map((opt) => {
                    const labels = {
                      block: { label: "Block", sub: "Decline transactions" },
                      warn: { label: "Warn", sub: "Alert but allow" },
                      allow: { label: "Allow", sub: "No restriction" },
                    };
                    const selected = controls.overspend === opt;

                    return (
                      <button
                        key={opt}
                        onClick={() =>
                          setControls((prev) => ({ ...prev, overspend: opt }))
                        }
                        className={cn(
                          "flex flex-col items-start p-3 rounded-xl border text-left transition-all",
                          selected
                            ? "border-rayo-green/30 bg-rayo-green/5"
                            : "border-[#EEF2EB] hover:border-rayo-green/20"
                        )}
                      >
                        <span className="text-xs font-semibold text-rayo-green">
                          {labels[opt].label}
                        </span>
                        <span className="text-[11px] text-rayo-green/40 mt-0.5 leading-snug">
                          {labels[opt].sub}
                        </span>
                        {selected && (
                          <Check size={11} className="text-rayo-green mt-1.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* AI reallocation */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-rayo-green">AI reallocation</p>
                  <p className="text-xs text-rayo-green/45 mt-0.5">
                    Allow Rayo to auto-adjust categories based on your spending
                  </p>
                </div>
                <button
                  onClick={() =>
                    setControls((prev) => ({
                      ...prev,
                      aiReallocation: !prev.aiReallocation,
                    }))
                  }
                  className={cn(
                    "w-11 h-6 flex items-center rounded-full p-0.5 transition-colors",
                    controls.aiReallocation ? "bg-rayo-green" : "bg-[#DDE3D8]"
                  )}
                  role="switch"
                  aria-checked={controls.aiReallocation}
                >
                  <div
                    className={cn(
                      "w-5 h-5 bg-white rounded-full shadow-sm transition-transform",
                      controls.aiReallocation ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {/* Summary strip */}
              <div className="rounded-xl bg-[#F6F9F4] border border-[#EEF2EB] p-4 space-y-2">
                <p className="text-xs font-medium text-rayo-green/60 uppercase tracking-wider">
                  Your setup
                </p>
                {[
                  {
                    label: "Mode",
                    value:
                      mode === "guided"
                        ? "50/30/20 Guided"
                        : mode === "zero"
                        ? "Zero-Based"
                        : mode === "envelope"
                        ? "Envelope Control"
                        : `Hybrid (50/30/20 + ${hybridSub === "zero" ? "Zero-Based" : "Envelopes"})`,
                  },
                  { label: "Monthly income", value: fmt(income) },
                  { label: "Rollover", value: controls.rollover ? "On" : "Off" },
                  { label: "Overspend", value: controls.overspend },
                  { label: "AI reallocation", value: controls.aiReallocation ? "On" : "Off" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs text-rayo-green/55">{label}</span>
                    <span className="text-xs font-semibold text-rayo-green capitalize">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleCreateBudget}
                disabled={creatingBudget}
                className="w-full flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {creatingBudget ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Creating budget…
                  </>
                ) : (
                  <>
                    Create budget system
                    <ChevronRight size={15} />
                  </>
                )}
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}