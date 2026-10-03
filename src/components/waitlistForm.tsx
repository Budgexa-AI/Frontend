"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import RayoLogo from "@/components/icons/RayoLogo";

const BREVO_FORM_URL =
  "https://65f68ec3.sibforms.com/serve/MUIFAJUT2A8dV7RO-Il3PKtxfb6Tww4k6-r1LxbUfFVJACm6goBiEh-5Z18YGWlrB5Tf1PawegzRFo0K9-hPYscO3BOj_V5SxVOrOPGtBJOZg8IqRSf-Yaql0muAc17zB1q6trnhiQ8KttclDZq5WuFFHNOh2coNmp21Fvb9xtBwoHDSdTEQNMYp7z2aT2l52e4zjSFbYC1eUXOYxw==";

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-[#FBF9F5] flex flex-col items-center justify-center px-4 py-24">
      <div className="max-w-lg w-full text-center bg-white rounded-3xl border border-[#e5e2db] p-8 sm:p-12 shadow-sm">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1b3d18] text-[#F5824A] shadow-xs">
          <RayoLogo size={26} className="text-white" />
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#d9d6cf] bg-[#F7F5EE] px-3.5 py-1 mb-4">
          <Sparkles size={12} className="text-[#F5824A]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1b3d18]">
            Closed Beta
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-black tracking-tight mb-3">
          You&apos;re early. <span className="text-[#1b3d18]">We like that.</span>
        </h1>
        <p className="text-sm text-[#1b3d18]/70 mb-8 leading-relaxed max-w-sm mx-auto">
          We&apos;re putting the finishing touches on Budgexa. Join the waitlist and we&apos;ll notify you the moment your cohort opens.
        </p>

        <a
          href={BREVO_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#F5824A] hover:bg-[#e06d34] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Join the Waitlist</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </main>
  );
}