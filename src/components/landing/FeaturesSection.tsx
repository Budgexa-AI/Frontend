import { Bot, BarChart3, RefreshCw, TrendingUp, ArrowRight } from "lucide-react";

const FEATURES = [
  {
    icon: Bot,
    title: "AI Financial Copilot",
    description:
      "Chat with Budgexa about your money. Ask questions about your spending, savings, budgets, and financial habits, and receive personalized guidance based on your own financial data.",
    cta: "See how it works",
    href: "#how-it-works",
  },
  {
    icon: BarChart3,
    title: "Smart Expense Tracking",
    description:
      "Track every transaction in one place. Organize your spending into categories and understand exactly where your money goes each month.",
    cta: "Explore tracking",
    href: "#features",
  },
  {
    icon: RefreshCw,
    title: "Savings Goals",
    description:
      "Create savings goals, monitor your progress, and stay motivated with clear milestones designed to help you reach your financial targets.",
    cta: "Start saving",
    href: "#features",
  },
  {
    icon: TrendingUp,
    title: "Personalized Financial Insights",
    description:
      "Discover spending patterns, budgeting opportunities, and practical recommendations that help you make smarter financial decisions every day.",
    cta: "View insights",
    href: "#features",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="text-center mb-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-Budgexa-orange/25 bg-Budgexa-orange/10 px-4 py-1.5 text-xs font-semibold text-Budgexa-orange uppercase tracking-widest">
            ✦ The Future of Finance
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center font-display font-black text-4xl sm:text-5xl lg:text-6xl text-Budgexa-green mb-4 text-balance">
          Financial freedom designed for{" "}
          <span className="text-Budgexa-orange">the next generation.</span>
        </h2>
        <p className="text-center text-Budgexa-green/60 text-lg max-w-2xl mx-auto mb-16">
          Budgexa isn&apos;t just a bank — it&apos;s your personal financial strategist.
          Discover the tools built to help you save, spend, and grow smarter.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FEATURES.map(({ icon: Icon, title, description, cta, href }) => (
            <div key={title} className="feature-card group">
              {/* Icon */}
              <div className="mb-4 h-10 w-10 rounded-xl bg-Budgexa-green/10 flex items-center justify-center transition-colors group-hover:bg-Budgexa-green">
                <Icon
                  size={20}
                  className="text-Budgexa-green transition-colors group-hover:text-white"
                />
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl text-Budgexa-green mb-2">
                {title}
              </h3>
              <p className="text-sm text-Budgexa-green/60 leading-relaxed mb-5">
                {description}
              </p>

              {/* CTA link */}
              <a
                href={href}
                className="inline-flex items-center gap-1 text-sm font-semibold text-Budgexa-green hover:text-Budgexa-orange transition-colors group/link"
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
