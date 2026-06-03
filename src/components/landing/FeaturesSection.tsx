import { Bot, BarChart3, RefreshCw, TrendingUp, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    icon: Bot,
    title: "AI Financial Copilot",
    description:
      "Your 24/7 money mentor. Ask questions like 'Can I afford dinner tonight?' and get instant, data-backed advice tailored to your balance.",
    cta: "See how it works",
    href: "#how-it-works",
  },
  {
    icon: BarChart3,
    title: "Budgeting Automation",
    description:
      "Stop tracking spreadsheets. We categorize your spending automatically and alert you before you overspend on coffee or subscriptions.",
    cta: "View auto-categories",
    href: "#features",
  },
  {
    icon: RefreshCw,
    title: "Savings Automation",
    description:
      "Hit your goals on autopilot. Smart transfers analyze your cash flow and stash away spare change without you feeling the pinch.",
    cta: "Start saving smart",
    href: "#features",
  },
  {
    icon: TrendingUp,
    title: "Investment Tracking",
    description:
      "Stay on top of your investments. Connect your accounts and track portfolio performance across all platforms in one dashboard.",
    cta: "View portfolio",
    href: "#features",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-rayo-orange/25 bg-rayo-orange/10 px-4 py-1.5 text-xs font-semibold text-rayo-orange uppercase tracking-widest">
            ✦ The Future of Finance
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center font-display font-black text-4xl sm:text-5xl lg:text-6xl text-rayo-green mb-4 text-balance">
          Financial freedom designed for{" "}
          <span className="text-rayo-orange">the next generation.</span>
        </h2>
        <p className="text-center text-rayo-green/60 text-lg max-w-2xl mx-auto mb-16">
          Rayo AI isn&apos;t just a bank — it&apos;s your personal financial strategist.
          Discover the tools built to help you save, spend, and grow smarter.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FEATURES.map(({ icon: Icon, title, description, cta, href }) => (
            <div key={title} className="feature-card group">
              {/* Icon */}
              <div className="mb-4 h-10 w-10 rounded-xl bg-rayo-green/10 flex items-center justify-center transition-colors group-hover:bg-rayo-green">
                <Icon
                  size={20}
                  className="text-rayo-green transition-colors group-hover:text-white"
                />
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl text-rayo-green mb-2">
                {title}
              </h3>
              <p className="text-sm text-rayo-green/60 leading-relaxed mb-5">
                {description}
              </p>

              {/* CTA link */}
              <a
                href={href}
                className="inline-flex items-center gap-1 text-sm font-semibold text-rayo-green hover:text-rayo-orange transition-colors group/link"
              >
                {cta}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover/link:translate-x-1"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
