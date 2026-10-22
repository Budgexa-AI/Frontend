export const CHART_PALETTE = [
  "#F59E0B", "#2563EB", "#10B981", "#8B5CF6",
  "#F97316", "#EC4899", "#14B8A6", "#EF4444",
  "#6366F1", "#84CC16", "#F43F5E", "#0EA5E9",
  "#D97706", "#7C3AED", "#059669", "#DC2626",
  "#9333EA", "#0284C7", "#65A30D", "#DB2777",
];

const KNOWN_CATEGORY_COLORS: Record<string, string> = {
  food: "#F59E0B",
  "food & dining": "#F59E0B",
  food_dining: "#F59E0B",
  groceries: "#F59E0B",
  dining: "#F59E0B",

  housing: "#2563EB",
  rent: "#2563EB",
  mortgage: "#2563EB",

  transport: "#10B981",
  transportation: "#10B981",
  fuel: "#10B981",
  car: "#10B981",

  utilities: "#8B5CF6",
  "bills & utilities": "#8B5CF6",
  bills_utilities: "#8B5CF6",
  bills: "#8B5CF6",

  entertainment: "#F97316",
  recreation: "#F97316",
  leisure: "#F97316",

  shopping: "#EC4899",
  clothing: "#EC4899",
  retail: "#EC4899",

  health: "#14B8A6",
  healthcare: "#14B8A6",
  medical: "#14B8A6",

  education: "#6366F1",
  learning: "#6366F1",
  books: "#6366F1",

  savings: "#059669",
  "savings & investment": "#059669",
  savings_investment: "#059669",
  investment: "#059669",

  data: "#0EA5E9",
  "airtime & data": "#0EA5E9",
  airtime_data: "#0EA5E9",
  phone: "#0EA5E9",
};

export function getCategoryColor(
  nameOrIndex?: string | number | null,
  fallbackIndex?: number
): string {
  if (typeof nameOrIndex === "number") {
    return CHART_PALETTE[Math.abs(nameOrIndex) % CHART_PALETTE.length];
  }

  if (!nameOrIndex || typeof nameOrIndex !== "string" || !nameOrIndex.trim()) {
    if (typeof fallbackIndex === "number") {
      return CHART_PALETTE[Math.abs(fallbackIndex) % CHART_PALETTE.length];
    }
    return CHART_PALETTE[0];
  }

  const normalized = nameOrIndex.trim().toLowerCase();

  if (KNOWN_CATEGORY_COLORS[normalized]) {
    return KNOWN_CATEGORY_COLORS[normalized];
  }

  // If a sequential index is provided, use palette index to guarantee distinct colors in a list
  if (typeof fallbackIndex === "number") {
    return CHART_PALETTE[Math.abs(fallbackIndex) % CHART_PALETTE.length];
  }

  // Deterministic string hash fallback to ensure consistent color across pages
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }

  return CHART_PALETTE[Math.abs(hash) % CHART_PALETTE.length];
}
