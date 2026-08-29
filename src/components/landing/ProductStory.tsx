// components/landing/ProductStorySection.tsx
export default function ProductStorySection() {
  return (
    <section id="how-it-works" className="grid grid-cols-1 border-b border-Budgexa-beige-dark bg-Budgexa-beige lg:grid-cols-[58%_42%]">
      <div className="relative min-h-[280px] overflow-hidden border-b border-Budgexa-beige-dark bg-gradient-to-br from-Budgexa-beige-dark to-Budgexa-beige-light lg:min-h-[360px] lg:border-b-0 lg:border-r">
        <div className="absolute left-[10%] top-[15%] h-56 w-56 rounded-full bg-Budgexa-orange/50 blur-[2px]" />
        <div className="absolute right-[18%] top-6 w-36 -rotate-6 rounded-3xl bg-white p-3.5 text-Budgexa-green shadow-card-lg">
          <p className="text-[9px] text-Budgexa-text-muted">Budgexa overview</p>
          <p className="mt-2 font-display text-xl font-black">₦24,650</p>
          <div className="mt-3 h-2 rounded bg-Budgexa-muted" />
          <div className="mt-2 h-6 rounded-lg bg-Budgexa-muted" />
          <div className="mt-2 h-6 rounded-lg bg-Budgexa-muted" />
          <div className="mt-2 h-6 rounded-lg bg-Budgexa-green" />
        </div>
      </div>
      <div className="flex items-center px-6 py-12 sm:px-10 lg:py-0">
        <div>
          <h3 className="font-display text-2xl font-bold text-Budgexa-green sm:text-3xl">
            One dashboard. No jargon. No shame.
          </h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-Budgexa-green/70">
            Log your spending, set a goal that actually fits your income, and ask Budgexa what
            your numbers mean, in plain language. The app stays simple. The thinking happens
            behind the scenes.
          </p>
        </div>
      </div>
    </section>
  );
}