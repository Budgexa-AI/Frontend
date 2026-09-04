"use client";

import { motion } from "framer-motion";

export default function StatementSection() {
  return (
    <section className="grid grid-cols-1 border-b border-[#e5e2db] bg-[#F7F5EE] lg:grid-cols-[50%_50%] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 py-10 sm:px-12 sm:py-14"
      >
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal leading-tight tracking-tight text-black">
          Nobody taught us{" "}
          <span className="font-serif text-transparent [-webkit-text-stroke:1.2px_#F5824A]">
            this.
          </span>{" "}
          So we built the guide we wish we&apos;d had.
        </h2>
      </motion.div>
      <div className="hidden border-l border-[#e5e2db] lg:block" />
    </section>
  );
}