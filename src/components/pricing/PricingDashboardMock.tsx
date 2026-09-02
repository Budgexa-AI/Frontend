// components/pricing/PricingDashboardMock.tsx
import { X } from "lucide-react";

export default function PricingDashboardMock() {
  return (
    <div className="relative w-full max-w-sm">
      {/* Floating stat chip */}
      <div className="absolute -top-4 right-4 z-20 -rotate-3 rounded-2xl bg-white px-4 py-3 shadow-card-lg">
        <p className="text-[9px] font-semibold uppercase tracking-wide text-Budgexa-text-muted">
          Balance growth
        </p>
        <p className="mt-0.5 text-lg font-bold text-Budgexa-orange">↑ 12%</p>
      </div>

      <div className="relative z-10 rotate-2 rounded-[28px] border-2 border-Budgexa-green bg-white p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-Budgexa-green">Overview</p>
          <X size={16} className="text-Budgexa-green/40" />
        </div>

        <div className="mt-5 rounded-2xl bg-Budgexa-beige-light p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-Budgexa-text-muted">
            Total Balance
          </p>
          <p className="mt-1 font-display text-2xl font-black text-Budgexa-green">₦250,000</p>
          <svg viewBox="0 0 120 24" className="mt-2 h-6 w-full">
            <polyline
              points="0,18 15,10 30,14 45,6 60,12 75,4 90,10 105,2 120,8"
              fill="none"
              stroke="#254F22"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-[11px] text-Budgexa-text-muted">
            <span>This month · spent</span>
            <span>45% of budget</span>
          </div>
          <p className="font-display text-xl font-black text-Budgexa-green">₦120,500</p>
          <div className="h-1.5 w-full rounded-full bg-Budgexa-muted">
            <div className="h-1.5 w-[45%] rounded-full bg-Budgexa-orange" />
          </div>
        </div>
      </div>

      {/* Floating chip, bottom-left */}
      <div className="absolute -bottom-4 -left-4 z-20 rotate-6 rounded-2xl bg-Budgexa-orange px-4 py-3 text-Budgexa-green shadow-card-lg">
        <p className="font-display text-lg font-black leading-none">₦45,000 / ₦60,000</p>
        <p className="mt-1 text-[9px] font-semibold uppercase tracking-wide">Groceries budget</p>
      </div>
    </div>
  );
}