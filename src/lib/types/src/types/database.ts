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
  id: string;
  name: string;
  subtitle: string;
  budget: number;
  spent: number;
  color: string;
  emoji: string;
}