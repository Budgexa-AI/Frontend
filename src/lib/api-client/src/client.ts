import type {
  Account,
  Transaction,
  SavingsGoal,
  AiInsight,
  AiMessage,
} from "@/lib/types/src";

export interface UserProfile {
  id: string;
  email?: string;
  fullName?: string;
  avatarUrl?: string;
  plan?: string;
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
    fullName:
      source.fullName ?? source.full_name ?? source.name ?? undefined,
    avatarUrl: source.profileImage ?? undefined,
    plan: source.plan ?? undefined,
  };
}

function createHeaders(extraHeaders?: HeadersInit): HeadersInit {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("authToken")
      : null;

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extraHeaders,
  };
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
export function signInWithGoogle(redirectUrl: string, errorUrl: string): void {
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
  const res = await fetch(proxyPath("/auth/me"), {
    credentials: "include",
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
  income: string;
  goals: string[];
  categories: string[];
}): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(proxyPath("/onboarding"), {
    method: "POST",
    headers: createHeaders(),
    credentials: "include",
    body: JSON.stringify(data), // arrays serialize fine as JSON
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

export async function getDashboardData(userId: string): Promise<{
  accounts: Account[];
  transactions: Transaction[];
  savingsGoals: SavingsGoal[]; 
  insights: AiInsight[];
}> {
  const res = await fetch(
    proxyPath(`/dashboard/${encodeURIComponent(userId)}`),
    { credentials: "include" }
  );

  if (!res.ok) throw new Error("Failed to fetch dashboard data");

  const data = await readJsonResponse<any>(res);

  return {
    accounts:     data.accounts     ?? [],
    transactions: data.transactions ?? [],
    savingsGoals: data.savingsGoals ?? data.savings ?? [], 
    insights:     data.insights     ?? [],
  };
}

// AI API

export async function getAiInsights(): Promise<AiInsight[]> {
  const res = await fetch(proxyPath("/ai/insights"), {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch AI insights");

  const data = await readJsonResponse<{ insights?: AiInsight[]; data?: AiInsight[] }>(res);

  console.log("[api-client] getAiInsights response", { data });
  return data.insights ?? data.data ?? [];
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

// Error Handling Helper

export function handleApiError(error: any): string {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.message) return error.message;
  return "An error occurred. Please try again.";
}