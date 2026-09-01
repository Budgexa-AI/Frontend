import { ArrowRight, Play } from "lucide-react";
import PhoneMockCard from "./MockCard";

export default function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-Budgexa-green pt-24">
      {/* Decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-24 h-[520px] w-[520px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #F5824A 0%, transparent 70%)" }}
      />

      {/* Top bar */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[44%_56%] lg:gap-10">
          {/* Copy */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-Budgexa-orange/40 px-4 py-1.5 text-Budgexa-orange">
              <span className="h-1.5 w-1.5 rounded-full bg-Budgexa-orange" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">
                Now accepting signups for early access
              </span>
            </div>

            <h1 className="font-display text-6xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl">
              Your AI
              <br />
              <span className="text-Budgexa-orange">Financial</span>
              <br />
              Copilot
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
              All your money in one place. Budgexa helps you track spending, plan your budget,
              grow your savings, and make better decisions with your money.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#waitlist"
                className="group inline-flex items-center gap-2 rounded-full bg-Budgexa-orange px-8 py-3.5 text-sm font-bold text-Budgexa-green"
              >
                Get Early Access
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-white/35 px-8 py-3.5 text-sm font-semibold text-white"
              >
                <Play size={14} className="fill-white" />
                See how it works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-[11px] text-white/55">
              {["Read-only & non-custodial", "Personalized daily insights", "Built for Nigeria"].map((label) => (
                <span key={label} className="before:mr-1.5 before:text-Budgexa-orange before:content-['•']">
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Product visual */}
          <div className="flex justify-center lg:justify-end">
            <PhoneMockCard />
          </div>
        </div>
      </div>
    </section>
  );
}