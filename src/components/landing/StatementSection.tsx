// components/landing/StatementSection.tsx
export default function StatementSection() {
  return (
    <section className="grid grid-cols-1 border-b border-Budgexa-beige-dark bg-Budgexa-beige-light sm:grid-cols-2">
      <h2 className="px-6 py-10 font-display text-3xl font-bold leading-tight tracking-tight text-Budgexa-green sm:px-10 sm:text-4xl">
        Nobody taught us{" "}
        <span className="text-transparent [-webkit-text-stroke:1px_#254F22]">this.</span> So we
        built the guide we wish we&apos;d had.
      </h2>
      <div className="hidden border-l border-Budgexa-beige-dark sm:block" />
    </section>
  );
}