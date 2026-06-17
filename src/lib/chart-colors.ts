export const CHART_PALETTE = [
  "#F59E0B", "#2563EB", "#10B981", "#8B5CF6",
  "#F97316", "#EC4899", "#14B8A6", "#EF4444",
  "#6366F1", "#84CC16", "#F43F5E", "#0EA5E9",
  "#D97706", "#7C3AED", "#059669", "#DC2626",
  "#9333EA", "#0284C7", "#65A30D", "#DB2777",
];

export function getCategoryColor(name: string): string {
  if (!name) return CHART_PALETTE[0];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const abs = Math.abs(hash);

  // Use palette for first 20 — deterministic and visually curated
  // Fall back to HSL for anything that hashes outside, giving infinite unique colors
  return abs < CHART_PALETTE.length * 1000
    ? CHART_PALETTE[abs % CHART_PALETTE.length]
    : `hsl(${abs % 360}, 65%, 45%)`;
}