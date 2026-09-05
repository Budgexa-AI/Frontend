// components/pricing/PricingCTASection.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PricingCTASection() {
  return (
    <section className="border-t border-[#e5e2db] bg-[#F7F5EE] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-black mb-2">
              Take control of <span className="text-[#1b3d18]">your money.</span>
            </h3>
            <p className="max-w-md text-xs sm:text-sm text-[#1b3d18]/70 leading-relaxed">
              Start your 30-day free trial today. Full access to AI insights, no credit card required.
            </p>
          </div>
          <Link
            href="/auth/signup"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#F5824A] hover:bg-[#e06d34] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start Free Trial</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}