// components/landing/CommunitySection.tsx
export default function CommunitySection() {
  return (
    <section id="waitlist" className="grid grid-cols-1 border-b border-Budgexa-beige-dark lg:grid-cols-2">
      <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-Budgexa-green">
        <div className="absolute left-[14%] top-[4%] h-56 w-56 rounded-full border-[20px] border-Budgexa-orange" />
        <span className="relative z-10 font-display text-4xl font-black tracking-tight text-white">
          Budgexa
        </span>
      </div>
      <div className="flex flex-col justify-center px-6 py-14 sm:px-10">
        <h3 className="font-display text-3xl font-bold leading-tight tracking-tight text-Budgexa-green">
          Join the <span className="text-Budgexa-orange">waitlist.</span>
        </h3>
        <p className="mt-3 max-w-sm text-sm text-Budgexa-green/70">
          Be among the first to shape how the next generation manages money. We&apos;re in closed
          beta, and we&apos;re letting people in gradually.
        </p>
        <a
          href="#top"
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-Budgexa-orange px-7 py-3 text-sm font-bold text-Budgexa-green"
        >
          Get early access
        </a>
      </div>
    </section>
  );
}