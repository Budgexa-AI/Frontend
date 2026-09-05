"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  GraduationCap,
  Briefcase,
  Lock,
  Check,
  ShieldCheck,
  ArrowRight,
  HeartHandshake,
  Compass,
  Lightbulb,
} from "lucide-react";
import { AudienceCard } from "@/components/about/AudienceCard";
import { Badge } from "@/components/about/Badge";
import RayoLogo from "@/components/icons/RayoLogo";

const VALUES = [
  {
    icon: Compass,
    title: "Clarity over complexity",
    description:
      "We strip away banking jargon, endless dropdowns, and confusing spreadsheets. Money should feel intuitive, not overwhelming.",
  },
  {
    icon: Lightbulb,
    title: "Proactive guidance",
    description:
      "Instead of just telling you what you spent yesterday, Budgexa calculates your real-time safe-to-spend balance so you know what to do today.",
  },
  {
    icon: HeartHandshake,
    title: "Zero shame, real growth",
    description:
      "Financial progress is about building sustainable habits that fit your real income and life, not feeling guilty for living.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#1b3d18] overflow-hidden">
      {/* ── 1. HERO SECTION (Fills 100% Viewport Height with Fully Opaque Botanical BG) ── */}
      <section className="relative border-b border-[#e5e2db] bg-[#FBF9F5] min-h-screen lg:h-screen pt-16 flex flex-col justify-center items-center py-10 px-6 sm:px-10 lg:pl-40 lg:pr-16 xl:pl-52 xl:pr-24 overflow-hidden">
        {/* Botanical background image - fully opaque */}
        <div className="absolute inset-0 select-none pointer-events-none">
          <Image
            src="/images/signup-botanical-bg.webp"
            alt="Botanical background"
            fill
            className="object-cover object-left"
            priority
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACwAgCdASoUAAwAPzmEuVOvKKWisAgB4CcJaQAAeyAA/u39ZobeyUFAAAA="
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl w-full text-center lg:text-left flex flex-col items-center lg:items-start">
          {/* Badge with brand orange sparkle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-[#d9d6cf] bg-white/95 backdrop-blur-sm px-4 py-1 mb-6 shadow-2xs"
          >
            <Sparkles size={13} className="text-[#F5824A]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-[#1b3d18]">
              Our Mission &amp; Story
            </span>
          </motion.div>

          {/* Bold Editorial Headline sized cleanly for 100vh */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-5xl md:text-[54px] lg:text-[62px] font-normal leading-[1.08] tracking-tight text-black max-w-3xl"
          >
            Helping the{" "}
            <span className="text-[#1b3d18]">next generation</span>{" "}
            build smarter <span className="text-[#F5824A]">financial habits.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-sm sm:text-base lg:text-[17px] leading-relaxed text-[#1b3d18]/80 font-normal"
          >
            Budgexa was born from a simple realization: personal finance tools were never designed
            for how modern Africans actually earn, spend, and save. We turn raw transactions into
            daily, actionable clarity.
          </motion.p>
        </div>
      </section>

      {/* ── 2. MANIFESTO / STATEMENT STRIP (With Brand Orange Details) ── */}
      <section className="border-b border-[#e5e2db] bg-[#F7F5EE] py-14 sm:py-18">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F5824A]/30 bg-[#F5824A]/10 px-3 py-0.5 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F5824A]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#F5824A]">
                  Why Budgexa
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal leading-snug tracking-tight text-black">
                Built for{" "}
                <span className="text-[#1b3d18]">irregular incomes</span>, flexible goals, and real life.
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#1b3d18]/80 leading-relaxed font-medium">
              Most budgeting software was built for 9-to-5 salaries in traditional economies. Budgexa understands allowance, freelance milestones, multiple side-gigs, and family commitments. It meets you wherever your money actually is.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. WHO IS BUDGEXA FOR ── */}
      <section className="border-b border-[#e5e2db] bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d9d6cf] bg-[#F7F5EE] px-3.5 py-1 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1b3d18]">
                Audience
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-black">
              Who is <span className="text-[#1b3d18]">Budgexa</span> for?
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#1b3d18]/70">
              Tailored for anyone striving to make intentional decisions with their money.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <AudienceCard
              icon={<Zap className="w-5 h-5" />}
              tag="Mobile-first"
              title="Gen Z & Digital Natives"
              description="Built for individuals who expect lightning-fast, intelligent, and beautifully intuitive mobile experiences with automated insights."
            />
            <AudienceCard
              icon={<GraduationCap className="w-5 h-5" />}
              tag="Campus & Life"
              title="Students & Starters"
              description="Build healthy money habits early while managing school fees, allowances, subscriptions, stashes, and daily lifestyle spending."
            />
            <AudienceCard
              icon={<Briefcase className="w-5 h-5" />}
              tag="Flexible Income"
              title="Freelancers & Creators"
              description="Engineered for variable cash flow and unpredictable payout schedules. Stay ahead of cash dips with forward-looking safe-to-spend calculations."
            />
          </div>
        </div>
      </section>

      {/* ── 4. OUR CORE VALUES ── */}
      <section className="border-b border-[#e5e2db] bg-[#F7F5EE] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d9d6cf] bg-white px-3.5 py-1 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1b3d18]">
                Philosophy
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-black">
              Principles behind <span className="text-[#1b3d18]">our copilot</span>
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#1b3d18]/70">
              The foundational standards shaping every algorithm, recommendation, and feature.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-3xl border border-[#e5e2db] bg-white p-7 sm:p-8 shadow-xs transition-transform hover:-translate-y-1 duration-300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1b3d18] text-white mb-6">
                  <Icon size={20} />
                </div>
                <h3 className="font-serif text-xl font-bold tracking-tight text-[#1b3d18] mb-2.5">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-[#1b3d18]/70 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. SECURITY & DATA PRIVACY ── */}
      <section className="border-b border-[#e5e2db] bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#1b3d18] p-8 sm:p-12 lg:p-16 text-center text-white shadow-xl">
            {/* Background Glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#F5824A]/20 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/5 blur-3xl"
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-[#F5824A] backdrop-blur-sm">
                <Lock className="w-6 h-6" />
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                Uncompromising Security &amp; Privacy
              </h2>

              <p className="text-xs sm:text-sm leading-relaxed text-white/80 mb-8 max-w-xl mx-auto">
                Your financial information is strictly yours. Budgexa is read-only and non-custodial:
                we never hold, move, or withdraw your funds, and adhere strictly to NDPA standards.
              </p>

              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <Badge
                  icon={<Check className="w-4 h-4" />}
                  label="Bank-Grade AES-256 Encryption"
                />
                <Badge
                  icon={<ShieldCheck className="w-4 h-4" />}
                  label="NDPA Compliant & Non-Custodial"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CALL TO ACTION ── */}
      <section className="bg-[#FBF9F5] py-20 sm:py-28 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#1b3d18] shadow-sm">
            <RayoLogo size={22} className="text-white" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black mb-4">
            Start building smarter <span className="text-[#1b3d18]">financial habits</span> today.
          </h2>

          <p className="text-xs sm:text-sm text-[#1b3d18]/70 max-w-md mx-auto mb-8 leading-relaxed">
            Join young professionals and ambitious creators taking control of their money with Budgexa.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="group inline-flex items-center gap-2 rounded-full bg-[#F5824A] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#e06d34] hover:shadow active:scale-[0.99]"
            >
              Get Started Free
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-[#d9d6cf] bg-white px-6 py-3.5 text-sm font-semibold text-[#1b3d18] transition-colors hover:bg-[#F7F5EE] active:scale-[0.99]"
            >
              Explore Plans
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}