// Authentication utilities and hooks
// Provides typed interfaces and helper functions for auth operations

export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  emailVerified?: boolean;
}

export interface SignUpInput {
  email: string;
  password: string;
  fullName?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface VerifyOtpInput {
  email: string;
  otp: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
  confirmPassword?: string;
}

export interface UploadImageInput {
  file: File;
}

const TOKEN_KEY = "authToken"; // ← unified key, matches middleware

/**
 * Extract user profile from API response
 */
export function parseAuthResponse(response: any): AuthUser | null {
  if (!response?.data) return null;

  const data = response.data;
  return {
    id: data.userId || data.id || "",
    email: data.email || "",
    fullName: data.fullName || data.name || undefined,
    avatarUrl: data.avatarUrl || data.profileImage || undefined,
    isVerified: data.isVerified || false,
    emailVerified: data.emailVerified || false,
  };
}

/**
 * Check if user is authenticated
 * @returns true if auth token exists in storage
 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token;
}

/**
 * Get stored auth token
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Store auth token in both localStorage (for client-side checks)
 * and a cookie (for middleware/server-side checks)
 */
export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

/**
 * Clear auth token
 */
export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}

/**
 * Get stored user data
 */
export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  
  const stored = localStorage.getItem("auth_user");
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Store user data
 */
export function setStoredUser(user: AuthUser | null): void {
  if (typeof window === "undefined") return;
  
  if (user) {
    localStorage.setItem("auth_user", JSON.stringify(user));
  } else {
    localStorage.removeItem("auth_user");
  }
}

/**
 * Clear all auth data
 */
export function clearAuthData(): void {
  if (typeof window === "undefined") return;
  
  clearAuthToken();
  setStoredUser(null);
}

