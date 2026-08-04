import type {
  Account,
  Transaction,
  SavingsGoal,
  AiInsight,
  AiMessage,
  TransactionFilters,
  TransactionListResponse,
  BudgetCategory,
  Category,
  Budget,
} from "@/lib/types/src";

export interface UserProfile {
  id: string;
  email?: string;
  name?: string;
  avatarUrl?: string;
  plan?: string;
  country?: string;
  currency?: string;
}

export interface BudgetRow {
  id: number;
  category: string;
  monthlyLimit: number;
  spent: number;
  percentUsed: number;
}

export interface SpendingCategory {
  category: string;
  amount: number;
  percentage: number;
}

// ============================================================
// Internal helpers
// ============================================================

const API_PROXY_PREFIX = "/api/v1";

/**
 * Returns the base URL to use when constructing fetch URLs.
 *
 * - In the browser: returns "" so paths stay relative (e.g. /api/v1/auth/me)
 * - On the server (SSR / prerender): returns the absolute app origin so Node's
 *   fetch can resolve the URL (e.g. https://yourapp.vercel.app/api/v1/auth/me)
 *
 * Without this, server-side fetch calls with relative URLs throw
 * "TypeError: Invalid URL" during Next.js static page generation.
 */
function getAppBaseUrl(): string {
  if (typeof window !== "undefined") {
    // Client-side: relative URLs work fine
    return "";
  }

  // Server-side: must use absolute URL so Node's fetch can resolve it.
  // Set NEXT_PUBLIC_APP_URL=https://rayo.vercel.app in Vercel env vars.
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (appUrl) {
    return appUrl.replace(/\/$/, "");
  }

  // Fallback for local dev
  return "http://localhost:3000";
}

