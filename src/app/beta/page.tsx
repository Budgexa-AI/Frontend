<<<<<<< HEAD
"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { validateBetaToken } from "@/lib/data-service";

function MetricSkeletonCard() {
  return (
    <div className="animate-pulse rounded-[28px] border border-Budgexa-green/5 bg-white/20 p-5 shadow-sm">
      <div className="h-11 w-11 rounded-2xl bg-Budgexa-beige" />
      <div className="mt-5 h-3 w-24 rounded bg-Budgexa-beige" />
      <div className="mt-2 h-8 w-32 rounded bg-Budgexa-beige" />
      <div className="mt-4 h-6 w-20 rounded-full bg-Budgexa-beige" />
    </div>
  );
}

function BetaGateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"checking" | "invalid">("checking");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("invalid");
      return;
    }

    validateBetaToken(token)
      .then(() => {
        // Not dashboard or onboarding directly — we don't know yet
        // whether this person already has an account. Login handles
        // both: existing testers sign in and land on their real
        // dashboard, new testers click through to signup, which is
        // where onboarding (currency selection, etc.) actually lives.
        router.push("/auth/login");
      })
      .catch(() => {
        setStatus("invalid");
      });
  }, [searchParams, router]);

  if (status === "invalid") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-Budgexa-beige px-4">
        <div className="max-w-sm text-center">
          <h1 className="font-heading text-xl text-Budgexa-deep-green mb-2">
            This link isn't working
          </h1>
          <p className="text-sm text-Budgexa-deep-green/80">
            Your invite link may have expired or been used already. Reach out to us directly
            and we'll sort you out.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-Budgexa-beige">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* HEADER skeleton */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="animate-pulse space-y-2">
            <div className="h-3 w-28 rounded bg-Budgexa-green/10" />
            <div className="h-8 w-64 rounded bg-Budgexa-green/10" />
          </div>
        </div>

        {/* AI HERO skeleton */}
        <section className="relative overflow-hidden rounded-[32px] bg-white/20 p-6 md:p-8 animate-pulse">
          <div className="h-8 w-40 rounded-full bg-white/10" />
          <div className="mt-5 h-8 w-2/3 max-w-md rounded bg-white/15" />
          <div className="mt-4 h-4 w-1/2 max-w-sm rounded bg-white/10" />
        </section>

        {/* METRICS skeleton — same shape as the real dashboard's 4-up grid */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 pt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <MetricSkeletonCard key={i} />
          ))}
        </section>

        <p className="mt-6 text-center text-sm text-Budgexa-green/50">
          Checking your invite...
        </p>
      </div>
    </main>
  );
}

export default function BetaGatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-Budgexa-beige">Checking invite...</div>}>
      <BetaGateContent />
    </Suspense>
  );
}
=======
// File location: app/beta/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { validateBetaToken } from "@/lib/data-service";

function MetricSkeletonCard() {
  return (
    <div className="animate-pulse rounded-[28px] border border-Budgexa-green/5 bg-white/20 p-5 shadow-sm">
      <div className="h-11 w-11 rounded-2xl bg-Budgexa-beige" />
      <div className="mt-5 h-3 w-24 rounded bg-Budgexa-beige" />
      <div className="mt-2 h-8 w-32 rounded bg-Budgexa-beige" />
      <div className="mt-4 h-6 w-20 rounded-full bg-Budgexa-beige" />
    </div>
  );
}

function BetaGateBody() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"checking" | "invalid">("checking");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setTimeout(() => {
        setStatus("invalid");
      }, 0);
      return;
    }

    validateBetaToken(token)
      .then(() => {
        // Not dashboard or onboarding directly — we don't know yet
        // whether this person already has an account. Login handles
        // both: existing testers sign in and land on their real
        // dashboard, new testers click through to signup, which is
        // where onboarding (currency selection, etc.) actually lives.
        router.push("/auth/login");
      })
      .catch(() => {
        setStatus("invalid");
      });
  }, [searchParams, router]);

  if (status === "invalid") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-Budgexa-beige px-4">
        <div className="max-w-sm text-center">
          <h1 className="font-heading text-xl text-Budgexa-deep-green mb-2">
            This link isn't working
          </h1>
          <p className="text-sm text-Budgexa-deep-green/80">
            Your invite link may have expired or been used already. Reach out to us directly
            and we'll sort you out.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-Budgexa-beige">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        {/* HEADER skeleton */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="animate-pulse space-y-2">
            <div className="h-3 w-28 rounded bg-Budgexa-green/10" />
            <div className="h-8 w-64 rounded bg-Budgexa-green/10" />
          </div>
        </div>

        {/* AI HERO skeleton */}
        <section className="relative overflow-hidden rounded-[32px] bg-white/20 p-6 md:p-8 animate-pulse">
          <div className="h-8 w-40 rounded-full bg-white/10" />
          <div className="mt-5 h-8 w-2/3 max-w-md rounded bg-white/15" />
          <div className="mt-4 h-4 w-1/2 max-w-sm rounded bg-white/10" />
        </section>

        {/* METRICS skeleton — same shape as the real dashboard's 4-up grid */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 pt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <MetricSkeletonCard key={i} />
          ))}
        </section>

        <p className="mt-6 text-center text-sm text-Budgexa-green/50">
          Checking your invite...
        </p>
      </div>
    </main>
  );
}

export default function BetaGatePage() {
  return (
    <Suspense fallback={<BetaGateFallback />}>
      <BetaGateBody />
    </Suspense>
  );
}

function BetaGateFallback() {
  return (
    <main className="min-h-screen bg-Budgexa-beige">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 pt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <MetricSkeletonCard key={i} />
          ))}
        </section>
      </div>
    </main>
  );
}
>>>>>>> origin/feat/receipt
