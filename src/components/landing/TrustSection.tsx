// components/landing/TrustSection.tsx
const TRUST_POINTS = [
  "Read-only & non-custodial",
  "Built for Nigeria",
  "NDPA-aligned data practices",
];

export default function TrustSection() {
  return (
    <section id="trust" className="border-b border-Budgexa-beige-dark bg-white py-16 text-center">
      <h2 className="font-display text-4xl font-black leading-none text-Budgexa-green sm:text-6xl">
        Small Wins,{" "}
        <span className="text-transparent [-webkit-text-stroke:1px_#254F22]">Counted.</span>
      </h2>
      <p className="mx-auto mt-4 max-w-md px-6 text-sm text-Budgexa-green/60">
        Budgexa measures progress in habits built, not just Naira saved.
      </p>
      <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-4 px-6">
        {TRUST_POINTS.map((point) => (
          <span
            key={point}
            className="rounded-full border border-Budgexa-beige-dark bg-Budgexa-beige-light px-5 py-2.5 text-xs font-semibold text-Budgexa-green"
          >
            {point}
          </span>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-md px-6 text-xs text-Budgexa-green/50">
        Budgexa never moves, holds, or withdraws your money. Bank connectivity is coming soon.
      </p>
    </section>
  );
}