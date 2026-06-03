import type { FC } from "react";
import { Landmark, BarChart2, Lightbulb, RefreshCw } from "lucide-react";

const STEPS = [
  {
    number: 1,
    icon: Landmark,
    title: "Connect your accounts",
    description:
      "Securely link your bank and investment accounts to Rayo. Your data is encrypted and credentials are never stored.",
    status: "done",
  },
  {
    number: 2,
    icon: BarChart2,
    title: "See your finances in one place",
    description:
      "Rayo automatically organizes your spending, savings, and investments into a single clear dashboard.",
    status: "done",
  },
  {
    number: 3,
    icon: Lightbulb,
    title: "Get AI-powered insights",
    description:
      "Rayo analyzes your financial patterns to highlight spending trends, opportunities to save, and smarter ways to manage money.",
    status: "processing",
  },
  {
    number: 4,
    icon: RefreshCw,
    title: "Build better money habits",
    description:
      "Use Rayo's insights to make better financial decisions and steadily improve your financial health over time.",
    status: "pending",
  },
];

export const StepsSection: FC = () => (
  <section className="animate-fade-up-2 px-6 pb-24 max-w-[1100px] mx-auto">

    <div className="text-center mb-16">
      <h2 className="font-bold text-3xl text-rayo-green mb-3">
        How Rayo works
      </h2>
      <p className="text-rayo-text-muted max-w-xl mx-auto">
        A simple way to understand your finances and make smarter decisions with your money.
      </p>
    </div>

    {/* Timeline bar */}
    <div className="relative flex items-center justify-between mb-12 px-8">
      {/* connecting line */}
      <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[2px] bg-rayo-beige-dark" />
      <div className="absolute left-8 top-1/2 -translate-y-1/2 h-[2px] bg-rayo-green" style={{ width: "55%" }} />

      {STEPS.map((step) => (
        <div
          key={step.number}
          className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
            ${step.status === "pending"
              ? "bg-rayo-beige border-rayo-beige-dark text-rayo-grey"
              : "bg-rayo-green border-rayo-green text-white"
            }`}
        >
          {step.number}
        </div>
      ))}
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {STEPS.map(({ number, icon: Icon, title, description, status }) => (
        <div
          key={number}
          className={`feature-card flex flex-col gap-4 ${
            status === "pending" ? "opacity-50" : ""
          }`}
        >
          <div className="w-11 h-11 rounded-2xl bg-rayo-green/10 flex items-center justify-center text-rayo-green">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-[16px] text-rayo-green">
            {title}
          </h3>
          <p className="text-sm text-rayo-text-muted leading-[1.7]">
            {description}
          </p>
          {status === "processing" && (
            <span className="self-start inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-rayo-green rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 bg-rayo-green rounded-full animate-pulse" />
              Processing
            </span>
          )}
        </div>
      ))}
    </div>
  </section>
);