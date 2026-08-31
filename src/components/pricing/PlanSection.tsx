// components/pricing/PricingPlanSection.tsx
"use client";

import { useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import BillingToggle from "./BillingToggle";

const FEATURES = [
  "Unlimited expense tracking",
  "Unlimited savings goals",
  "AI spending pattern detection",
  "Predict future cash shortages",
  "AI savings recommendations",
  "Automatic transaction categorization",
  "Data export (CSV, PDF)",
  "Priority support",
];

const MONTHLY_PRICE = 3500;
const YEARLY_MONTHLY_EQUIVALENT = Math.round(MONTHLY_PRICE * 0.8); // 20% off — confirm real annual price

export default function PricingPlanSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const price = billing === "monthly" ? MONTHLY_PRICE : YEARLY_MONTHLY_EQUIVALENT;

  return (
    <section className="border-b border-Budgexa-beige-dark bg-Budgexa-beige-light py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-Budgexa-orange">
          Simple Pricing
        </span>
        <h2 className="mt-3 font-display text-4xl font-black leading-tight text-Budgexa-green sm:text-5xl">
          Free 30-day trial.
          <br />
          Then{" "}
          <span className="text-transparent [-webkit-text-stroke:1px_#254F22]">choose</span> your
          plan.
        </h2>

        <div className="mt-8 flex justify-center">
          <BillingToggle billing={billing} onChange={setBilling} />
        </div>

        <p className="mt-3 text-xs text-Budgexa-green/50">
          Prices shown in NGN. Prices apply after your 30-day free trial.
        </p>
      </div>

      {/* Plan panel — bordered grid, no card shadow */}
      <div className="mx-auto mt-12 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 border border-Budgexa-beige-dark bg-white sm:grid-cols-2">
          <div className="p-8 sm:p-10">
            <h3 className="font-display text-xl font-bold text-Budgexa-green">Budgexa</h3>
            <p className="mt-2 text-sm leading-relaxed text-Budgexa-green/60">
              Everything you need to take control of your money and build better financial
              habits.
            </p>

            <p className="mt-6 font-display text-5xl font-black text-Budgexa-green">
              ₦{price.toLocaleString()}
              <span className="text-base font-medium text-Budgexa-green/50">/mo</span>
            </p>

            <p className="mt-3 text-xs leading-relaxed text-Budgexa-green/50">
              Free for the first 30 days. Cancel anytime before your trial ends and you won&apos;t
              be charged.
            </p>

            <a
              href="/waitlist"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-Budgexa-orange px-6 py-3.5 text-sm font-bold text-Budgexa-green sm:w-auto"
            >
              Start 30-Day Free Trial
            </a>
            <p className="mt-3 flex items-center gap-1.5 text-[11px] text-Budgexa-green/50">
              <Clock size={12} /> No card required
            </p>
          </div>

          <div className="border-t border-Budgexa-beige-dark p-8 sm:border-l sm:border-t-0 sm:p-10">
            <ul className="space-y-3">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm text-Budgexa-green">
                  <CheckCircle2 size={16} className="shrink-0 text-Budgexa-orange" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}