// lib/data-service.ts
import { getDashboardData, getCurrentUser, getAiInsights, askAi, scanReceipt } from "@/lib/api-client";
import { AiConversation, AiMessage, Category, TransactionFilters, TransactionListResponse } from "./types/src";
import {
  listTransactions,
  createTransaction as apiCreateTransaction,
  updateTransaction as apiUpdateTransaction,
  deleteTransaction as apiDeleteTransaction,
  deleteMultipleTransactions as apiDeleteMultipleTransactions,
} from "@/lib/api-client";
import {
  fetchSavingsGoals as apiFetchSavingsGoals,
  createSavingsGoal as apiCreateSavingsGoal,
  updateSavingsGoal as apiUpdateSavingsGoal,
  deleteSavingsGoal as apiDeleteSavingsGoal,
  fetchCategories as apiFetchCategories,
  type SavingsGoalRow,
  type CreateSavingsGoalPayload,
  type UpdateSavingsGoalPayload,
} from "@/lib/api-client";

type CacheEntry<T> = {
  value?: T;
  expiresAt: number;
  promise?: Promise<T>;
};

// Per-tab, in-memory only. This does NOT protect the backend across users —
// it only stops a single browser tab from firing duplicate/redundant
// requests for data it already has or is already fetching.
const sharedCache = new Map<string, CacheEntry<any>>();

function withCache<T>(key: string, ttlMs: number, fetcher: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const entry = sharedCache.get(key) as CacheEntry<T> | undefined;

  if (entry?.value !== undefined && entry.expiresAt > now) {
    return Promise.resolve(entry.value);
  }

  // Dedup: if a fetch for this key is already in flight, every caller
  // awaits the same promise instead of firing a new request. This is what
  // actually stops request storms when several components mount at once
  // and all ask for the same data (e.g. fetchCurrentUser on page load).
  if (entry?.promise) {
    return entry.promise;
  }

  const promise = fetcher()
    .then((value) => {
      sharedCache.set(key, {
        value,
        expiresAt: Date.now() + ttlMs,
      });
      return value;
    })
    .catch((error) => {
      sharedCache.delete(key);
      throw error;
    });

  sharedCache.set(key, {
    value: entry?.value,
    expiresAt: entry?.expiresAt ?? 0,
    promise,
  });

  return promise;
}

function invalidateCache(key: string) {
  sharedCache.delete(key);
}

// Periodically sweep expired, non-in-flight entries so the Map doesn't grow
// unbounded over a very long-lived tab (e.g. a dashboard left open all day).
// Low-priority housekeeping — this is a client memory concern, not a
// backend-load concern.
if (typeof window !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of sharedCache.entries()) {
      if (!entry.promise && entry.expiresAt <= now) {
        sharedCache.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export async function fetchCurrentUser() {
  return withCache("current-user", 5 * 60 * 1000, getCurrentUser);
}

export async function fetchDashboardData() {
  return withCache("dashboard-data", 30 * 1000, getDashboardData);
}

export async function fetchAiInsights() {
  return withCache("ai-insights", 60 * 1000, getAiInsights);
}

export async function sendAiMessage(payload: { question: string }) {
  const result = await askAi({ question: payload.question });
  invalidateCache("ai-insights");
  return result;
}

export function getInitialConversations(): AiConversation[] {
  return [];
}

// Transactions
export async function fetchTransactions(
  filters?: TransactionFilters
): Promise<TransactionListResponse> {
  return listTransactions(filters);
}

export async function createTransaction(...args: Parameters<typeof apiCreateTransaction>) {
  const result = await apiCreateTransaction(...args);
  invalidateCache("dashboard-data");
  invalidateCache("ai-insights");
  return result;
}

export async function updateTransaction(...args: Parameters<typeof apiUpdateTransaction>) {
  const result = await apiUpdateTransaction(...args);
  invalidateCache("dashboard-data");
  invalidateCache("ai-insights");
  return result;
}

export async function deleteTransaction(...args: Parameters<typeof apiDeleteTransaction>) {
  const result = await apiDeleteTransaction(...args);
  invalidateCache("dashboard-data");
  invalidateCache("ai-insights");
  return result;
}

export async function deleteMultipleTransactions(...args: Parameters<typeof apiDeleteMultipleTransactions>) {
  const result = await apiDeleteMultipleTransactions(...args);
  invalidateCache("dashboard-data");
  invalidateCache("ai-insights");
  return result;
}

// Savings Goals
export async function fetchSavingsGoals(): Promise<SavingsGoalRow[]> {
  return withCache("savings-goals", 60 * 1000, apiFetchSavingsGoals);
}

export async function createSavingsGoal(
  payload: CreateSavingsGoalPayload
): Promise<SavingsGoalRow> {
  const created = await apiCreateSavingsGoal(payload);
  invalidateCache("savings-goals");
  invalidateCache("dashboard-data");
  return created;
}

export async function updateSavingsGoal(
  id: number,
  payload: UpdateSavingsGoalPayload
): Promise<SavingsGoalRow> {
  const updated = await apiUpdateSavingsGoal(id, payload);
  invalidateCache("savings-goals");
  invalidateCache("dashboard-data");
  return updated;
}

export async function deleteSavingsGoal(id: number): Promise<void> {
  await apiDeleteSavingsGoal(id);
  invalidateCache("savings-goals");
  invalidateCache("dashboard-data");
}

export async function fetchCategories(): Promise<Category[]> {
  return withCache("categories", 10 * 60 * 1000, apiFetchCategories);
}

export async function scanReceiptForTransaction(file: File) {
  const result = await scanReceipt(file);
  if (result.created.length > 0) {
    invalidateCache("dashboard-data");
    invalidateCache("ai-insights");
  }
  return result;
}