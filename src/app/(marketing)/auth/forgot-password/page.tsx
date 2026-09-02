"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { requestPasswordReset, resendResetPassword } from "@/lib/api-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const response = await requestPasswordReset(email);

      if (!response.success) {
        setServerError(response.error || "Could not send reset link.");
        return;
      }

      setSuccessMessage(response.message || "Reset link sent. Check your email.");
    } catch (error: any) {
      setServerError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setServerError("");
    setSuccessMessage("");
    setResending(true);

    try {
      const response = await resendResetPassword(email);

      if (!response.success) {
        setServerError(response.error || "Could not resend reset link.");
        return;
      }

      setSuccessMessage(response.message || "Reset link resent. Check your email.");
    } catch (error: any) {
      setServerError(error.message || "Could not resend reset link.");
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl bg-white border border-Budgexa-beige-dark shadow-card-lg p-8">
        <h1 className="font-display font-bold text-3xl text-Budgexa-green mb-1">Reset your password</h1>
        <p className="text-sm text-Budgexa-green/60 mb-8">Enter your email and we’ll send a reset link.</p>

        {serverError && (
          <div className="mb-5 rounded-xl bg-Budgexa-alert/10 border border-Budgexa-alert/20 px-4 py-3 text-sm text-Budgexa-alert">
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
            <label htmlFor="email" className="block text-sm font-semibold text-Budgexa-green mb-1.5">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="adaeze@example.com"
              className="w-full rounded-xl border border-Budgexa-beige-dark bg-white px-4 py-3 text-sm text-Budgexa-green placeholder:text-Budgexa-green/30 transition-all outline-none focus:ring-2 focus:ring-Budgexa-green/30 focus:border-Budgexa-green"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base disabled:opacity-60">
            {loading ? (<><Loader2 size={16} className="animate-spin" /> Sending…</>) : ("Send reset link")}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <Link href="/auth/login" className="font-semibold text-Budgexa-green hover:text-Budgexa-orange">Back to login</Link>
          <button onClick={handleResend} disabled={resending || !email} className="font-semibold text-Budgexa-green hover:text-Budgexa-orange disabled:opacity-50">
            {resending ? "Resending…" : "Resend link"}
          </button>
        </div>
      </div>
    </div>
  );
}