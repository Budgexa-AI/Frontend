import Link from "next/link";
import { ArrowRight, Play, TrendingUp, Shield, Zap } from "lucide-react";
import ChatMockCard from "./ChatMockCard";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-grain">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245,130,74,0.20) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-12 w-72 h-72 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245,130,74,0.20) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — copy */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-Budgexa-orange/30 bg-Budgexa-orange/10 px-4 py-1.5 mb-6 animate-fade-in">
              <span className="h-2 w-2 rounded-full bg-Budgexa-orange animate-pulse2" />
              <span className="text-xs font-semibold text-Budgexa-orange tracking-wide uppercase">
                {/* Now available for early access */}
                Now accepting signups for early access
              </span>
            </div>

            <h1
              className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-Budgexa-green leading-[1.05] mb-6 animate-slide-up"
            >
              Your AI
              <br />
              <span className="text-Budgexa-orange">Financial</span>
              <br />
              Copilot
            </h1>

            <p className="text-Budgexa-green/70 text-lg leading-relaxed mb-8 max-w-lg animate-slide-up-delay">
              All your money in one place, powered by AI.
              Budgexa helps you budget smarter, save automatically, and track spending confidently.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10 animate-slide-up-slow">
              <Link href="/auth/signup" className="btn-primary text-base px-8 py-3.5 group">
                See Demo
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <button className="btn-secondary text-base px-8 py-3.5 gap-2">
                <Play size={15} className="fill-Budgexa-green" />
                See Demo
              </button>
            </div>

            {/* Trust signals */}
            {/* <div className="flex flex-wrap items-center gap-6 animate-fade-in">
              <div className="flex -space-x-2">
                {["SJ", "MT", "ER"].map((initials) => (
                  <span
                    key={initials}
                    className="h-8 w-8 rounded-full border-2 border-Budgexa-beige bg-Budgexa-green/20 flex items-center justify-center text-xs font-bold text-Budgexa-green"
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <p className="text-sm text-Budgexa-green/60">
                Trusted by{" "}
                <span className="font-semibold text-Budgexa-green">10,000+</span>{" "}
                Gen Z savers
              </p>
            </div> */}

            {/* Micro-stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              {[
                { icon: Shield, label: "Bank-level encryption" },
                { icon: TrendingUp, label: "4.5% APY on savings" },
                { icon: Zap, label: "Auto-save in seconds" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-xs text-Budgexa-green/60"
                >
                  <Icon size={14} className="text-Budgexa-orange" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — chat card */}
          <div className="flex justify-center lg:justify-end animate-float">
            <ChatMockCard />
          </div>
        </div>
      </div>
    </section>
  );
}
