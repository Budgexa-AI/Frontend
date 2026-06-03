import type { CategoryMeta, TransactionCategory } from "@/lib/types/src";

export const CATEGORIES: CategoryMeta[] = [
  { label: "Food & Dining", emoji: "🍽️", value: "food_dining" },
  { label: "Transport", emoji: "🚗", value: "transport" },
  { label: "Shopping", emoji: "🛍️", value: "shopping" },
  { label: "Bills & Utilities", emoji: "🏠", value: "bills_utilities" },
  { label: "Health", emoji: "💊", value: "health" },
  { label: "Entertainment", emoji: "🎬", value: "entertainment" },
  { label: "Education", emoji: "📚", value: "education" },
  { label: "Savings & Investment", emoji: "💰", value: "savings_investment" },
  { label: "Airtime & Data", emoji: "📱", value: "airtime_data" },
  { label: "Other", emoji: "📦", value: "other" },
];

interface CategoryRule {
  keywords: string[];
  category: TransactionCategory;
}

const RULES: CategoryRule[] = [
  {
    keywords: [
      "lunch", "dinner", "breakfast", "food", "restaurant", "chicken", "pizza",
      "eat", "meal", "cafe", "coffee", "snack", "drink", "bar", "shawarma",
      "republic", "mr biggs", "kfc", "dominos", "suya",
    ],
    category: "food_dining",
  },
  {
    keywords: [
      "uber", "bolt", "taxi", "bus", "fuel", "petrol", "transport", "ride",
      "okada", "keke", "danfo", "car", "park", "toll",
    ],
    category: "transport",
  },
  {
    keywords: [
      "airtime", "data", "recharge", "mtn", "airtel", "glo", "9mobile",
      "bundle", "subscription",
    ],
    category: "airtime_data",
  },
  {
    keywords: [
      "rent", "electricity", "nepa", "ekedc", "ibedc", "water", "gas",
      "internet", "wifi", "cable", "dstv", "gotv", "bill", "utility",
    ],
    category: "bills_utilities",
  },
  {
    keywords: [
      "pharmacy", "hospital", "doctor", "clinic", "drugs", "medicine",
      "health", "lab", "test", "checkup",
    ],
    category: "health",
  },
  {
    keywords: [
      "shop", "mall", "market", "buy", "purchase", "cloth", "shoe", "dress",
      "fashion", "store", "supermarket", "jumia", "konga",
    ],
    category: "shopping",
  },
  {
    keywords: [
      "cinema", "movie", "netflix", "spotify", "apple", "game", "ticket",
      "event", "concert", "show", "entertainment",
    ],
    category: "entertainment",
  },
  {
    keywords: [
      "school", "tuition", "course", "book", "study", "class", "lesson",
      "university", "college", "education", "training",
    ],
    category: "education",
  },
  {
    keywords: [
      "save", "invest", "savings", "piggybank", "cowrywise", "risevest",
      "stash", "wallet", "deposit", "investment",
    ],
    category: "savings_investment",
  },
];

export interface CategorySuggestion {
  meta: CategoryMeta;
  confidence: "High" | "Medium" | "Low";
}

export function detectCategory(
  description: string,
  merchant?: string
): CategorySuggestion {
  const haystack = `${description} ${merchant ?? ""}`.toLowerCase();

  for (const rule of RULES) {
    const matched = rule.keywords.filter((kw) => haystack.includes(kw));
    if (matched.length >= 2) {
      return {
        meta: CATEGORIES.find((c) => c.value === rule.category)!,
        confidence: "High",
      };
    }
    if (matched.length === 1) {
      return {
        meta: CATEGORIES.find((c) => c.value === rule.category)!,
        confidence: "Medium",
      };
    }
  }

  return {
    meta: CATEGORIES.find((c) => c.value === "other")!,
    confidence: "Low",
  };
}

export function getCategoryMeta(value: string): CategoryMeta {
  return (
    CATEGORIES.find((c) => c.value === value) ??
    CATEGORIES.find((c) => c.value === "other")!
  );
}

export function formatAmount(value: string): string {
  const raw = value.replace(/[^0-9.]/g, "");
  const [integer, decimal] = raw.split(".");
  const formatted = integer
    ? parseInt(integer, 10).toLocaleString("en-NG")
    : "";
  return decimal !== undefined ? `${formatted}.${decimal}` : formatted;
}