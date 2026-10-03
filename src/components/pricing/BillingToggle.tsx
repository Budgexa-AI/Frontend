"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function BillingToggle({
  billing,
  onChange,
}: {
  billing: "monthly" | "yearly";
  onChange: (b: "monthly" | "yearly") => void;
}) {
  return (
    <div className="relative inline-flex items-center rounded-full bg-[#ECEAE3] p-1.5 border border-[#e5e2db] shadow-inner">
      {/* Monthly Button */}
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={cn(
          "relative z-10 px-6 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer select-none",
          billing === "monthly" ? "text-white font-bold" : "text-[#1b3d18] hover:text-[#1b3d18]"
        )}
      >
        {billing === "monthly" && (
          <motion.div
            layoutId="activeBillingPill"
            className="absolute inset-0 rounded-full bg-[#F5824A] shadow-sm"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <span className="relative z-10">Monthly</span>
      </button>

      {/* Yearly Button */}
      <button
        type="button"
        onClick={() => onChange("yearly")}
        className={cn(
          "relative z-10 flex items-center gap-2 px-6 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer select-none",
          billing === "yearly" ? "text-white font-bold" : "text-[#1b3d18] hover:text-[#1b3d18]"
        )}
      >
        {billing === "yearly" && (
          <motion.div
            layoutId="activeBillingPill"
            className="absolute inset-0 rounded-full bg-[#F5824A] shadow-sm"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <span className="relative z-10">Yearly</span>
        <span
          className={cn(
            "relative z-10 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide transition-colors",
            billing === "yearly"
              ? "bg-white/25 text-white"
              : "bg-[#1b3d18]/10 text-[#1b3d18]"
          )}
        >
          Save 20%
        </span>
      </button>
    </div>
  );
}