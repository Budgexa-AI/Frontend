export const CATEGORIES = [
  { label: "Food & Dining",        emoji: "🍽️", value: "food_dining"        },
  { label: "Transport",            emoji: "🚗", value: "transport"           },
  { label: "Shopping",             emoji: "🛍️", value: "shopping"            },
  { label: "Bills & Utilities",    emoji: "🏠", value: "bills_utilities"     },
  { label: "Health",               emoji: "💊", value: "health"              },
  { label: "Entertainment",        emoji: "🎬", value: "entertainment"       },
  { label: "Education",            emoji: "📚", value: "education"           },
  { label: "Savings & Investment", emoji: "💰", value: "savings_investment"  },
  { label: "Airtime & Data",       emoji: "📱", value: "airtime_data"        },
  // ── Income categories ──────────────────────────────────────────────────
  { label: "Salary",               emoji: "💼", value: "salary"              },
  { label: "Freelance",            emoji: "💻", value: "freelance"           },
  { label: "Business Income",      emoji: "📈", value: "business_income"     },
  { label: "Family Support",       emoji: "💜", value: "family_support"      },
  { label: "Transfers Received",   emoji: "🔄", value: "transfer_received"   },
  { label: "Transfers Sent",       emoji: "🔃", value: "transfer_sent"       },
  { label: "Refund",               emoji: "↩️", value: "refund"              },
  { label: "Other",                emoji: "📦", value: "other"               },
];

interface CategoryRule {
  keywords: string[];
  category: string;
}

const RULES: CategoryRule[] = [
  // ── Income ─────────────────────────────────────────────────────────────
  {
    keywords: [
      "salary", "salari", "wages", "wage", "payroll", "monthly pay",
      "payslip", "pay slip", "staff pay", "remuneration", "employment income",
      "monthly salary", "net pay", "income from job", "work pay", "company pay",
    ],
    category: "salary",
  },
  {
    keywords: [
      "freelance", "contract payment", "client payment", "project payment",
      "upwork", "fiverr", "invoice payment", "design payment", "web project",
      "consulting fee", "gig payment",
    ],
    category: "freelance",
  },
  {
    keywords: [
      "business income", "sales revenue", "profit", "dividend",
      "investment return", "rental income", "shop sales", "store revenue",
      "commission", "royalty",
    ],
    category: "business_income",
  },
  {
    keywords: [
      "mom", "dad", "mother", "father", "parent", "upkeep", "allowance",
      "family transfer", "pocket money", "from mom", "from dad",
      "family support", "stipend", "from family",
    ],
    category: "family_support",
  },
  {
    keywords: [
      "refund", "cashback", "reimbursement", "reversal", "chargeback",
      "return", "credit back",
    ],
    category: "refund",
  },
  {
    keywords: [
      "received from", "transfer from", "sent by", "payment from",
      "credit from", "inflow from",
    ],
    category: "transfer_received",
  },
  {
    keywords: [
      "sent to", "transfer to", "payment to", "sent money", "wire to",
      "interbank transfer", "nip transfer", "outward transfer",
    ],
    category: "transfer_sent",
  },

  // ── Expenses ────────────────────────────────────────────────────────────
  {
    keywords: [
      "lunch", "dinner", "breakfast", "food", "restaurant", "chicken", "pizza",
      "eat", "meal", "cafe", "coffee", "snack", "drink", "bar", "shawarma",
      "republic", "mr biggs", "kfc", "dominos", "suya", "buka", "canteen",
      "eatery", "jollof", "puff puff", "small chops", "shoprite groceries",
      "grocery", "groceries",
    ],
    category: "food_dining",
  },
  {
    keywords: [
      "uber", "bolt", "taxi", "bus", "fuel", "petrol", "transport", "ride",
      "okada", "keke", "danfo", "car", "park", "toll", "flight", "trip",
      "logistics", "dispatch",
    ],
    category: "transport",
  },
  {
    keywords: [
      "airtime", "data", "recharge", "mtn", "airtel", "glo", "9mobile",
      "bundle", "data plan", "top up", "topup", "internet data",
      "spectranet", "smile network", "ntel",
    ],
    category: "airtime_data",
  },
  {
    keywords: [
      "rent", "electricity", "nepa", "ekedc", "ibedc", "phcn", "water bill",
      "gas", "internet", "wifi", "cable", "dstv", "gotv", "startimes",
      "bill", "utility", "service charge", "maintenance fee", "landlord",
    ],
    category: "bills_utilities",
  },
  {
    keywords: [
      "pharmacy", "hospital", "doctor", "clinic", "drugs", "medicine",
      "health", "lab", "test", "checkup", "medical", "surgery", "dental",
      "optical", "wellbeing",
    ],
    category: "health",
  },
  {
    keywords: [
      "shop", "mall", "market", "buy", "purchase", "cloth", "shoe", "dress",
      "fashion", "store", "supermarket", "jumia", "konga", "amazon", "jiji",
      "boutique", "accessories", "bag", "wristwatch",
    ],
    category: "shopping",
  },
  {
    keywords: [
      "cinema", "movie", "netflix", "spotify", "apple music", "game",
      "ticket", "event", "concert", "show", "entertainment", "disney",
      "youtube premium", "showmax", "streaming", "night out", "club",
    ],
    category: "entertainment",
  },
  {
    keywords: [
      "school", "tuition", "course", "book", "study", "class", "lesson",
      "university", "college", "education", "training", "exam", "waec",
      "jamb", "neco", "udemy", "coursera", "workshop", "seminar",
    ],
    category: "education",
  },
  {
    keywords: [
      "save", "invest", "savings", "piggybank", "cowrywise", "risevest",
      "stash", "wallet", "deposit", "investment", "fixed deposit",
      "treasury bill", "mutual fund", "stocks", "crypto",
    ],
    category: "savings_investment",
  },
];

export interface CategorySuggestion {
  meta: typeof CATEGORIES[number];
  confidence: "High" | "Medium" | "Low";
}

export function detectCategory(
  description: string,
  merchant?: string
): CategorySuggestion {
  const haystack = `${description} ${merchant ?? ""}`.toLowerCase();

  // High confidence — 2+ keyword matches
  for (const rule of RULES) {
    const matched = rule.keywords.filter((kw) => haystack.includes(kw));
    if (matched.length >= 2) {
      return {
        meta: CATEGORIES.find((c) => c.value === rule.category)!,
        confidence: "High",
      };
    }
  }

  // Medium confidence — 1 exact keyword match
  for (const rule of RULES) {
    const matched = rule.keywords.filter((kw) => haystack.includes(kw));
    if (matched.length === 1) {
      return {
        meta: CATEGORIES.find((c) => c.value === rule.category)!,
        confidence: "Medium",
      };
    }
  }

  // Low confidence — partial prefix match (catches typos and abbreviations)
  for (const rule of RULES) {
    const words = haystack.split(/\s+/);
    const hasPartial = rule.keywords.some((kw) =>
      words.some((word) => kw.length >= 4 && word.startsWith(kw.slice(0, 4)))
    );
    if (hasPartial) {
      return {
        meta: CATEGORIES.find((c) => c.value === rule.category)!,
        confidence: "Low",
      };
    }
  }

  return {
    meta: CATEGORIES.find((c) => c.value === "other")!,
    confidence: "Low",
  };
}

export function getCategoryMeta(value: string): typeof CATEGORIES[number] {
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