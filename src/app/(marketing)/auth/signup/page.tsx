"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  Loader2,
  Check,
  X,
  User,
  Mail,
  Lock,
  BarChart3,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";
import { signUp, signInWithGoogle } from "@/lib/api-client";
import { signUpSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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

/* ─────────────────── Password Requirements ─────────────────── */

function PasswordRequirements({ password }: { password: string }) {
  const requirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "At least one uppercase letter", met: /[A-Z]/.test(password) },
    { label: "At least one number", met: /[0-9]/.test(password) },
  ];

  const allMet = requirements.every((r) => r.met);

  return (
    <div
      className={cn(
        "mt-1 rounded-md border p-1.5 space-y-0.5 transition-all text-left",
        allMet
          ? "bg-[#1b3d18]/5 border-[#1b3d18]/20"
          : "bg-red-50 border-red-200"
      )}
    >
      <p className="text-[9.5px] font-semibold text-[#1b3d18]/80">
        Password requirements:
      </p>
      {requirements.map((req) => (
        <div key={req.label} className="flex items-center gap-1.5">
          {req.met ? (
            <Check size={11} className="text-[#1b3d18] stroke-[2.5] flex-shrink-0" />
          ) : (
            <X size={11} className="text-red-500 stroke-[2.5] flex-shrink-0" />
          )}
          <span
            className={cn(
              "text-[11px] font-medium leading-none",
              req.met ? "text-[#1b3d18]" : "text-red-500"
            )}
          >
            {req.label}
          </span>
        </div>
      ))}
    </div>
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

/* ────────────────── Types ────────────────── */

type FieldErrors = Partial<Record<string, string>>;

/* ═══════════════════════════════════════════════════════════════
   SIGN UP PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
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

  const toggleAgreeTerms = (checked: boolean) => {
    setAgreeTerms(checked);
    if (errors.agreeTerms) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.agreeTerms;
        return next;
      });
    }
  };

  function handleGoogleSignUp() {
    setGoogleLoading(true);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const onboardUrl = `${origin}/auth/signup?redirect=${encodeURIComponent("/product/onboarding/welcome")}`;
    const signupUrl = `${origin}/auth/signup`;
    signInWithGoogle(onboardUrl, signupUrl);
  }

  useEffect(() => {
    const token = searchParams.get("token");
    const oauthError = searchParams.get("error");
    const isNewUser = searchParams.get("isNewUser");
    const redirect = searchParams.get("redirect");

    if (token) {
      localStorage.setItem("authToken", token);
      document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
      if (redirect) {
        router.replace(redirect);
      } else if (isNewUser === "true") {
        router.replace("/product/onboarding/welcome");
      } else {
        router.replace("/product/dashboard");
      }
    }

    if (oauthError) {
      const messages: Record<string, string> = {
        oauth_cancelled: "Google sign-up was cancelled.",
        oauth_failed: "Google sign-up failed. Please try again.",
      };
      setTimeout(() => {
        setServerError(messages[oauthError] ?? "An error occurred during Google sign-up.");
      }, 0);
    }
  }, [searchParams, router]);

  function shouldGoToVerifyEmail(response: Awaited<ReturnType<typeof signUp>>): boolean {
    const message = `${response.error || ""} ${(response.details && typeof response.details === "object" ? JSON.stringify(response.details) : "")}`.toLowerCase();
    return (
      response.success ||
      message.includes("verify") ||
      message.includes("verified") ||
      message.includes("unverified") ||
      message.includes("email verification") ||
      message.includes("confirmation") ||
      message.includes("registered")
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError("");
    setLoading(true);

    const fe: FieldErrors = {};
    const parsed = signUpSchema.safeParse(form);

    if (!parsed.success) {
      parsed.error.issues.forEach((err) => {
        if (err.path[0]) fe[err.path[0] as string] = err.message;
      });
    }

    if (!agreeTerms) {
      fe.agreeTerms = "You must agree to the Terms and Conditions and Privacy Policy";
    }

    if (!parsed.success || !agreeTerms) {
      setErrors(fe);
      setLoading(false);
      return;
    }

    try {
      const response = await signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        fullName: parsed.data.fullName,
      });

      if (shouldGoToVerifyEmail(response)) {
        router.push(
          `/auth/verify-email?email=${encodeURIComponent(parsed.data.email)}`
        );
      } else {
        setServerError(response.error || "Sign up failed. Please try again.");
      }
    } catch (err: any) {
      setServerError(err.message || "Something went wrong. Please try again.");
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
        {/* Animated background image with smooth fade-in and subtle zoom-out reveal */}
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

        {/* Content overlay with smooth fade-in reveal - shifted right by 220px and upward by 90px */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 pl-28 lg:pl-40 xl:pl-52 pr-8 xl:pr-14 py-8 flex flex-col justify-center h-full translate-x-[220px] -translate-y-[90px]"
        >
          {/* Pill badge */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b3d18]/8 border border-[#1b3d18]/12 text-[11px] font-semibold text-[#1b3d18]">
              <Sparkles size={12} className="text-[#1b3d18]" />
              Your daily money companion, guided by AI
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-4 max-w-md">
            <span className="block font-serif text-[42px] xl:text-[46px] font-normal text-black leading-[1.05] tracking-tight">
              Your AI
            </span>
            <span className="block font-serif text-[42px] xl:text-[46px] font-normal text-[#1b3d18] leading-[1.05] tracking-tight">
              Financial
            </span>
            <span className="block font-serif text-[42px] xl:text-[46px] font-normal text-black leading-[1.05] tracking-tight">
              Copilot
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[13px] text-[#1b3d18]/75 leading-relaxed max-w-[310px] mb-8 pr-3">
            Start your journey to better financial clarity
            with intelligent insights and seamless tracking.
          </p>

          {/* Feature bullets aligned with main subtext */}
          <div className="space-y-4 max-w-[310px]">
            {features.map((feat) => (
              <div key={feat.title} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1b3d18]/8 border border-[#1b3d18]/10 flex items-center justify-center">
                  <feat.icon size={16} className="text-[#1b3d18]" />
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
      <section className="bg-[#F2F0EB] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 xl:px-12 py-3 lg:py-4 min-h-[calc(100dvh-4rem)]">
        {/* Mobile-only heading (shows on small screens where left panel is hidden) */}
        <div className="lg:hidden mb-3 text-center">
          <h1 className="font-serif text-xl font-normal text-black tracking-tight">
            Your AI <span className="text-[#1b3d18]">Financial</span> Copilot
          </h1>
          <p className="text-xs text-[#1b3d18]/70 mt-1">
            Start your journey to better financial clarity.
          </p>
        </div>

        {/* White form card with smooth fade-in reveal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[390px] bg-white rounded-2xl border border-[#e5e2db] shadow-sm px-5 sm:px-7 py-4 sm:py-5"
        >
          {/* Card heading */}
          <div className="mb-2.5">
            <h2 className="font-serif text-[20px] sm:text-[22px] font-bold text-[#1b3d18] tracking-tight leading-tight">
              Create an account
            </h2>
            <p className="text-[11.5px] text-[#1b3d18]/60 mt-0.5">
              Sign up in seconds to start managing your budget.
            </p>
          </div>

          {serverError && (
            <div className="mb-2 rounded-lg bg-red-50 border border-red-200 px-3 py-1.5 text-[12px] text-red-600">
              {serverError}
            </div>
          )}

          {/* ──── Form ──── */}
          <form onSubmit={handleSubmit} noValidate className="space-y-2">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[#1b3d18] mb-0.5"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[#1b3d18]/40 pointer-events-none">
                  <User size={14} strokeWidth={1.8} />
                </div>
                <input
                  id="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => set("fullName")(e.target.value)}
                  placeholder="Alex Doe"
                  className={cn(
                    "w-full bg-transparent border-b pl-6 pr-2 pb-1.5 pt-0.5 text-[12.5px] text-[#1b3d18] placeholder:text-[#1b3d18]/30 focus:outline-none transition-colors",
                    errors.fullName
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#1b3d18]/25 focus:border-[#1b3d18] hover:border-[#1b3d18]/50"
                  )}
                />
              </div>
              {errors.fullName && (
                <p className="mt-0.5 text-[10.5px] text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[#1b3d18] mb-0.5"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[#1b3d18]/40 pointer-events-none">
                  <Mail size={14} strokeWidth={1.8} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email")(e.target.value)}
                  placeholder="alex@example.com"
                  className={cn(
                    "w-full bg-transparent border-b pl-6 pr-2 pb-1.5 pt-0.5 text-[12.5px] text-[#1b3d18] placeholder:text-[#1b3d18]/30 focus:outline-none transition-colors",
                    errors.email
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#1b3d18]/25 focus:border-[#1b3d18] hover:border-[#1b3d18]/50"
                  )}
                />
              </div>
              {errors.email && (
                <p className="mt-0.5 text-[10.5px] text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[#1b3d18] mb-0.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[#1b3d18]/40 pointer-events-none">
                  <Lock size={14} strokeWidth={1.8} />
                </div>
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => set("password")(e.target.value)}
                  placeholder="Min. 8 characters"
                  className={cn(
                    "w-full bg-transparent border-b pl-6 pr-6 pb-1.5 pt-0.5 text-[12.5px] text-[#1b3d18] placeholder:text-[#1b3d18]/30 focus:outline-none transition-colors",
                    errors.password
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#1b3d18]/25 focus:border-[#1b3d18] hover:border-[#1b3d18]/50"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#1b3d18]/40 hover:text-[#1b3d18] transition-colors p-0.5"
                >
                  {showPwd ? <EyeOff size={14} strokeWidth={1.8} /> : <Eye size={14} strokeWidth={1.8} />}
                </button>
              </div>
              {form.password && !errors.password && (
                <PasswordRequirements password={form.password} />
              )}
              {errors.password && (
                <p className="mt-0.5 text-[10.5px] text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[#1b3d18] mb-0.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[#1b3d18]/40 pointer-events-none">
                  <Lock size={14} strokeWidth={1.8} />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPwd ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => set("confirmPassword")(e.target.value)}
                  placeholder="Re-enter your password"
                  className={cn(
                    "w-full bg-transparent border-b pl-6 pr-6 pb-1.5 pt-0.5 text-[12.5px] text-[#1b3d18] placeholder:text-[#1b3d18]/30 focus:outline-none transition-colors",
                    errors.confirmPassword
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#1b3d18]/25 focus:border-[#1b3d18] hover:border-[#1b3d18]/50"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPwd((s) => !s)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#1b3d18]/40 hover:text-[#1b3d18] transition-colors p-0.5"
                >
                  {showConfirmPwd ? <EyeOff size={14} strokeWidth={1.8} /> : <Eye size={14} strokeWidth={1.8} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-0.5 text-[10.5px] text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="pt-0.5">
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => toggleAgreeTerms(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded border-[#d9d6cf] text-[#1b3d18] focus:ring-[#1b3d18] focus:ring-offset-0 transition-colors accent-[#1b3d18] cursor-pointer shrink-0"
                />
                <span className="text-[11px] text-[#1b3d18]/70 leading-snug">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    target="_blank"
                    className="font-medium text-[#1b3d18] underline underline-offset-2 hover:text-[#1b3d18]/80 transition-colors"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    target="_blank"
                    className="font-medium text-[#1b3d18] underline underline-offset-2 hover:text-[#1b3d18]/80 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="mt-0.5 text-[10.5px] text-red-500">{errors.agreeTerms}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-0.5 space-y-2">
              <button
                type="submit"
                disabled={loading || googleLoading}
                className={cn(
                  "w-full rounded-xl bg-[#1b3d18] hover:bg-[#254F22] text-white font-semibold py-2.5 px-4 transition-all hover:shadow-md active:scale-[0.99] cursor-pointer flex flex-col items-center justify-center gap-0.5",
                  "disabled:opacity-60 disabled:cursor-not-allowed"
                )}
              >
                {loading ? (
                  <span className="inline-flex items-center justify-center gap-2 text-[12px] py-0.5">
                    <Loader2 size={14} className="animate-spin" /> Creating account…
                  </span>
                ) : (
                  <>
                    <span className="text-[13px] leading-tight font-semibold">Start 30-Day Free Trial</span>
                    <span className="text-[8.5px] font-bold tracking-[0.12em] text-white/75 uppercase">
                      No card required
                    </span>
                  </>
                )}
              </button>

              {/* OR Divider */}
              <div className="flex items-center gap-2.5 my-0.5">
                <div className="flex-1 h-px bg-[#1b3d18]/10" />
                <span className="text-[10px] font-medium text-[#1b3d18]/40 uppercase">Or</span>
                <div className="flex-1 h-px bg-[#1b3d18]/10" />
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={loading || googleLoading}
                className={cn(
                  "w-full rounded-xl border border-[#d9d6cf] bg-white hover:bg-[#FAFAF8] text-[#1b3d18] font-semibold text-[12.5px] py-2.5 px-4 transition-all hover:shadow-sm active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2",
                  "disabled:opacity-60 disabled:cursor-not-allowed"
                )}
              >
                {googleLoading ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Loader2 size={14} className="animate-spin text-[#1b3d18]" /> Redirecting…
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

          {/* Login link */}
          <p className="text-center text-[11px] text-[#1b3d18]/60 mt-2.5">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-[#1b3d18] hover:underline transition-colors"
            >
              Log in
            </Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}