"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  BarChart3,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { login, signInWithGoogle, resendVerificationOtp } from "@/lib/api-client";
import { signInSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ZodError } from "zod";

type FieldErrors = Partial<Record<string, string>>;

/* ─────────────────────── Google Icon ─────────────────────── */

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

/* ────────────────── Feature bullet items ────────────────── */

const features = [
  {
    icon: BarChart3,
    title: "Smart Insights",
    desc: "AI analyzes your spending and uncovers opportunities to save more.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    desc: "Your data is encrypted and protected with bank-level security.",
  },
  {
    icon: Zap,
    title: "Effortless Tracking",
    desc: "Track budgets, expenses, and goals in one simple dashboard.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   LOGIN PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const set = (key: keyof typeof form) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  // Load remembered email if present
  useEffect(() => {
    const savedEmail = localStorage.getItem("budgexa_remembered_email");
    if (savedEmail) {
      setForm((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  // Handle OAuth callback: token or error returned via URL params
  useEffect(() => {
    const token      = searchParams.get("token");
    const oauthError = searchParams.get("error");
    const isNewUser  = searchParams.get("isNewUser");
    const redirect   = searchParams.get("redirect");

    if (token) {
      localStorage.setItem("authToken", token);
      document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

      if (redirect) {
        router.replace(redirect);
      } else if (isNewUser === "true") {
        router.replace("/product/onboarding/welcome");
      } else {
        router.replace("/product/dashboard");
      }
      return;
    }

    if (oauthError) {
      const messages: Record<string, string> = {
        oauth_cancelled: "Google sign-in was cancelled.",
        oauth_failed:    "Google sign-in failed. Please try again.",
      };
      setServerError(messages[oauthError] ?? "An error occurred during Google sign-in.");
    }
  }, [searchParams, router]);

  function handleGoogleLogin() {
    setGoogleLoading(true);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const dashboardUrl = `${origin}/auth/login?redirect=${encodeURIComponent("/product/dashboard")}`;
    const loginUrl     = `${origin}/auth/login`;
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
    try {
      console.info("[login page] resending verification otp", { email });
      const otpResponse = await resendVerificationOtp(email);
      if (otpResponse.success) {
        console.info("[login page] otp resent successfully");
      } else {
        console.warn("[login page] otp resend returned error", {
          error: otpResponse.error,
        });
      }
    } catch (otpError) {
      console.error("[login page] otp resend threw an error", otpError);
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

      if (isEmailUnverified(response) || extractLoginEmailUnverifiedMessage(response)) {
        await redirectToVerifyEmail(parsed.data.email);
        return;
      }

      if (response.success && response.data?.token) {
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax;`;

        if (rememberMe) {
          localStorage.setItem("budgexa_remembered_email", parsed.data.email);
        } else {
          localStorage.removeItem("budgexa_remembered_email");
        }

        const redirect = searchParams.get("redirect") ?? "/product/dashboard";
        router.replace(redirect);
        return;
      } else {
        if (extractLoginEmailUnverifiedMessage(response)) {
          await redirectToVerifyEmail(parsed.data.email);
          return;
        }

        setServerError(response.error || "Login failed. Please try again.");
      }
    } catch (error: any) {
      setServerError(error.message || "An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }

  /* ─────────────────── RENDER ─────────────────── */

  return (
    <main className="min-h-[100dvh] pt-16 grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* ══════════════════════════════════════════════════════════
          LEFT PANEL — Botanical background + copy + features
         ══════════════════════════════════════════════════════════ */}
      <section className="relative hidden lg:flex flex-col justify-center lg:sticky lg:top-16 lg:h-[calc(100dvh-4rem)] lg:self-start overflow-hidden bg-[#FBF9F5]">
        {/* Animated background image with smooth fade-in and subtle zoom reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/images/signup-botanical-bg.webp"
            alt="Budgexa botanical background"
            fill
            className="object-cover object-left"
            priority
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACwAgCdASoUAAwAPzmEuVOvKKWisAgB4CcJaQAAeyAA/u39ZobeyUFAAAA="
          />
        </motion.div>

        {/* Content overlay with smooth fade-in reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 pl-28 lg:pl-40 xl:pl-52 pr-8 xl:pr-14 py-8 flex flex-col justify-center h-full translate-x-[220px] -translate-y-[60px]"
        >
          {/* Heading */}
          <h1 className="mb-4 max-w-md">
            <span className="block font-serif text-[42px] xl:text-[46px] font-normal text-black leading-[1.08] tracking-tight">
              Welcome back
            </span>
            <span className="block font-serif text-[42px] xl:text-[46px] font-normal text-black leading-[1.08] tracking-tight">
              to <span className="text-[#1b3d18]">smarter finance.</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[13px] text-[#1b3d18]/75 leading-relaxed max-w-[310px] mb-8 pr-3">
            Log in to continue tracking, planning, and achieving your financial goals.
          </p>

          {/* Feature bullets */}
          <div className="space-y-4 max-w-[310px]">
            {features.map((feat) => (
              <div key={feat.title} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b3d18]/8 border border-[#1b3d18]/10 flex items-center justify-center">
                  <feat.icon size={16} className="text-[#1b3d18]" strokeWidth={1.8} />
                </div>
                <div className="flex-1 pr-3">
                  <h3 className="text-[13px] font-bold text-[#1b3d18] mb-0.5">
                    {feat.title}
                  </h3>
                  <p className="text-[11px] text-[#1b3d18]/65 leading-snug">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          RIGHT PANEL — Form card
         ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F2F0EB] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 xl:px-12 py-6 lg:py-8 min-h-[calc(100dvh-4rem)]">
        {/* Mobile-only heading */}
        <div className="lg:hidden mb-4 text-center max-w-sm">
          <h1 className="font-serif text-2xl font-normal text-black tracking-tight">
            Welcome back to <span className="text-[#1b3d18]">smarter finance.</span>
          </h1>
          <p className="text-xs text-[#1b3d18]/70 mt-1">
            Log in to continue tracking, planning, and achieving your financial goals.
          </p>
        </div>

        {/* White form card with smooth fade-in reveal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[420px] bg-white rounded-2xl sm:rounded-3xl border border-[#e5e2db] shadow-sm px-6 sm:px-8 py-7 sm:py-8"
        >
          {/* Card heading */}
          <div className="mb-6">
            <h2 className="font-serif text-[22px] sm:text-[24px] font-bold text-[#1b3d18] tracking-tight leading-tight">
              Log in to your account
            </h2>
            <p className="text-[12px] sm:text-[12.5px] text-[#1b3d18]/60 mt-1">
              Enter your details to access your dashboard.
            </p>
          </div>

          {serverError && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-3.5 py-2 text-[12px] text-red-600">
              {serverError}
            </div>
          )}

          {/* ──── Form ──── */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[#1b3d18] mb-1.5"
              >
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1b3d18]/40 pointer-events-none">
                  <Mail size={15} strokeWidth={1.8} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email")(e.target.value)}
                  placeholder="alex@example.com"
                  className={cn(
                    "w-full rounded-xl border bg-white pl-10 pr-3.5 py-2.5 sm:py-3 text-[12.5px] text-[#1b3d18] placeholder:text-[#1b3d18]/30 focus:outline-none transition-all",
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                      : "border-[#d9d6cf] focus:border-[#1b3d18] focus:ring-1 focus:ring-[#1b3d18] hover:border-[#1b3d18]/50"
                  )}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-[10.5px] text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[#1b3d18] mb-1.5"
              >
                PASSWORD
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1b3d18]/40 pointer-events-none">
                  <Lock size={15} strokeWidth={1.8} />
                </div>
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => set("password")(e.target.value)}
                  placeholder="Enter your password"
                  className={cn(
                    "w-full rounded-xl border bg-white pl-10 pr-10 py-2.5 sm:py-3 text-[12.5px] text-[#1b3d18] placeholder:text-[#1b3d18]/30 focus:outline-none transition-all",
                    errors.password
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                      : "border-[#d9d6cf] focus:border-[#1b3d18] focus:ring-1 focus:ring-[#1b3d18] hover:border-[#1b3d18]/50"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1b3d18]/40 hover:text-[#1b3d18] transition-colors p-0.5"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? <EyeOff size={15} strokeWidth={1.8} /> : <Eye size={15} strokeWidth={1.8} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-[10.5px] text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-[#d9d6cf] text-[#1b3d18] focus:ring-[#1b3d18] focus:ring-offset-0 transition-colors accent-[#1b3d18] cursor-pointer"
                />
                <span className="text-[11.5px] text-[#1b3d18]/75">
                  Remember me
                </span>
              </label>

              <Link
                href="/auth/forgot-password"
                className="text-[11.5px] font-medium text-[#1b3d18]/75 hover:text-[#1b3d18] hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={loading || googleLoading}
                className={cn(
                  "w-full rounded-xl bg-[#1b3d18] hover:bg-[#254F22] text-white font-semibold py-3 px-4 text-[13px] transition-all hover:shadow-md active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2",
                  "disabled:opacity-60 disabled:cursor-not-allowed"
                )}
              >
                {loading ? (
                  <span className="inline-flex items-center justify-center gap-2 text-[12.5px]">
                    <Loader2 size={15} className="animate-spin" /> Logging in…
                  </span>
                ) : (
                  "Log In"
                )}
              </button>

              {/* OR Divider */}
              <div className="flex items-center gap-2.5 my-2">
                <div className="flex-1 h-px bg-[#1b3d18]/10" />
                <span className="text-[9.5px] font-semibold text-[#1b3d18]/45 uppercase tracking-wider px-1">
                  OR
                </span>
                <div className="flex-1 h-px bg-[#1b3d18]/10" />
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading || googleLoading}
                className={cn(
                  "w-full rounded-xl border border-[#d9d6cf] bg-white hover:bg-[#FAFAF8] text-[#1b3d18] font-semibold text-[12.5px] py-2.5 sm:py-3 px-4 transition-all hover:shadow-sm active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2.5",
                  "disabled:opacity-60 disabled:cursor-not-allowed"
                )}
              >
                {googleLoading ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Loader2 size={15} className="animate-spin text-[#1b3d18]" /> Redirecting…
                  </span>
                ) : (
                  <>
                    <GoogleIcon />
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-[11.5px] text-[#1b3d18]/60 mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-bold text-[#1b3d18] hover:underline transition-colors"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}