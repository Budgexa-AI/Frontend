"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  return (
    <section id="waitlist" className="scroll-mt-20 grid grid-cols-1 border-b border-[#e5e2db] bg-[#F7F5EE] lg:grid-cols-[36%_28%_36%] overflow-hidden">
      {/* 1. Left: Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col justify-center border-b border-[#e5e2db] p-8 sm:p-12 lg:border-b-0 lg:border-r"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1b3d18] text-white text-xs font-serif select-none shadow-xs">
          “
        </div>

        <p className="mt-4 font-serif text-lg sm:text-xl font-bold leading-snug text-[#1b3d18]">
          It&apos;s simple to use and helps keep my spending in check.
        </p>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} className="fill-[#F5824A] text-[#F5824A]" />
            ))}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#1b3d18]/50">
            MICHEAL., VIA F6S
          </p>
        </div>
      </motion.div>

      {/* 2. Center: Overlapping Graphic Arches */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-end justify-center border-b border-[#e5e2db] pt-10 pb-0 overflow-hidden min-h-[220px] lg:border-b-0 lg:border-r bg-[#F7F5EE]"
      >
        {/* Peach arch in background */}
        <div className="h-44 w-36 rounded-t-full bg-[#F5A87B] -mr-8 mb-0 transition-transform duration-300 hover:scale-105" />

        {/* Dark green arch in foreground */}
        <div className="z-10 flex h-52 w-40 items-center justify-center rounded-t-full bg-[#1b3d18] shadow-lg mb-0 transition-transform duration-300 hover:scale-105">
          <span className="font-serif text-xl font-bold text-white tracking-tight">
            Budgexa
          </span>
        </div>
      </motion.div>

      {/* 3. Right: Join the waitlist */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col justify-center p-8 sm:p-12 bg-[#F7F5EE]"
      >
        <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-[#1b3d18]">
          Join the <span className="text-[#F5824A]">waitlist.</span>
        </h3>
        <p className="mt-2.5 max-w-sm text-xs sm:text-[13px] leading-relaxed text-[#1b3d18]/75">
          Be among the first to shape how the next generation manages money. We&apos;re in closed
          beta, and we&apos;re letting people in gradually.
        </p>
        <div className="mt-6">
          <a
            href="#top"
            className="inline-flex items-center justify-center rounded-full bg-[#F5824A] px-7 py-3 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-[#d96a34] active:scale-[0.99]"
          >
            Get early access
          </a>
        </div>
      </motion.div>
    </section>
  );
}