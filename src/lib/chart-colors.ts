// lib/chart-colors.ts

const CHART_PALETTE = [
  "#F59E0B", "#2563EB", "#10B981", "#8B5CF6",
  "#F97316", "#EC4899", "#14B8A6", "#EF4444",
  "#6366F1", "#84CC16", "#F43F5E", "#0EA5E9",
  "#D97706", "#7C3AED", "#059669", "#DC2626",
  "#9333EA", "#0284C7", "#65A30D", "#DB2777",
];

export function getCategoryColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  if (hash < CHART_PALETTE.length) {
    return CHART_PALETTE[Math.abs(hash) % CHART_PALETTE.length];
  }

  // Overflow: generate an HSL color from the hash.
  // Saturation and lightness are fixed so it never produces
  // anything too light or too dark to see on your backgrounds.
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 45%)`;
}