"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ShieldCheck,
  KeyRound,
  Zap,
  Check,
  X,
} from "lucide-react";
import { resetPassword } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/* ────────────────── Feature bullet items ────────────────── */

const features = [
  {
    icon: ShieldCheck,
    title: "Bank-Grade Protection",
    desc: "Your credentials and financial records remain encrypted at rest and in transit.",
  },
  {
    icon: KeyRound,
    title: "Instant Update",
    desc: "Your new password takes effect immediately across all sessions and devices.",
  },
  {
    icon: Zap,
    title: "Seamless Return",
    desc: "Jump straight back into your budgets, analytics, and intelligent financial insights.",
  },
];

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
        "mt-2 rounded-xl border p-2.5 space-y-1 transition-all text-left",
        allMet
          ? "bg-[#1b3d18]/5 border-[#1b3d18]/20"
          : "bg-[#FBF9F5] border-[#e5e2db]"
      )}
    >
      <p className="text-[10px] font-semibold text-[#1b3d18]/80">
        Password requirements:
      </p>
      {requirements.map((req) => (
        <div key={req.label} className="flex items-center gap-1.5">
          {req.met ? (
            <Check size={11} className="text-[#1b3d18] stroke-[2.5] flex-shrink-0" />
          ) : (
            <X size={11} className="text-[#1b3d18]/30 stroke-[2] flex-shrink-0" />
          )}
          <span
            className={cn(
              "text-[10.5px]",
              req.met ? "text-[#1b3d18] font-medium" : "text-[#1b3d18]/60"
            )}
          >
            {req.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RESET PASSWORD PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ password?: string; confirmPassword?: string }>({});

  useEffect(() => {
    if (!token) {
      setServerError("Reset link is missing or invalid. Please request a new link.");
    }
  }, [token]);

  function validate() {
    const errors: { password?: string; confirmPassword?: string } = {};

    if (!password) {
      errors.password = "New password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Password must contain at least one number.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your new password.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

    if (!token) {
      setServerError("Missing reset token. Please request a new password reset link.");
      return;
    }

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword({ token, password, confirmPassword });

      if (!response.success) {
        setServerError(response.error || "Could not reset password.");
        return;
      }

      setSuccessMessage(response.message || "Password updated successfully! Redirecting to login…");
      setTimeout(() => router.push("/auth/login"), 1600);
    } catch (error: any) {
      setServerError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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
              Set a new,
            </span>
            <span className="block font-serif text-[42px] xl:text-[46px] font-normal text-black leading-[1.08] tracking-tight">
              secure <span className="text-[#1b3d18]">password.</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[13px] text-[#1b3d18]/75 leading-relaxed max-w-[310px] mb-8 pr-3">
            Choose a strong combination of characters to keep your financial insights and accounts safe.
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
            Set a new <span className="text-[#1b3d18]">password.</span>
          </h1>
          <p className="text-xs text-[#1b3d18]/70 mt-1">
            Create a strong combination of characters to protect your account.
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
              Reset your password
            </h2>
            <p className="text-[12px] sm:text-[12.5px] text-[#1b3d18]/60 mt-1">
              Enter your new credentials below to regain full access.
            </p>
          </div>

          {/* Missing Token Warning */}
          {!token && (
            <div className="mb-5 rounded-xl bg-amber-50 border border-amber-200 p-3.5 text-[12px] text-amber-800 flex flex-col gap-2.5">
              <div className="flex items-start gap-2">
                <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  No reset token found in your link. The link may have expired or was copied incompletely.
                </span>
              </div>
              <Link
                href="/auth/forgot-password"
                className="inline-flex items-center justify-center rounded-lg bg-amber-800 hover:bg-amber-900 text-white text-[11.5px] font-semibold py-1.5 px-3 transition-colors w-fit"
              >
                Request a new reset link
              </Link>
            </div>
          )}

          {/* Server Error Alert */}
          {serverError && token && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-3.5 py-2.5 text-[12px] text-red-600">
              {serverError}
            </div>
          )}

          {/* Success Alert */}
          {successMessage && (
            <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 text-[12px] text-emerald-800 flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ──── Form ──── */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[#1b3d18] mb-1.5"
              >
                NEW PASSWORD
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1b3d18]/40 pointer-events-none">
                  <Lock size={15} strokeWidth={1.8} />
                </div>
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) {
                      setFieldErrors((prev) => ({ ...prev, password: undefined }));
                    }
                  }}
                  placeholder="Enter your new password"
                  className={cn(
                    "w-full rounded-xl border bg-[#FBF9F5] text-[#1b3d18] text-[12.5px] py-2.5 pl-9 pr-10 transition-all focus:outline-none focus:bg-white placeholder:text-[#1b3d18]/30",
                    fieldErrors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-[#d9d6cf] focus:border-[#1b3d18] focus:ring-1 focus:ring-[#1b3d18] hover:border-[#1b3d18]/50"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1b3d18]/40 hover:text-[#1b3d18] transition-colors cursor-pointer"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {password && <PasswordRequirements password={password} />}

              {fieldErrors.password && (
                <p className="mt-1 text-[10.5px] text-red-500">{fieldErrors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[#1b3d18] mb-1.5"
              >
                CONFIRM NEW PASSWORD
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1b3d18]/40 pointer-events-none">
                  <Lock size={15} strokeWidth={1.8} />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPwd ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (fieldErrors.confirmPassword) {
                      setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                    }
                  }}
                  placeholder="Re-enter your new password"
                  className={cn(
                    "w-full rounded-xl border bg-[#FBF9F5] text-[#1b3d18] text-[12.5px] py-2.5 pl-9 pr-10 transition-all focus:outline-none focus:bg-white placeholder:text-[#1b3d18]/30",
                    fieldErrors.confirmPassword
                      ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-[#d9d6cf] focus:border-[#1b3d18] focus:ring-1 focus:ring-[#1b3d18] hover:border-[#1b3d18]/50"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPwd((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1b3d18]/40 hover:text-[#1b3d18] transition-colors cursor-pointer"
                  aria-label={showConfirmPwd ? "Hide password" : "Show password"}
                >
                  {showConfirmPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {fieldErrors.confirmPassword && (
                <p className="mt-1 text-[10.5px] text-red-500">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={loading || !token}
                className={cn(
                  "w-full rounded-xl bg-[#1b3d18] hover:bg-[#254F22] text-white font-semibold py-3 px-4 text-[13px] transition-all hover:shadow-md active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2",
                  "disabled:opacity-60 disabled:cursor-not-allowed"
                )}
              >
                {loading ? (
                  <span className="inline-flex items-center justify-center gap-2 text-[12.5px]">
                    <Loader2 size={15} className="animate-spin" /> Updating password…
                  </span>
                ) : (
                  "Reset password"
                )}
              </button>

              <div className="flex items-center justify-between pt-1 text-[11.5px]">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#1b3d18] hover:underline transition-colors"
                >
                  <ArrowLeft size={13} />
                  Back to log in
                </Link>

                <Link
                  href="/auth/forgot-password"
                  className="font-medium text-[#1b3d18]/70 hover:text-[#1b3d18] hover:underline transition-colors"
                >
                  Request new link
                </Link>
              </div>
            </div>
          </form>

          {/* Need help footer */}
          <p className="text-center text-[11.5px] text-[#1b3d18]/60 mt-5 pt-4 border-t border-[#1b3d18]/10">
            Having trouble?{" "}
            <Link
              href="/contact?category=support"
              className="font-bold text-[#1b3d18] hover:underline transition-colors"
            >
              Contact support
            </Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}
