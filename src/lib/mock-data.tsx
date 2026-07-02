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
  insights: [],
  totalBalance: 85000,
  totalIncome: 100000,       // Fixed: cased to camelCase
  totalExpenses: 35000,      // Fixed: cased to camelCase
  monthlyIncome: 50000,      // Fixed: cased to camelCase
  monthlyExpenses: 10000,    // Fixed: cased to camelCase
  monthlySavings: 40000,
  budgetMonthlyLimit: 30000,
  budgetPercentUsed: 33.33,
  budgets: [
    {
      id: 4,
      userId: 14,
      category: "Food",
      limit: 30000,          // Fixed: changed from monthlyLimit to limit to align with state assignment
      totalSpent: 10000,
      remaining: 20000,
      percentUsed: 33.33,
      rollover: true
    },
    {
      id: 3,
      userId: 5,
      category: "Transport",
      totalSpent: 15000,
      remaining: 45000,
      percentUsed: 33.33,
      roleover: false
    }
  ],
  spendingByCategory: [
    {
      category: "Food",
      amount: 10000,
      percentage: 100
    }
  ],
  recentTransactions: [
    {
      id: 19,
      userId: "14",
      type: "expense",
      amount: 10000,
      category: "Food",
      description: "Fab",
      date: "2026-06-07",
      createdAt: "2026-06-10T22:25:13.290Z"
    },
    {
      id: 18,
      userId: "14",
      type: "income",
      amount: 50000,
      category: "Salary",
      description: "Salary",
      date: "2026-06-01",
      createdAt: "2026-06-10T22:24:44.976Z"
    },
    {
      id: 16,
      userId: "14",
      type: "expense",
      amount: 5000,
      category: "Food",
      description: "Mummy put",
      date: "2026-05-27",
      createdAt: "2026-06-09T17:19:05.311Z"
    },
    {
      id: 17,
      userId: "14",
      type: "income",
      amount: 50000,
      category: "Freelance",
      description: "Freelance",
      date: "2026-05-27",
      createdAt: "2026-06-09T17:19:42.383Z"
    }
  ],
  savingsRate: 80,
  savingsGoals: [
    {
      id: 8,
      userId: 14,
      name: "Emergency",
      targetAmount: 230000,
      currentAmount: 20000,
      deadline: "2027-06-06",
      percentComplete: 16.5
    },
    {
      id: 9,
      userId: 14,
      name: "Vacation",
      targetAmount: 150000,
      currentAmount: 15000,
      deadline: "2027-06-06",
      percentComplete: 10
    }
  ]
};

export const mockTransactions = [
  {
    id: "1",
    date: "May 18, 2026",
    time: "10:42 AM",
    description: "Lunch at Chicken Republic",
    subtitle: "Ate with Tobi after class",
    category: "Food & Dining",
    type: "expense" as const,
    amount: 4500,
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
    type: "expense" as const,
    amount: 20000,
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
    type: "expense" as const,
    amount: 25000,
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
    type: "expense" as const,
    amount: 3800,
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
    type: "expense" as const,
    amount: 2900,
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
    type: "expense" as const,
    amount: 1000,
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
    type: "income" as const,
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
    type: "income" as const,
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
    type: "expense" as const,
    amount: 1700,
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
    type: "expense" as const,
    amount: 7450,
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
    categoryId: 1,
    userId: 5,
    category: "Food",
    monthlyLimit: 90000,
    totalSpent: 20500,
    remaining: 69500,
    percentUsed: 20,
    rollover: false,
  }
];

// mock-savings-goals.ts
// ─────────────────────────────────────────────────────────────
// MOCK DATA — swap out when backend endpoints are ready.
// Mirrors the shape returned by GET /api/savings/goals
// ─────────────────────────────────────────────────────────────

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

// lib/mock-savings-goals.ts
// ─────────────────────────────────────────────────────────────
// Shape mirrors SavingsGoalRow from the backend exactly.
// Used when NEXT_PUBLIC_USE_MOCK_DATA=true.
// ─────────────────────────────────────────────────────────────
import type { SavingsGoalRow } from "@/lib/api-client";

export const MOCK_SAVINGS_GOALS: SavingsGoalRow[] = [
  { id: 1, userId: 0, name: "New Car",            targetAmount: 4000000, currentAmount: 2600000, deadline: "2026-12-01", percentComplete: 65 },
  { id: 2, userId: 0, name: "Emergency Fund",     targetAmount: 300000,  currentAmount: 120000,  deadline: "2026-08-01", percentComplete: 40 },
  { id: 3, userId: 0, name: "House Down Payment", targetAmount: 5000000, currentAmount: 1400000, deadline: "2027-12-01", percentComplete: 28 },
  { id: 4, userId: 0, name: "Vacation",           targetAmount: 500000,  currentAmount: 300000,  deadline: "2026-07-01", percentComplete: 60 },
  { id: 5, userId: 0, name: "MacBook Pro",        targetAmount: 500000,  currentAmount: 175000,  deadline: "2026-10-01", percentComplete: 35 },
];