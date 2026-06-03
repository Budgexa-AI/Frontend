"use client";

import { useMemo, useEffect, useState } from "react";
import { detectCategory } from "@/lib/category";
import type { AddTransactionFormValues } from "@/lib/validations";
import { Lightbulb, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AIInsightPanelProps {
  values: Partial<AddTransactionFormValues>;
}

const CONFIDENCE_STYLES = {
  High: "bg-green-50 text-green-700 border border-green-200",
  Medium: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Low: "bg-gray-100 text-rayo-green border border-gray-200",
} as const;

type Message = {
  id: string;
  type: "system" | "thinking" | "insight" | "memory" | "summary";
  content: string;
};

export function AIInsightPanel({ values }: AIInsightPanelProps) {
  const suggestion = useMemo(
    () => detectCategory(values.description ?? "", values.merchant ?? ""),
    [values.description, values.merchant]
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  // 🧠 simulate assistant "thinking flow"
  useEffect(() => {
    setIsThinking(true);

    const baseMessages: Message[] = [
      {
        id: "sys",
        type: "system",
        content: "Rayo Assistant is reviewing your transaction…",
      },
      {
        id: "think",
        type: "thinking",
        content: "Analyzing patterns, merchant history, and description…",
      },
    ];

    setMessages(baseMessages);

    const t = setTimeout(() => {
      const finalMessages: Message[] = [
        {
          id: "insight",
          type: "insight",
          content: `This looks like a ${suggestion.meta.label.toLowerCase()} transaction.`,
        },
        {
          id: "summary",
          type: "summary",
          content:
            "I’ve categorized this automatically based on your description and merchant pattern.",
        },
        {
          id: "memory",
          type: "memory",
          content:
            values.merchant
              ? `You’ve had similar transactions with ${values.merchant}. I’ll learn from this pattern.`
              : "No prior merchant memory found for this transaction.",
        },
      ];

      setMessages(finalMessages);
      setIsThinking(false);
    }, 600);

    return () => clearTimeout(t);
  }, [values.description, values.merchant, suggestion]);

  const displayAmount = values.amount
    ? `₦${parseFloat(values.amount.replace(/,/g, "") || "0").toLocaleString(
        "en-NG",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}`
    : "₦0.00";

  const displayDate = values.date
    ? new Date(values.date).toLocaleDateString("en-NG", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  return (
    <aside className="flex flex-col gap-4 bg-white p-4 rounded-2xl border border-rayo-ash">

      {/* 🤖 HEADER */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-start gap-2.5">
          <Sparkles
            className={cn(
              "mt-0.5 h-5 w-5 transition-all",
              isThinking ? "animate-pulse text-gray-400" : "text-rayo-sage-dark"
            )}
          />

          <div>
            <p className="text-sm font-semibold text-rayo-green">
              Rayo Assistant
            </p>

            <p className="text-xs text-rayo-grey/60">
              {isThinking ? "Rayo is analyzing your spend…" : "Here's your insight"}
            </p>
          </div>
        </div>

        {/* 💬 CONVERSATION FEED */}
        <div className="space-y-3 max-h-[240px] overflow-auto pr-1">

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "rounded-xl px-3 py-2 text-xs leading-relaxed transition-all",
                msg.type === "system" &&
                  "bg-gray-50 text-gray-600 border border-gray-100",
                msg.type === "thinking" &&
                  "bg-yellow-50 text-yellow-700 border border-yellow-100 animate-pulse",
                msg.type === "insight" &&
                  "bg-rayo-beige-dark text-rayo-green border border-rayo-ash",
                msg.type === "summary" &&
                  "bg-white text-rayo-green border border-rayo-ash font-medium",
                msg.type === "memory" &&
                  "bg-green-50 text-green-700 border border-green-200"
              )}
            >
              {msg.content}
            </div>
          ))}

        </div>
      </div>

      {/* 📊 QUICK SNAPSHOT (kept, but now secondary) */}
      <div className="rounded-2xl border border-rayo-ash bg-gradient-to-b from-white to-rayo-muted/40 p-5 shadow-sm">

        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rayo-beige-dark">
            <Lightbulb className="h-4 w-4 text-rayo-sage-dark" />
          </div>

          <div>
            <p className="text-sm font-semibold text-rayo-green">
              Quick snapshot
            </p>
            <p className="text-xs text-rayo-grey/60">
              AI structured breakdown of this transaction
            </p>
          </div>
        </div>

        {/* Main highlight card (Amount + Category focus) */}
        <div className="mb-4 rounded-xl border border-rayo-ash bg-white p-4 shadow-sm">

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">Amount</span>
            <span className="text-sm font-semibold text-rayo-green">
              {displayAmount}
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">Category</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-rayo-beige-light px-2.5 py-1 text-xs font-medium text-rayo-green">
              <span>{suggestion.meta.emoji}</span>
              {suggestion.meta.label}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Type</span>
            <span
              className={`text-xs font-medium ${
                values.direction === "Income"
                  ? "text-green-600"
                  : values.direction === "Expense"
                    ? "text-rayo-red"
                    : "text-gray-500"
              }`}
            >
              {values.direction ?? "—"}
            </span>
          </div>
        </div>

        {/* Date pill section */}
        <div className="flex items-center justify-between rounded-xl bg-rayo-muted px-4 py-3 border border-rayo-ash">

          <span className="text-xs text-gray-500">Date</span>

          <span className="text-xs font-medium text-rayo-green-dark">
            {displayDate}
          </span>
        </div>
      </div>

      {/* 💬 CTA */}
      <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-rayo-sage p-4 shadow-lg">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50">
          <MessageCircle className="h-4 w-4 text-green-600" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-rayo-green-dark">
            Talk to Rayo
          </p>
          <p className="text-xs text-rayo-green">
            Ask follow-ups about this transaction
          </p>
        </div>

        <Link
          href={`/product/finance/ai?description=${encodeURIComponent(
            values.description ?? ""
          )}`}
          className="flex items-center gap-1.5 rounded-lg bg-rayo-green px-3 py-1.5 text-xs font-medium text-white hover:bg-rayo-green-dark transition"
        >
          Ask
        </Link>
      </div>

    </aside>
  );
}