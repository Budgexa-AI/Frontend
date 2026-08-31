import type { Metadata } from "next";
import { StepsSection } from "@/components/how-it-works/StepsSection";
import { FeatureSection } from "@/components/how-it-works/FeatureSection";
import { FaqSection } from "@/components/how-it-works/FaqSection";
import { CtaSection } from "@/components/how-it-works/CtaSection";
import { ShieldCheck, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works – Budgexa",
  description:
    "From messy finances to smart investing in four simple steps. Budgexa handles the complexity so you can enjoy the growth.",
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-Budgexa-beige text-Budgexa-text overflow-hidden">

      {/* ── HERO ── */}
      <section className="animate-fade-up-1 text-center pt-24 pb-20 px-6 max-w-[680px] mx-auto">
        <h1 className="font-display text-[clamp(40px,6vw,68px)] font-black leading-[1.08] tracking-tight text-Budgexa-green mb-6">
          Your path to{" "}
          <span className="text-Budgexa-orange">automated</span>{" "}
          wealth.
        </h1>
        <p className="text-[17px] text-Budgexa-text-muted leading-[1.65] max-w-[460px] mx-auto mb-8">
          From messy finances to smart investing in four simple steps. Budgexa
          handles the complexity so you can enjoy the growth.
        </p>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <span className="inline-flex items-center gap-2 text-sm text-Budgexa-text-muted font-medium">
            <ShieldCheck className="w-4 h-4 text-Budgexa-green" />
            Bank-level security
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-Budgexa-text-muted font-medium">
            <Lock className="w-4 h-4 text-Budgexa-green" />
            256-bit Encryption
          </span>
        </div>
      </section>

      <StepsSection />
      <FeatureSection />
      <FaqSection />
      <CtaSection />

    </main>
  );
}