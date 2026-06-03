import Link from "next/link";

import { getCurrentUser, getDashboardData } from "@/lib/api-client";
import { formatNaira, formatNairaCompact, relativeTime } from "@/lib/utils";
import type { Transaction } from "@/lib/types/src/index";

function sectionTitle(title: string, subtitle: string) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-rayo-green">{title}</h1>
      <p className="mt-2 text-sm text-rayo-green/50">{subtitle}</p>
    </div>
  );
}

function summarizeTransactions(transactions: Transaction[]) {
  const income = transactions
    .filter((transaction) => transaction.type === "credit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "debit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const byCategory = transactions
    .filter((transaction) => transaction.type === "debit")
    .reduce<Record<string, number>>((accumulator, transaction) => {
      accumulator[transaction.category] =
        (accumulator[transaction.category] ?? 0) + transaction.amount;
      return accumulator;
    }, {});

  const topCategories = Object.entries(byCategory)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 4);

  return { income, expenses, topCategories };
}

export default async function ReportsPage() {
  const currentUser = await getCurrentUser();
  const { accounts, transactions, savings, insights } = await getDashboardData(currentUser.id);
  const totals = summarizeTransactions(transactions);

  const totalBalance = accounts.reduce((sum: number, account: any) => sum + account.balance, 0);
  const savingsProgress = savings && savings.target_amount
    ? Math.round((savings.auto_saved_amount / savings.target_amount) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        {sectionTitle(
          "Reports",
          "A quick read on income, spending, and savings trends pulled from the live backend."
        )}

        <div className="flex gap-3">
          <Link href="/finance/transactions" className="btn-secondary px-4 py-2.5 text-sm">
            View Transactions
          </Link>
          <Link href="/finance/budget" className="btn-primary px-4 py-2.5 text-sm">
            Review Budget
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-rayo-beige-dark bg-white p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-rayo-green/35">Net Worth</p>
          <p className="mt-2 text-3xl font-bold text-rayo-green">{formatNaira(totalBalance)}</p>
          <p className="mt-2 text-sm text-rayo-green/45">Across connected accounts</p>
        </div>

        <div className="rounded-2xl border border-rayo-beige-dark bg-white p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-rayo-green/35">Income</p>
          <p className="mt-2 text-3xl font-bold text-rayo-green">{formatNaira(totals.income)}</p>
          <p className="mt-2 text-sm text-rayo-green/45">Total credits recorded</p>
        </div>

        <div className="rounded-2xl border border-rayo-beige-dark bg-white p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-rayo-green/35">Expenses</p>
          <p className="mt-2 text-3xl font-bold text-rayo-green">{formatNaira(totals.expenses)}</p>
          <p className="mt-2 text-sm text-rayo-green/45">Total debits recorded</p>
        </div>

        <div className="rounded-2xl border border-rayo-beige-dark bg-white p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-rayo-green/35">Savings Progress</p>
          <p className="mt-2 text-3xl font-bold text-rayo-green">{savingsProgress}%</p>
          <p className="mt-2 text-sm text-rayo-green/45">
            {savings ? `${formatNairaCompact(savings.auto_saved_amount)} of ${formatNairaCompact(savings.target_amount ?? 0)}` : "No savings goal found"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-rayo-beige-dark bg-white p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-rayo-green">Top Spend Categories</h2>
              <p className="mt-1 text-sm text-rayo-green/45">Largest expense buckets from the current data set.</p>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-rayo-green/30">Live</span>
          </div>

          <div className="mt-6 space-y-4">
            {totals.topCategories.length > 0 ? (
              totals.topCategories.map(([category, amount]) => {
                const share = totals.expenses > 0 ? Math.round((amount / totals.expenses) * 100) : 0;

                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-rayo-green">{category}</span>
                      <span className="text-rayo-green/45">{formatNaira(amount)} · {share}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-rayo-beige-light overflow-hidden">
                      <div className="h-full rounded-full bg-rayo-green transition-all" style={{ width: `${Math.max(8, share)}%` }} />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-rayo-green/45">No expense data yet.</p>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-rayo-beige-dark bg-white p-6">
          <h2 className="text-lg font-bold text-rayo-green">Recent Activity</h2>
          <p className="mt-1 text-sm text-rayo-green/45">Latest transactions and insights from the backend.</p>

          <div className="mt-6 space-y-4">
            {transactions.slice(0, 5).map((transaction: any) => (
              <div key={transaction.id} className="rounded-2xl border border-rayo-beige-light bg-rayo-beige/20 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-rayo-green">{transaction.description ?? transaction.category}</p>
                    <p className="mt-1 text-xs text-rayo-green/45">{transaction.category}</p>
                  </div>
                  <p className={`text-sm font-semibold ${transaction.type === "credit" ? "text-emerald-600" : "text-rayo-alert"}`}>
                    {transaction.type === "credit" ? "+" : "-"}{formatNaira(transaction.amount)}
                  </p>
                </div>
                <p className="mt-2 text-xs text-rayo-green/35">{relativeTime(transaction.created_at)}</p>
              </div>
            ))}

            {transactions.length === 0 && (
              <p className="text-sm text-rayo-green/45">No recent transactions found.</p>
            )}
          </div>

          <div className="mt-6 rounded-2xl bg-rayo-green p-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">AI Insight</p>
            <p className="mt-2 text-sm leading-relaxed text-white/85">
              {insights[0]?.message ?? "Connect more activity to unlock richer insights and smarter recommendations."}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}