import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah J.",
    role: "Student · Port Harcourt",
    initials: "SJ",
    rating: 5,
    quote:
      "Honestly, I was terrible with money. Rayo feels like having a strict but nice accountant in my pocket. Saved ₦10k in 3 months!",
    highlight: false,
  },
  {
    name: "Marcus T.",
    role: "Designer · Abuja",
    initials: "MT",
    rating: 5,
    quote:
      "The AI chat is actually useful. I asked 'can I afford these sneakers?' and it told me 'no' lol. My wallet thanks you, Rayo.",
    highlight: true,
    badge: "Editor's Choice",
  },
  {
    name: "Elena R.",
    role: "Developer · Lagos",
    initials: "ER",
    rating: 4,
    quote:
      "Finally an app that doesn't feel like a spreadsheet. It's clean, fast, and the auto-save feature is pure magic.",
    highlight: false,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? "fill-rayo-orange text-rayo-orange" : "text-rayo-beige-dark"}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-rayo-beige-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display font-black text-4xl sm:text-5xl text-rayo-green mb-16 text-balance">
          What people are saying
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, role, initials, rating, quote, highlight, badge }) => (
            <div
              key={name}
              className={`relative rounded-2xl p-6 border transition-all ${
                highlight
                  ? "bg-rayo-beige border-rayo-orange/30 shadow-glow"
                  : "bg-white border-rayo-beige-dark shadow-card"
              }`}
            >
              {badge && (
                <span className="absolute -top-3 left-6 rounded-full bg-rayo-orange px-3 py-0.5 text-xs font-bold text-white">
                  {badge}
                </span>
              )}

              <Stars count={rating} />

              <blockquote className="mt-4 text-rayo-green/80 text-sm leading-relaxed mb-5">
                &#34;{quote}&#34;
              </blockquote>

              <div className="flex items-center gap-3">
                <span className="h-9 w-9 rounded-full bg-rayo-green/15 flex items-center justify-center text-xs font-bold text-rayo-green">
                  {initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-rayo-green">{name}</p>
                  <p className="text-xs text-rayo-green/50">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
