"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What is Rayo AI?",
    a: "Rayo AI is your AI-powered financial co-pilot. It brings all your money into one place so you can track spending, monitor savings, and view your investments clearly. Instead of juggling multiple apps, Rayo gives you a single dashboard for your financial life.",
  },
  {
    q: "What can Rayo help me do?",
    a: "Rayo helps you track your spending, monitor savings across accounts, and see all your investments in one place. It also provides AI-powered insights so you can better understand your financial habits and make smarter decisions with your money.",
  },
  {
    q: "Does Rayo move or manage my money?",
    a: "No. Rayo does not move, hold, or invest your money. It simply connects to your existing financial accounts and provides a unified dashboard to help you understand and manage your finances.",
  },
  {
    q: "How does Rayo decide how much I can save?",
    a: "Rayo analyzes your income patterns, recurring bills, and spending habits to estimate how much you can safely set aside. The goal is to help you save consistently without interfering with your essential expenses.",
  },
  {
    q: "Is my financial data secure?",
    a: "Security is a core priority at Rayo. We use modern encryption and security practices to ensure your financial data remains protected at all times.",
  },
  {
    q: "Which banks and financial platforms does Rayo support?",
    a: "Rayo is designed to connect with multiple banks and financial platforms so you can view all your finances in one place. Supported integrations will expand as the platform grows.",
  },
  {
    q: "Is Rayo free to use?",
    a: "Rayo will offer a free tier that includes essential financial tracking features. Additional premium tools may be introduced in the future for users who want deeper financial insights.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="animate-fade-up-4 px-6 py-12 pb-24 max-w-[680px] mx-auto">
      <h2 className="font-display text-[32px] font-black text-rayo-green text-center mb-10">
        Common questions
      </h2>

      <div className="space-y-3">
        {FAQS.map(({ q, a }, i) => (
          <div key={i} className="bg-white rounded-2xl border border-rayo-beige-dark overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left"
            >
              <span className="font-display font-bold text-[15px] text-rayo-green">
                {q}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-rayo-grey shrink-0 transition-transform duration-200 ${
                  open === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {open === i && (
              <div className="px-6 pb-5 text-sm text-rayo-text-muted leading-[1.7]">
                {a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}