function proxyPath(path: string): string {
  const base = getAppBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${API_PROXY_PREFIX}${normalizedPath}`;
}

async function readJsonResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return (await res.json()) as T;
  }

  const text = await res.text();
  return text as unknown as T;
}

function normalizeProfile(payload: any): UserProfile {
  const source = payload?.data ?? payload?.profile ?? payload ?? {};

  return {
    id: source.id ?? source.userId ?? source.user_id ?? "",
    email: source.email ?? undefined,
    name:
      source.name ?? source.fullName ?? source.full_name ?? undefined,
    avatarUrl: source.profileImage ?? undefined,
    plan: source.plan ?? undefined,
    country: source.country ?? undefined,
    currency: source.currency ?? undefined,
  };
}

function createHeaders(extraHeaders?: HeadersInit, serverToken?: string | null): HeadersInit {
  const token = serverToken 
    || (typeof window !== "undefined" ? localStorage.getItem("authToken") : null);

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extraHeaders,
  };
}

async function apiFetch(
  path: string,
  init: RequestInit = {},
  serverToken?: string | null
): Promise<Response> {
  const { headers: extraHeaders, ...restInit } = init;

  return fetch(proxyPath(path), {
    credentials: "include",
    ...restInit,
    headers: createHeaders(extraHeaders as HeadersInit, serverToken),
  });
}

function logApiEvent(message: string, payload?: unknown) {
  if (payload === undefined) {
    console.info(`[api-client] ${message}`);
    return;
  }
  console.info(`[api-client] ${message}`, payload);
}

function logApiError(message: string, payload?: unknown) {
  if (payload === undefined) {
    console.error(`[api-client] ${message}`);
    return;
  }
  console.error(`[api-client] ${message}`, payload);
}

function extractErrorMessage(payload: unknown, fallback: string): string {
  if (!payload) return fallback;

  if (typeof payload === "string") {
    return payload.trim() || fallback;
  }

  if (Array.isArray(payload)) {
    const firstMessage = payload.find((item) => typeof item === "string");
    return typeof firstMessage === "string" && firstMessage.trim().length > 0
      ? firstMessage
      : fallback;
  }

  if (typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    const candidates = [
      record.error,
      record.message,
      record.detail,
      record.details,
      record.reason,
    ];

    for (const candidate of candidates) {
      const extracted = extractErrorMessage(candidate, "");
      if (extracted) return extracted;
    }

    if (Array.isArray(record.errors) && record.errors.length > 0) {
      const extracted = extractErrorMessage(record.errors[0], "");
      if (extracted) return extracted;
    }

    return fallback;
  }

  return fallback;
}

// ============================================================
// Types
// ============================================================

export interface AuthResponse {
  success: boolean;
  data?: {
    userId: string;
    email: string;
    token?: string;
    isVerified?: boolean;
    emailVerified?: boolean;
    user?: {
      id?: string;
      email?: string;
      isVerified?: boolean;
      emailVerified?: boolean;
    };
  };
  error?: string;
  details?: unknown;
}

export interface VerificationResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: unknown;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  fullName?: string;
  name?: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword?: string;
}

// ============================================================
// Authentication API
// ============================================================

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const endpoint = proxyPath("/auth/login");
  logApiEvent("login request", {
    endpoint,
    payload: { email: credentials.email, password: "[redacted]" },
  });

  const res = await fetch(endpoint, {
    method: "POST",
    headers: createHeaders(),
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    const responseBody = contentType.includes("application/json")
      ? await res.json().catch(() => null)
      : await res.text().catch(() => "");
    const errorMessage = extractErrorMessage(
      responseBody,
      `Login failed (${res.status})`
    );
    logApiError("login backend error", {
      status: res.status,
      statusText: res.statusText,
      body: responseBody || "<empty>",
    });
    return { success: false, error: errorMessage, details: responseBody };
  }

  const response = await readJsonResponse<AuthResponse>(res);
  return {
    ...response,
    error: response.error
      ? extractErrorMessage(response.error, response.error)
      : undefined,
  };
}

export async function signUp(data: SignUpRequest): Promise<AuthResponse> {
  const endpoint = proxyPath("/auth/signup");
  const payload = { ...data, name: data.name ?? data.fullName };
  logApiEvent("signup request", {
    endpoint,
    payload: { ...payload, password: "[redacted]" },
  });

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: createHeaders(),
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const contentType = res.headers.get("content-type") || "";
      const responseBody = contentType.includes("application/json")
        ? await res.json().catch(() => null)
        : await res.text().catch(() => "");
      const errorMessage = extractErrorMessage(
        responseBody,
        `Sign up failed (${res.status})`
      );
      logApiError("signup backend error", {
        endpoint,
        status: res.status,
        statusText: res.statusText,
        body: responseBody || "<empty>",
      });
      return { success: false, error: errorMessage, details: responseBody };
    }

    const response = await readJsonResponse<AuthResponse>(res);
    logApiEvent("signup success", {
      endpoint,
      status: res.status,
      hasData: Boolean(response.data),
    });
    return {
      ...response,
      error: response.error
        ? extractErrorMessage(response.error, response.error)
        : undefined,
    };
  } catch (error) {
    logApiError("signup fetch/network error", { endpoint, error });
    throw error;
  }
}

export async function verifyEmailOtp(input: {
  email: string;
  otp: string;
}): Promise<VerificationResponse> {
  const endpoint = proxyPath("/auth/verify-otp");
  logApiEvent("verify otp request", {
    endpoint,
    payload: { email: input.email, otp: "[redacted]" },
  });

  const res = await fetch(endpoint, {
    method: "POST",
    headers: createHeaders(),
    credentials: "include",
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    const responseBody = contentType.includes("application/json")
      ? await res.json().catch(() => null)
      : await res.text().catch(() => "");
    const errorMessage = extractErrorMessage(
      responseBody,
      `Verify OTP failed (${res.status})`
    );
    logApiError("verify otp backend error", {
      endpoint,
      status: res.status,
      statusText: res.statusText,
      body: responseBody || "<empty>",
    });
    return { success: false, error: errorMessage, details: responseBody };
  }

  const response = await readJsonResponse<VerificationResponse>(res);
  return {
    ...response,
    error: response.error
      ? extractErrorMessage(response.error, response.error)
      : undefined,
  };
}

export async function resendVerificationOtp(
  email: string
): Promise<VerificationResponse> {
  const endpoint = proxyPath("/auth/resend-otp");
  logApiEvent("resend otp request", { endpoint, payload: { email } });

  const res = await fetch(endpoint, {
    method: "POST",
    headers: createHeaders(),
    credentials: "include",
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    const responseBody = contentType.includes("application/json")
      ? await res.json().catch(() => null)
      : await res.text().catch(() => "");
    const errorMessage = extractErrorMessage(
      responseBody,
      `Resend OTP failed (${res.status})`
    );
    logApiError("resend otp backend error", {
      endpoint,
      status: res.status,
      statusText: res.statusText,
      body: responseBody || "<empty>",
    });
    return { success: false, error: errorMessage, details: responseBody };
  }

  const response = await readJsonResponse<VerificationResponse>(res);
  return {
    ...response,
    error: response.error
      ? extractErrorMessage(response.error, response.error)
      : undefined,
  };
}

export async function requestPasswordReset(
  email: string
): Promise<VerificationResponse> {
  const endpoint = proxyPath("/auth/reset-password");
  logApiEvent("reset password request", { endpoint, payload: { email } });

  const res = await fetch(endpoint, {
    method: "POST",
    headers: createHeaders(),
    credentials: "include",
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    const responseBody = contentType.includes("application/json")
      ? await res.json().catch(() => null)
      : await res.text().catch(() => "");
    const errorMessage = extractErrorMessage(
      responseBody,
      `Reset password request failed (${res.status})`
    );
    logApiError("reset password backend error", {
      endpoint,
      status: res.status,
      statusText: res.statusText,
      body: responseBody || "<empty>",
    });
    return { success: false, error: errorMessage, details: responseBody };
  }

  const response = await readJsonResponse<VerificationResponse>(res);
  return {
    ...response,
    error: response.error
      ? extractErrorMessage(response.error, response.error)
      : undefined,
  };
}

export async function resetPassword(
  data: ResetPasswordRequest
): Promise<VerificationResponse> {
  const endpoint = proxyPath(
    `/auth/reset-password/${encodeURIComponent(data.token)}`
  );
  logApiEvent("reset password submit", {
    endpoint,
    payload: { token: "[redacted]", password: "[redacted]" },
  });

  const res = await fetch(endpoint, {
    method: "PATCH",
    headers: createHeaders(),
    credentials: "include",
    body: JSON.stringify({
      password: data.password,
      confirmPassword: data.confirmPassword ?? data.password,
    }),
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    const responseBody = contentType.includes("application/json")
      ? await res.json().catch(() => null)
      : await res.text().catch(() => "");
    const errorMessage = extractErrorMessage(
      responseBody,
      `Reset password failed (${res.status})`
    );
    logApiError("reset password backend error", {
      endpoint,
      status: res.status,
      statusText: res.statusText,
      body: responseBody || "<empty>",
    });
    return { success: false, error: errorMessage, details: responseBody };
  }

  const response = await readJsonResponse<VerificationResponse>(res);
  return {
    ...response,
    error: response.error
      ? extractErrorMessage(response.error, response.error)
      : undefined,
  };
}

export async function resendResetPassword(
  email: string
): Promise<VerificationResponse> {
  const endpoint = proxyPath("/auth/resend-reset");
  logApiEvent("resend reset request", { endpoint, payload: { email } });

  const res = await fetch(endpoint, {
    method: "POST",
    headers: createHeaders(),
    credentials: "include",
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    const responseBody = contentType.includes("application/json")
      ? await res.json().catch(() => null)
      : await res.text().catch(() => "");
    const errorMessage = extractErrorMessage(
      responseBody,
      `Resend reset link failed (${res.status})`
    );
    logApiError("resend reset backend error", {
      endpoint,
      status: res.status,
      statusText: res.statusText,
      body: responseBody || "<empty>",
    });
    return { success: false, error: errorMessage, details: responseBody };
  }

  const response = await readJsonResponse<VerificationResponse>(res);
  return {
    ...response,
    error: response.error
      ? extractErrorMessage(response.error, response.error)
      : undefined,
  };
}

// The Railway backend URL used only for Google OAuth (direct browser redirect).
// All other API calls go through the Next.js proxy at /api/v1/*.
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/**
 * Redirects the browser to the backend Google OAuth endpoint.
 *
 * This MUST go directly to Railway — it cannot go through the Next.js proxy
 * because it's a browser navigation (not a fetch), and Google redirects back
 * to the backend callback URL directly.
 *
 * Only call this client-side.
 */
export function signInWithGoogle(redirectUrl: string, errorUrl: string) {
  const googleOAuthUrl =
    `${BACKEND_URL}/api/v1/auth/google` +
    `?redirectUrl=${encodeURIComponent(redirectUrl)}` +
    `&errorUrl=${encodeURIComponent(errorUrl)}`;

  if (typeof window !== "undefined") {
    window.location.href = googleOAuthUrl;
  }
}

export async function handleGoogleCallback(params: {
  code?: string;
  state?: string;
  error?: string;
  error_description?: string;
}): Promise<AuthResponse> {
  logApiEvent("google oauth callback", {
    code: params.code ? "[redacted]" : undefined,
  });

  const endpoint = proxyPath("/auth/google/callback");
  const res = await fetch(endpoint, {
    method: "POST",
    headers: createHeaders(),
    credentials: "include",
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    const responseBody = contentType.includes("application/json")
      ? await res.json().catch(() => null)
      : await res.text().catch(() => "");
    const errorMessage = extractErrorMessage(
      responseBody,
      `Google OAuth callback failed (${res.status})`
    );
    logApiError("google oauth callback backend error", {
      endpoint,
      status: res.status,
      statusText: res.statusText,
      body: responseBody || "<empty>",
    });
    return { success: false, error: errorMessage, details: responseBody };
  }

  const response = await readJsonResponse<AuthResponse>(res);
  return {
    ...response,
    error: response.error
      ? extractErrorMessage(response.error, response.error)
      : undefined,
  };
}

/**
 * Get current user profile.
 * Safe to call server-side — uses absolute URL during SSR/prerender.
 */
export async function getCurrentUser(): Promise<UserProfile> {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("authToken")
    : null;

  if (!token) throw new Error("No auth token found");

  const res = await fetch(proxyPath("/auth/me"), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch current user");
  }

  return normalizeProfile(await readJsonResponse<any>(res));
}

export async function uploadProfileImage(
  file: File
): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const endpoint = proxyPath("/auth/upload-image");
  logApiEvent("upload profile image request", {
    endpoint,
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
  });

  const res = await fetch(endpoint, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    const responseBody = contentType.includes("application/json")
      ? await res.json().catch(() => null)
      : await res.text().catch(() => "");
    const errorMessage = extractErrorMessage(
      responseBody,
      `Profile image upload failed (${res.status})`
    );
    logApiError("upload profile image backend error", {
      endpoint,
      status: res.status,
      statusText: res.statusText,
      body: responseBody || "<empty>",
    });
    return { success: false, error: errorMessage };
  }

  const response = await readJsonResponse<{
    success: boolean;
    imageUrl?: string;
    error?: string;
  }>(res);
  logApiEvent("profile image upload success", { imageUrl: response.imageUrl });
  return response;
}

export async function completeOnboarding(data: {
  level: string;
  method: string;
  incomeSource: string;
  financialGoals: string[];
  categories: string[];
  country: string;
  currency: string;
}): Promise<{ success: boolean; error?: string }> {
  console.log("Onboarding data:", data);
  const res = await fetch(proxyPath("/onboarding"), {
    method: "POST",
    headers: createHeaders(),
    credentials: "include",
    body: JSON.stringify({
      level: data.level,
      method: data.method,
      incomeSource: data.incomeSource,
      income: data.incomeSource,
      financialGoals: data.financialGoals,
      goals: data.financialGoals,
      categories: data.categories,
      country: data.country,
      currency: data.currency,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    return {
      success: false,
      error: extractErrorMessage(body, "Failed to save onboarding data"),
    };
  }

  return readJsonResponse(res);
}

// Dashboard API
export async function getDashboardData() {
  const [summaryRes, insightsRes] = await Promise.allSettled([
    apiFetch("/dashboard/summary", { cache: "no-cache" }), // summary can be a bit stale, but we want to bypass Next.js static cache
    apiFetch("/ai/insights"),
  ]);

  // ── Summary ───────────────────────────────────────────────
  let d: any = {};
  if (summaryRes.status === "fulfilled" && summaryRes.value.ok) {
    const json = await readJsonResponse<any>(summaryRes.value);
    d = json.data ?? json;
  }

  // ── Insights ──────────────────────────────────────────────
  let insights: AiInsight[] = [];
  if (insightsRes.status === "fulfilled" && insightsRes.value.ok) {
    const json = await readJsonResponse<any>(insightsRes.value);
    const inner = json.data ?? json;
    insights = Array.isArray(inner) ? inner : (inner.insights ?? []);
  }

  return {
    totalBalance:       d.totalBalance       ?? 0,
    totalIncome:        d.totalIncome        ?? 0,
    totalExpenses:      d.totalExpenses      ?? 0,
    monthlyIncome:      d.monthlyIncome      ?? 0,
    monthlyExpenses:    d.monthlyExpenses    ?? 0,
    monthlySavings:     d.monthlySavings     ?? 0,
    savingsRate:        d.savingsRate        ?? 0,
    budgetMonthlyLimit: d.budgetMonthlyLimit ?? 0,
    budgetPercentUsed:  d.budgetPercentUsed  ?? 0,
    budgets:            d.budgets            ?? [],
    spendingByCategory: d.spendingByCategory ?? [],
    recentTransactions: d.recentTransactions ?? [],
    savingsGoals:       d.savingsGoals       ?? [],
    insights,
  };
}

// AI API

export async function getAiInsights(): Promise<AiInsight[]> {
  const res = await apiFetch("/ai/insights");
  if (!res.ok) throw new Error("Failed to fetch AI insights");

  const json = await readJsonResponse<any>(res);
  const inner = json.data ?? json;
  return Array.isArray(inner) ? inner : (inner.insights ?? []);
}

export async function askAi(payload: {
  question: string;
}): Promise<{ reply: string; conversationId: string }> {
  const res = await fetch(proxyPath("/ai/ask"), {
    method: "POST",
    headers: createHeaders(),
    credentials: "include",
    body: JSON.stringify({ question: payload.question }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(extractErrorMessage(body, "Failed to get AI response"));
  }

  const data = await readJsonResponse<any>(res);
  const inner = data.data ?? data;

  // Backend returns answer when it has data, or falls back to insights array
  const answer = inner.answer && inner.answer.trim() !== ""
    ? inner.answer
    : inner.insights?.[0]?.detail
      ?? inner.insights?.[0]?.message
      ?? inner.response
      ?? inner.reply
      ?? inner.content
      ?? "";

  return {
    reply: answer,
    conversationId: inner.conversationId ?? inner.id ?? "",
  };
}

// Transactions API

export async function listTransactions(
  filters?: TransactionFilters
): Promise<TransactionListResponse> {
  const params = new URLSearchParams();
  if (filters?.type) params.set("type", filters.type);
  if (filters?.categoryId) params.set("category", String(filters.categoryId));
  if (filters?.startDate) params.set("startDate", filters.startDate);
  if (filters?.endDate) params.set("endDate", filters.endDate);
  if (filters?.page) params.set("page", String(filters.page));
  if (filters?.limit) params.set("limit", String(filters.limit));

  const url = `${proxyPath("/transactions")}${params.toString() ? `?${params}` : ""}`;

  const [txRes, catRes] = await Promise.all([
    fetch(url, { headers: createHeaders(), credentials: "include" }),
    apiFetch("/categories"),
  ]);

  if (!txRes.ok) throw new Error("Failed to fetch transactions");

  const txJson = await readJsonResponse<any>(txRes);
  const rows = txJson?.data?.rows ?? [];
  const pagination = txJson?.data?.pagination ?? { total: 0, page: 1, limit: 10 };

  // Build id → name map
  const categoryMap = new Map<number, string>();
  if (catRes.ok) {
    const catJson = await readJsonResponse<any>(catRes);
    const cats: any[] = Array.isArray(catJson) ? catJson : (catJson.data ?? []);
    cats.forEach((c: any) => categoryMap.set(c.id, c.name));
  }

  const transactions: Transaction[] = rows.map((t: any) => ({
    ...t,
    categoryName: categoryMap.get(t.categoryId) ?? "Uncategorized",
  }));

  return {
    transactions,
    total: pagination.total,
    page: pagination.page,
    limit: pagination.limit,
  };
}

export async function createTransaction(
  payload: Omit<Transaction, "id" | "userId" | "createdAt">
): Promise<Transaction> {
  console.log("[createTransaction] sending:", payload); // ← add this

  const res = await fetch(proxyPath("/transactions"), {
    method: "POST",
    headers: createHeaders(),
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    console.error("[createTransaction] failed:", body); // ← and this
    throw new Error(extractErrorMessage(body, "Failed to create transaction"));
  }

  const data = await readJsonResponse<any>(res);
  console.log("[createTransaction] response:", data); // ← and this
  return data.transaction ?? data.data ?? data;
}

export async function updateTransaction(
  id: number,
  payload: Partial<Omit<Transaction, "id" | "userId" | "createdAt">>
): Promise<Transaction> {
  const res = await fetch(proxyPath(`/transactions/${id}`), {
    method: "PATCH",
    headers: createHeaders(),
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(extractErrorMessage(body, "Failed to update transaction"));
  }

  const data = await readJsonResponse<any>(res);
  return data.transaction ?? data.data ?? data;
}

export async function deleteTransaction(id: number): Promise<void> {
  const res = await fetch(proxyPath(`/transactions/${id}`), {
    method: "DELETE",
    headers: createHeaders(),
    credentials: "include",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(extractErrorMessage(body, "Failed to delete transaction"));
  }
}

export async function deleteMultipleTransactions(ids: number[]): Promise<void> {
  const res = await fetch(proxyPath("/transactions"), {
    method: "DELETE",
    headers: createHeaders(),
    credentials: "include",
    body: JSON.stringify({ ids }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(extractErrorMessage(body, "Failed to delete transactions"));
  }
}

// Budget API
export async function fetchBudgets(): Promise<BudgetCategory[]> {
  const [budgetRes, catRes] = await Promise.all([
    apiFetch("/budget"),
    apiFetch("/categories"),
  ]);

  if (!budgetRes.ok) throw new Error("Failed to fetch budgets");

  const data = await budgetRes.json();
  const rows: any[] = Array.isArray(data) ? data : (data.data ?? []);

  // Build id → category lookup
  const categoryMap = new Map<number, Category>();
  if (catRes.ok) {
    const catJson = await readJsonResponse<any>(catRes);
    const cats: any[] = Array.isArray(catJson) ? catJson : (catJson.data ?? []);
    cats.forEach((c: any) => categoryMap.set(c.id, c));
  }

  return rows.map((b: any) => {
    const cat = categoryMap.get(b.categoryId);
    return {
      ...b,
      categoryName:  b.category ?? cat?.name ?? "Unknown",
      categoryEmoji: cat?.emoji ?? "📦",
    };
  });
}

export async function createBudget(payload: {
  categoryId?: number;
  category?: string;
  parentSlug?: string;
  monthlyLimit: number;
  rollover?: boolean;
}): Promise<Budget> {
  const res = await apiFetch("/budget", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(extractErrorMessage(body, "Failed to create budget"));
  }
  const data = await res.json();
  return data.data ?? data;
}

export async function updateBudget(
  id: number,                                          
  payload: { monthlyLimit: number }                  
): Promise<BudgetCategory> {
  const res = await apiFetch(`/budget/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update budget");
  const data = await res.json();
  return data.data ?? data;
}

