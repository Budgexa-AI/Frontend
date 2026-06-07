"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Brain,
  ChevronRight,
  Eye,
  EyeOff,
  MoreHorizontal,
  PiggyBank,
  Plus,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { formatNaira } from "@/lib/utils";
import { getCategoryColor } from "@/lib/chart-colors";
import { useRouter } from "next/navigation";
import type {
  Account as DBAccount,
  Transaction as DBTransaction,
  SavingsGoal as DBSavings,
  AiInsight as DBAiInsight,
} from "@/lib/types/src";
import { fetchCurrentUser, fetchDashboardData } from "@/lib/data-service";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface DashboardState {
  accounts: DBAccount[];
  transactions: DBTransaction[];
  savingsGoals: DBSavings[];
  insights: DBAiInsight[];
}

interface DerivedGoal {
  title: string;
  current: number;
  target: number;
  pct: number;
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function deriveMetrics(data: DashboardState) {
  const totalBalance = data.accounts.reduce(
    (sum, a) => sum + parseFloat(a.balance ?? "0"),
    0
  );

  const income = data.transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenses = data.transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const savingsRate =
    income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;

  return [
    { title: "Total Balance", value: totalBalance,      change: "+2.5%", positive: true,  icon: Wallet       },
    { title: "Income",        value: income,            change: "+12%",  positive: true,  icon: ArrowUpRight },
    { title: "Expenses",      value: expenses,          change: "-8%",   positive: false, icon: ArrowDownLeft },
    { title: "Savings Rate",  value: `${savingsRate}%`, change: "+5%",   positive: true,  icon: PiggyBank    },
  ] as {
    title: string;
    value: number | string;
    change: string;
    positive: boolean;
    icon: React.ElementType;
  }[];
}

function deriveSpending(transactions: DBTransaction[]) {
  const categoryTotals: Record<string, number> = {};
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => {
      const cat = t.category ?? "Other";
      categoryTotals[cat] = (categoryTotals[cat] ?? 0) + Number(t.amount);
      return sum + Number(t.amount);
    }, 0);

  return Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4)
    .map(([label, amount]) => ({
      label,
      amount,
      pct: totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0,
      color: getCategoryColor(label),
    }));
}

function deriveSavingsGoals(goals: DBSavings[]): DerivedGoal[] {
  return goals.map((g) => ({
    title:   g.name,
    current: parseFloat(g.currentAmount),
    target:  parseFloat(g.targetAmount),
    pct:
      parseFloat(g.targetAmount) > 0
        ? Math.round(
            (parseFloat(g.currentAmount) / parseFloat(g.targetAmount)) * 100
          )
        : 0,
  }));
}

function deriveLatestInsight(insights: DBAiInsight[]) {
  if (!insights.length) return null;
  const latest = insights[0];
  return {
    title: latest.title   ?? "Smart Insight",
    body:  latest.content ?? latest.content ?? "",
  };
}

// ─────────────────────────────────────────────────────────────
// DONUT
// ─────────────────────────────────────────────────────────────

