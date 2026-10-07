"use client";

import { motion } from "framer-motion";

const TRUST_POINTS = [
  "Read-only & non-custodial",
  "Built for Nigeria",
  "NDPR-aligned data practices",
];

export default function TrustSection() {
  return (
    <section id="trust" className="scroll-mt-20 border-b border-[#e5e2db] bg-white py-16 sm:py-20 text-center overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black"
        >
          Small Wins,{" "}
          <span className="font-serif italic font-normal text-transparent [-webkit-text-stroke:1.2px_#1b3d18]">
            Counted.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-3 max-w-md text-xs sm:text-sm text-[#1b3d18]/70"
        >
          Budgexa measures progress in habits built, not just Naira saved.
        </motion.p>

        {/* 3 Pill Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {TRUST_POINTS.map((point, idx) => (
            <motion.span
              key={point}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx + 0.15, ease: "easeOut" }}
              className="rounded-full border border-[#d9d6cf] bg-[#FBF9F5] px-4 sm:px-5 py-2 text-[11px] sm:text-xs font-medium text-[#1b3d18] shadow-2xs hover:border-[#1b3d18]/30 transition-colors"
            >
              {point}
            </motion.span>
          ))}
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-md text-[10.5px] sm:text-[11px] text-[#1b3d18]/50 leading-relaxed"
        >
          Budgexa never moves, holds, or withdraws your money. Bank
          <br className="hidden sm:inline" /> Bank connectivity is coming soon.
        </motion.p>
      </div>
    </section>
  );
}