// lib/types/src/index.ts

export interface Account {
  id: number;
  userId: number;
  balance: string;
  name: string;
}

export interface Transaction {
  id: number;
  userId: string;
  type: "income" | "expense";
  amount: number;
  categoryId: number;
  categoryName: string;   // resolved by api-client via /categories lookup
  parentSlug?: string;
  description: string;
  merchant?: string;
  bill_type?: string;
  institution?: string;
  date: string;
  createdAt: string;
}

export interface SavingsGoal {
  id: number;
  userId: number;
  name: string;
  categoryId: number;
  goalType: "PERSONAL" | "GROUP" | "AJO";
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  percentComplete: number;
}

export interface AiInsight {
  id: string;
  type: "alert" | "positive" | "suggestion" | "warning" | "observation";
  message: string;
  detail: string;
}

export interface Attachment {
  name: string;
  size: string;
  url?: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  attachment?: Attachment;
}

export type AiMessage = Message;

export interface Conversation {
  id: string;
  title: string;
  question: Message[];
  createdAt: string;
  preview?: string;
  updatedAt?: string;
  category?: "budget" | "savings" | "spending" | "goals" | "debt" | "general";
}

export type AiConversation = Conversation;

export interface ChatResponse {
  message: Message;
  conversationId: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  envelopeBased: boolean;
  incomeSource?: string;
  onboardingComplete: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parentSlug: string;
  emoji?: string;
  isSystem: boolean;
}

export interface TransactionFilters {
  type?: "income" | "expense";
  categoryId?: number;
  parentSlug?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface TransactionListResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
}

export interface DashboardState {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlySavings: number;
  budgetMonthlyLimit: number;
  budgetPercentUsed: number;
  budgets: BudgetCategory[];
  spendingByCategory: Array<{
    categoryId: number;
    parentSlug: string;
    amount: number;
    percentage: number;
  }>;
  recentTransactions: Transaction[];
  savingsRate: number;
  savingsGoals: SavingsGoal[];
  insights?: AiInsight[];
}

export interface SavingsGoalRow {
  id: number;
  userId: number;
  name: string;
  categoryId: number;                        // ← add
  goalType: "PERSONAL" | "GROUP" | "AJO";   // ← add
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  percentComplete: number;
}

export interface CreateSavingsGoalPayload {
  name: string;
  targetAmount: number;
  currentAmount?: number;
  deadline: string;
  // one of these two patterns:
  categoryId?: number;          // if user picked an existing category
  categoryName?: string;        // if user typed a custom name
  parentSlug?: string;          // required when categoryName is provided
  goalType?: "PERSONAL" | "GROUP" | "AJO";
}

export interface UpdateSavingsGoalPayload {
  name?: string;
  categoryId?: number;
  goalType?: "PERSONAL" | "GROUP" | "AJO";
  targetAmount?: number;
  currentAmount?: number;
  deadline?: string;
}

export interface Budget {
  id: number;
  userId: number;
  name: string;
  categoryId: number;
  categoryName?: string;
  categoryEmoji?: string;
  monthlyLimit: number;
  totalSpent: number;
  remaining: number;
  percentUsed: number;
  rollover: boolean;
  balance?: number;
}

export type BudgetCategory = Budget;