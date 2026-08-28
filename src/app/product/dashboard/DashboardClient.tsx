"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Brain,
  ChevronRight,
  Eye,
  EyeOff,
  MoreHorizontal,
  PiggyBank,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { getCategoryColor } from "@/lib/chart-colors";
import type { DashboardState, AiInsight as DBAiInsight } from "@/lib/types/src";
import { fetchDashboardData, seedCache } from "@/lib/data-service";
import { useCurrentUser } from "@/hooks/useUser";

type DashboardClientProps = {
  initialData: DashboardState;
  initialError?: string | null;
};

function deriveLatestInsight(insights?: DBAiInsight[]) {
  if (!insights || !insights?.length) return null;
  const latest = insights[0];
  return {
    title: latest.message,
    body: latest.detail,
    type: latest.type,
  };
}

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function buildDonutSegments(
  spending: Array<{ label: string; amount: number; pct: number; color: string }>
) {
  let cumulative = 0;
  return spending.map((item) => {
    const dash = (item.pct / 100) * CIRCUMFERENCE;
    const gap = CIRCUMFERENCE - dash;
    const offset = -(cumulative / 100) * CIRCUMFERENCE;
    cumulative += item.pct;
    return { ...item, dash, gap, offset };
  });
}

function DonutChart({
  spending,
  totalExpenses,
  currency,
}: {
  spending: Array<{ label: string; amount: number; pct: number; color: string }>;
  totalExpenses: number;
  currency: string;
}) {
  const segments = buildDonutSegments(spending);

  return (
    <div className="rounded-full bg-Budgexa-green p-5 shadow-inner">
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 100 100" className="-rotate-90">
          {segments.map((seg, i) => (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke={seg.color}
              strokeWidth="12"
              strokeDasharray={`${seg.dash} ${seg.gap}`}
              strokeDashoffset={seg.offset}
              strokeLinecap="round"
            />
          ))}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs text-Budgexa-beige/80">Expenses</p>
          <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
            {formatCurrency(Math.round(totalExpenses / 1000), currency)}k
          </h3>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[28px] border border-Budgexa-green/5 bg-white p-5 shadow-sm">
      <div className="h-11 w-11 rounded-2xl bg-Budgexa-beige" />
      <div className="mt-5 h-3 w-24 rounded bg-Budgexa-beige" />
      <div className="mt-2 h-8 w-32 rounded bg-Budgexa-beige" />
      <div className="mt-4 h-6 w-20 rounded-full bg-Budgexa-beige" />
    </div>
  );
}

