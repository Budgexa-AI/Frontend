"use client";

import { useState, useRef, useEffect } from "react";
import {
  Plus,
  Car,
  ShieldCheck,
  Home,
  Palmtree,
  Monitor,
  MoreHorizontal,
  TrendingUp,
  ChevronRight,
  Zap,
  Target,
  PiggyBank,
  BarChart3,
  Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface Goal {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  saved: number;
  target: number;
  targetDate: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock Data
// ─────────────────────────────────────────────────────────────────────────────

const GOALS: Goal[] = [
  {
    id: "car",
    name: "New Car",
    subtitle: "Toyota Camry 2025",
    icon: <Car size={16} />,
    iconBg: "bg-blue-50 text-blue-500",
    saved: 2600000,
    target: 4000000,
    targetDate: "Dec 2026",
  },
  {
    id: "emergency",
    name: "Emergency Fund",
    subtitle: "Financial Security",
    icon: <ShieldCheck size={16} />,
    iconBg: "bg-emerald-50 text-emerald-600",
    saved: 120000,
    target: 300000,
    targetDate: "Aug 2026",
  },
  {
    id: "house",
    name: "House Down Payment",
    subtitle: "For my future home",
    icon: <Home size={16} />,
    iconBg: "bg-orange-50 text-orange-500",
    saved: 1400000,
    target: 5000000,
    targetDate: "Dec 2027",
  },
  {
    id: "vacation",
    name: "Vacation",
    subtitle: "Bali Trip",
    icon: <Palmtree size={16} />,
    iconBg: "bg-cyan-50 text-cyan-500",
    saved: 300000,
    target: 500000,
    targetDate: "Jul 2026",
  },
  {
    id: "macbook",
    name: "MacBook Pro",
    subtitle: "M3 Pro 16-inch",
    icon: <Monitor size={16} />,
    iconBg: "bg-purple-50 text-purple-500",
    saved: 175000,
    target: 500000,
    targetDate: "Oct 2026",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const fmt = (n: number) => "₦" + n.toLocaleString("en-NG");

const fmtM = (n: number) =>
  "₦" +
  (n / 1000000 >= 1
    ? (n / 1000000).toFixed(2) + "M"
    : (n / 1000).toFixed(0) + "k");

const pct = (s: number, t: number) => Math.round((s / t) * 100);

// ─────────────────────────────────────────────────────────────────────────────
// Donut Chart
// ─────────────────────────────────────────────────────────────────────────────

const R = 50;
const C = 2 * Math.PI * R;

function OverallDonut({ percentage }: { percentage: number }) {
  const filled = (percentage / 100) * C;

  return (
    <svg
      viewBox="10 0 120 120"
      className="w-full h-full"
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle
        cx="65"
        cy="60"
        r={R}
        fill="none"
        stroke="#EEF0EA"
        strokeWidth="10"
      />

      <circle
        cx="65"
        cy="60"
        r={R}
        fill="none"
        stroke="#2F6B2F"
        strokeWidth="10"
        strokeDasharray={`${filled} ${C - filled}`}
        strokeLinecap="round"
      />

      <text
        x="60"
        y="56"
        textAnchor="middle"
        style={{
          transform: "rotate(90deg)",
          transformOrigin: "60px 60px",
          fontSize: "24px",
          fontWeight: 700,
          fill: "#254F22",
        }}
      >
        {percentage}%
      </text>

      <text
        x="60"
        y="72"
        textAnchor="middle"
        style={{
          transform: "rotate(90deg)",
          transformOrigin: "60px 60px",
          fontSize: "16px",
          fill: "#6B7B69",
        }}
      >
        overall
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function SavingsGoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(GOALS);
  const [showAll] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter((g) => g.id !== goalId));
    setOpenMenuId(null);
  };

  const totalGoals = goals.length;

  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);

  const totalTarget = goals.reduce((s, g) => s + g.target, 0);

  const avgProgress = Math.round(
    goals.reduce((s, g) => s + pct(g.saved, g.target), 0) /
      goals.length
  );

  const visibleGoals = showAll ? goals : goals;

  return (
    <div className="max-w-[1180px] pt-8 mx-auto space-y-5">
      {/* ───────────────── Header ───────────────── */}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-rayo-green tracking-tight">
            Savings Goals
          </h1>

          <p className="text-sm text-rayo-green/50 mt-1">
            Track your progress and achieve your financial dreams.
          </p>
        </div>

        <Link
          href="/product/finance/savings/new"
          className="h-10 px-4 rounded-xl bg-rayo-green text-white text-sm font-medium hover:bg-rayo-green-dark transition-colors flex items-center gap-2"
        >
          <Plus size={14} />
          New Goal
        </Link>
      </div>

      {/* ───────────────── Stats ───────────────── */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: "Total Goals",
            value: String(totalGoals),
            sub: "Active goals",
            icon: (
              <Target
                size={14}
                className="text-rayo-green"
              />
            ),
            bg: "bg-rayo-beige-light",
          },
          {
            label: "Total Saved",
            value: fmtM(totalSaved),
            sub: "Across all goals",
            icon: (
              <PiggyBank
                size={14}
                className="text-emerald-600"
              />
            ),
            bg: "bg-emerald-50",
          },
          {
            label: "Total Target",
            value: fmtM(totalTarget),
            sub: "Goal amount",
            icon: (
              <TrendingUp
                size={14}
                className="text-blue-500"
              />
            ),
            bg: "bg-blue-50",
          },
          {
            label: "Avg. Progress",
            value: `${avgProgress}%`,
            sub: "Across all goals",
            icon: (
              <BarChart3
                size={14}
                className="text-orange-500"
              />
            ),
            bg: "bg-orange-50",
          },
        ].map(({ label, value, sub, icon, bg }) => (
          <div
            key={label}
            className="bg-white rounded-2xl px-4 py-3 border border-[#EFEFE8]"
          >
            <div
              className={cn(
                "h-7 w-7 rounded-lg flex items-center justify-center mb-2",
                bg
              )}
            >
              {icon}
            </div>

            <p className="text-[10px] font-medium uppercase tracking-wide text-rayo-green/40">
              {label}
            </p>

            <p className="text-[24px] font-bold text-rayo-green leading-none mt-1">
              {value}
            </p>

            <p className="text-[11px] text-rayo-green/45 mt-1">
              {sub}
            </p>
          </div>
        ))}
      </div>

      {/* ───────────────── Overview ───────────────── */}

      <div className="bg-white rounded-2xl border border-[#EFEFE8] p-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-rayo-green">
            Goals Overview
          </h2>

          <button className="flex items-center gap-1 text-xs font-medium text-rayo-green/50 hover:text-rayo-green transition-colors">
            View Analytics
            <ChevronRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          {/* Donut */}

          <div className="flex flex-col items-center justify-center">
            <div className="h-28 w-28">
              <OverallDonut percentage={avgProgress} />
            </div>

            <div className="text-center mt-3">
              <p className="text-xl font-bold text-rayo-green">
                {fmt(totalSaved)}
              </p>

              <p className="text-xs text-rayo-green/45 mt-1">
                of {fmt(totalTarget)}
              </p>
            </div>
          </div>

          {/* Progress List */}

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-rayo-green/45 mb-5">
              Progress by Goal
            </p>

            <div className="space-y-4">
              {GOALS.map((g) => {
                const progress = pct(g.saved, g.target);

                return (
                  <div key={g.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs font-medium text-rayo-green">
                        {g.name}
                      </p>

                      <p className="text-xs font-semibold text-rayo-green">
                        {progress}%
                      </p>
                    </div>

                    <div className="h-1.5 rounded-full bg-[#EEF0EA] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${progress}%`,
                          background: "#3E7B3E",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────── Goals List ───────────────── */}

      <div className="bg-white rounded-2xl border border-[#EFEFE8] overflow-hidden">
        <div className="px-5 pt-5 pb-4 border-b border-[#EFEFE8]">
          <h2 className="text-lg font-semibold text-rayo-green">
            All Goals
          </h2>
        </div>

        <div className="divide-y divide-[#F1F3EE]">
          {visibleGoals.map((goal) => {
            const progress = pct(goal.saved, goal.target);

            return (
              <div
                key={goal.id}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#FAFBF8] transition-colors"
              >
                {/* Icon */}

                <div
                  className={cn(
                    "h-9 w-9 rounded-lg flex items-center justify-center shrink-0",
                    goal.iconBg
                  )}
                >
                  {goal.icon}
                </div>

                {/* Name */}

                <div className="w-44 shrink-0">
                  <p className="text-sm font-semibold text-rayo-green leading-tight">
                    {goal.name}
                  </p>

                  <p className="text-[11px] text-rayo-green/40 mt-0.5">
                    {goal.subtitle}
                  </p>
                </div>

                {/* Progress */}

                <div className="flex-1 min-w-0">
                  <div className="h-1.5 rounded-full bg-[#EEF0EA] overflow-hidden mb-1.5">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${progress}%`,
                        background: "#3E7B3E",
                      }}
                    />
                  </div>

                  <p className="text-[11px] text-rayo-green/50 font-medium">
                    {fmt(goal.saved)} / {fmt(goal.target)}
                  </p>
                </div>

                {/* Percentage */}

                <div className="w-10 shrink-0 text-center">
                  <p className="text-sm font-semibold text-rayo-green">
                    {progress}%
                  </p>
                </div>

                {/* Target */}

                <div className="w-20 shrink-0 text-right">
                  <p className="text-[10px] uppercase tracking-wide text-rayo-green/35">
                    Target
                  </p>

                  <p className="text-xs font-medium text-rayo-green mt-0.5">
                    {goal.targetDate}
                  </p>
                </div>

                {/* Menu */}

                <div className="relative" ref={goal.id === openMenuId ? menuRef : undefined}>
                  <button 
                    onClick={() => setOpenMenuId(openMenuId === goal.id ? null : goal.id)}
                    className="p-1.5 rounded-lg text-rayo-green/30 hover:text-rayo-green hover:bg-rayo-beige transition-colors shrink-0">
                    <MoreHorizontal size={15} />
                  </button>

                  {openMenuId === goal.id && (
                    <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-md border border-rayo-ash z-50">
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-4 rounded-lg first:rounded-t-lg last:rounded-b-lg"
                      >
                        <Trash2 size={16} />
                        Delete 
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Goal */}

        <div className="p-4 border-t border-[#EFEFE8]">
          <Link 
            href="/product/finance/savings/new"
            className="w-full h-11 rounded-xl border border-dashed border-rayo-green text-sm font-medium text-rayo-green/60 hover:bg-[#FAFBF8] transition-colors flex items-center justify-center gap-2">
              <Plus size={14} />
              Create New Goal
          </Link>
        </div>
      </div>

      {/* ───────────────── Tip Banner ───────────────── */}

      {/* <div className="flex items-center justify-between gap-4 bg-[#F7FAF5] border border-[#E7EEE2] rounded-2xl px-4 py-3">
        <div className="flex items-center gap-3">
          <TrendingUp
            size={16}
            className="text-rayo-green shrink-0"
          />

          <p className="text-sm text-rayo-green/70">
            <span className="font-semibold text-rayo-green">
              Tip:
            </span>{" "}
            Automate your savings by setting up recurring
            transfers to your goals.
          </p>
        </div>

        <a
          href="/dashboard/savings/automation"
          className="flex items-center gap-1.5 text-xs font-semibold text-rayo-green whitespace-nowrap hover:underline shrink-0"
        >
          <Zap size={13} fill="currentColor" />
          Setup Automation
        </a>
      </div> */}
    </div>
  );
}