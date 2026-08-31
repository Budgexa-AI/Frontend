// components/landing/PhoneMockCard.tsx
import { TrendingUp } from "lucide-react";

export default function PhoneMockCard() {
  return (
    <div className="relative min-h-[560px] w-full max-w-sm">
      {/* Floating savings stat */}
      <div className="absolute -top-2 right-2 z-20 -rotate-3 rounded-2xl bg-white px-4 py-3 shadow-card-lg">
        <p className="text-[9px] font-semibold uppercase tracking-wide text-Budgexa-text-muted">
          Savings growth
        </p>
        <p className="mt-0.5 flex items-center gap-1 text-lg font-bold text-Budgexa-orange">
          <TrendingUp size={14} /> +24%
        </p>
      </div>

      {/* Phone */}
      <div className="relative z-10 mx-auto w-[290px] rotate-3 rounded-[34px] bg-[#d8d6ca] p-2.5 shadow-card-lg">
        <div className="rounded-[27px] bg-white p-4 text-Budgexa-green">
          <div className="flex justify-between text-[10px] text-Budgexa-green/50">
            <span>9:41</span>
            <span>Today</span>
          </div>
          <p className="mt-5 text-xs text-Budgexa-text-muted">Financial overview</p>
          <p className="font-display text-4xl font-black leading-none">₦18,200</p>
          <p className="mt-1.5 text-[10px] text-Budgexa-text-muted">Safe-to-spend balance</p>

          <div className="mt-4 rounded-2xl bg-Budgexa-beige px-3 py-2.5 text-[11px] leading-relaxed text-Budgexa-green/80">
            Morning, Ade! Based on your goals, you can safely spend <b className="text-Budgexa-orange">₦4,500</b> today.
          </div>
          <div className="ml-8 mt-2 rounded-2xl bg-Budgexa-green px-3 py-2.5 text-[11px] leading-relaxed text-white">
            Nice. How much can I spend without messing up my savings?
          </div>

          <div className="mt-3 space-y-1.5">
            {[
              ["Food spending", "↑ 18%"],
              ["Safe-to-spend", "₦4,500"],
              ["Savings goal", "72%"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between rounded-xl bg-Budgexa-muted px-3 py-2 text-[10px]">
                <span className="text-Budgexa-text-muted">{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-2xl bg-Budgexa-green px-3 py-2.5 text-[10px] leading-relaxed text-white/80">
            <b className="text-Budgexa-orange">AI summary</b>
            <br />
            You&apos;re spending more on dining this week, but still on track for your savings goal.
          </div>
        </div>
      </div>

      {/* Floating month-saved card */}
      <div className="absolute bottom-8 -left-2 z-20 -rotate-6 rounded-2xl bg-Budgexa-orange px-4 py-3.5 text-Budgexa-green shadow-card-lg">
        <p className="font-display text-2xl font-black leading-none">₦7,000</p>
        <p className="mt-1 text-[9px] font-semibold uppercase tracking-wide">Saved this month</p>
      </div>
    </div>
  );
}