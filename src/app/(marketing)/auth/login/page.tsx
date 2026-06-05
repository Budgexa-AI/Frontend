"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { login, signInWithGoogle, resendVerificationOtp } from "@/lib/api-client";
import { signInSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";
import type { ZodError } from "zod";

type FieldErrors = Partial<Record<string, string>>;

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const set = (key: keyof typeof form) => (val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  // Handle OAuth callback: token or error returned via URL params
  useEffect(() => {
    const oauthError = searchParams.get("error");

    if (oauthError) {
      const messages: Record<string, string> = {
        oauth_cancelled: "Google sign-in was cancelled.",
        oauth_failed: "Google sign-in failed. Please try again.",
      };
      setServerError(messages[oauthError] ?? "An error occurred during Google sign-in.");
    }
  }, [searchParams, router]);

  function handleGoogleLogin() {
    setGoogleLoading(true);
    const origin = window.location.origin;
    const dashboardUrl = `${origin}/product/dashboard`;
    const loginUrl = `${origin}/auth/login`;
    signInWithGoogle(dashboardUrl, loginUrl);
  }

  function isEmailUnverified(response: Awaited<ReturnType<typeof login>>): boolean {
    const message = `${response.error || ""} ${(response.details && typeof response.details === "object" ? JSON.stringify(response.details) : "")}`.toLowerCase();

    if (message.includes("verify") && message.includes("email")) {
      return true;
    }

    const data = response.data;
    if (!data) {
      return false;
    }

    return (
      data.isVerified === false ||
      data.emailVerified === false ||
      data.user?.isVerified === false ||
      data.user?.emailVerified === false
    );
  }

  function extractLoginEmailUnverifiedMessage(response: Awaited<ReturnType<typeof login>>): boolean {
    const message = `${response.error || ""} ${(response.details && typeof response.details === "object" ? JSON.stringify(response.details) : "")}`.toLowerCase();

    return (
      message.includes("verify") ||
      message.includes("verified") ||
      message.includes("unverified") ||
      message.includes("email not verified") ||
      message.includes("email verification")
    );
  }

  async function redirectToVerifyEmail(email: string) {
    // Resend OTP to ensure the user receives it
    try {
      console.info("[login page] resending verification otp", { email });
      const otpResponse = await resendVerificationOtp(email);
      
      if (otpResponse.success) {
        console.info("[login page] otp resent successfully");
      } else {
        console.warn("[login page] otp resend returned error", {
          error: otpResponse.error,
        });
        // Still proceed to verify page even if resend fails
      }
    } catch (otpError) {
      console.error("[login page] otp resend threw an error", otpError);
      // Still proceed to verify page even if resend fails
    }

    router.push(`/auth/verify-email?email=${encodeURIComponent(email)}`);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const parsed = signInSchema.safeParse(form);
    if (!parsed.success) {
      const fe: FieldErrors = {};
      (parsed.error as ZodError).issues.forEach((err) => {
        if (err.path[0]) fe[err.path[0] as string] = err.message;
      });
      setErrors(fe);
      return;
    }

    setLoading(true);

    try {
      const response = await login({
        email: parsed.data.email,
        password: parsed.data.password,
      });

      console.log("[login] response:", JSON.stringify(response));

      if (isEmailUnverified(response) || extractLoginEmailUnverifiedMessage(response)) {
        await redirectToVerifyEmail(parsed.data.email);
        return;
      }

      if (response.success && response.data) {
        document.cookie = `authToken=${response.data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
        router.push(searchParams.get("redirect") || "/product/dashboard");
      } else {
        if (extractLoginEmailUnverifiedMessage(response)) {
          await redirectToVerifyEmail(parsed.data.email);
          return;
        }

        setServerError(response.error || "Login failed. Please try again.");
      }
    } catch (error) {
      setServerError("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl bg-white border border-rayo-beige-dark shadow-card-lg p-8">
        <h1 className="font-display font-black text-3xl text-rayo-green mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-rayo-green/60 mb-8">
          Log in to your Rayo account.
        </p>

        {serverError && (
          <div className="mb-5 rounded-xl bg-rayo-alert/10 border border-rayo-alert/20 px-4 py-3 text-sm text-rayo-alert">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-rayo-green mb-1.5">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => set("email")(e.target.value)}
              placeholder="adaeze@example.com"
              className={cn(
                "w-full rounded-xl border bg-white px-4 py-3 text-sm text-rayo-green placeholder:text-rayo-green/30",
                "transition-all outline-none focus:ring-2 focus:ring-rayo-green/30",
                errors.email
                  ? "border-rayo-alert"
                  : "border-rayo-beige-dark focus:border-rayo-green"
              )}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-rayo-alert">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="text-sm font-semibold text-rayo-green">
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-rayo-orange hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPwd ? "text" : "password"}
                value={form.password}
                onChange={(e) => set("password")(e.target.value)}
                placeholder="Enter your password"
                className={cn(
                  "w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm text-rayo-green placeholder:text-rayo-green/30",
                  "transition-all outline-none focus:ring-2 focus:ring-rayo-green/30",
                  errors.password
                    ? "border-rayo-alert"
                    : "border-rayo-beige-dark focus:border-rayo-green"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-rayo-green/40 hover:text-rayo-green transition-colors"
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-rayo-alert">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="btn-primary w-full py-3.5 text-base disabled:opacity-60"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Logging in…</>
            ) : (
              "Log in"
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-rayo-beige-dark"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-rayo-green/60">Or continue with</span>
            </div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
            className={cn(
              "w-full rounded-xl border border-rayo-beige-dark bg-white px-4 py-3 flex items-center justify-center gap-2",
              "text-sm font-medium text-rayo-green transition-all hover:bg-rayo-beige-light",
              "disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          >
            {googleLoading ? (
              <><Loader2 size={16} className="animate-spin" /> Redirecting…</>
            ) : (
              <><GoogleIcon /> Log in with Google</>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-rayo-green/60">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-rayo-green hover:text-rayo-orange transition-colors"
          >
            Start for free
          </Link>
        </p>
      </div>
    </div>
  );
}