export default function DashboardClient({
  initialData,
  initialError = null,
}: DashboardClientProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);
  const { profile } = useCurrentUser();
  const currency = profile?.currency ?? "NGN";
  const [data, setData] = useState<DashboardState>(initialData);

  useEffect(() => {
    seedCache("dashboard-data", initialData, 30 * 1000);
  }, [initialData]);

  async function reloadDashboard() {
    try {
      setLoading(true);
      setError(null);
      const dashboardData = await fetchDashboardData();
      setData({
        totalBalance: dashboardData.totalBalance,
        totalIncome: dashboardData.totalIncome,
        totalExpenses: dashboardData.totalExpenses,
        monthlyIncome: dashboardData.monthlyIncome,
        monthlyExpenses: dashboardData.monthlyExpenses,
        monthlySavings: dashboardData.monthlySavings,
        savingsRate: dashboardData.savingsRate ?? 0,
        budgetMonthlyLimit: dashboardData.budgetMonthlyLimit,
        budgetPercentUsed: dashboardData.budgetPercentUsed,
        budgets: dashboardData.budgets,
        spendingByCategory: dashboardData.spendingByCategory,
        recentTransactions: dashboardData.recentTransactions,
        savingsGoals: dashboardData.savingsGoals,
        insights: dashboardData.insights,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load dashboard data";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const metrics = useMemo(
    () => [
      { title: "Total Balance", value: data.totalBalance, change: "Active", positive: true, icon: Wallet },
      { title: "Income", value: data.monthlyIncome, change: "This month", positive: true, icon: ArrowUpRight },
      { title: "Expenses", value: data.monthlyExpenses, change: "This month", positive: false, icon: ArrowDownLeft },
      { title: "Savings Rate", value: `${data.savingsRate}%`, change: "Overall", positive: true, icon: PiggyBank },
    ],
    [data]
  );

  const spending = useMemo(
    () =>
      data.spendingByCategory.map((item) => ({
        label: item.parentSlug,
        amount: item.amount,
        pct: item.percentage,
        color: getCategoryColor(item.parentSlug),
      })),
    [data.spendingByCategory]
  );

  const budgets = useMemo(
    () =>
      data.budgets.map((b) => ({
        label: b.categoryName,
        amount: b.totalSpent,
        remaining: b.remaining,
        pct: b.percentUsed,
        color: getCategoryColor(b.categoryName ?? "Other"),
      })),
    [data.budgets]
  );

  const goals = useMemo(
    () =>
      data.savingsGoals.map((g) => ({
        title: g.name,
        current: g.currentAmount,
        target: g.targetAmount,
        pct: g.percentComplete,
      })),
    [data.savingsGoals]
  );

  const latestInsight = useMemo(() => deriveLatestInsight(data.insights), [data.insights]);
  const recentTxs = data.recentTransactions;
  const highestSpendingCategory = spending[0]?.label ?? "N/A";

  return (
    <main className="min-h-screen bg-Budgexa-beige">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-Budgexa-green/60">Welcome back</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-Budgexa-green md:text-4xl">
              Your Financial Overview
            </h1>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            <Link
              href="/product/finance/ai?q=Why+am+I+spending+so+much+this+month%3F"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-Budgexa-green/10 bg-white px-5 text-sm font-medium text-Budgexa-green"
            >
              <Sparkles size={16} />
              Ask Insights
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-Budgexa-orange/20 bg-Budgexa-orange/5 px-5 py-4 text-sm text-Budgexa-orange">
            {error} —{" "}
            <button
              className="font-semibold underline"
              onClick={() => void reloadDashboard()}
            >
              Retry
            </button>
          </div>
        )}

        <section className="relative overflow-hidden rounded-[32px] bg-Budgexa-green p-6 text-white md:p-8">
          <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-Budgexa-orange blur-3xl" />

          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
              <Brain size={16} />
              Financial Insight
            </div>

            {latestInsight ? (
              <div className="max-w-3xl">
                <div
                  className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                    latestInsight.type === "alert"
                      ? "bg-Budgexa-orange/20 text-Budgexa-orange"
                      : latestInsight.type === "positive"
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-white/80"
                  }`}
                >
                  {latestInsight.type === "alert"
                    ? "⚠ Alert"
                    : latestInsight.type === "positive"
                      ? "✓ Positive"
                      : "💡 Suggestion"}
                </div>
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
                  {loading ? "Analyzing your finances…" : "Ready to optimize your budget."}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/75 md:text-base">
                  {loading
                    ? "Give us a moment."
                    : "Track your spending and connect categories to get personalized AI insights."}
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/product/finance/ai"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-Budgexa-green transition-all hover:bg-Budgexa-beige"
              >
                Show me how
              </Link>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 pt-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : metrics.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-Budgexa-green/5 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-Budgexa-green/5 text-Budgexa-green">
                      <item.icon size={20} />
                    </div>

                    {item.title === "Total Balance" && (
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="text-Budgexa-green/50"
                      >
                        {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                    )}
                  </div>

                  <p className="mt-5 text-sm text-Budgexa-green/60">{item.title}</p>

                  <h3 className="mt-2 text-3xl font-bold tracking-tight text-Budgexa-green">
                    {typeof item.value === "number"
                      ? showBalance
                        ? formatCurrency(item.value, currency)
                        : "•••••"
                      : item.value}
                  </h3>

                  <div
                    className={`mt-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                      item.positive
                        ? "bg-Budgexa-green/5 text-Budgexa-green"
                        : "bg-Budgexa-orange/10 text-Budgexa-orange"
                    }`}
                  >
                    <TrendingUp size={12} />
                    {item.change}
                  </div>
                </div>
              ))}
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-12">
          <div className="space-y-6 xl:col-span-8">
            <div className="grid gap-6 xl:grid-cols-2">
              <section className="rounded-[28px] border border-Budgexa-green/5 bg-white p-5 shadow-sm md:p-6">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-Budgexa-green">
                      Spending Overview
                    </h3>
                    <p className="mt-1 text-sm text-Budgexa-green/60">Your monthly expenses</p>
                  </div>

                  <button className="rounded-2xl border border-Budgexa-green/10 bg-Budgexa-ash px-4 py-2 text-sm font-medium text-Budgexa-green transition-all hover:bg-Budgexa-beige">
                    This Month
                  </button>
                </div>

                <div className="flex flex-col items-center">
                  {loading ? (
                    <div className="h-48 w-48 animate-pulse rounded-full bg-Budgexa-beige" />
                  ) : spending.length > 0 ? (
                    <DonutChart
                      spending={spending}
                      totalExpenses={data.monthlyExpenses}
                      currency={currency}
                    />
                  ) : (
                    <div className="flex h-48 w-48 items-center justify-center rounded-full bg-Budgexa-ash text-sm text-Budgexa-green/50">
                      No data yet
                    </div>
                  )}

                  {!loading && spending.length > 0 && (
                    <div className="mt-5 rounded-2xl bg-Budgexa-ash px-4 py-3 text-center">
                      <p className="text-sm font-medium text-Budgexa-green">
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
                            <p className="text-sm font-semibold text-Budgexa-green">{item.label}</p>
                            <p className="mt-1 text-xs text-Budgexa-green/55">
                              {formatCurrency(item.amount, currency)} • {item.pct}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/product/finance/transactions"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-Budgexa-green transition-all hover:gap-3"
                >
                  Explain spending
                  <ChevronRight size={16} />
                </Link>
              </section>

              <section className="rounded-[28px] border border-Budgexa-green/5 bg-white p-5 shadow-sm md:p-6">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-Budgexa-green">
                      Budget Performance
                    </h3>
                    <p className="mt-1 text-sm text-Budgexa-green/60">Monthly category tracking</p>
                  </div>

                  <Link
                    href="/product/finance/budget"
                    className="text-sm font-semibold text-Budgexa-green"
                  >
                    View all
                  </Link>
                </div>

                {loading ? (
                  <div className="space-y-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="animate-pulse space-y-2">
                        <div className="h-3 w-32 rounded bg-Budgexa-beige" />
                        <div className="h-2 w-full rounded-full bg-Budgexa-beige" />
                      </div>
                    ))}
                  </div>
                ) : budgets.length === 0 ? (
                  <p className="text-sm text-Budgexa-green/50">No budget data yet.</p>
                ) : (
                  <div className="space-y-6">
                    {budgets.map((item) => {
                      const status =
                        item.pct >= 80 ? "Near limit" : item.pct >= 60 ? "Watch spending" : "Healthy";

                      return (
                        <div key={item.label}>
                          <div className="mb-3 flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-Budgexa-green">{item.label}</p>
                                <span
                                  className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                                    status === "Healthy"
                                      ? "bg-Budgexa-green/5 text-Budgexa-green"
                                      : "bg-Budgexa-orange/10 text-Budgexa-orange"
                                  }`}
                                >
                                  {status}
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-Budgexa-green/55">
                                {formatCurrency(item.remaining, currency)} remaining
                              </p>
                            </div>
                            <p className="text-sm font-semibold text-Budgexa-green/60">{item.pct}%</p>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-Budgexa-beige-dark">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${Math.min(item.pct, 100)}%`,
                                backgroundColor: item.color,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <Link
                  href="/product/finance/budget"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-Budgexa-green transition-all hover:gap-3"
                >
                  Optimize budget
                  <ChevronRight size={16} />
                </Link>
              </section>
            </div>

            <section className="rounded-[28px] border border-Budgexa-green/5 bg-white p-5 shadow-sm md:hidden">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-Budgexa-green">Recent Transactions</h3>
                <Link
                  href="/product/finance/transactions"
                  className="text-sm font-medium text-Budgexa-green"
                >
                  View all
                </Link>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-16 animate-pulse rounded-2xl bg-Budgexa-beige" />
                  ))}
                </div>
              ) : recentTxs.length === 0 ? (
                <p className="text-sm text-Budgexa-green/50">No transactions yet.</p>
              ) : (
                <div className="space-y-3">
                  {recentTxs.map((tx) => (
                    <div
                      key={tx.id}
                      className="rounded-2xl border border-Budgexa-green/5 bg-Budgexa-ash p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-Budgexa-green">{tx.description}</p>
                          <p className="mt-1 text-xs text-Budgexa-green/60">
                            {tx.categoryName} •{" "}
                            {new Date(tx.date || tx.createdAt).toLocaleDateString("en-NG")}
                          </p>
                        </div>
                        <p
                          className={`text-sm font-semibold ${
                            tx.type === "income" ? "text-Budgexa-green" : "text-Budgexa-orange"
                          }`}
                        >
                          {tx.type === "income" ? "+" : "-"}
                          {formatCurrency(Number(tx.amount), currency)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="hidden rounded-[28px] border border-Budgexa-green/5 bg-white p-5 shadow-sm md:block">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-Budgexa-green">Recent Transactions</h3>
                <Link
                  href="/product/finance/transactions"
                  className="text-sm font-medium text-Budgexa-green"
                >
                  View all
                </Link>
              </div>

              {loading ? (
                <div className="animate-pulse space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-10 rounded-xl bg-Budgexa-beige" />
                  ))}
                </div>
              ) : recentTxs.length === 0 ? (
                <p className="text-sm text-Budgexa-green/50">No transactions yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px]">
                    <thead>
                      <tr className="border-b border-Budgexa-beige">
                        {["Description", "Category", "Date", "Amount", ""].map((h) => (
                          <th
                            key={h}
                            className={`pb-4 text-xs font-semibold uppercase tracking-wide text-Budgexa-green/50 ${
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
                        <tr key={tx.id} className="border-b border-Budgexa-beige/60 last:border-0">
                          <td className="py-4 text-sm font-medium text-Budgexa-green">
                            {tx.description}
                          </td>
                          <td className="py-4">
                            <span className="rounded-full bg-Budgexa-ash px-3 py-1 text-xs font-medium text-Budgexa-green">
                              {tx.categoryName}
                            </span>
                          </td>
                          <td className="py-4 text-sm text-Budgexa-green/60">
                            {new Date(tx.date || tx.createdAt).toLocaleDateString("en-NG")}
                          </td>
                          <td
                            className={`py-4 text-right text-sm font-semibold ${
                              tx.type === "income" ? "text-Budgexa-green" : "text-Budgexa-orange"
                            }`}
                          >
                            {tx.type === "income" ? "+" : "-"}
                            {formatCurrency(Number(tx.amount), currency)}
                          </td>
                          <td className="py-4 text-right">
                            <button className="text-Budgexa-green/50 transition-colors hover:text-Budgexa-green">
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

          <div className="space-y-6 xl:col-span-4">
            <section className="rounded-[28px] border border-Budgexa-green/5 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-Budgexa-green">Savings Goals</h3>
                  <p className="mt-1 text-sm text-Budgexa-green/60">Your active goals</p>
                </div>
                <Target size={20} className="text-Budgexa-green" />
              </div>

              {loading ? (
                <div className="animate-pulse space-y-5">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-3 w-32 rounded bg-Budgexa-beige" />
                      <div className="h-2 w-full rounded-full bg-Budgexa-beige" />
                    </div>
                  ))}
                </div>
              ) : goals.length === 0 ? (
                <p className="text-sm text-Budgexa-green/50">No savings goals yet.</p>
              ) : (
                <div className="space-y-5">
                  {goals.map((goal) => (
                    <div key={goal.title}>
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <p className="font-medium text-Budgexa-green">{goal.title}</p>
                          <p className="mt-1 text-xs text-Budgexa-green/60">
                            {goal.target === 0
                              ? "Target not configured"
                              : `${formatCurrency(goal.current, currency)} / ${formatCurrency(goal.target, currency)}`}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-Budgexa-green">{goal.pct}%</p>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-Budgexa-beige">
                        <div
                          className="h-full rounded-full bg-Budgexa-green transition-all"
                          style={{ width: `${goal.pct === 0 ? 4 : goal.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
