// components/pricing/BillingToggle.tsx
"use client";

import { cn } from "@/lib/utils";

export default function BillingToggle({
  billing,
  onChange,
}: {
  billing: "monthly" | "yearly";
  onChange: (b: "monthly" | "yearly") => void;
}) {
  return (
    <div className="inline-flex border border-Budgexa-beige-dark">
      <button
        onClick={() => onChange("monthly")}
        className={cn(
          "px-6 py-2.5 text-xs font-semibold transition-colors",
          billing === "monthly" ? "bg-Budgexa-green text-white" : "text-Budgexa-green/60"
        )}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange("yearly")}
        className={cn(
          "flex items-center gap-1.5 border-l border-Budgexa-beige-dark px-6 py-2.5 text-xs font-semibold transition-colors",
          billing === "yearly" ? "bg-Budgexa-green text-white" : "text-Budgexa-green/60"
        )}
      >
        Yearly
        <span className={billing === "yearly" ? "text-Budgexa-orange" : "text-Budgexa-orange/70"}>
          Save 20%
        </span>
      </button>
    </div>
  );
}