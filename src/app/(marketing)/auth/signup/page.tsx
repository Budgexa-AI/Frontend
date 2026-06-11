"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, Check, X } from "lucide-react";
import { signUp, signInWithGoogle } from "@/lib/api-client";
import { signUpSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";
import type { ZodError } from "zod";

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

function InputField({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  suffix,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  suffix?: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-rayo-green mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border bg-white px-4 py-3 text-sm text-rayo-green placeholder:text-rayo-green/30",
            "transition-all outline-none focus:ring-2 focus:ring-rayo-green/30",
            error ? "border-rayo-alert" : "border-rayo-beige-dark focus:border-rayo-green",
            suffix && "pr-11"
          )}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</div>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-rayo-alert">{error}</p>}
    </div>
  );
}

function PasswordRequirements({ password }: { password: string }) {
  const requirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "At least one uppercase letter", met: /[A-Z]/.test(password) },
    { label: "At least one number", met: /[0-9]/.test(password) },
  ];

  const allMet = requirements.every((r) => r.met);

  return (
    <div className={cn(
      "mt-2.5 rounded-xl border p-3 space-y-2",
      allMet ? "bg-rayo-green/5 border-rayo-green/20" : "bg-rayo-alert/5 border-rayo-alert/20"
    )}>
      <p className="text-xs font-medium text-rayo-green/70 mb-2">Password requirements:</p>
      {requirements.map((req) => (
        <div key={req.label} className="flex items-center gap-2">
          {req.met ? (
            <Check size={14} className="text-rayo-green flex-shrink-0" />
          ) : (
            <X size={14} className="text-rayo-alert flex-shrink-0" />
          )}
          <span className={cn(
            "text-xs",
            req.met ? "text-rayo-green" : "text-rayo-alert"
          )}>
            {req.label}
          </span>
        </div>
      ))}
    </div>
  );
}

type FieldErrors = Partial<Record<string, string>>;

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const set = (key: keyof typeof form) => (val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  // Handle OAuth callback: token or error returned via URL params
  // Handle OAuth callback: token or error returned via URL params
useEffect(() => {
  const token = searchParams.get("token");
  const oauthError = searchParams.get("error");

  if (token) {
    localStorage.setItem("authToken", token); // ← store it
    router.replace("/product/onboarding/welcome");
  }

  if (oauthError) {
    const messages: Record<string, string> = {
      oauth_cancelled: "Google sign-up was cancelled.",
      oauth_failed: "Google sign-up failed. Please try again.",
    };
    setServerError(messages[oauthError] ?? "An error occurred during Google sign-up.");
  }
}, [searchParams, router]);

function handleGoogleSignUp() {
  setGoogleLoading(true);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const onboardUrl = `${origin}/product/onboarding/welcome`;
  const signupUrl  = `${origin}/auth/signup`;

  signInWithGoogle(onboardUrl, signupUrl);
}

  function shouldGoToVerifyEmail(response: Awaited<ReturnType<typeof signUp>>): boolean {
    const message = `${response.error || ""} ${(response.details && typeof response.details === "object" ? JSON.stringify(response.details) : "")}`.toLowerCase();

    return (
      response.success ||
      message.includes("verify") ||
      message.includes("verified") ||
      message.includes("unverified") ||
      message.includes("email verification") ||
      message.includes("confirmation")
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError("");
    setLoading(true);

    const parsed = signUpSchema.safeParse(form);
    console.log("[signup page] form submitted", { form, parsed });
    if (!parsed.success) {
      const fe: FieldErrors = {};
      parsed.error.issues.forEach((err) => {
        if (err.path[0]) fe[err.path[0] as string] = err.message;
      });
      console.warn("[signup page] validation failed", {
        errors: parsed.error.issues.map((i) => ({ field: i.path[0], message: i.message })),
      });
      setErrors(fe);
      setLoading(false);
      return;
    }

    try {
      console.info("[signup page] submitting signup request", {
        email: parsed.data.email,
        fullName: parsed.data.fullName,
      });

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
        console.error("[signup page] signup returned backend error", {
          response,
        });
        setServerError(response.error || "Sign up failed. Please try again.");
      }
    } catch (err: any) {
      console.error("[signup page] signup threw an error", err);
      setServerError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl bg-white border border-rayo-beige-dark shadow-card-lg p-8">
        <h1 className="font-display font-bold text-3xl text-rayo-green mb-1">
          Create your account
        </h1>
        <p className="text-sm text-rayo-green/60 mb-8">
          Join 1,000+ smart savers. It&apos;s free.
        </p>

        {serverError && (
          <div className="mb-5 rounded-xl bg-rayo-alert/10 border border-rayo-alert/20 px-4 py-3 text-sm text-rayo-alert">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <InputField
            label="Full Name"
            id="fullName"
            value={form.fullName}
            onChange={set("fullName")}
            placeholder="Adaeze Okafor"
            error={errors.fullName}
          />
          <InputField
            label="Email address"
            id="email"
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="adaeze@example.com"
            error={errors.email}
          />
          <InputField
            label="Password"
            id="password"
            type={showPwd ? "text" : "password"}
            value={form.password}
            onChange={set("password")}
            placeholder="Min. 8 characters"
            error={errors.password}
            suffix={
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="text-rayo-green/40 hover:text-rayo-green transition-colors"
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
          {form.password && !errors.password && <PasswordRequirements password={form.password} />}
          <InputField
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={set("confirmPassword")}
            placeholder="Repeat password"
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            disabled={loading || googleLoading}
            className={cn(
              "btn-primary w-full py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed",
              Object.keys(errors).length > 0 && "ring-2 ring-rayo-alert"
            )}
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Creating account…</>
            ) : (
              "Create account →"
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
            onClick={handleGoogleSignUp}
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
              <><GoogleIcon /> Sign up with Google</>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-rayo-green/60">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-rayo-green hover:text-rayo-orange transition-colors"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}