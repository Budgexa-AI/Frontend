// const BANKS = ["Chase", "Wells Fargo", "Citi", "Bank of America", "Capital One", "GTBank", "Access Bank", "UBA"];

// export default function BanksSection() {
//   return (
//     <section className="border-y border-rayo-beige-dark bg-white/60 backdrop-blur-sm py-8">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <p className="text-center text-[11px] font-semibold tracking-widest text-rayo-green/50 uppercase mb-6">
//           {/* Works with your favourite banks */}
//           Built for smarter money decisions
//         </p>
//         <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
//           {/* {BANKS.map((bank) => (
//             <span
//               key={bank}
//               className="text-sm font-semibold text-rayo-green/40 hover:text-rayo-green transition-colors cursor-default"
//             >
//               {bank}
//             </span>
//           ))} */}
//           <span
//             className="text-sm font-semibold rayo-muted text-rayo-green/40 hover:text-rayo-green transition-colors cursor-default"
//           >
//             Connect your accounts → Ask Rayo questions → Automate savings & investments
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// }

import { Link2, MessageCircle, TrendingUp } from "lucide-react";

const STEPS = [
  {
    icon: Link2,
    label: "Connect your accounts",
  },
  {
    icon: MessageCircle,
    label: "Ask Rayo anything",
  },
  {
    icon: TrendingUp,
    label: "Automate savings & investments",
  },
];

export default function HowItWorksBar() {
  return (
    <section className="border-y border-rayo-beige-dark bg-white/60 backdrop-blur-sm py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Label — identical style to the banks section */}
        <p className="text-center text-[11px] font-semibold tracking-widest text-rayo-green/50 uppercase mb-6">
          How Rayo works
        </p>

        {/* Steps row */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex items-center gap-x-2">

                {/* Step pill — icon + label, matching the bank item style */}
                <div className="flex items-center gap-2 cursor-default group">
                  <Icon
                    size={14}
                    className="text-rayo-green/35 group-hover:text-rayo-green/60 transition-colors"
                    strokeWidth={2}
                  />
                  <span className="text-sm font-semibold text-rayo-green/40 group-hover:text-rayo-green/70 transition-colors">
                    {step.label}
                  </span>
                </div>

                {/* Arrow divider between steps, hidden after last */}
                {i < STEPS.length - 1 && (
                  <span className="text-rayo-green/20 font-light text-base select-none mx-3">
                    →
                  </span>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}