// lib/types/src/index.ts

export interface Account {
  id: number;
  userId: number;
  balance: string;
  name: string;
}

export interface Transaction {
  id: number;
  userId: number;
  type: "income" | "expense";
  amount: number;
  category: string;
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
  targetAmount: string;
  currentAmount: string;
  deadline: string;
}

// types/src/index.ts
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

// Single message type used everywhere — replaces both Message and AiMessage
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  attachment?: Attachment;
}

// Alias so existing imports of AiMessage don't break immediately
export type AiMessage = Message;

export interface Conversation {
  id: string;
  title: string;
  question: Message[];
  createdAt: string;
  // optional fields from the old Conversation type
  preview?: string;
  updatedAt?: string;
  category?: "budget" | "savings" | "spending" | "goals" | "debt" | "general";
}

// Alias so existing imports of AiConversation don't break
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

export interface BudgetCategory {
  id: number;
  userId: number;
  category: string;
  monthlyLimit: number;
  totalSpent: number;
  remaining: number;
  percentUsed: number;
  rollover: boolean;
}

export interface TransactionFilters {
  type?: "income" | "expense";
  category?: string;
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
  budgets: Array<{
    id: number;
    category: string;
    monthlyLimit: number;
    totalSpent: number;
    remaining: number;
    percentUsed: number;
    rollover: boolean;
  }>;
  spendingByCategory: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  recentTransactions: Array<{
    id: number | string;
    type: "income" | "expense";
    amount: number;
    category: string;
    description: string;
    date: string;
    createdAt: string;
  }>;
  savingsRate: number;
  savingsGoals: Array<{
    id: number;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    percentComplete: number;
  }>;
  insights?: AiInsight[]; // Kept optional for the AI Hero section
}