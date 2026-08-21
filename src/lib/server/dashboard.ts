import { cache } from "react";
import type { AiInsight, DashboardState } from "@/lib/types/src";
import { backendFetch, getAuthTokenFromCookies } from "./backend-fetch";

const EMPTY_DASHBOARD: DashboardState = {
  totalBalance: 0,
  totalIncome: 0,
  totalExpenses: 0,
  monthlyIncome: 0,
  monthlyExpenses: 0,
  monthlySavings: 0,
  budgetMonthlyLimit: 0,
  budgetPercentUsed: 0,
  budgets: [],
  spendingByCategory: [],
  recentTransactions: [],
  savingsRate: 0,
  savingsGoals: [],
  insights: [],
};

async function readJson<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return (await res.json()) as T;
  }
  const text = await res.text();
  return text as unknown as T;
}

/** Deduped per request — fetches summary + insights in parallel from the backend. */
export const getDashboardDataServer = cache(async (): Promise<DashboardState> => {
  const token = await getAuthTokenFromCookies();
  if (!token) return EMPTY_DASHBOARD;

  const [summaryRes, insightsRes] = await Promise.allSettled([
    backendFetch("/dashboard/summary", token),
    backendFetch("/ai/insights", token),
  ]);

  let d: Record<string, unknown> = {};
  if (summaryRes.status === "fulfilled" && summaryRes.value.ok) {
    const json = await readJson<{ data?: Record<string, unknown> } & Record<string, unknown>>(
      summaryRes.value
    );
    d = json.data ?? json;
  }

  let insights: AiInsight[] = [];
  if (insightsRes.status === "fulfilled" && insightsRes.value.ok) {
    const json = await readJson<{ data?: unknown; insights?: AiInsight[] } & Record<string, unknown>>(
      insightsRes.value
    );
    const inner = json.data ?? json;
    insights = Array.isArray(inner)
      ? inner
      : ((inner as { insights?: AiInsight[] }).insights ?? []);
  }

  return {
    totalBalance: Number(d.totalBalance ?? 0),
    totalIncome: Number(d.totalIncome ?? 0),
    totalExpenses: Number(d.totalExpenses ?? 0),
    monthlyIncome: Number(d.monthlyIncome ?? 0),
    monthlyExpenses: Number(d.monthlyExpenses ?? 0),
    monthlySavings: Number(d.monthlySavings ?? 0),
    savingsRate: Number(d.savingsRate ?? 0),
    budgetMonthlyLimit: Number(d.budgetMonthlyLimit ?? 0),
    budgetPercentUsed: Number(d.budgetPercentUsed ?? 0),
    budgets: (d.budgets as DashboardState["budgets"]) ?? [],
    spendingByCategory: (d.spendingByCategory as DashboardState["spendingByCategory"]) ?? [],
    recentTransactions: (d.recentTransactions as DashboardState["recentTransactions"]) ?? [],
    savingsGoals: (d.savingsGoals as DashboardState["savingsGoals"]) ?? [],
    insights,
  };
});
