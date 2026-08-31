// components/landing/ManifestoSection.tsx
export default function ManifestoSection() {
  return (
    <section id="about" className="grid grid-cols-1 border-b border-Budgexa-beige-dark bg-white lg:grid-cols-[43%_57%]">
      <div className="hidden items-end justify-end border-r border-Budgexa-beige-dark p-8 text-3xl text-Budgexa-green/30 lg:flex">
        ✦
      </div>
      <div className="px-6 py-16 sm:px-10 lg:py-20 lg:pr-24">
        <p className="max-w-xl text-lg leading-relaxed text-Budgexa-green sm:text-xl">
          Nobody taught us how to budget on allowance, gig pay, or a freelance invoice that lands
          whenever it lands. Most money apps assume a fixed salary. Budgexa doesn&apos;t. It looks
          at your money the way it actually shows up, and tells you what to do next, in plain
          English, every day.
        </p>
      </div>
    </section>
  );
}