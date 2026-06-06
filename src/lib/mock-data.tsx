// lib/mock-data.ts
import type { Account, Transaction, Savings, AiInsight } from "@/lib/types/src";

export const mockDashboardData = {
  accounts: [
    { id: "1", balance: 575000, name: "Main Account" },
  ] as Account[],

  transactions: [
    { id: "1", amount: -5200,  category: "Food",      description: "Grocery Store",  createdAt: new Date().toISOString() },
    { id: "2", amount: 200000, category: "Income",    description: "Salary Deposit", createdAt: new Date().toISOString() },
    { id: "3", amount: -3800,  category: "Transport", description: "Uber Ride",      createdAt: new Date().toISOString() },
  ] as Transaction[],

  savings: {
    goals: [
      { name: "Emergency Fund", currentAmount: 120000,  targetAmount: 300000  },
      { name: "Car Savings",    currentAmount: 2600000, targetAmount: 4000000 },
    ],
  } as unknown as Savings,

  insights: [
    {
      title: "You spent 15% more on food this month.",
      content: "Based on your spending patterns, meal planning could help you save around ₦15,000 monthly.",
    },
  ] as AiInsight[],
};

export const mockUser = {
  id: "mock-user-1",
  email: "test@rayo.app",
  fullName: "Test User",
};