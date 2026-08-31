import type { Metadata } from "next";
import { AudienceCard } from "@/components/about/AudienceCard";
import { Badge } from "@/components/about/Badge";
import Link from "next/link";
import {
  Zap,
  GraduationCap,
  Briefcase,
  Lock,
  Check,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About – Budgexa",
  description:
    "Budgexa is an AI-powered financial assistant that helps people understand spending, build smarter habits, and make better financial decisions.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-Budgexa-beige text-Budgexa-text overflow-hidden">

      {/* ── HERO ── */}
      <section className="animate-fade-up-1 text-center pt-32 pb-24 px-6 max-w-[760px] mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-Budgexa-orange/10 text-Budgexa-orange border border-Budgexa-orange/25 rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-[0.12em] uppercase mb-7">
          <span className="w-1.5 h-1.5 bg-Budgexa-orange rounded-full" />
          Our Mission
        </div>

        <h1 className="font-display text-[clamp(44px,7vw,72px)] font-black leading-[1.02] tracking-tight text-Budgexa-green mb-7">
          Helping the{" "}
          <em className="italic underline decoration-Budgexa-orange decoration-[3px] underline-offset-[6px]">
            next generation
          </em>{" "}
          build smarter financial habits.
        </h1>

        <p className="text-[17px] text-Budgexa-text-muted leading-[1.65] mx-auto">
          Budgexa helps you understand your money with intelligent insights, spending analysis, and personalized financial guidance. We&apos;re making financial management simpler, more proactive, and easier to build habits around.
        </p>
      </section>

      <div className="max-w-[1100px] mx-auto border-t border-Budgexa-green/10" />

      {/* ── WHO IS Budgexa FOR ── */}
      <section className="animate-fade-up-2 py-28 px-6 max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-[36px] font-bold text-Budgexa-green mb-3">
            Who is Budgexa for?
          </h2>
          <p className="text-Budgexa-grey text-[15px]">
            Built for people trying to manage money more intentionally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <AudienceCard
            icon={<Zap className="w-6 h-6" />}
            title="Gen Z & Digital Natives"
            description="Built for people who expect simple, intelligent, and mobile-first financial tools."
          />
          <AudienceCard
            icon={<GraduationCap className="w-6 h-6" />}
            title="Students"
            description="Build better money habits while managing school, rent, subscriptions, and daily spending."
          />
          <AudienceCard
            icon={<Briefcase className="w-6 h-6" />}
            title="Freelancers & Creators"
            description="Designed for irregular income and unpredictable spending patterns. Stay on top of your finances with smarter insights and forecasting."
          />
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto border-t border-Budgexa-green/10" />

      {/* ── SECURITY ── */}
      <section className="animate-fade-up-3 py-12 px-6 pb-28 max-w-[820px] mx-auto">
        <div className="relative overflow-hidden bg-Budgexa-green rounded-3xl px-10 py-16 text-center">
          <div
            className="absolute -top-16 -right-16 w-[200px] h-[200px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(245,130,74,0.18) 0%, transparent 70%)" }}
          />

          <div className="w-14 h-14 bg-Budgexa-orange/20 rounded-full flex items-center justify-center text-Budgexa-orange mx-auto mb-6">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="font-display text-[32px] font-bold text-white mb-4">
            Uncompromising Security
          </h2>
          <p className="text-[15px] text-Budgexa-beige/70 leading-[1.7] max-w-[400px] mx-auto mb-8">
            Your financial data should stay private and secure. Budgexa uses modern security practices and encrypted connections to help protect your information at every step.
          </p>

          <div className="flex justify-center gap-5 flex-wrap">
            <Badge icon={<Check className="w-4 h-4" />}       label="Bank-level Encryption (AES-256)" />
            <Badge icon={<ShieldCheck className="w-4 h-4" />} label="Encrypted Data Protection" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="animate-fade-up-4 text-center px-6 pt-12 pb-16">
        <h2 className="font-display text-[40px] font-bold text-Budgexa-green tracking-tight mb-8">
          Start building smarter financial habits.
        </h2>
        <a href="/auth/signup" className="btn-accent text-base px-9 py-4">
          Get Started with Budgexa 
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>

    </main>
  );
}