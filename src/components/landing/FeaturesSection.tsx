// components/landing/FeaturesGridSection.tsx
const STEPS = [
  "01 · SMART TRACKING",
  "02 · BUDGETING",
  "03 · SAVINGS GOALS",
  "04 · PERSONALIZED INSIGHTS",
];

export default function FeaturesGridSection() {
  return (
    <section id="features" className="border-b border-Budgexa-beige-dark bg-Budgexa-beige-light">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[42%_33%_25%]">
        {/* Visual panel */}
        <div className="flex items-center justify-center border-b border-Budgexa-beige-dark p-10 lg:border-b-0 lg:border-r">
          <div className="w-[220px] -rotate-3 rounded-[28px] border-8 border-Budgexa-beige-dark bg-white p-3.5 shadow-card-lg">
            <p className="text-[9px] font-semibold text-Budgexa-text-muted">BUDGEXA · TODAY</p>
            <p className="mt-2 font-display text-3xl font-black text-Budgexa-green">₦12,000</p>
            <p className="text-[9px] text-Budgexa-text-muted">Safe-to-spend</p>
            <div className="mt-2 space-y-1.5">
              <div className="flex justify-between rounded-xl bg-Budgexa-muted px-3 py-2 text-[10px]">
                <span>Groceries</span><strong>₦3,200</strong>
              </div>
              <div className="flex justify-between rounded-xl bg-Budgexa-muted px-3 py-2 text-[10px]">
                <span>Transport</span><strong>₦1,500</strong>
              </div>
              <div className="flex justify-between rounded-xl bg-Budgexa-orange px-3 py-2 text-[10px] text-Budgexa-green">
                <span>Savings goal</span><strong>72%</strong>
              </div>
              <div className="rounded-xl bg-Budgexa-green px-3 py-2 text-[10px] text-white">
                AI: You&apos;re still on track this week.
              </div>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="border-b border-Budgexa-beige-dark p-8 lg:border-b-0 lg:border-r lg:p-10">
          <h3 className="font-display text-2xl font-bold text-Budgexa-green">
            Make an impact on your money, not just your dashboard.
          </h3>
          <p className="mt-6 text-sm leading-relaxed text-Budgexa-green/70">
            Budgexa turns raw transactions into useful decisions. Track every naira, spot
            patterns, and get personalized guidance using your own financial data.
          </p>
          <p className="mt-6 space-y-1 text-[10px] font-semibold tracking-wide text-Budgexa-green/50">
            {STEPS.map((s) => (
              <span key={s} className="block">{s}</span>
            ))}
          </p>
        </div>

        {/* Side accent */}
        <div className="grid grid-rows-2">
          <div className="flex items-center justify-center border-b border-Budgexa-beige-dark p-6 text-sm text-Budgexa-green/70">
            Learn More →
          </div>
          <div className="flex items-center justify-center bg-Budgexa-green p-6 font-display text-lg font-bold text-white">
            Budgexa
          </div>
        </div>
      </div>
    </section>
  );
}