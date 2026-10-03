"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function DashboardSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-b border-[#e5e2db] bg-[#F7F5EE] py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Interactive Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Background decorative aura */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#1b3d18]/5 to-[#F5824A]/10 blur-xl"
              />

              {/* Main Card */}
              <div className="relative rounded-3xl bg-white p-6 sm:p-8 shadow-lg border border-[#e5e2db] transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-between border-b border-[#f0eee6] pb-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#1b3d18]/60">
                      Budget overview
                    </p>
                    <p className="mt-1 font-sans text-3xl font-bold text-[#1b3d18]">
                      ₦24,650
                    </p>
                  </div>
                  <span className="rounded-full bg-[#1b3d18]/8 px-3 py-1 text-[11px] font-bold text-[#1b3d18]">
                    Active
                  </span>
                </div>

                {/* Simulated Budget Progress Bars */}
                <div className="mt-5 space-y-3">
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-[#1b3d18]/70 mb-1">
                      <span>Monthly Spend</span>
                      <span>68%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-[#F5F3ED] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "68%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="h-full bg-[#F5824A] rounded-full"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#FAF8F3] p-3 border border-[#ede9dd] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#1b3d18]/80 font-medium">Allowance & Stash</span>
                      <span className="font-bold text-[#1b3d18]">₦18,000</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#1b3d18]/80 font-medium">Discretionary</span>
                      <span className="font-bold text-[#1b3d18]">₦6,650</span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <div className="flex items-center justify-center rounded-xl bg-[#1b3d18] py-2.5 px-4 text-xs font-semibold text-white shadow-xs">
                      Ask Budgexa AI
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d9d6cf] bg-white px-3.5 py-1 mb-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1b3d18]">
                Clarity First
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.08] tracking-tight text-black">
              One dashboard.
              <br />
              <span className="text-[#1b3d18]">No jargon. </span>
              <span className="text-[#F5824A]">No shame.</span>
            </h2>

            <p className="mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-[#1b3d18]/75">
              Log your spending, set a goal that actually fits your income, and ask Budgexa what
              your numbers mean, in plain language. The app stays simple. The thinking happens
              behind the scenes.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Zero confusing spreadsheets or banking acronyms",
                "Instant AI breakdown of where every naira is going",
                "Realistic goals shaped around flexible Nigerian income",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1b3d18]/10 text-[#1b3d18] mt-0.5">
                    <Check size={12} strokeWidth={2.5} />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-[#1b3d18]/85">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
