import Link from "next/link";
import {
  CheckCircle2,
  TrendingUp,
  Sparkles,
  BrainCircuit,
} from "lucide-react";

const INSIGHTS = [
  {
    label: "Spending Alert",
    time: "Today",
    amount: "Food spending is up 18%",
  },
  {
    label: "Safe-to-Spend",
    time: "Yesterday",
    amount: "₦4,500 available today",
  },
  {
    label: "Savings Insight",
    time: "Tue, Oct 24",
    amount: "You stayed under budget this week",
  },
];

const BULLETS = [
  "Track spending patterns automatically",
  "Get personalized financial insights",
  "Understand what you can safely spend",
];

export default function SmartInsightsSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-rayo-green py-24 lg:py-32"
    >
      {/* Decorative Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, #F5824A 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* ── LEFT CONTENT ── */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-rayo-orange/20 bg-rayo-orange/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-rayo-orange mb-6">
              <BrainCircuit size={14} />
              AI Financial Intelligence
            </div>

            <h2 className="font-display text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl mb-6 text-balance">
              Understand your money{" "}
              <span className="text-rayo-orange">
                before you spend it.
              </span>
            </h2>

            <p className="max-w-md text-lg leading-relaxed text-white/70 mb-8">
              Rayo AI analyzes your spending habits, upcoming expenses,
              and financial goals to help you make smarter decisions
              with your money every day.
            </p>

            <ul className="space-y-4 mb-10">
              {BULLETS.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-3 text-sm font-medium text-white/90"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-rayo-orange"
                  />
                  {bullet}
                </li>
              ))}
            </ul>

            <a
              href="/auth/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 font-semibold text-rayo-green transition-all hover:bg-rayo-beige-light"
            >
              See Rayo AI in Action              
            </a>
          </div>

          {/* ── RIGHT MOCK INSIGHTS CARD ── */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm rounded-[32px] bg-rayo-muted/70 p-6 shadow-card-lg backdrop-blur">

              {/* Top Overview */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-rayo-grey">
                    Financial Overview
                  </p>

                  <p className="font-poppins text-4xl font-black leading-none text-rayo-green">
                    ₦18,200
                  </p>

                  <p className="mt-2 text-sm text-rayo-text-muted">
                    Safe-to-spend balance
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rayo-lemon/80 shrink-0">
                  <TrendingUp
                    size={18}
                    className="text-rayo-green-light"
                    strokeWidth={2.5}
                  />
                </div>
              </div>

              {/* Insights Feed */}
              <div className="space-y-3">
                {INSIGHTS.map((item, index) => {
                  const isLast = index === INSIGHTS.length - 1;

                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-between rounded-2xl bg-white px-4 py-3 transition-opacity ${
                        isLast ? "opacity-60" : "opacity-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rayo-muted shrink-0">
                          <Sparkles
                            size={14}
                            className="text-rayo-green"
                            strokeWidth={2}
                          />
                        </div>

                        <div>
                          <p className="mb-0.5 text-sm font-semibold leading-none text-rayo-green-dark">
                            {item.label}
                          </p>

                          <p className="text-xs leading-none text-rayo-text-muted">
                            {item.time}
                          </p>
                        </div>
                      </div>

                      <span className="max-w-[130px] text-right font-poppins text-xs font-bold leading-snug text-rayo-green-light">
                        {item.amount}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Bottom AI Summary */}
              <div className="mt-5 rounded-2xl bg-rayo-green px-4 py-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-rayo-orange/20 shrink-0">
                    <BrainCircuit
                      size={15}
                      className="text-rayo-orange"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-rayo-orange mb-1">
                      AI Summary
                    </p>

                    <p className="text-sm leading-relaxed text-white/80">
                      You&apos;re spending more on dining this week, but
                      you&apos;re still on track for your monthly savings
                      goal.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}