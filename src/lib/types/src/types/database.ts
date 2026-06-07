// lib/types/src/index.ts — keep only what matches your actual backend

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

export interface AiInsight {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface AiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

export interface AiConversation {
  id: string;
  title: string;
  messages: AiMessage[];
  createdAt: string;
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
  id: string;
  name: string;
  subtitle: string;
  budget: number;
  spent: number;
  color: string;
  emoji: string;
}