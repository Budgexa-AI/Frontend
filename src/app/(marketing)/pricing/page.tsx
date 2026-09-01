"use client";

interface ComparisonFeature {
  category: string;
  title: string;
  subtitle?: string;
  free: string | boolean;
  pro: string | boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: "Free Plan",
    monthlyPrice: 0,
    yearlyPrice: 0,
    period: "forever",
    description: "Start tracking your finances with essential budgeting tools.",
    cta: "Start for Free",
    features: [
      { name: "Manual expense tracking", included: true },
      { name: "1 savings goal", included: true },
      { name: "1 connected account", included: true },
      { name: "Basic monthly summaries", included: true },
      { name: "AI forecasting", included: false },
    ],
  },
  {
    name: "Pro Plan",
    monthlyPrice: 3500,
    yearlyPrice: 30000,
    period: "billed annually",
    description: "Your personal AI financial assistant with forecasting and smart insights.",
    cta: "Get Pro",
    recommended: true,
    features: [
      { name: "Unlimited expense tracking", included: true },
      { name: "AI spending pattern detection", included: true },
      { name: "Predict future cash shortages", included: true },
      { name: "AI savings recommendations", included: true },
      { name: "Automatic transaction categorization", included: true },
      { name: "Priority support", included: true },
    ],
  },
];

