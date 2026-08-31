// components/pricing/PricingCTASection.tsx
export default function PricingCTASection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center bg-Budgexa-green px-6 py-14 sm:px-10 lg:py-0">
        <h3 className="font-display text-3xl font-bold leading-tight tracking-tight text-white">
          Take control of <span className="text-Budgexa-orange">your money.</span>
        </h3>
      </div>
      <div className="flex flex-col justify-center gap-4 border-t border-Budgexa-beige-dark bg-white px-6 py-14 sm:px-10 lg:border-l lg:border-t-0">
        <p className="max-w-xs text-sm text-Budgexa-green/60">
          Start your 30-day free trial today. Full access, no card required.
        </p>
        <a
          href="/waitlist"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-Budgexa-orange px-7 py-3 text-sm font-bold text-Budgexa-green"
        >
          Start 30-Day Free Trial
        </a>
      </div>
    </section>
  );
}