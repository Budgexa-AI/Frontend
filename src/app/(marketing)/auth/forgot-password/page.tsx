"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Mail,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { requestPasswordReset, resendResetPassword } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
   FORGOT PASSWORD PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const validateEmail = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) {
      return "Email address is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }

    setLoading(true);

    try {
      const response = await requestPasswordReset(email.trim());

      if (!response.success) {
        setServerError(response.error || "Could not send reset link.");
        return;
      }

      setSuccessMessage(
        response.message || "Reset link sent successfully. Please check your inbox."
      );
    } catch (error: any) {
      setServerError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setServerError("");
    setSuccessMessage("");

    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }

    setResending(true);

    try {
      const response = await resendResetPassword(email.trim());

      if (!response.success) {
        setServerError(response.error || "Could not resend reset link.");
        return;
      }

      setSuccessMessage(
        response.message || "Reset link resent successfully. Please check your inbox."
      );
    } catch (error: any) {
      setServerError(error.message || "Could not resend reset link.");
    } finally {
      setResending(false);
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
              Reset your
            </span>
            <span className="block font-serif text-[42px] xl:text-[46px] font-normal text-black leading-[1.08] tracking-tight">
              account <span className="text-[#1b3d18]">access.</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[13px] text-[#1b3d18]/75 leading-relaxed max-w-[310px] mb-8 pr-3">
            Enter your registered email and we&apos;ll help you get back into your account securely.
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
            Reset your <span className="text-[#1b3d18]">password.</span>
          </h1>
          <p className="text-xs text-[#1b3d18]/70 mt-1">
            Enter your email and we&apos;ll help you get back into your account.
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
              Forgot password?
            </h2>
            <p className="text-[12px] sm:text-[12.5px] text-[#1b3d18]/60 mt-1">
              Enter your email address and we&apos;ll send you a recovery link.
            </p>
          </div>

          {serverError && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-3.5 py-2 text-[12px] text-red-600">
              {serverError}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 text-[12px] text-emerald-800 flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  placeholder="alex@example.com"
                  className={cn(
                    "w-full rounded-xl border bg-white pl-10 pr-3.5 py-2.5 sm:py-3 text-[12.5px] text-[#1b3d18] placeholder:text-[#1b3d18]/30 focus:outline-none transition-all",
                    emailError
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                      : "border-[#d9d6cf] focus:border-[#1b3d18] focus:ring-1 focus:ring-[#1b3d18] hover:border-[#1b3d18]/50"
                  )}
                />
              </div>
              {emailError && (
                <p className="mt-1 text-[10.5px] text-red-500">{emailError}</p>
              )}
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full rounded-xl bg-[#1b3d18] hover:bg-[#254F22] text-white font-semibold py-3 px-4 text-[13px] transition-all hover:shadow-md active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2",
                  "disabled:opacity-60 disabled:cursor-not-allowed"
                )}
              >
                {loading ? (
                  <span className="inline-flex items-center justify-center gap-2 text-[12.5px]">
                    <Loader2 size={15} className="animate-spin" /> Sending reset link…
                  </span>
                ) : (
                  "Send reset link"
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

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending || !email}
                  className="font-medium text-[#1b3d18]/70 hover:text-[#1b3d18] hover:underline disabled:opacity-40 disabled:hover:no-underline transition-colors cursor-pointer"
                >
                  {resending ? (
                    <span className="inline-flex items-center gap-1">
                      <Loader2 size={12} className="animate-spin" /> Resending…
                    </span>
                  ) : (
                    "Resend link"
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-[11.5px] text-[#1b3d18]/60 mt-5 pt-4 border-t border-[#1b3d18]/10">
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