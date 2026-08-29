// components/landing/TestimonialsSection.tsx
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="grid grid-cols-1 border-b border-Budgexa-beige-dark bg-Budgexa-beige-light lg:grid-cols-2">
      <div className="flex flex-col justify-center border-b border-Budgexa-beige-dark px-6 py-16 sm:px-10 lg:border-b-0 lg:border-r">
        <span className="text-3xl text-Budgexa-orange">&ldquo;</span>

        <p className="mt-4 max-w-md font-display text-xl leading-snug text-Budgexa-green sm:text-2xl">
          It&apos;s simple to use and helps keep my spending in check.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="fill-Budgexa-orange text-Budgexa-orange" />
            ))}
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-Budgexa-green/50">
            Micheal · via F6S
          </p>
        </div>
      </div>

      <div className="relative min-h-[300px] overflow-hidden bg-gradient-to-br from-Budgexa-beige-dark to-Budgexa-beige-light lg:min-h-full">
        <div className="absolute left-[17%] top-[17%] h-56 w-56 rounded-full bg-Budgexa-orange/70" />
        <div className="absolute left-[26%] top-[16%] flex h-80 w-52 rotate-6 items-center justify-center rounded-[100px_100px_16px_16px] bg-Budgexa-green shadow-card-lg">
          <span className="-rotate-6 font-display text-xl font-bold text-Budgexa-beige">
            Budgexa
          </span>
        </div>
      </div>
    </section>
  );
}