export async function deleteBudget(id: number): Promise<void> {  
  const res = await apiFetch(`/budget/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete budget");
}

// Savings Goals API
export interface SavingsGoalRow {
  id: number;
  userId: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;        
  percentComplete: number;
}

export interface SavingsGoalListResponse {
  rows: SavingsGoalRow[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CreateSavingsGoalPayload {
  name: string;
  targetAmount: number;
  currentAmount?: number;
  goalType?: "PERSONAL" | "GROUP" | "AJO";
  categoryId?: number;
  deadline: string;        
}

export interface UpdateSavingsGoalPayload {
  name?: string;
  targetAmount?: number;
  currentAmount?: number;
  deadline?: string;
}

export async function fetchSavingsGoals(): Promise<SavingsGoalRow[]> {
  const res = await apiFetch("/savings");
  if (!res.ok) throw new Error(`Failed to fetch savings goals (${res.status})`);
  const json = await readJsonResponse<any>(res);
  const inner = json.data ?? json;
  return inner.rows ?? [];
}

export async function createSavingsGoal(
  payload: CreateSavingsGoalPayload
): Promise<SavingsGoalRow> {
  const res = await apiFetch("/savings", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(extractErrorMessage(body, "Failed to create savings goal"));
  }
  const data = await readJsonResponse<any>(res);
  return data.data ?? data;
}

export async function updateSavingsGoal(
  id: number,
  payload: UpdateSavingsGoalPayload
): Promise<SavingsGoalRow> {
  const res = await apiFetch(`/savings/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(extractErrorMessage(body, "Failed to update savings goal"));
  }
  const data = await readJsonResponse<any>(res);
  return data.data ?? data;
}

