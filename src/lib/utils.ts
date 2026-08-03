// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCurrencyDefinition } from "@/lib/currency";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─────────────────────────────────────────────────────────────
// Currency formatting
// ─────────────────────────────────────────────────────────────

export function getCurrencySymbol(currencyCode: string): string {
  return getCurrencyDefinition(currencyCode).symbol;
}

/**
 * Format an amount in a given currency using the hand-maintained symbol map
 * (not Intl's style:"currency", which silently falls back to the ISO code
 * for several currencies including NGN).
 *
 * By default this rounds to whole units (no decimals) to match the app's
 * existing display style (e.g. ₦45,000, not ₦45,000.00). Pass
 * `{ useCurrencyDecimals: true }` for contexts where sub-unit precision
 * matters (e.g. an invoice or a currency with 3 decimals like KWD).
 */
export function formatCurrency(
  amount: number,
  currencyCode: string,
  options?: { useCurrencyDecimals?: boolean }
): string {
  const def = getCurrencyDefinition(currencyCode);
  const decimals = options?.useCurrencyDecimals ? def.decimals : 0;

  const number = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);

  return `${def.symbol}${number}`;
}

/** Format a compact amount (e.g. ₦32.4k, $1.2M) for a given currency */
export function formatCurrencyCompact(amount: number, currencyCode: string): string {
  const symbol = getCurrencySymbol(currencyCode);
  if (amount >= 1_000_000) return `${symbol}${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `${symbol}${(amount / 1_000).toFixed(1)}k`;
  return `${symbol}${amount}`;
}

// ─────────────────────────────────────────────────────────────
// Deprecated naira-specific helpers — kept temporarily so existing
// call sites don't break mid-migration. Remove once all call sites
// are switched to formatCurrency / formatCurrencyCompact.
// ─────────────────────────────────────────────────────────────

/** @deprecated use formatCurrency(amount, currencyCode) instead */
export function formatNaira(amount: number): string {
  return formatCurrency(amount, "NGN");
}

/** @deprecated use formatCurrencyCompact(amount, currencyCode) instead */
export function formatNairaCompact(amount: number): string {
  return formatCurrencyCompact(amount, "NGN");
}

// ─────────────────────────────────────────────────────────────
// Misc
// ─────────────────────────────────────────────────────────────

/** Relative time */
export function relativeTime(date: string | Date): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diff = now - then;
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/** Truncate string */
export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.slice(0, length)}…` : str;
}