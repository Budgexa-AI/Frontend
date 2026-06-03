import type { FC } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const CtaSection: FC = () => (
  <section className="bg-rayo-green px-6 py-16 text-center">
    <h2 className="font-display text-[clamp(32px,5vw,52px)] font-black text-white leading-[1.1] mb-4">
      Ready to automate your wealth?
    </h2>
    <p className="text-white/60 text-[15px] max-w-[420px] mx-auto mb-10">
      Join thousands of users who have stopped stressing about savings and
      started growing their net worth automatically.
    </p>

    <div className="flex items-center justify-center gap-4 flex-wrap">
      <Link
        href="/dashboard"
        className="btn-secondary text-base px-9 py-4 text-rayo-green hover:text-white no-underline"
        target="_blank"
      >
        Start Rayo Free
        <ArrowRight className="w-4 h-4" />
      </Link>
      <button className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 rounded-3xl px-8 py-4 text-base font-semibold transition-all duration-200">
        View Demo
      </button>
    </div>

    <p className="text-white/30 text-xs mt-6">
      No credit card required for 30-day trial.
    </p>
  </section>
);