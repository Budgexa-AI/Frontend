"use client";

import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import PhoneMockCard from "./MockCard";
import RayoLogo from "@/components/icons/RayoLogo";

export default function HeroSection() {
  return (
    <section id="top" className="scroll-mt-20 relative overflow-hidden bg-[#FBF9F5] pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-[#e5e2db]">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[48%_52%] lg:gap-8">
          {/* Left Column: Copy with Staggered Entrance Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d9d6cf] bg-white/80 px-3.5 py-1.5 shadow-2xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#1b3d18]" />
              <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#1b3d18]">
                Now accepting signups for early access
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[48px] sm:text-[62px] lg:text-[70px] font-normal leading-[1.02] tracking-tight text-black"
            >
              Your AI
              <br />
              <span className="text-[#1b3d18]">Financial</span>
              <br />
              Copilot
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-md text-sm sm:text-base leading-relaxed text-[#1b3d18]/75"
            >
              All your money in one place. Budgexa helps you track spending, plan your budget,
              grow your savings, and make better decisions with your money.
            </motion.p>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#waitlist"
                className="group inline-flex items-center gap-2 rounded-full bg-[#1b3d18] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#254F22] hover:shadow active:scale-[0.99]"
              >
                Get Early Access
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-2 rounded-full border border-[#d9d6cf] bg-white/80 px-6 py-3.5 text-sm font-semibold text-[#F5824A] transition-all hover:bg-[#F5824A] hover:border-[#F5824A] hover:text-white hover:shadow-xs active:scale-[0.99]"
              >
                <Play size={13} className="fill-[#F5824A] text-[#F5824A] transition-colors group-hover:fill-white group-hover:text-white" />
                <span>See how it works</span>
              </a>
            </motion.div>

            {/* Value bullets with Logo mark */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5 text-xs font-medium text-[#1b3d18]/75"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1b3d18]">
                  <RayoLogo size={11} className="text-white" />
                </div>
                <span>Read-only & non-custodial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#1b3d18]/40">•</span>
                <span>Personalized daily insights</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#1b3d18]/40">•</span>
                <span>Built for Nigeria</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual with Reveal & Floating Motion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <PhoneMockCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}