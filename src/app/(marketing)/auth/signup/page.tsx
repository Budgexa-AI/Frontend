"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  Loader2,
  Check,
  X,
} from "lucide-react";
import { signUp, signInWithGoogle } from "@/lib/api-client";
import { signUpSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
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
    <div
      className={cn(
        "mt-1.5 rounded-lg border p-2 space-y-1 transition-all text-left",
        allMet
          ? "bg-[#1b3d18]/5 border-[#1b3d18]/20"
          : "bg-Budgexa-alert/5 border-Budgexa-alert/20"
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
            <X size={11} className="text-Budgexa-alert stroke-[2.5] flex-shrink-0" />
          )}
          <span
            className={cn(
              "text-[11px] font-medium leading-none",
              req.met ? "text-[#1b3d18]" : "text-Budgexa-alert"
            )}
          >
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
    const signupUrl  = `${origin}/auth/signup`;

    signInWithGoogle(onboardUrl, signupUrl);
  }

  useEffect(() => {
    const token      = searchParams.get("token");
    const oauthError = searchParams.get("error");
    const isNewUser  = searchParams.get("isNewUser");
    const redirect   = searchParams.get("redirect");

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
        oauth_failed:    "Google sign-up failed. Please try again.",
      };
      setServerError(messages[oauthError] ?? "An error occurred during Google sign-up.");
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

  return (
    <main className="min-h-[100dvh] pt-16 grid grid-cols-1 lg:grid-cols-2">
      {/* ── LEFT PANEL (Warm Olive / Khaki matching Contact Page) ── */}
      <section className="bg-[#DFD7BF] px-8 sm:px-12 lg:px-14 xl:px-18 py-10 sm:py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#254F22]/10 min-h-[calc(100dvh-4rem)]">
        <div className="max-w-md">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-black text-[#1b3d18] leading-[1.1] tracking-tight mb-4">
            Your AI Financial<br />
            Copilot
          </h1>

          <p className="text-sm sm:text-base text-[#254F22]/85 leading-relaxed font-normal">
            Start your journey to better financial clarity with intelligent insights and seamless tracking.
          </p>
        </div>
      </section>

      {/* ── RIGHT PANEL (Warm Ivory Cream matching Contact Page) ── */}
      <section className="bg-[#FAF7EE] px-6 sm:px-10 lg:px-12 xl:px-16 py-8 sm:py-10 flex flex-col justify-center min-h-[calc(100dvh-4rem)]">
        <div className="max-w-sm sm:max-w-md w-full mx-auto my-auto py-2">
          {/* Heading & Subtitle */}
          <div className="mb-4 sm:mb-5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1b3d18] tracking-tight mb-1">
              Create an account
            </h2>
            <p className="text-xs sm:text-sm text-[#254F22]/70 font-normal">
              Sign up in seconds to start managing your budget.
            </p>
          </div>

          {serverError && (
            <div className="mb-4 rounded-xl bg-Budgexa-alert/10 border border-Budgexa-alert/20 px-3.5 py-2 text-xs sm:text-sm text-Budgexa-alert">
              {serverError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-2.5 sm:space-y-3">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#254F22] mb-0.5"
              >
                FULL NAME
              </label>
              <input
                id="fullName"
                type="text"
                value={form.fullName}
                onChange={(e) => set("fullName")(e.target.value)}
                placeholder="Alex Doe"
                className={cn(
                  "w-full bg-transparent border-b pb-1.5 pt-0.5 text-sm sm:text-base text-[#1b3d18] placeholder:text-[#254F22]/40 focus:outline-none transition-colors",
                  errors.fullName
                    ? "border-red-400 focus:border-red-500"
                    : "border-[#254F22]/35 focus:border-[#254F22]"
                )}
              />
              {errors.fullName && (
                <p className="mt-0.5 text-[11px] text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#254F22] mb-0.5"
              >
                EMAIL ADDRESS
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => set("email")(e.target.value)}
                placeholder="alex@example.com"
                className={cn(
                  "w-full bg-transparent border-b pb-1.5 pt-0.5 text-sm sm:text-base text-[#1b3d18] placeholder:text-[#254F22]/40 focus:outline-none transition-colors",
                  errors.email
                    ? "border-red-400 focus:border-red-500"
                    : "border-[#254F22]/35 focus:border-[#254F22]"
                )}
              />
              {errors.email && (
                <p className="mt-0.5 text-[11px] text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#254F22] mb-0.5"
              >
                PASSWORD
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => set("password")(e.target.value)}
                  placeholder="Min. 8 characters"
                  className={cn(
                    "w-full bg-transparent border-b pb-1.5 pt-0.5 text-sm sm:text-base text-[#1b3d18] placeholder:text-[#254F22]/40 focus:outline-none transition-colors pr-9",
                    errors.password
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#254F22]/35 focus:border-[#254F22]"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-0.5 top-1/2 -translate-y-1/2 text-[#254F22]/40 hover:text-[#1b3d18] transition-colors p-1"
                >
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {form.password && !errors.password && (
                <PasswordRequirements password={form.password} />
              )}
              {errors.password && (
                <p className="mt-0.5 text-[11px] text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#254F22] mb-0.5"
              >
                CONFIRM PASSWORD
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPwd ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => set("confirmPassword")(e.target.value)}
                  placeholder="Re-enter your password"
                  className={cn(
                    "w-full bg-transparent border-b pb-1.5 pt-0.5 text-sm sm:text-base text-[#1b3d18] placeholder:text-[#254F22]/40 focus:outline-none transition-colors pr-9",
                    errors.confirmPassword
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#254F22]/35 focus:border-[#254F22]"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPwd((s) => !s)}
                  className="absolute right-0.5 top-1/2 -translate-y-1/2 text-[#254F22]/40 hover:text-[#1b3d18] transition-colors p-1"
                >
                  {showConfirmPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-0.5 text-[11px] text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and Privacy Policy Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => toggleAgreeTerms(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 rounded border-[#254F22]/40 text-[#EA6A35] focus:ring-[#EA6A35] focus:ring-offset-0 transition-colors accent-[#EA6A35] cursor-pointer shrink-0"
                />
                <span className="text-[11px] sm:text-xs text-[#254F22]/85 leading-snug">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    target="_blank"
                    className="font-medium text-[#1b3d18] underline hover:text-[#EA6A35] transition-colors"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    target="_blank"
                    className="font-medium text-[#1b3d18] underline hover:text-[#EA6A35] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="mt-1 text-[11px] text-red-500">{errors.agreeTerms}</p>
              )}
            </div>

            {/* Submit & Google Buttons */}
            <div className="space-y-2.5 pt-1.5">
              <button
                type="submit"
                disabled={loading || googleLoading}
                className={cn(
                  "w-full rounded-full bg-[#EA6A35] hover:bg-[#d85e2b] text-white font-semibold py-2.5 sm:py-3 px-6 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex flex-col items-center justify-center gap-0.5",
                  "disabled:opacity-60 disabled:cursor-not-allowed"
                )}
              >
                {loading ? (
                  <span className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm py-0.5">
                    <Loader2 size={16} className="animate-spin" /> Creating account…
                  </span>
                ) : (
                  <>
                    <span className="text-xs sm:text-sm leading-tight font-semibold">Start 30-Day Free Trial</span>
                    <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-white/90 uppercase">
                      No card required
                    </span>
                  </>
                )}
              </button>

              {/* Continue with Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={loading || googleLoading}
                className={cn(
                  "w-full rounded-full border border-[#254F22]/20 bg-white/90 hover:bg-white text-[#1b3d18] font-semibold text-xs sm:text-sm py-2.5 px-5 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2",
                  "disabled:opacity-60 disabled:cursor-not-allowed"
                )}
              >
                {googleLoading ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin text-[#1b3d18]" /> Redirecting…
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

          {/* Log in footer link */}
          <p className="text-center text-[11px] sm:text-xs text-[#254F22]/70 font-normal mt-3 sm:mt-4">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-[#EA6A35] hover:underline transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}