"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, RefreshCw, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { resendVerificationOtp, verifyEmailOtp } from "@/lib/api-client";

type FieldErrors = Partial<Record<string, string>>;

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
    setSuccessMessage("Verification code sent to your email!");
    const timeout = setTimeout(() => setSuccessMessage(""), 5000);
    return () => clearTimeout(timeout);
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
        otp: "Please enter the 6-digit verification code.",
      });
      return;
    }

    setLoading(true);

    try {
      console.log("[verify-email] verifying otp", {
        email,
        code,
      });

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

      setServerError(
        err.message || "Something went wrong. Please try again."
      );
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
      console.log("[verify-email] resending otp", { email });

      const response = await resendVerificationOtp(email);

      if (!response.success) {
        throw new Error(response.error || "Could not resend verification code.");
      }

      setSuccessMessage("Verification code sent to your email!");
      setTimer(60);
      
      // Auto-hide success message after 5 seconds
      const timeout = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timeout);
    } catch (err: any) {
      console.error("[verify-email] resend failed", err);

      setServerError(
        err.message || "Could not resend verification code."
      );
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl border border-Budgexa-beige-dark bg-white shadow-card-lg p-8">
        {/* Back */}
        <Link
          href="/auth/signup"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-Budgexa-green/60 transition-colors hover:text-Budgexa-green"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-Budgexa-orange/10">
            <div className="h-3 w-3 rounded-full bg-Budgexa-orange animate-pulse" />
          </div>

          <h1 className="font-display text-3xl font-bold text-Budgexa-green mb-2">
            Verify your email
          </h1>

          <p className="text-sm leading-relaxed text-Budgexa-green/60">
            We sent a 6-digit verification code to{" "}
            <span className="font-semibold text-Budgexa-green">
              {email || "your email"}
            </span>
          </p>
        </div>

        {/* Error */}
        {serverError && (
          <div className="mb-5 rounded-xl border border-Budgexa-alert/20 bg-Budgexa-alert/10 px-4 py-3 text-sm text-Budgexa-alert">
            {serverError}
          </div>
        )}

        {/* Success */}
        {successMessage && (
          <div className="mb-5 rounded-xl border border-Budgexa-green/20 bg-Budgexa-green/5 px-4 py-3 text-sm text-Budgexa-green flex items-center gap-2">
            <Check size={16} className="flex-shrink-0" />
            {successMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* OTP Inputs */}
          <div className="mb-3">
            <label className="mb-3 block text-sm font-semibold text-Budgexa-green">
              Verification code
            </label>

            <div className="flex items-center justify-between gap-1.5 w-full">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => updateOtp(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className={cn(
                    "h-12 w-full min-w-0 rounded-2xl border bg-white text-center text-lg font-semibold text-Budgexa-green outline-none transition-all",
                    "focus:ring-2 focus:ring-Budgexa-green/20",
                    errors.otp
                      ? "border-Budgexa-alert"
                      : "border-Budgexa-beige-dark focus:border-Budgexa-green"
                  )}
                />
              ))}
            </div>

            {errors.otp && (
              <p className="mt-2 text-xs text-Budgexa-alert">
                {errors.otp}
              </p>
            )}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-6 w-full py-3.5 text-base disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Verifying…
              </>
            ) : (
              "Verify email →"
            )}
          </button>
        </form>

        {/* Resend */}
        <div className="mt-6 rounded-2xl border border-Budgexa-beige-dark bg-Budgexa-beige-light/40 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-Budgexa-green">
                Didn’t receive the code?
              </p>

              <p className="mt-1 text-xs leading-relaxed text-Budgexa-green/60">
                Check your spam folder or resend the verification code.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResendCode}
              disabled={timer > 0 || resending}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all",
                timer > 0 || resending
                  ? "cursor-not-allowed bg-Budgexa-beige-dark/50 text-Budgexa-green/40"
                  : "bg-Budgexa-green text-white hover:opacity-90"
              )}
            >
              {resending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  <RefreshCw size={14} />
                  {timer > 0 ? `${timer}s` : "Resend"}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-Budgexa-green/60">
          Wrong email?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-Budgexa-green transition-colors hover:text-Budgexa-orange"
          >
            Go back
          </Link>
        </p>
      </div>
    </div>
  );
}