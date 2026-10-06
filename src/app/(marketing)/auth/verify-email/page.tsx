"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  RefreshCw,
  Mail,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { resendVerificationOtp, verifyEmailOtp } from "@/lib/api-client";
import { motion } from "framer-motion";

type FieldErrors = Partial<Record<string, string>>;

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

function extractTokenFromVerifyResponse(response: unknown): string | null {
  if (!response || typeof response !== "object") {
    return null;
  }

  const payload = response as Record<string, unknown>;
  const directToken = payload.token;
  if (typeof directToken === "string" && directToken.length > 0) {
    return directToken;
  }

  const data = payload.data;
  if (data && typeof data === "object") {
    const nestedToken = (data as Record<string, unknown>).token;
    if (typeof nestedToken === "string" && nestedToken.length > 0) {
      return nestedToken;
    }
  }

  return null;
}

/* ═══════════════════════════════════════════════════════════════
   VERIFY EMAIL PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Show success message on initial load
  useEffect(() => {
    const timerId = setTimeout(() => {
      setSuccessMessage("Verification code sent to your email!");
    }, 0);
    const timeout = setTimeout(() => setSuccessMessage(""), 5000);
    return () => {
      clearTimeout(timerId);
      clearTimeout(timeout);
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  function updateOtp(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;

    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (errors.otp) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.otp;
        return copy;
      });
    }

    // Move forward
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    // Move backwards on delete
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const next = pasted.split("");
    while (next.length < 6) next.push("");

    setOtp(next);

    if (errors.otp) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.otp;
        return copy;
      });
    }

    const lastIndex = Math.min(pasted.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setErrors({});
    setServerError("");

    const code = otp.join("");

    if (code.length !== 6) {
      setErrors({
        otp: "Please enter the complete 6-digit verification code.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await verifyEmailOtp({
        email,
        otp: code,
      });

      if (response.success) {
        const token = extractTokenFromVerifyResponse(response);

        if (token) {
          localStorage.setItem("authToken", token);
          document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
          router.replace("/product/onboarding/welcome");
          return;
        }

        router.replace("/auth/login?redirect=%2Fproduct%2Fonboarding%2Fwelcome");
      } else {
        setServerError(response.error || "Invalid verification code.");
      }
    } catch (err: any) {
      console.error("[verify-email] verification failed", err);
      setServerError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResendCode() {
    if (timer > 0) return;

    setResending(true);
    setServerError("");
    setSuccessMessage("");

    try {
      const response = await resendVerificationOtp(email);

      if (!response.success) {
        throw new Error(response.error || "Could not resend verification code.");
      }

      setSuccessMessage("Verification code sent to your email!");
      setTimer(60);

      const timeout = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timeout);
    } catch (err: any) {
      console.error("[verify-email] resend failed", err);
      setServerError(err.message || "Could not resend verification code.");
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
              Confirm your
            </span>
            <span className="block font-serif text-[42px] xl:text-[46px] font-normal text-black leading-[1.08] tracking-tight">
              email <span className="text-[#1b3d18]">address.</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[13px] text-[#1b3d18]/75 leading-relaxed max-w-[310px] mb-8 pr-3">
            We just need to verify your email to secure your account and personalize your financial copilot.
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
            Verify your <span className="text-[#1b3d18]">email.</span>
          </h1>
          <p className="text-xs text-[#1b3d18]/70 mt-1">
            We sent a 6-digit verification code to{" "}
            <span className="font-semibold text-[#1b3d18]">
              {email || "your email"}
            </span>.
          </p>
        </div>

        {/* White form card with smooth fade-in reveal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[420px] bg-white rounded-2xl sm:rounded-3xl border border-[#e5e2db] shadow-sm px-6 sm:px-8 py-7 sm:py-8"
        >
          {/* Back link */}
          <div className="mb-4">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-[#1b3d18]/70 hover:text-[#1b3d18] transition-colors"
            >
              <ArrowLeft size={13} />
              Back
            </Link>
          </div>

          {/* Card heading */}
          <div className="mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#1b3d18]/8 border border-[#1b3d18]/12 flex items-center justify-center mb-3">
              <Mail size={18} className="text-[#1b3d18]" strokeWidth={2} />
            </div>
            <h2 className="font-serif text-[22px] sm:text-[24px] font-bold text-[#1b3d18] tracking-tight leading-tight">
              Verify your email
            </h2>
            <p className="text-[12px] sm:text-[12.5px] text-[#1b3d18]/65 mt-1.5 leading-relaxed">
              We sent a 6-digit verification code to{" "}
              <span className="font-semibold text-[#1b3d18] break-all">
                {email || "your email"}
              </span>
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
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-2">
              <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[#1b3d18] mb-2">
                VERIFICATION CODE
              </label>

              <div className="flex items-center justify-between gap-1.5 sm:gap-2 w-full">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => updateOtp(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    aria-label={`Digit ${index + 1}`}
                    className={cn(
                      "h-12 w-full min-w-0 rounded-xl border bg-white text-center text-lg font-bold text-[#1b3d18] outline-none transition-all",
                      errors.otp
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                        : "border-[#d9d6cf] focus:border-[#1b3d18] focus:ring-1 focus:ring-[#1b3d18] hover:border-[#1b3d18]/50"
                    )}
                  />
                ))}
              </div>

              {errors.otp && (
                <p className="mt-2 text-[10.5px] text-red-500">{errors.otp}</p>
              )}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full rounded-xl bg-[#1b3d18] hover:bg-[#254F22] text-white font-semibold py-3 px-4 text-[13px] transition-all hover:shadow-md active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 mt-5",
                "disabled:opacity-60 disabled:cursor-not-allowed"
              )}
            >
              {loading ? (
                <span className="inline-flex items-center justify-center gap-2 text-[12.5px]">
                  <Loader2 size={15} className="animate-spin" /> Verifying code…
                </span>
              ) : (
                "Verify Email"
              )}
            </button>
          </form>

          {/* Resend Box */}
          <div className="mt-5 rounded-xl border border-[#e5e2db] bg-[#FBF9F5] p-3.5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11.5px] font-semibold text-[#1b3d18]">
                Didn&apos;t receive the code?
              </p>
              <p className="text-[10.5px] text-[#1b3d18]/60 mt-0.5">
                Check spam or request a new code.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResendCode}
              disabled={timer > 0 || resending}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11.5px] font-semibold transition-all flex-shrink-0 cursor-pointer",
                timer > 0 || resending
                  ? "bg-[#1b3d18]/8 text-[#1b3d18]/40 cursor-not-allowed"
                  : "bg-[#1b3d18] text-white hover:bg-[#254F22] active:scale-[0.98]"
              )}
            >
              {resending ? (
                <>
                  <Loader2 size={12} className="animate-spin" /> Sending…
                </>
              ) : timer > 0 ? (
                <>
                  <RefreshCw size={12} className="opacity-60" /> {timer}s
                </>
              ) : (
                <>
                  <RefreshCw size={12} /> Resend
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-[11.5px] text-[#1b3d18]/60 mt-5 pt-4 border-t border-[#1b3d18]/10">
            Entered the wrong email?{" "}
            <Link
              href="/auth/signup"
              className="font-bold text-[#1b3d18] hover:underline transition-colors"
            >
              Change email
            </Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}