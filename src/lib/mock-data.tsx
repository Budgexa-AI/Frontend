// lib/mock-data.ts
import type { Account, Transaction, SavingsGoal, AiInsight, UserProfile, AiConversation, BudgetCategory } from "@/lib/types/src";

export const mockUser: UserProfile = {
  id: "1",
  email: "test@Budgexa.app",
  name: "Test User",
  profileImage: "",
  envelopeBased: true,
  incomeSource: "Salary",
  onboardingComplete: true,
};

const now = new Date().toISOString();

export const PAYMENT_METHODS: { value: string; label: string; icon: string }[] =
  [
    { value: "transfer", label: "Transfer", icon: "↔" },
    { value: "airtime_data", label: "Airtime / Data", icon: "📶" },
    { value: "bill_payment", label: "Bill Payment", icon: "🧾" },
    { value: "shopping", label: "Shopping", icon: "🛍️" },
    { value: "other", label: "Other", icon: "•••" },
  ];

export const BANKS = [
  "Access Bank",
  "First Bank",
  "GTBank",
  "Kuda Bank",
  "OPay",
  "PalmPay",
  "Polaris Bank",
  "Sterling Bank",
  "UBA",
  "Union Bank",
  "Zenith Bank",
];

export interface Goal {
  id: string;
  name: string;
  subtitle: string;
  iconKey: string;
  iconBg: string;
  saved: number;
  target: number;
  targetDate: string;
}
