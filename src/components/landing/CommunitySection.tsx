"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users } from "lucide-react";

export default function CommunitySection() {
  return (
    <section id="waitlist" className="scroll-mt-20 border-b border-[#e5e2db] bg-[#FBF9F5] py-20 sm:py-28 overflow-hidden relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[#e5e2db] bg-[#1b3d18] text-white shadow-xl">
          {/* Subtle botanical image background */}
          <div className="absolute inset-0 select-none pointer-events-none opacity-20">
            <Image
              src="/images/signup-botanical-bg.webp"
              alt="Botanical overlay"
              fill
              className="object-cover object-left"
            />
          </div>

          {/* Ambient glow effects */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#F5824A]/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/5 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 items-center p-8 sm:p-12 lg:p-16">
            {/* Left Column: Headline & Value Prop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 mb-5 backdrop-blur-sm">
                <Sparkles size={12} className="text-[#F5824A]" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-white/90">
                  Early Access Beta
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.08] tracking-tight text-white mb-4">
                Be the first to build smarter{" "}
                <span className="text-[#F5824A]">financial habits.</span>
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-white/80 max-w-lg">
                We&apos;re currently onboarding users in small cohorts to ensure a personalized, seamless experience. Reserve your spot today to get early access.
              </p>
            </motion.div>

            {/* Right Column: Interactive Card / CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start lg:items-end justify-center"
            >
              <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-6 sm:p-8 backdrop-blur-md shadow-inner text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5824A]/20 border border-[#F5824A]/30 text-[#F5824A]">
                    <Users size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white leading-tight">
                      Join the Closed Beta
                    </h3>
                    <p className="text-xs text-white/70">
                      Zero spam. Free early access perks.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/auth/signup"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#F5824A] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#e06d34] hover:shadow active:scale-[0.99] text-center"
                  >
                    <span>Claim Early Spot</span>
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/20 active:scale-[0.99] text-center"
                  >
                    View Pricing
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}