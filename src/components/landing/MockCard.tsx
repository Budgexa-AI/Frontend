"use client";

import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function PhoneMockCard() {
  return (
    <div className="relative flex items-center justify-center min-h-[540px] w-full max-w-[420px]">
      {/* Botanical background leaves decoration with subtle idle breath */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: [0.4, 0.55, 0.4],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden
        className="pointer-events-none absolute -right-6 top-6 h-[460px] w-[380px] select-none"
      >
        <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M320 80C330 140 370 200 390 280C350 270 300 240 280 180C260 120 290 90 320 80Z"
            fill="#8FA88B"
            opacity="0.5"
          />
          <path
            d="M310 180C335 240 360 300 380 390C340 375 295 340 275 270C255 200 280 180 310 180Z"
            fill="#6B8E67"
            opacity="0.4"
          />
          <path
            d="M260 250C290 310 320 380 340 460C295 440 250 395 230 320C210 245 235 240 260 250Z"
            fill="#557551"
            opacity="0.35"
          />
          <path
            d="M100 120C110 170 140 220 160 290C125 280 85 250 70 195C55 140 80 125 100 120Z"
            fill="#8FA88B"
            opacity="0.45"
          />
        </svg>
      </motion.div>

      {/* Floating savings growth badge (top right) with idle floating pulse */}
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-2 right-2 sm:right-4 z-20"
      >
        <motion.div
          animate={{
            y: [0, -6, 0],
            scale: [1, 1.025, 1],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="rounded-2xl bg-white/95 border border-[#e5e2db] px-3.5 py-2.5 shadow-md backdrop-blur-xs transition-shadow hover:shadow-lg"
        >
          <p className="text-[8.5px] font-bold uppercase tracking-wider text-[#1b3d18]/60">
            SAVINGS GROWTH
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs font-bold text-[#1b3d18]">
            <TrendingUp size={13} className="text-[#254F22]" /> 24%
          </p>
        </motion.div>
      </motion.div>

      {/* Phone container with idle floating motion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [2, 0.8, 2],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[290px] sm:w-[310px] rounded-[36px] bg-[#EDE9DF] p-2.5 shadow-2xl border border-[#d8d3c5] transition-transform duration-500 hover:scale-[1.01]"
        >
          <div className="rounded-[28px] bg-white p-4 sm:p-5 text-[#1b3d18] shadow-inner">
            {/* Status bar */}
            <div className="flex justify-between items-center text-[10px] font-medium text-[#1b3d18]/50 pb-2">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <span className="inline-block w-2.5 h-1.5 rounded-xs border border-current" />
              </div>
            </div>

            {/* Overview */}
            <div className="mt-1">
              <p className="text-[10px] font-medium text-[#1b3d18]/60">Financial overview</p>
              <p className="text-3xl font-bold tracking-tight text-[#1b3d18] mt-0.5 font-sans">
                ₦18,200
              </p>
              <p className="text-[9.5px] text-[#1b3d18]/60 mt-0.5">Safe-to-spend balance</p>
            </div>

            {/* Assistant message */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-3 rounded-2xl rounded-tl-xs bg-[#F4F0E6] px-3 py-2 text-[10.5px] leading-relaxed text-[#1b3d18]/85"
            >
              Morning, Adeb! Based on your goals, you can safely spend{" "}
              <strong className="text-[#1b3d18] font-bold">₦4,500</strong> today.
            </motion.div>

            {/* User message */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="ml-4 mt-2 rounded-2xl rounded-tr-xs bg-[#1b3d18] px-3 py-2 text-[10.5px] leading-relaxed text-white"
            >
              Nice! How much can I spend without messing up my savings?
            </motion.div>

            {/* Metric breakdown */}
            <div className="mt-3 space-y-1.5">
              <div className="flex justify-between items-center rounded-xl bg-[#F6F5F0] px-3 py-1.5 text-[10px]">
                <span className="text-[#1b3d18]/70">Food & groceries</span>
                <span className="font-semibold text-[#1b3d18]">+ 18%</span>
              </div>
              <div className="flex justify-between items-center rounded-xl bg-[#F6F5F0] px-3 py-1.5 text-[10px]">
                <span className="text-[#1b3d18]/70">Safe-to-spend</span>
                <span className="font-semibold text-[#1b3d18]">₦4,500</span>
              </div>
              <div className="flex justify-between items-center rounded-xl bg-[#F6F5F0] px-3 py-1.5 text-[10px]">
                <span className="text-[#1b3d18]/70">Saving goal</span>
                <span className="font-semibold text-[#1b3d18]">72%</span>
              </div>
            </div>

            {/* AI summary banner */}
            <div className="mt-3 rounded-2xl bg-[#1b3d18] px-3.5 py-2.5 text-[10px] leading-snug text-white/90">
              <p className="font-bold text-white text-[10px] mb-0.5">All summary</p>
              <p className="text-white/80 text-[9.5px]">
                You&apos;re spending more on dining this week, but still on track for your savings goal.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating saved this month card (bottom left) with idle counter-pulse */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-6 -left-3 sm:-left-6 z-20"
      >
        <motion.div
          animate={{
            y: [0, 6, 0],
            rotate: [-6, -4.5, -6],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
          className="rounded-2xl bg-[#F5824A] px-4 py-3 text-[#1b3d18] shadow-lg border border-white/20 transition-transform duration-300 hover:scale-105"
        >
          <p className="text-2xl font-bold leading-none text-[#1b3d18] font-sans">
            ₦7,000
          </p>
          <p className="mt-1 text-[8.5px] font-bold uppercase tracking-wider text-[#1b3d18]/85">
            SAVED THIS MONTH
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}