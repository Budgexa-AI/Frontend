"use client";

import { motion } from "framer-motion";
import RayoLogo from "@/components/icons/RayoLogo";

export default function ManifestoSection() {
  return (
    <section id="about" className="scroll-mt-20 grid grid-cols-1 border-b border-[#e5e2db] bg-white lg:grid-cols-[44%_56%] overflow-hidden">
      {/* Left side: Radar circles with central logo mark */}
      <div className="relative flex items-center justify-center border-b border-[#e5e2db] py-14 px-6 lg:border-b-0 lg:border-r overflow-hidden min-h-[260px] bg-[#FDFCFB]">
        {/* Subtle sparkle stars */}
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.35, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-10 left-12 text-[#1b3d18] text-sm select-none"
        >
          ✦
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 0.35, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute bottom-12 right-14 text-[#1b3d18] text-sm select-none"
        >
          ✦
        </motion.span>

        {/* Concentric rings with scale animation */}
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute h-48 w-48 rounded-full border border-[#1b3d18]/10"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute h-36 w-36 rounded-full border border-[#1b3d18]/15"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute h-24 w-24 rounded-full border border-[#1b3d18]/20"
          />

          {/* Central Logo Circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#1b3d18] shadow-md transition-transform hover:scale-105"
          >
            <RayoLogo size={24} className="text-white" />
          </motion.div>
        </div>
      </div>

      {/* Right side: Manifesto editorial text */}
      <div className="flex items-center px-6 py-14 sm:px-12 lg:py-20 lg:pr-24 bg-white">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl text-base sm:text-lg lg:text-[19px] leading-relaxed text-[#1b3d18]/90 font-medium"
        >
          Nobody taught us how to budget on allowance, gig pay, or a freelance invoice that lands
          whenever it lands. Most money apps assume a fixed salary. Budgexa doesn&apos;t. It looks
          at your money the way it actually shows up, and tells you what to do next, in plain
          English, every day.
        </motion.p>
      </div>
    </section>
  );
}