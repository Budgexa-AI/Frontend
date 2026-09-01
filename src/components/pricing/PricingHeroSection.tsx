// components/pricing/PricingHeroSection.tsx
import { Lock, ShieldCheck, Users } from "lucide-react";
import PricingDashboardMock from "./PricingDashboardMock";

const BADGES = [
  { Icon: Lock, label: "Bank-level encryption" },
  { Icon: ShieldCheck, label: "Secure Paystack payments" },
  { Icon: Users, label: "Trusted by students, graduates & young professionals" },
];

export default function PricingHeroSection() {
  return (
    <section className="border-b border-Budgexa-beige-dark bg-white pb-16 pt-32 sm:pt-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[44%_56%] lg:gap-10 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-Budgexa-orange/30 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-Budgexa-orange">
            Pricing
          </span>

          <h1 className="mt-6 font-display text-5xl font-black leading-[0.95] tracking-tight text-Budgexa-green sm:text-6xl">
            Smart money
            <br />
            <span className="text-Budgexa-orange">starts with clarity.</span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-Budgexa-green/70 sm:text-base">
            Start with Budgexa free for 30 days. Cancel anytime. Then choose the plan that works
            for you.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            {BADGES.map(({ Icon, label }) => (
              <div key={label} className="flex max-w-[220px] items-start gap-2.5">
                <Icon size={14} className="mt-0.5 shrink-0 text-Budgexa-orange" />
                <span className="text-[11px] leading-snug text-Budgexa-green/60">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <PricingDashboardMock />
        </div>
      </div>
    </section>
  );
}