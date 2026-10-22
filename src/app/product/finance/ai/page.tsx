"use client";

import { useEffect, useState } from "react";
import { AlertCircle, TrendingUp, Lightbulb, Mic } from "lucide-react";
import { useChat } from "../../../../hooks/useChat";
import { MessageList } from "@/components/ai/MessageList";
import { ChatInput } from "@/components/ai/ChatInput";
import RayoLogo from "@/components/icons/RayoLogo";
import { AiInsight } from "@/lib/types/src/types/database";
import { getAiInsights } from "@/lib/api-client/src/client";

export default function InsightsPage() {
  const {
    messages,
    sending,
    submitMessage,
  } = useChat();

  const [showInfo] = useState(false);
  const [insights, setInsights] = useState<AiInsight[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getAiInsights().then(setInsights).catch(() => {});
  }, []);

  // Helper for insight card styling
  function insightMeta(type: AiInsight["type"]) {
    switch (type) {
      case "alert":
        return {
          icon: AlertCircle,
          bg: "bg-Budgexa-orange/8",
          border: "border-Budgexa-orange/20",
          text: "text-Budgexa-orange",
          label: "Alert",
        };
      case "positive":
        return {
          icon: TrendingUp,
          bg: "bg-Budgexa-green/5",
          border: "border-Budgexa-green/10",
          text: "text-Budgexa-green",
          label: "Positive",
        };
      case "warning":
        return {
          icon: AlertCircle,
          bg: "bg-Budgexa-orange/5",
          border: "border-Budgexa-orange/15",
          text: "text-Budgexa-orange/80",
          label: "Warning",
        };
      case "observation":
      case "suggestion":
      default:
        return {
          icon: Lightbulb,
          bg: "bg-Budgexa-beige",
          border: "border-Budgexa-green/10",
          text: "text-Budgexa-green/70",
          label: "Suggestion",
        };
    }
  }

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 overflow-hidden">
      {/* ── CHAT PANEL — cleanly fills the available container height without overflow ── */}
      <section className="flex flex-col flex-1 h-full min-h-0 bg-white border border-[#E7ECE3] rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 lg:px-8 py-4 border-b border-[#EEF2EB]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-Budgexa-green flex items-center justify-center shrink-0">
              <RayoLogo size={22} className="text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base lg:text-lg font-bold truncate text-Budgexa-green">
                Your Financial Advisor
              </h2>
              <p className="text-xs text-Budgexa-green/45 truncate">
                Ask. Understand. Improve your money decisions.
              </p>
            </div>
          </div>
        </div>

        {/* INFO PANEL */}
        {showInfo && (
          <div className="px-5 md:px-7 py-3 border-b border-[#EEF2EB] bg-[#FAFBF8]">
            <p className="text-xs text-Budgexa-green/60">
              Your advisor uses your transactions, budget, and goals to give personalized guidance.
            </p>
          </div>
        )}

        {/* CHAT AREA */}
        <div className="flex-1 min-h-0 bg-[#FAFBF8] flex flex-col overflow-hidden">
          {messages.length === 0 ? (
            <div className="flex-1 h-full min-h-0 overflow-y-auto px-5 py-6 md:px-8">
              <div className="max-w-xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-Budgexa-green flex items-center justify-center mx-auto shadow-sm">
                    <RayoLogo size={30} className="text-white" />
                  </div>
                  <h2 className="mt-4 text-xl md:text-2xl font-bold text-Budgexa-green">
                    Your Financial Insights
                  </h2>
                  <p className="mt-1.5 text-xs md:text-sm text-Budgexa-green/50">
                    Tap an insight to ask a follow-up, or type your own question below.
                  </p>
                </div>

                {/* Insight cards */}
                {insights.length > 0 && (
                  <div className="space-y-2.5 mb-6">
                    {insights.map((insight) => {
                      const meta = insightMeta(insight.type);
                      const Icon = meta.icon;
                      return (
                        <button
                          key={insight.id}
                          onClick={() => submitMessage(insight.message)}
                          className={`w-full text-left rounded-2xl border p-3.5 transition-all hover:shadow-sm ${meta.bg} ${meta.border}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 shrink-0 ${meta.text}`}>
                              <Icon size={16} />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className={`text-[10px] font-semibold uppercase tracking-wide ${meta.text}`}>
                                  {meta.label}
                                </span>
                              </div>
                              <p className="text-sm font-semibold text-Budgexa-green leading-snug">
                                {insight.message}
                              </p>
                              <p className="mt-0.5 text-xs text-Budgexa-green/60 leading-relaxed line-clamp-2">
                                {insight.detail}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Suggested prompts */}
                <div className="space-y-2 pb-4">
                  <p className="text-xs font-medium text-Budgexa-green/40 uppercase tracking-wide mb-2">
                    Or ask something
                  </p>
                  {[
                    "Why am I overspending this month?",
                    "How can I save faster?",
                    "Am I on track for my goals?",
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => submitMessage(prompt)}
                      className="w-full text-left rounded-xl border border-Budgexa-green/10 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-Budgexa-green/70 hover:bg-Budgexa-ash transition-all cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <MessageList messages={messages} loading={sending} />
          )}
        </div>

        {/* DISCLAIMER */}
        <div className="px-5 md:px-7 py-2 border-t border-[#EEF2EB] bg-[#FAFBF8] flex items-center gap-2 shrink-0">
          <AlertCircle size={12} className="text-Budgexa-green/30 shrink-0" />
          <p className="text-[11px] text-Budgexa-green/35">
            Advice is based on your data and may not always be accurate.
          </p>
        </div>

        {/* INPUT */}
        <div className="px-4 md:px-6 py-3.5 border-t border-[#EEF2EB] bg-white shrink-0">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <ChatInput loading={sending} onSend={submitMessage} />
            </div>
            <button
              type="button"
              className="w-11 h-11 rounded-xl border border-[#E4E9E0] flex items-center justify-center text-Budgexa-green/60 hover:text-Budgexa-green transition-colors cursor-pointer"
            >
              <Mic size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
