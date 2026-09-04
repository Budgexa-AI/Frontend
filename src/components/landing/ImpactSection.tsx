"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";

const STEPS = [
  "01 · SMART TRACKING",
  "02 · BUDGETING",
  "03 · SAVINGS GOALS",
  "04 · PERSONALIZED INSIGHTS",
];

export default function ImpactSection() {
  return (
    <section id="features" className="scroll-mt-20 border-b border-[#e5e2db] bg-white py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d9d6cf] bg-[#F7F5EE] px-3.5 py-1 mb-5">
              <Sparkles size={12} className="text-[#1b3d18]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1b3d18]">
                Actionable Intelligence
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.08] tracking-tight text-black">
              Make an impact on your money,{" "}
              <span className="text-[#1b3d18]">not just your dashboard.</span>
            </h2>

            <p className="mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-[#1b3d18]/75">
              Budgexa turns raw transactions into useful decisions. Track every naira, spot
              patterns, and get personalized guidance using your own financial data.
            </p>

            {/* Step Badges */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
              {STEPS.map((step, idx) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * idx, ease: "easeOut" }}
                  className="flex items-center justify-between rounded-xl border border-[#e5e2db] bg-[#FBF9F5] px-4 py-3 text-[11px] font-bold tracking-wider text-[#1b3d18] transition-all hover:bg-[#1b3d18]/5 hover:border-[#1b3d18]/25"
                >
                  <span>{step}</span>
                  <ArrowUpRight size={13} className="text-[#1b3d18]/40" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Card Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Background Glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#F5824A]/10 to-[#1b3d18]/10 blur-xl"
              />

              {/* Today Card */}
              <div className="relative rounded-3xl bg-white p-6 sm:p-7 shadow-lg border border-[#e5e2db] transition-transform hover:-translate-y-1 duration-300">
                <div className="flex justify-between items-center pb-2 border-b border-[#f0eee6]">
                  <p className="text-[10px] font-bold tracking-wider uppercase text-[#1b3d18]/60">
                    BUDGEXA · TODAY
                  </p>
                  <span className="text-[10px] text-[#1b3d18]/50">Real-time</span>
                </div>

                <div className="mt-3">
                  <p className="font-sans text-3xl font-bold text-[#1b3d18]">₦12,000</p>
                  <p className="text-[10px] text-[#1b3d18]/60 mt-0.5">Safe-to-spend balance</p>
                </div>

                {/* Categorized spending breakdown */}
                <div className="mt-4 space-y-2 text-[11px]">
                  <div className="flex justify-between items-center rounded-xl bg-[#F6F5F0] px-3.5 py-2.5">
                    <span className="text-[#1b3d18]/75 font-medium">Groceries</span>
                    <span className="font-bold text-[#1b3d18]">₦6,200</span>
                  </div>
                  <div className="flex justify-between items-center rounded-xl bg-[#F6F5F0] px-3.5 py-2.5">
                    <span className="text-[#1b3d18]/75 font-medium">Transport</span>
                    <span className="font-bold text-[#1b3d18]">₦1,500</span>
                  </div>
                  <div className="flex justify-between items-center rounded-xl bg-[#F5824A] text-white px-3.5 py-2.5 font-semibold shadow-xs">
                    <span>Saving goal</span>
                    <span>72%</span>
                  </div>
                </div>

                {/* AI banner */}
                <div className="mt-3.5 rounded-2xl bg-[#1b3d18] px-4 py-3 text-white text-xs leading-snug">
                  <p className="font-bold text-[#F5824A] text-[11px] mb-0.5">AI Guidance</p>
                  <p className="text-white/85 text-[11px]">
                    You&apos;re still on track this week. Keep your dining under ₦3,000 to hit your target.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