const COMPARISON_FEATURES: ComparisonFeature[] = [
  {
    category: "FEATURES",
    title: "Expense Tracking",
    subtitle: "Track daily spending manually or automatically.",
    free: "Manual Only",
    pro: "Unlimited + Auto Sync",
  },
  {
    category: "FEATURES",
    title: "Savings Goals",
    subtitle: "Set targets for vacations, emergencies, and more.",
    free: "1 Goal",
    pro: "Unlimited",
  },
  {
    category: "FEATURES",
    title: "Connected Bank Accounts",
    subtitle: "Securely sync your financial accounts.",
    free: "1 Account",
    pro: "Unlimited",
  },
  {
    category: "AI CAPABILITIES",
    title: "AI Spending Insights",
    subtitle: "Understand spending habits and trends automatically.",
    free: false,
    pro: true,
  },
  {
    category: "AI CAPABILITIES",
    title: "Predictive Budgeting",
    subtitle: "Forecast future expenses based on your behavior.",
    free: false,
    pro: true,
  },
  {
    category: "AI CAPABILITIES",
    title: "Smart Savings Recommendations",
    subtitle: "Get personalized suggestions to save more effectively.",
    free: false,
    pro: true,
  },
  {
    category: "AI CAPABILITIES",
    title: "Automatic Categorization",
    subtitle: "AI organizes transactions automatically over time.",
    free: false,
    pro: true,
  },
  {
    category: "AI CAPABILITIES",
    title: "Bank Account Syncing",
    subtitle: "Securely connect and sync transactions from your bank accounts.",
    free: "30 synced transactions per month",
    pro: "Unlimited syncing",
  },
  {
    category: "SUPPORT & SECURITY",
    title: "Data Export",
    subtitle: "Download your financial history anytime.",
    free: false,
    pro: true,
  },
  {
    category: "SUPPORT & SECURITY",
    title: "Customer Support",
    subtitle: "Get help whenever you need it.",
    free: "Standard Email",
    pro: "24/7 Priority",
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] =
    useState<BillingPeriod>("monthly");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="px-5 pt-28 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-rayo-orange/20 bg-rayo-orange/5 px-4 py-2 text-sm font-medium text-rayo-orange mb-6">
            <Sparkles size={16} />
            AI-powered financial intelligence
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-black text-rayo-green leading-tight mb-6">
            Stop Tracking Money.
            <span className="text-rayo-orange block">
              Start Understanding It.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-rayo-green/60 mb-10">
            Rayo AI helps you understand spending habits, forecast future
            expenses, and make smarter financial decisions automatically.
          </p>

          {/* TRUST SIGNALS */}
          <div className="flex flex-wrap justify-center gap-6 mb-14 text-sm text-rayo-green/60">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-rayo-orange" />
              Bank-level encryption
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-rayo-orange" />
              Secure PayStack payments
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-rayo-orange" />
              Your financial data is never sold
            </div>
          </div>

          {/* BILLING TOGGLE */}
          {isMounted && (
            <>
              <div className="flex items-center justify-center gap-4 mb-14">
                <button
                  onClick={() => setBillingPeriod("monthly")}
                  className={cn(
                    "text-sm font-semibold transition-colors",
                    billingPeriod === "monthly"
                      ? "text-rayo-green"
                      : "text-rayo-green/40 hover:text-rayo-green/70"
                  )}
                >
                  Monthly
                </button>

                <button
                  onClick={() =>
                    setBillingPeriod(
                      billingPeriod === "monthly"
                        ? "yearly"
                        : "monthly"
                    )
                  }
                  className="relative flex h-10 w-[72px] items-center rounded-full bg-rayo-green/15 p-1"
                >
                  <span
                    className={cn(
                      "h-8 w-8 rounded-full bg-white shadow-sm transition-transform duration-300",
                      billingPeriod === "yearly"
                        ? "translate-x-8"
                        : "translate-x-0"
                    )}
                  />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setBillingPeriod("yearly")}
                    className={cn(
                      "text-sm font-semibold transition-colors",
                      billingPeriod === "yearly"
                        ? "text-rayo-green"
                        : "text-rayo-green/40 hover:text-rayo-green/70"
                    )}
                  >
                    Yearly
                  </button>

                  <span
                    className={cn(
                      "rounded-full bg-rayo-orange px-2.5 py-1 text-xs font-bold text-white transition-all",
                      billingPeriod === "yearly"
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  >
                    SAVE 30%
                  </span>
                </div>
              </div>

              {/* PRICING CARDS */}
              <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                {PRICING_TIERS.map((tier) => {
                  const price =
                    billingPeriod === "monthly"
                      ? tier.monthlyPrice
                      : tier.yearlyPrice;

                  return (
                    <div
                      key={tier.name}
                      className={cn(
                        "relative rounded-3xl border bg-white p-8 transition-all",
                        tier.recommended
                          ? "border-rayo-orange shadow-2xl scale-105"
                          : "border-rayo-beige-dark shadow-sm"
                      )}
                    >
                      {tier.recommended && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="rounded-full bg-rayo-orange px-4 py-1 text-xs font-bold text-white">
                            MOST POPULAR
                          </span>
                        </div>
                      )}

                      <div className="mb-8">
                        <h3 className="font-display text-2xl font-bold text-rayo-green mb-2">
                          {tier.name}
                        </h3>

                        <p className="text-rayo-green/60 text-sm mb-6">
                          {tier.description}
                        </p>

                        <div className="flex items-end gap-1 mb-2">
                          <span className="text-5xl font-semibold text-rayo-green">
                            ₦{price.toLocaleString()}
                          </span>

                          <span className="text-rayo-green/50 mb-1">
                            /
                            {billingPeriod === "monthly"
                              ? "mo"
                              : "year"}
                          </span>
                        </div>

                        {tier.recommended &&
                          billingPeriod === "yearly" && (
                            <p className="text-sm font-medium text-rayo-orange mb-6">
                              Save ₦12,000 yearly
                            </p>
                          )}

                        <button
                          className={cn(
                            "w-full rounded-full py-3.5 font-semibold transition-all",
                            tier.recommended
                              ? "bg-rayo-orange text-white hover:bg-rayo-orange/90"
                              : "border-2 border-rayo-green text-rayo-green hover:bg-rayo-ash"
                          )}
                        >
                          {tier.cta}
                        </button>
                      </div>

                      {/* FEATURES */}
                      <div className="space-y-4">
                        {tier.features.map((feature) => (
                          <div
                            key={feature.name}
                            className="flex items-start gap-3"
                          >
                            {feature.included ? (
                              <Check
                                size={18}
                                className="text-rayo-orange shrink-0 mt-0.5"
                              />
                            ) : (
                              <X
                                size={18}
                                className="text-rayo-green/20 shrink-0 mt-0.5"
                              />
                            )}

                            <span
                              className={cn(
                                "text-sm",
                                feature.included
                                  ? "text-rayo-green"
                                  : "text-rayo-green/30 line-through"
                              )}
                            >
                              {feature.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* SOCIAL PROOF */}
              <p className="text-center text-sm text-rayo-green/50 mt-10">
                Trusted by students and young professionals building smarter
                financial habits.
              </p>
            </>
          )}
        </div>
      </section>

      {/* FEATURE COMPARISON */}
      <section className="px-5 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-rayo-green mb-3">
              Compare Features
            </h2>

            <p className="text-rayo-green/60">
              See exactly what you get with each plan.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-rayo-beige-dark bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-rayo-beige-dark bg-rayo-ash">
                    <th className="px-6 py-5 text-left font-semibold text-rayo-green">
                      Features
                    </th>

                    <th className="px-6 py-5 text-center font-semibold text-rayo-green">
                      Free
                    </th>

                    <th className="px-6 py-5 text-center font-semibold text-rayo-orange">
                      Pro
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {COMPARISON_FEATURES.map((item, idx) => {
                    const prevCategory =
                      idx > 0
                        ? COMPARISON_FEATURES[idx - 1].category
                        : null;

                    const showCategoryHeader =
                      item.category !== prevCategory;

                    return (
                      <React.Fragment key={`${item.category}-${item.title}`}>
                       

                        <tr
                          key={item.title}
                          className="border-b border-rayo-beige-dark/50 hover:bg-rayo-ash/30 transition-colors"
                        >
                          <td className="px-6 py-5">
                            <p className="font-semibold text-rayo-green">
                              {item.title}
                            </p>

                            {item.subtitle && (
                              <p className="text-sm text-rayo-green/50 mt-1">
                                {item.subtitle}
                              </p>
                            )}
                          </td>

                          <td className="px-6 py-5 text-center">
                            {typeof item.free === "boolean" ? (
                              item.free ? (
                                <Check
                                  size={20}
                                  className="mx-auto text-rayo-orange"
                                />
                              ) : (
                                <span className="text-rayo-green/20">—</span>
                              )
                            ) : (
                              <span className="text-sm font-semibold text-rayo-green">
                                {item.free}
                              </span>
                            )}
                          </td>

                          <td className="px-6 py-5 text-center">
                            {typeof item.pro === "boolean" ? (
                              item.pro ? (
                                <Check
                                  size={20}
                                  className="mx-auto text-rayo-orange"
                                />
                              ) : (
                                <span className="text-rayo-green/20">—</span>
                              )
                            ) : (
                              <span className="text-sm font-semibold text-rayo-orange">
                                {item.pro}
                              </span>
                            )}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-center gap-2 border-t border-rayo-beige-dark bg-rayo-ash px-6 py-4 text-sm text-rayo-green/60">
              <ShieldCheck size={16} className="text-rayo-orange" />
              Secure payments via PayStack. Cancel anytime.
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-16">
        <div className="max-w-3xl mx-auto rounded-[32px] px-8 text-center">
          <h3 className="font-display text-4xl font-bold text-rayo-green mb-4">
            Understand where your money goes — automatically.
          </h3>

          <p className="text-rayo-green/70 text-lg mb-8 max-w-xl mx-auto">
            Get AI-powered financial insights, forecasting, and smarter
            budgeting tools built for modern money management.
          </p>

          <a
            href="/auth/signup"
            className="inline-flex items-center justify-center rounded-full bg-rayo-orange px-8 py-4 font-semibold text-white transition-all hover:bg-rayo-orange/90"
          >
            Start Free Today
          </a>
        </div>
      </section>
    </div>
  );
}