const RADIUS       = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function DonutChart({
  spending,
}: {
  spending: ReturnType<typeof deriveSpending>;
}) {
  let cumulative = 0;
  const totalExpenses = spending.reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="rounded-full bg-rayo-green p-5 shadow-inner">
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 100 100" className="-rotate-90">
          {spending.map((item, i) => {
            const dash   = (item.pct / 100) * CIRCUMFERENCE;
            const gap    = CIRCUMFERENCE - dash;
            const offset = -(cumulative / 100) * CIRCUMFERENCE;
            cumulative  += item.pct;

            return (
              <circle
                key={i}
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke={item.color}
                strokeWidth="12"
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs text-rayo-beige/80">Expenses</p>
          <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
            ₦{Math.round(totalExpenses / 1000)}k
          </h3>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SKELETON
// ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[28px] border border-rayo-green/5 bg-white p-5 shadow-sm">
      <div className="h-11 w-11 rounded-2xl bg-rayo-beige" />
      <div className="mt-5 h-3 w-24 rounded bg-rayo-beige" />
      <div className="mt-2 h-8 w-32 rounded bg-rayo-beige" />
      <div className="mt-4 h-6 w-20 rounded-full bg-rayo-beige" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [showBalance, setShowBalance] = useState(true);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [userId, setUserId]           = useState<string | null>(null);
  const [data, setData]               = useState<DashboardState>({
    accounts:     [],
    transactions: [],
    savingsGoals: [],
    insights:     [],
  });

  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const user = await fetchCurrentUser();
        setUserId(user.id);
        const dashboardData = await fetchDashboardData(user.id);
        setData(dashboardData);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to load dashboard data";
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const metrics       = useMemo(() => deriveMetrics(data),              [data]);
  const spending      = useMemo(() => deriveSpending(data.transactions), [data.transactions]);
  const goals         = useMemo(() => deriveSavingsGoals(data.savingsGoals), [data.savingsGoals]);
  const latestInsight = useMemo(() => deriveLatestInsight(data.insights), [data.insights]);
  const recentTxs     = useMemo(() => data.transactions.slice(0, 5),    [data.transactions]);

  const highestSpendingCategory = spending[0]?.label ?? "N/A";

  const quickActions = [
    { label: "Add Expense",   href: "/product/finance/transactions/new" },
    { label: "Add Income",    href: "/product/finance/transactions/new" },
    { label: "Create Budget", href: "/product/finance/budget"           },
    { label: "Ask Insights",  href: "/product/finance/ai"               },
  ];

  return (
    <main className="min-h-screen bg-rayo-beige">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* ── HEADER ── */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-rayo-green/60">Welcome back</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-rayo-green md:text-4xl">
              Your Financial Overview
            </h1>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-1">

            <Link
              href="/product/finance/ai"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-rayo-green/10 bg-white px-5 text-sm font-medium text-rayo-green"
            >
              <Sparkles size={16} />
              Ask Insights
            </Link>
          </div>
        </div>

        {/* ── ERROR ── */}
        {error && (
          <div className="mb-6 rounded-2xl border border-rayo-orange/20 bg-rayo-orange/5 px-5 py-4 text-sm text-rayo-orange">
            {error} —{" "}
            <button
              className="font-semibold underline"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {/* ── AI HERO ── */}
        <section className="relative overflow-hidden rounded-[32px] bg-rayo-green p-6 text-white md:p-8">
          <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-rayo-orange blur-3xl" />

          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
              <Brain size={16} />
              Financial Insight
            </div>

            {latestInsight ? (
              <div className="max-w-3xl">
                <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
                  {latestInsight.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/75 md:text-base">
                  {latestInsight.body}
                </p>
              </div>
            ) : (
              <div className="max-w-3xl">
                <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
                  {loading ? "Analyzing your finances…" : "No insights yet."}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/75 md:text-base">
                  {loading
                    ? "Give us a moment."
                    : "Add transactions to start getting personalized insights."}
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/product/finance/ai"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-rayo-green transition-all hover:bg-rayo-beige"
              >
                Show me how
              </Link>
              <Link
                href="/product/finance/ai"
                className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-medium text-white/90 backdrop-blur-sm"
              >
                Explain spending changes
              </Link>
            </div>
          </div>
        </section>

        {/* ── MAIN GRID ── */}
        <div className="mt-6 grid gap-6 xl:grid-cols-12">

          {/* LEFT */}
          <div className="space-y-6 xl:col-span-8">

            {/* METRICS */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                : metrics.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[28px] border border-rayo-green/5 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rayo-green/5 text-rayo-green">
                          <item.icon size={20} />
                        </div>

                        {item.title === "Total Balance" && (
                          <button
                            onClick={() => setShowBalance(!showBalance)}
                            className="text-rayo-green/50"
                          >
                            {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                          </button>
                        )}
                      </div>

                      <p className="mt-5 text-sm text-rayo-green/60">{item.title}</p>

                      <h3 className="mt-2 text-3xl font-bold tracking-tight text-rayo-green">
                        {typeof item.value === "number"
                          ? showBalance
                            ? formatNaira(item.value)
                            : "••••••"
                          : item.value}
                      </h3>

                      <div
                        className={`mt-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                          item.positive
                            ? "bg-rayo-green/5 text-rayo-green"
                            : "bg-rayo-orange/10 text-rayo-orange"
                        }`}
                      >
                        <TrendingUp size={12} />
                        {item.change} this month
                      </div>
                    </div>
                  ))}
            </section>

            {/* SPENDING + BUDGET */}
            <div className="grid gap-6 xl:grid-cols-2">

              {/* SPENDING OVERVIEW */}
              <section className="rounded-[28px] border border-rayo-green/5 bg-white p-5 shadow-sm md:p-6">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-rayo-green">
                      Spending Overview
                    </h3>
                    <p className="mt-1 text-sm text-rayo-green/60">Your monthly expenses</p>
                  </div>

                  <button className="rounded-2xl border border-rayo-green/10 bg-rayo-ash px-4 py-2 text-sm font-medium text-rayo-green transition-all hover:bg-rayo-beige">
                    This Month
                  </button>
                </div>

                <div className="flex flex-col items-center">
                  {loading ? (
                    <div className="h-48 w-48 animate-pulse rounded-full bg-rayo-beige" />
                  ) : spending.length > 0 ? (
                    <DonutChart spending={spending} />
                  ) : (
                    <div className="flex h-48 w-48 items-center justify-center rounded-full bg-rayo-ash text-sm text-rayo-green/50">
                      No data yet
                    </div>
                  )}

                  {!loading && spending.length > 0 && (
                    <div className="mt-5 rounded-2xl bg-rayo-ash px-4 py-3 text-center">
                      <p className="text-sm font-medium text-rayo-green">
                        Highest spending category: {highestSpendingCategory}
                      </p>
                    </div>
                  )}

                  <div className="mt-7 w-full space-y-5">
                    {spending.map((item) => (
                      <div key={item.label} className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div
                            className="mt-1 h-3 w-3 shrink-0 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <div>
                            <p className="text-sm font-semibold text-rayo-green">{item.label}</p>
                            <p className="mt-1 text-xs text-rayo-green/55">
                              {formatNaira(item.amount)} • {item.pct}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/product/finance/transactions"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-rayo-green transition-all hover:gap-3"
                >
                  Explain spending
                  <ChevronRight size={16} />
                </Link>
              </section>

              {/* BUDGET PERFORMANCE */}
              <section className="rounded-[28px] border border-rayo-green/5 bg-white p-5 shadow-sm md:p-6">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-rayo-green">
                      Budget Performance
                    </h3>
                    <p className="mt-1 text-sm text-rayo-green/60">Monthly category tracking</p>
                  </div>

                  <Link
                    href="/product/finance/budget"
                    className="text-sm font-semibold text-rayo-green"
                  >
                    View all
                  </Link>
                </div>

                {loading ? (
                  <div className="space-y-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="animate-pulse space-y-2">
                        <div className="h-3 w-32 rounded bg-rayo-beige" />
                        <div className="h-2 w-full rounded-full bg-rayo-beige" />
                      </div>
                    ))}
                  </div>
                ) : spending.length === 0 ? (
                  <p className="text-sm text-rayo-green/50">No budget data yet.</p>
                ) : (
                  <div className="space-y-6">
                    {spending.map((item) => {
                      const remaining = 100000 - item.amount;
                      const status =
                        item.pct >= 80
                          ? "Near limit"
                          : item.pct >= 60
                          ? "Watch spending"
                          : "Healthy";

                      return (
                        <div key={item.label}>
                          <div className="mb-3 flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-rayo-green">
                                  {item.label}
                                </p>
                                <span
                                  className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                                    status === "Healthy"
                                      ? "bg-rayo-green/5 text-rayo-green"
                                      : "bg-rayo-orange/10 text-rayo-orange"
                                  }`}
                                >
                                  {status}
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-rayo-green/55">
                                {formatNaira(remaining)} remaining
                              </p>
                            </div>
                            <p className="text-sm font-semibold text-rayo-green/60">
                              {item.pct}%
                            </p>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-rayo-beige-dark">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${item.pct}%`,
                                backgroundColor: item.color,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {!loading && spending.length > 0 && (
                  <div className="mt-7 rounded-2xl bg-rayo-ash p-4">
                    <p className="text-sm leading-6 text-rayo-green/80">
                      You are currently on track to stay within your monthly budget.
                    </p>
                  </div>
                )}

                <Link
                  href="/product/finance/budget"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-rayo-green transition-all hover:gap-3"
                >
                  Optimize budget
                  <ChevronRight size={16} />
                </Link>
              </section>
            </div>

            {/* MOBILE TRANSACTIONS */}
            <section className="rounded-[28px] border border-rayo-green/5 bg-white p-5 shadow-sm md:hidden">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-rayo-green">Recent Transactions</h3>
                <Link
                  href="/product/finance/transactions"
                  className="text-sm font-medium text-rayo-green"
                >
                  View all
                </Link>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-16 animate-pulse rounded-2xl bg-rayo-beige" />
                  ))}
                </div>
              ) : recentTxs.length === 0 ? (
                <p className="text-sm text-rayo-green/50">No transactions yet.</p>
              ) : (
                <div className="space-y-3">
                  {recentTxs.map((tx) => (
                    <div
                      key={tx.id}
                      className="rounded-2xl border border-rayo-green/5 bg-rayo-ash p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-rayo-green">{tx.description}</p>
                          <p className="mt-1 text-xs text-rayo-green/60">
                            {tx.category} • {tx.date}
                          </p>
                        </div>
                        <p
                          className={`text-sm font-semibold ${
                            tx.type === "income" ? "text-rayo-green" : "text-rayo-orange"
                          }`}
                        >
                          {tx.type === "income" ? "+" : "-"}
                          {formatNaira(Number(tx.amount))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* DESKTOP TABLE */}
            <section className="hidden rounded-[28px] border border-rayo-green/5 bg-white p-5 shadow-sm md:block">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-rayo-green">Recent Transactions</h3>
                <Link
                  href="/product/finance/transactions"
                  className="text-sm font-medium text-rayo-green"
                >
                  View all
                </Link>
              </div>

              {loading ? (
                <div className="animate-pulse space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-10 rounded-xl bg-rayo-beige" />
                  ))}
                </div>
              ) : recentTxs.length === 0 ? (
                <p className="text-sm text-rayo-green/50">No transactions yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px]">
                    <thead>
                      <tr className="border-b border-rayo-beige">
                        {["Description", "Category", "Date", "Amount", ""].map((h) => (
                          <th
                            key={h}
                            className={`pb-4 text-xs font-semibold uppercase tracking-wide text-rayo-green/50 ${
                              h === "Amount" ? "text-right" : "text-left"
                            }`}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {recentTxs.map((tx) => (
                        <tr
                          key={tx.id}
                          className="border-b border-rayo-beige/60 last:border-0"
                        >
                          <td className="py-4 text-sm font-medium text-rayo-green">
                            {tx.description}
                          </td>
                          <td className="py-4">
                            <span className="rounded-full bg-rayo-ash px-3 py-1 text-xs font-medium text-rayo-green">
                              {tx.category}
                            </span>
                          </td>
                          <td className="py-4 text-sm text-rayo-green/60">
                            {tx.date
                              ? new Date(tx.date).toLocaleDateString("en-NG")
                              : new Date(tx.createdAt).toLocaleDateString("en-NG")}
                          </td>
                          <td
                            className={`py-4 text-right text-sm font-semibold ${
                              tx.type === "income" ? "text-rayo-green" : "text-rayo-orange"
                            }`}
                          >
                            {tx.type === "income" ? "+" : "-"}
                            {formatNaira(Number(tx.amount))}
                          </td>
                          <td className="py-4 text-right">
                            <button className="text-rayo-green/50 transition-colors hover:text-rayo-green">
                              <MoreHorizontal size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT */}
          <div className="space-y-6 xl:col-span-4">

            {/* SAVINGS GOALS */}
            <section className="rounded-[28px] border border-rayo-green/5 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-rayo-green">Savings Goals</h3>
                  <p className="mt-1 text-sm text-rayo-green/60">Your active goals</p>
                </div>
                <Target size={20} className="text-rayo-green" />
              </div>

              {loading ? (
                <div className="animate-pulse space-y-5">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-3 w-32 rounded bg-rayo-beige" />
                      <div className="h-2 w-full rounded-full bg-rayo-beige" />
                    </div>
                  ))}
                </div>
              ) : goals.length === 0 ? (
                <p className="text-sm text-rayo-green/50">No savings goals yet.</p>
              ) : (
                <div className="space-y-5">
                  {goals.map((goal) => (
                    <div key={goal.title}>
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <p className="font-medium text-rayo-green">{goal.title}</p>
                          <p className="mt-1 text-xs text-rayo-green/60">
                            {formatNaira(goal.current)} / {formatNaira(goal.target)}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-rayo-green">{goal.pct}%</p>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-rayo-beige">
                        <div
                          className="h-full rounded-full bg-rayo-green"
                          style={{ width: `${goal.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Link
                href="/product/finance/savings"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-rayo-green transition-all hover:gap-3"
              >
                Reach goals faster
                <ChevronRight size={16} />
              </Link>
            </section>

            {/* QUICK ACTIONS */}
            <section className="rounded-[28px] border border-rayo-green/5 bg-white p-5 shadow-sm md:p-6">
              <h3 className="mb-5 text-lg font-semibold text-rayo-green">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => router.push(action.href)}
                    className="rounded-2xl bg-rayo-ash px-4 py-4 text-sm font-medium text-rayo-green transition-all hover:bg-rayo-beige"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </section>

            {/* SMART INSIGHT */}
            <section className="rounded-[28px] bg-rayo-orange p-6 text-white shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles size={18} />
                <p className="font-semibold">Smart Insight</p>
              </div>

              {loading ? (
                <div className="mt-5 animate-pulse space-y-2">
                  <div className="h-6 w-full rounded bg-white/20" />
                  <div className="h-6 w-3/4 rounded bg-white/20" />
                </div>
              ) : latestInsight ? (
                <>
                  <h3 className="mt-5 text-2xl font-semibold leading-tight">
                    {latestInsight.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/80">{latestInsight.body}</p>
                </>
              ) : (
                <h3 className="mt-5 text-2xl font-semibold leading-tight">
                  No insights yet — add transactions to get started.
                </h3>
              )}

              <Link
                href="/product/finance/ai"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-rayo-green"
              >
                Explain this trend
                <ArrowRight size={16} />
              </Link>
            </section>
          </div>
        </div>
      </div>

      {/* MOBILE FAB */}
      <Link
        href="/product/finance/transactions/new"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-rayo-green text-white shadow-xl transition-all hover:scale-105 hover:bg-rayo-green-dark md:hidden"
      >
        <Plus size={22} />
      </Link>
    </main>
  );
}