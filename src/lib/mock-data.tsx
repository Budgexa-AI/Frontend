// lib/mock-data.ts
import type { Account, Transaction, SavingsGoal, AiInsight, UserProfile, AiConversation } from "@/lib/types/src";

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
  accounts: [
    {
      id: 1,
      userId: 1,
      name: "Main Account",
      balance: "575000.00",
    },
  ] satisfies Account[],

  transactions: [
    {
      id: 1,
      userId: 1,
      type: "expense",
      amount: 5200,
      category: "Food",
      description: "Grocery Store",
      date: "2026-06-06",
      createdAt: now,
    },
    {
      id: 2,
      userId: 1,
      type: "income",
      amount: 200000,
      category: "Salary",
      description: "Salary Deposit",
      date: "2026-06-05",
      createdAt: now,
    },
    {
      id: 3,
      userId: 1,
      type: "expense",
      amount: 3800,
      category: "Transport",
      description: "Uber Ride",
      date: "2026-06-04",
      createdAt: now,
    },
  ] satisfies Transaction[],

  savingsGoals: [
    {
      id: 1,
      userId: 1,
      name: "Emergency Fund",
      currentAmount: "120000.00",
      targetAmount: "300000.00",
      deadline: "2026-12-31",
    },
    {
      id: 2,
      userId: 1,
      name: "Car Savings",
      currentAmount: "2600000.00",
      targetAmount: "4000000.00",
      deadline: "2027-06-30",
    },
  ] satisfies SavingsGoal[],

  insights: [
    {
      id: 1,
      userId: 1,
      title: "Food spending increased",
      content:
        "You spent 25% more on food this month. Meal planning could help save approximately ₦15,000 monthly.",
      createdAt: now,
    },
  ] satisfies AiInsight[],
};

// lib/mock-data.ts — add these exports

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