// components/pricing/TrialStepsSection.tsx
import { Rocket, TrendingUp, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    number: "01",
    Icon: Rocket,
    title: "Start free",
    description: "Sign up in less than a minute and get full access to all features.",
  },
  {
    number: "02",
    Icon: TrendingUp,
    title: "Explore & track",
    description: "Track expenses, set goals, and let Budgexa do the rest.",
  },
  {
    number: "03",
    Icon: ShieldCheck,
    title: "Choose your plan",
    description: "After 30 days, continue with the plan that works for you. Cancel anytime.",
  },
];

export default function TrialStepsSection() {
  return (
    <section className="border-b border-Budgexa-beige-dark bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-black text-Budgexa-green sm:text-4xl">
          How your free trial works
        </h2>
        <p className="mt-2 text-sm text-Budgexa-green/60">
          Full access from day one. No surprises when it ends.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 border-t border-Budgexa-beige-dark sm:grid-cols-3">
        {STEPS.map(({ number, Icon, title, description }, i) => (
          <div
            key={title}
            className={`border-b border-Budgexa-beige-dark p-8 sm:border-b-0 ${
              i < STEPS.length - 1 ? "sm:border-r" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-Budgexa-orange/15">
                <Icon size={18} className="text-Budgexa-orange" />
              </span>
              <span className="font-display text-2xl font-black text-Budgexa-green/15">
                {number}
              </span>
            </div>
            <h3 className="mt-5 text-sm font-bold text-Budgexa-green">{title}</h3>
            <p className="mt-1.5 max-w-[240px] text-xs leading-relaxed text-Budgexa-green/60">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}