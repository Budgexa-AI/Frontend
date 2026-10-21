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
  Plus,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { getCategoryColor } from "@/lib/chart-colors";
import { CATEGORIES, toBudgetCategory } from "@/lib/category";
import type { DashboardState, AiInsight as DBAiInsight, Category } from "@/lib/types/src";
import { fetchDashboardData, fetchCategories, seedCache } from "@/lib/data-service";
import { useCurrentUser } from "@/hooks/useUser";

type DashboardClientProps = {
  initialData: DashboardState;
  initialError?: string | null;
};

function deriveInsight(insights?: DBAiInsight[], index: number = 0) {
  if (!insights || !insights?.length) return null;
  const insight = insights[index];
  return {
    title: insight.message,
    body: insight.detail,
    type: insight.type,
  };
}

type PieSlice = {
  label: string;
  amount: number;
  pct: number;
  color: string;
  startAngle: number;
  endAngle: number;
  midAngle: number;
  path: string;
  isFullCircle: boolean;
};

const PIE_CENTER = 110;
const PIE_RADIUS = 90;
const HOVER_OFFSET = 8;

function calculatePieSlices(
  spending: Array<{ label: string; amount: number; pct: number; color: string }>,
  cx: number = PIE_CENTER,
  cy: number = PIE_CENTER,
  r: number = PIE_RADIUS
): PieSlice[] {
  const totalAmount = spending.reduce((sum, item) => sum + (item.amount > 0 ? item.amount : 0), 0);
  const totalPct = spending.reduce((sum, item) => sum + (item.pct > 0 ? item.pct : 0), 0);

  const validItems = spending.filter((item) => item.amount > 0 || item.pct > 0);
  if (validItems.length === 1) {
    const single = validItems[0];
    return [
      {
        ...single,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        midAngle: 0,
        path: "",
        isFullCircle: true,
      },
    ];
  }

  let cumulativeAngle = -Math.PI / 2; // Start from 12 o'clock

  return spending.map((item) => {
    let fraction = 0;
    if (totalAmount > 0) {
      fraction = Math.max(0, item.amount) / totalAmount;
    } else if (totalPct > 0) {
      fraction = Math.max(0, item.pct) / totalPct;
    } else {
      fraction = spending.length > 0 ? 1 / spending.length : 0;
    }

    const angle = fraction * 2 * Math.PI;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    const midAngle = startAngle + angle / 2;
    cumulativeAngle = endAngle;

    if (fraction >= 0.9999) {
      return {
        ...item,
        startAngle,
        endAngle,
        midAngle,
        path: "",
        isFullCircle: true,
      };
    }

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);

    const largeArcFlag = angle > Math.PI ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x1.toFixed(3)} ${y1.toFixed(3)} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2.toFixed(3)} ${y2.toFixed(3)} Z`;

    return {
      ...item,
      startAngle,
      endAngle,
      midAngle,
      path,
      isFullCircle: false,
    };
  });
}

function PieChart({
  spending,
  hoveredIndex,
  onHoverIndex,
}: {
  spending: Array<{ label: string; amount: number; pct: number; color: string }>;
  hoveredIndex: number | null;
  onHoverIndex: (index: number | null) => void;
}) {
  const slices = useMemo(() => calculatePieSlices(spending), [spending]);

  return (
    <div className="relative flex items-center justify-center p-2">
      <svg
        viewBox="0 0 220 220"
        className="h-48 w-48 select-none drop-shadow-sm transition-transform duration-300 sm:h-52 sm:w-52"
        onMouseLeave={() => onHoverIndex(null)}
      >
        {slices.map((slice, i) => {
          const isHovered = hoveredIndex === i;
          const isOtherHovered = hoveredIndex !== null && !isHovered;

          const offsetX = isHovered ? Math.cos(slice.midAngle) * HOVER_OFFSET : 0;
          const offsetY = isHovered ? Math.sin(slice.midAngle) * HOVER_OFFSET : 0;

          const textX = PIE_CENTER + PIE_RADIUS * 0.62 * Math.cos(slice.midAngle) + offsetX;
          const textY = PIE_CENTER + PIE_RADIUS * 0.62 * Math.sin(slice.midAngle) + offsetY;
          const showText = slice.pct >= 10;

          if (slice.isFullCircle) {
            return (
              <g
                key={`${slice.label}-${i}`}
                onMouseEnter={() => onHoverIndex(i)}
                className="cursor-pointer transition-all duration-200"
              >
                <circle
                  cx={PIE_CENTER}
                  cy={PIE_CENTER}
                  r={PIE_RADIUS}
                  fill={slice.color}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />
                <text
                  x={PIE_CENTER}
                  y={PIE_CENTER}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="700"
                  className="pointer-events-none drop-shadow"
                >
                  {slice.pct}%
                </text>
              </g>
            );
          }

          return (
            <g
              key={`${slice.label}-${i}`}
              onMouseEnter={() => onHoverIndex(i)}
              className="cursor-pointer transition-all duration-200"
              style={{
                transform: `translate(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px)`,
                transition: "transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease",
                opacity: isOtherHovered ? 0.6 : 1,
              }}
            >
              <path
                d={slice.path}
                fill={slice.color}
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {showText && (
                <text
                  x={textX.toFixed(2)}
                  y={textY.toFixed(2)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="700"
                  className="pointer-events-none select-none drop-shadow-sm"
                >
                  {slice.pct}%
                </text>
              )}
            </g>
          );
        })}
      </svg>
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

const DEFAULT_EXPENSE_NAMES = [
  "Food & Dining",
  "Housing & Rent",
  "Transportation",
  "Bills & Utilities",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Education",
  "Personal Care",
  "Travel",
  "Subscriptions",
  "Miscellaneous",
];

export default function DashboardClient({
  initialData,
  initialError = null,
}: DashboardClientProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [hoveredSpendingIndex, setHoveredSpendingIndex] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const categoryById = useMemo(() => {
    const map = new Map<number, Category>();
    categories.forEach((c) => map.set(c.id, c));
    return map;
  }, [categories]);
  const { profile } = useCurrentUser();
  const currency = profile?.currency ?? "NGN";
  const [data, setData] = useState<DashboardState>(initialData);

  useEffect(() => {
    seedCache("dashboard-data", initialData, 30 * 1000);
  }, [initialData]);

  // Rotate through insights automatically when there are multiple
  useEffect(() => {
    if (!data.insights || data.insights.length <= 1) {
      setCurrentInsightIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentInsightIndex(prev => (prev + 1) % data.insights!.length);
    }, 8000); // Rotate every 8 seconds

    return () => clearInterval(interval);
  }, [data.insights]);

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

  const budgets = useMemo(
    () =>
      data.budgets.map((b, i) => {
        const catId = b.categoryId ?? (b as any).id;
        const catObj = typeof catId === "number" ? categoryById.get(catId) : undefined;
        const rawName =
          b.categoryName ||
          (b as any).category ||
          (b as any).name ||
          catObj?.name ||
          ((b as any).parentSlug ? toBudgetCategory((b as any).parentSlug) : undefined) ||
          DEFAULT_EXPENSE_NAMES[i % DEFAULT_EXPENSE_NAMES.length];

        const label = toBudgetCategory(rawName) || rawName;
        const color = getCategoryColor(label, i);

        return {
          label,
          amount: b.totalSpent ?? (b as any).spent ?? 0,
          remaining: b.remaining ?? 0,
          pct: b.percentUsed ?? 0,
          color,
        };
      }),
    [data.budgets, categoryById]
  );

  const spending = useMemo(() => {
    const budgetColorMap = new Map<string, string>();
    budgets.forEach((b) => {
      budgetColorMap.set(b.label.toLowerCase().trim(), b.color);
    });

    return data.spendingByCategory.map((item, i) => {
      const catId = (item as any).categoryId ?? (item as any).id;
      const foundCategory = typeof catId === "number" ? categoryById.get(catId) : undefined;
      const budgetCategoryMatch =
        typeof catId === "number" ? data.budgets.find((b) => b.categoryId === catId) : undefined;
      const txMatch =
        typeof catId === "number"
          ? data.recentTransactions.find((t) => t.categoryId === catId)
          : undefined;

      const raw =
        (item as any).categoryName ||
        (item as any).category ||
        (item as any).name ||
        (item as any).title ||
        foundCategory?.name ||
        budgetCategoryMatch?.categoryName ||
        (budgetCategoryMatch as any)?.category ||
        (budgetCategoryMatch as any)?.name ||
        txMatch?.categoryName ||
        item.parentSlug ||
        (item as any).slug ||
        foundCategory?.slug ||
        "";

      const matchedCategory = CATEGORIES.find(
        (c) => c.value === raw || c.label.toLowerCase() === String(raw).toLowerCase()
      );

      const label =
        matchedCategory?.label ||
        toBudgetCategory(raw) ||
        (raw
          ? String(raw).replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
          : (budgets[i]?.label || DEFAULT_EXPENSE_NAMES[i % DEFAULT_EXPENSE_NAMES.length]));

      const matchedColor =
        budgetColorMap.get(label.toLowerCase().trim()) ||
        budgetColorMap.get(toBudgetCategory(raw).toLowerCase().trim());

      const color = matchedColor ?? getCategoryColor(label, i);

      return {
        label,
        amount: item.amount,
        pct: item.percentage,
        color,
      };
    });
  }, [data.spendingByCategory, data.budgets, data.recentTransactions, budgets, categoryById]);

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

  const currentInsight = useMemo(() => deriveInsight(data.insights, currentInsightIndex), [data.insights, currentInsightIndex]);
  const recentTxs = data.recentTransactions;
  const highestSpendingCategory = spending[0]?.label ?? "N/A";
  const activeSpendingCategory = hoveredSpendingIndex !== null ? spending[hoveredSpendingIndex] : null;

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

            {currentInsight ? (
              <div className="max-w-3xl">
                <div
                  className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                    currentInsight.type === "alert"
                      ? "bg-Budgexa-orange/20 text-Budgexa-orange"
                      : currentInsight.type === "positive"
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-white/80"
                  }`}
                >
                  {currentInsight.type === "alert"
                    ? "⚠ Alert"
                    : currentInsight.type === "positive"
                      ? "✓ Positive"
                      : "💡 Suggestion"}
                </div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
                  {currentInsight.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/75 md:text-base">
                  {currentInsight.body}
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

        {/* Spending Overview, Budget Performance, Savings Goals — Equal Height */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
          {/* Spending Overview Card */}
          <section className="flex flex-col h-full min-h-[520px] rounded-[28px] border border-Budgexa-green/5 bg-white p-5 shadow-sm md:p-6">
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

            <div className="flex flex-1 flex-col items-center">
              {loading ? (
                <div className="my-auto flex flex-col items-center py-8">
                  <div className="h-48 w-48 animate-pulse rounded-full bg-Budgexa-beige" />
                </div>
              ) : spending.length > 0 ? (
                <>
                  <PieChart
                    spending={spending}
                    hoveredIndex={hoveredSpendingIndex}
                    onHoverIndex={setHoveredSpendingIndex}
                  />

                  <div className="mt-4 flex min-h-[48px] w-full items-center justify-between rounded-2xl bg-Budgexa-ash px-4 py-2.5 transition-all">
                    {activeSpendingCategory ? (
                      <div className="flex w-full items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <div
                            className="h-3 w-3 shrink-0 rounded-full"
                            style={{ backgroundColor: activeSpendingCategory.color }}
                          />
                          <span className="truncate text-sm font-semibold text-Budgexa-green">
                            {activeSpendingCategory.label}
                          </span>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-sm font-bold text-Budgexa-green">
                            {formatCurrency(activeSpendingCategory.amount, currency)}
                          </span>
                          <span className="rounded-full bg-Budgexa-green/10 px-2 py-0.5 text-xs font-semibold text-Budgexa-green">
                            {activeSpendingCategory.pct}%
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-Budgexa-green/60">Total:</span>
                          <span className="text-sm font-bold text-Budgexa-green">
                            {formatCurrency(data.monthlyExpenses, currency)}
                          </span>
                        </div>
                        <div className="text-xs text-Budgexa-green/70">
                          Top:{" "}
                          <span className="font-semibold text-Budgexa-green">
                            {highestSpendingCategory}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 w-full space-y-2">
                    {spending.map((item, index) => {
                      const isHovered = hoveredSpendingIndex === index;
                      return (
                        <div
                          key={`${item.label}-${index}`}
                          onMouseEnter={() => setHoveredSpendingIndex(index)}
                          onMouseLeave={() => setHoveredSpendingIndex(null)}
                          className={cn(
                            "flex items-center justify-between rounded-2xl p-2.5 transition-all cursor-pointer",
                            isHovered
                              ? "bg-Budgexa-ash shadow-sm"
                              : "hover:bg-Budgexa-ash/60"
                          )}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div
                              className="h-3 w-3 shrink-0 rounded-full transition-transform duration-200"
                              style={{
                                backgroundColor: item.color,
                                transform: isHovered ? "scale(1.25)" : "scale(1)",
                              }}
                            />
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-Budgexa-green">
                                {item.label}
                              </p>
                              <p className="mt-0.5 text-xs text-Budgexa-green/55">
                                {formatCurrency(item.amount, currency)}
                              </p>
                            </div>
                          </div>
                          <span className="shrink-0 text-xs font-bold text-Budgexa-green/80">
                            {item.pct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="my-auto flex flex-1 flex-col items-center justify-center py-8 text-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-Budgexa-green/10 bg-Budgexa-ash/60 text-Budgexa-green shadow-xs">
                    <PiggyBank size={26} className="text-Budgexa-green" />
                  </div>
                  <p className="font-semibold text-Budgexa-green">No expenses tracked yet</p>
                  <p className="mt-1 max-w-[220px] text-xs text-Budgexa-green/60">
                    Add your first transaction to see a breakdown of your spending habits.
                  </p>
                  <Link
                    href="/product/finance/transactions"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-Budgexa-green/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-Budgexa-green shadow-xs transition hover:bg-Budgexa-ash"
                  >
                    <Plus size={14} />
                    Add Transaction
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-auto pt-6 border-t border-Budgexa-green/5">
              <Link
                href="/product/finance/transactions"
                className="inline-flex items-center gap-2 text-sm font-semibold text-Budgexa-green transition-all hover:gap-3"
              >
                Explain spending
                <ChevronRight size={16} />
              </Link>
            </div>
          </section>

          {/* Budget Performance Card */}
          <section className="flex flex-col h-full min-h-[520px] rounded-[28px] border border-Budgexa-green/5 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-Budgexa-green">
                  Budget Performance
                </h3>
                <p className="mt-1 text-sm text-Budgexa-green/60">Monthly category tracking</p>
              </div>

              <Link
                href="/product/finance/budget"
                className="text-sm font-semibold text-Budgexa-green hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="flex flex-1 flex-col">
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
                <div className="my-auto flex flex-1 flex-col items-center justify-center py-8 text-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-Budgexa-green/10 bg-Budgexa-ash/60 text-Budgexa-green shadow-xs">
                    <Wallet size={26} className="text-Budgexa-green" />
                  </div>
                  <p className="font-semibold text-Budgexa-green">No budget data yet</p>
                  <p className="mt-1 max-w-[220px] text-xs text-Budgexa-green/60">
                    Set monthly spending limits for your categories to keep expenses in check.
                  </p>
                  <Link
                    href="/product/finance/budget"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-Budgexa-green/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-Budgexa-green shadow-xs transition hover:bg-Budgexa-ash"
                  >
                    <Plus size={14} />
                    Create Budget
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {budgets.map((item, index) => {
                    const status =
                      item.pct >= 80 ? "Near limit" : item.pct >= 60 ? "Watch spending" : "Healthy";

                    return (
                      <div key={`${item.label}-${index}`}>
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
            </div>

            <div className="mt-auto pt-6 border-t border-Budgexa-green/5">
              <Link
                href="/product/finance/budget"
                className="inline-flex items-center gap-2 text-sm font-semibold text-Budgexa-green transition-all hover:gap-3"
              >
                Optimize budget
                <ChevronRight size={16} />
              </Link>
            </div>
          </section>

          {/* Savings Goals Card */}
          <section className="flex flex-col h-full min-h-[520px] rounded-[28px] border border-Budgexa-green/5 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-Budgexa-green">
                  Savings Goals
                </h3>
                <p className="mt-1 text-sm text-Budgexa-green/60">Your active goals</p>
              </div>

              <Link
                href="/product/finance/savings"
                className="text-sm font-semibold text-Budgexa-green hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="flex flex-1 flex-col">
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
                <div className="my-auto flex flex-1 flex-col items-center justify-center py-8 text-center">
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-Budgexa-green/10 bg-Budgexa-ash/60 text-Budgexa-green shadow-xs">
                    <Target size={26} className="text-Budgexa-green" />
                  </div>
                  <p className="font-semibold text-Budgexa-green">No savings goals yet</p>
                  <p className="mt-1 max-w-[220px] text-xs text-Budgexa-green/60">
                    Track your progress toward dream purchases, emergency funds, or vacations.
                  </p>
                  <Link
                    href="/product/finance/savings/new"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-Budgexa-green/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-Budgexa-green shadow-xs transition hover:bg-Budgexa-ash"
                  >
                    <Plus size={14} />
                    Set a Goal
                  </Link>
                </div>
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
            </div>

            <div className="mt-auto pt-6 border-t border-Budgexa-green/5">
              <Link
                href="/product/finance/savings"
                className="inline-flex items-center gap-2 text-sm font-semibold text-Budgexa-green transition-all hover:gap-3"
              >
                Manage goals
                <ChevronRight size={16} />
              </Link>
            </div>
          </section>
        </div>

        {/* Recent Transactions — Full Width below the 3 cards */}
        <section className="mt-6 rounded-[28px] border border-Budgexa-green/5 bg-white p-5 shadow-sm md:hidden">
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

        <section className="mt-6 hidden rounded-[28px] border border-Budgexa-green/5 bg-white p-5 shadow-sm md:block md:p-6">
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
                        <Link
                          href={`/product/finance/transactions/${tx.id}/edit`}
                          className="inline-flex items-center justify-center p-1.5 rounded-lg text-Budgexa-green/50 transition-colors hover:text-Budgexa-green hover:bg-Budgexa-ash"
                          title="Edit transaction"
                        >
                          <MoreHorizontal size={18} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
