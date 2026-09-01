// lib/data-service.ts
import { mockDashboardData, mockUser, mockAiConversations } from "@/lib/mock-data";
import { AiConversation, AiMessage, Category, TransactionFilters, TransactionListResponse } from "./types/src";
import { mockTransactions, mockCategorySpending, MOCK_SAVINGS_GOALS } from "@/lib/mock-data";
import {
  fetchSavingsGoals as apiFetchSavingsGoals,
  createSavingsGoal as apiCreateSavingsGoal,
  updateSavingsGoal as apiUpdateSavingsGoal,
  deleteSavingsGoal as apiDeleteSavingsGoal,
  fetchCategories as apiFetchCategories,
  listTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  deleteMultipleTransactions,
  getDashboardData, 
  getCurrentUser, 
  getAiInsights, 
  askAi, 
  fetchNotificationPreferences as apiFetchNotification,
  type SavingsGoalRow,
  type CreateSavingsGoalPayload,
  type UpdateSavingsGoalPayload,
  NotificationPreferences,
} from "@/lib/api-client";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export async function fetchCurrentUser() {
  if (USE_MOCK) return mockUser;
  return getCurrentUser();
}

export async function fetchDashboardData() {
  if (USE_MOCK) return mockDashboardData;
  return getDashboardData();
}

export async function fetchAiInsights() {
  if (USE_MOCK) return [];
  return getAiInsights();
}

export async function sendAiMessage(payload: { question: string }) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 800));
    return {
      reply: "Omo, this is mock mode o. Connect to backend to get the real gist.",
      conversationId: "mock-conv-1",
    };
  }

  const result = await askAi({ question: payload.question });
  return result;
}

export function getInitialConversations(): AiConversation[] {
  if (USE_MOCK) return mockAiConversations;
  return [];
}

// Transactions
export async function fetchTransactions(
  filters?: TransactionFilters
): Promise<TransactionListResponse> {
  if (USE_MOCK) {
    return {
      transactions: mockTransactions as any,
      total: mockTransactions.length,
      page: 1,
      limit: 10,
    };
  }
  return listTransactions(filters);
}

export { createTransaction, updateTransaction, deleteTransaction, deleteMultipleTransactions };

// Savings Goals
export async function fetchSavingsGoals(): Promise<SavingsGoalRow[]> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 400));
    return MOCK_SAVINGS_GOALS;
  }
  return apiFetchSavingsGoals();
}

export async function createSavingsGoal(
  payload: CreateSavingsGoalPayload
): Promise<SavingsGoalRow> {
  return apiCreateSavingsGoal(payload);
}

export async function updateSavingsGoal(
  id: number,
  payload: UpdateSavingsGoalPayload
): Promise<SavingsGoalRow> {
  return apiUpdateSavingsGoal(id, payload);
}

export async function deleteSavingsGoal(id: number): Promise<void> {
  return apiDeleteSavingsGoal(id);
}

export async function fetchCategories(): Promise<Category[]> {
  return apiFetchCategories();
}