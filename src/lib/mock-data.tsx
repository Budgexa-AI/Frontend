// lib/mock-data.ts
import type { Account, Transaction, SavingsGoal, AiInsight, UserProfile, AiConversation, BudgetCategory } from "@/lib/types/src";

export const mockUser: UserProfile = {
  id: "1",
  email: "test@rayo.app",
  name: "Test User",
  profileImage: "",
  envelopeBased: true,
  incomeSource: "Salary",
  onboardingComplete: true,
};

const now = new Date().toISOString();

export const mockDashboardData = {
  totalBalance:       45000,
  totalIncome:        50000,
  totalExpenses:      5000,
  monthlyIncome:      0,
  monthlyExpenses:    0,
  monthlySavings:     0,
  savingsRate:        0,
  budgetMonthlyLimit: 30000,
  budgetPercentUsed:  0,
  accounts:           [],
  transactions:       [],
  budgets:            [
    {
      id: "transport",
      name: "Transport",
      subtitle: "Taxi, Fuel",
      budget: 80000,
      spent: 36000,
      color: "#8B5CF6",
      emoji: "🚗",
    }
  ],
  spendingByCategory: [],
  savingsGoals:       [],
  insights:           [],
  recentTransactions: [],
};

export const mockTransactions = [
  {
    id: "1",
    date: "May 18, 2026",
    time: "10:42 AM",
    description: "Lunch at Chicken Republic",
    subtitle: "Ate with Tobi after class",
    category: "Food & Dining",
    type: "Expense" as const,
    amount: -4500,
    paymentMethod: "Access Bank",
    icon: "🍔",
    color: "#F59E0B",
  },
  {
    id: "2",
    date: "May 18, 2026",
    time: "09:15 AM",
    description: "MTN Data Bundle",
    subtitle: "150GB Monthly Plan",
    category: "Data & Internet",
    type: "Expense" as const,
    amount: -20000,
    paymentMethod: "Access Bank",
    icon: "📶",
    color: "#8B5CF6",
  },
  {
    id: "3",
    date: "May 17, 2026",
    time: "08:22 PM",
    description: "Transfer to Tobi",
    subtitle: "Rent contribution",
    category: "Transfers",
    type: "Expense" as const,
    amount: -25000,
    paymentMethod: "GTBank",
    icon: "🔄",
    color: "#3B82F6",
  },
  {
    id: "4",
    date: "May 17, 2026",
    time: "02:10 PM",
    description: "KFC Victoria Island",
    subtitle: "Lunch",
    category: "Food & Dining",
    type: "Expense" as const,
    amount: -3800,
    paymentMethod: "Moniepoint",
    icon: "🍗",
    color: "#F59E0B",
  },
  {
    id: "5",
    date: "May 16, 2026",
    time: "11:30 AM",
    description: "Netflix Subscription",
    subtitle: "Monthly subscription",
    category: "Entertainment",
    type: "Expense" as const,
    amount: -2900,
    paymentMethod: "Access Bank",
    icon: "🎬",
    color: "#EF4444",
  },
  {
    id: "6",
    date: "May 16, 2026",
    time: "09:05 AM",
    description: "Airtime Top Up",
    subtitle: "MTN Airtime",
    category: "Airtime",
    type: "Expense" as const,
    amount: -1000,
    paymentMethod: "Access Bank",
    icon: "📱",
    color: "#10B981",
  },
  {
    id: "7",
    date: "May 15, 2026",
    time: "06:45 PM",
    description: "Freelance Payment",
    subtitle: "UI/UX Design Project",
    category: "Freelance",
    type: "Income" as const,
    amount: 120000,
    paymentMethod: "GTBank",
    icon: "💻",
    color: "#8B5CF6",
  },
  {
    id: "8",
    date: "May 15, 2026",
    time: "01:20 PM",
    description: "Paid by Mom",
    subtitle: "Upkeep stipend",
    category: "Family Support",
    type: "Income" as const,
    amount: 50000,
    paymentMethod: "Zenith Bank",
    icon: "💜",
    color: "#A855F7",
  },
  {
    id: "9",
    date: "May 14, 2026",
    time: "07:50 PM",
    description: "Bolt Ride",
    subtitle: "From school to home",
    category: "Transport",
    type: "Expense" as const,
    amount: -1700,
    paymentMethod: "Moniepoint",
    icon: "🚕",
    color: "#F97316",
  },
  {
    id: "10",
    date: "May 14, 2026",
    time: "12:18 PM",
    description: "Groceries at Shoprite",
    subtitle: "Weekly restocking",
    category: "Groceries",
    type: "Expense" as const,
    amount: -7450,
    paymentMethod: "Access Bank",
    icon: "🛒",
    color: "#2563EB",
  },
];

export const mockCategorySpending = [
  { name: "Food & Dining", value: 55600, color: "#F59E0B" },
  { name: "Transfers",     value: 43500, color: "#3B82F6" },
  { name: "Data & Internet", value: 23700, color: "#8B5CF6" },
  { name: "Transport",     value: 19800, color: "#F97316" },
  { name: "Groceries",     value: 15300, color: "#2563EB" },
  { name: "Others",        value: 40450, color: "#CBD5E1" },
];

export const mockAiConversations: AiConversation[] = [
  {
    id: "conv-1",
    title: "Spending this month",
    createdAt: new Date().toISOString(),
    question: [
      { id: "1", role: "user",      content: "Why am I overspending this month?", createdAt: new Date().toISOString() },
      { id: "1", role: "assistant", content: "Based on your transactions, Food & Dining accounts for 28% of your outflow this month — higher than your usual 18%. Three restaurant visits in 4 days drove most of that spike.", createdAt: new Date().toISOString() },
    ],
  },
];

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

export const CATEGORIES: BudgetCategory[] = [
  {
    id: 1,
    userId: 5,
    category: "Food",
    monthlyLimit: 90000,
    totalSpent: 20500,
    remaining: 69500,
    percentUsed: 20,
    rollover: false,
  }
];