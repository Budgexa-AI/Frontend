"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { resetPassword } from "@rayo/api-client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");
    setLoading(true);

    if (!token) {
      setServerError("Missing reset token.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setServerError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await resetPassword({ token, password, confirmPassword });

      if (!response.success) {
        setServerError(response.error || "Could not reset password.");
        return;
      }

      setSuccessMessage(response.message || "Password updated successfully.");
      setTimeout(() => router.push("/auth/login"), 1200);
    } catch (error: any) {
      setServerError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl bg-white border border-rayo-beige-dark shadow-card-lg p-8">
        <h1 className="font-display font-bold text-3xl text-rayo-green mb-1">Set a new password</h1>
        <p className="text-sm text-rayo-green/60 mb-8">Use the link from your email to create a new password.</p>

        {serverError && (
          <div className="mb-5 rounded-xl bg-rayo-alert/10 border border-rayo-alert/20 px-4 py-3 text-sm text-rayo-alert">
            {serverError}
          </div>
        )}

        {successMessage && (
          <div className="mb-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-rayo-green mb-1.5">New password</label>
            <div className="relative">
              <input
                id="password"
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-rayo-beige-dark bg-white px-4 py-3 pr-11 text-sm text-rayo-green transition-all outline-none focus:ring-2 focus:ring-rayo-green/30 focus:border-rayo-green"
              />
              <button type="button" onClick={() => setShowPwd((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-rayo-green/40 hover:text-rayo-green transition-colors">
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-rayo-green mb-1.5">Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-rayo-beige-dark bg-white px-4 py-3 text-sm text-rayo-green transition-all outline-none focus:ring-2 focus:ring-rayo-green/30 focus:border-rayo-green"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base disabled:opacity-60">
            {loading ? (<><Loader2 size={16} className="animate-spin" /> Updating…</>) : ("Reset password")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-rayo-green/60">
          <Link href="/auth/login" className="font-semibold text-rayo-green hover:text-rayo-orange transition-colors">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}