export async function deleteSavingsGoal(id: number): Promise<void> {
  const res = await apiFetch(`/savings/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(extractErrorMessage(body, "Failed to delete savings goal"));
  }
}

// Categories API

export async function fetchCategories(): Promise<Category[]> {
  const res = await apiFetch("/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  const json = await readJsonResponse<any>(res);
  return Array.isArray(json) ? json : (json.data ?? []);
}

// Contact page
export interface ContactRequest {
  name: string;
  email: string;
  category: "bug" | "inquiry" | "feature" | "billing" | "other";
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  error?: string;
}

export async function submitContactMessage(data: ContactRequest): Promise<ContactResponse> {
  const endpoint = proxyPath("/contact");
  logApiEvent("contact submit request", { endpoint, payload: { ...data, email: "[redacted]" } });

  const res = await fetch(endpoint, {
    method: "POST",
    headers: createHeaders(),
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    const responseBody = contentType.includes("application/json")
      ? await res.json().catch(() => null)
      : await res.text().catch(() => "");
    const errorMessage = extractErrorMessage(responseBody, `Failed to send message (${res.status})`);
    logApiError("contact submit backend error", {
      endpoint,
      status: res.status,
      statusText: res.statusText,
      body: responseBody || "<empty>",
    });
    throw new Error(errorMessage);
  }

  return readJsonResponse<ContactResponse>(res);
}

// Receipt Scanner API
export interface ScannedTransactionReview {
  amount: number;
  type: "income" | "expense";
  description: string | null;
  merchant: string | null;
  date: string | null; // ISO date, or null if the scan couldn't determine one
  categorySlug: string | null;
  institution: string | null;
  reasons: string[];
}

export interface ScanReceiptResult {
  created: unknown[];
  needsReview: ScannedTransactionReview[];
}

export async function scanReceipt(file: File): Promise<ScanReceiptResult> {
  const formData = new FormData();
  formData.append("receipt", file);

  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const res = await fetch(proxyPath("/transactions/scan"), {
    method: "POST",
    credentials: "include",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    const responseBody = contentType.includes("application/json")
      ? await res.json().catch(() => null)
      : await res.text().catch(() => "");
    throw new Error(extractErrorMessage(responseBody, `Receipt scan failed (${res.status})`));
  }

  const data = await readJsonResponse<any>(res);
  const inner = data.data ?? data;
  return {
    created: inner.created ?? [],
    needsReview: inner.needsReview ?? [],
  };
}

// Error Handling Helper

export function handleApiError(error: any): string {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.message) return error.message;
  return "An error occurred. Please try again.";
}