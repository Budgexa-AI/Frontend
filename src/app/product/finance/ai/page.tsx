"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, ArrowLeft, MoreHorizontal, Mic, TrendingUp, Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";
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

  const [showInfo, setShowInfo] = useState(false);
  const router = useRouter();

  useEffect(() => window.scrollTo(0, 0), []); // Scroll to top on page load
  
  const [insights, setInsights] = useState<AiInsight[]>([]);

  useEffect(() => {
    getAiInsights().then(setInsights).catch(() => {});
  }, []);

// Helper for insight card styling
function insightMeta(type: AiInsight["type"]) {
  switch (type) {
    case "alert":       return { icon: AlertCircle,  bg: "bg-rayo-orange/8", border: "border-rayo-orange/20", text: "text-rayo-orange",   label: "Alert"       };
    case "positive":    return { icon: TrendingUp, bg: "bg-rayo-green/5",  border: "border-rayo-green/10",  text: "text-rayo-green",    label: "Positive"    };
    case "warning":     return { icon: AlertCircle,  bg: "bg-rayo-orange/5", border: "border-rayo-orange/15", text: "text-rayo-orange/80",label: "Warning"     };
    case "observation":
    case "suggestion":
    default:            return { icon: Lightbulb,  bg: "bg-rayo-beige",    border: "border-rayo-green/10",  text: "text-rayo-green/70", label: "Suggestion"  };
  }
}

  return (
    // h-[100dvh] uses dynamic viewport height — critical on mobile so the
    // browser chrome doesn't eat into the chat area
    <div className="flex flex-col h-[100dvh]">

      {/* ── CHAT PANEL — fills remaining height ── */}
      <main className="flex flex-col flex-1 min-h-0 bg-white border-x border-b border-[#E7ECE3] lg:rounded-3xl lg:border lg:mx-4 lg:my-4 overflow-hidden">

        {/* HEADER */}
        <div className="lg:flex items-center justify-between px-10 py-5 border-b border-[#EEF2EB]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-lg bg-rayo-green flex items-center justify-center">
              <RayoLogo size={24} className="text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-bold truncate text-rayo-green">
                Your Financial Advisor
              </h2>
              <p className="text-sm text-rayo-green/45 truncate">
                Ask. Understand. Improve your money decisions.
              </p>
            </div>
          </div>
        </div>

        {/* INFO PANEL */}
        {showInfo && (
          <div className="px-5 md:px-7 py-3 border-b border-[#EEF2EB] bg-[#FAFBF8]">
            <p className="text-xs text-rayo-green/60">
              Your advisor uses your transactions, budget, and goals to give personalized guidance.
            </p>
          </div>
        )}

        {/* CHAT AREA — flex-1 so it fills the space between header and input */}
        <div className="flex-1 min-h-0 bg-[#FAFBF8] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full overflow-y-auto px-5 py-8 md:px-8">
              <div className="max-w-xl mx-auto">

                {/* Hero */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 rounded-3xl bg-rayo-green flex items-center justify-center mx-auto">
                    <RayoLogo size={36} className="text-white" />
                  </div>
                  <h2 className="mt-5 text-2xl md:text-3xl font-bold text-rayo-green">
                    Your Financial Insights
                  </h2>
                  <p className="mt-2 text-sm text-rayo-green/50">
                    Tap an insight to ask a follow-up, or type your own question below.
                  </p>
                </div>

                {/* Insight cards */}
                {insights.length > 0 && (
                  <div className="space-y-3 mb-8">
                    {insights.map((insight) => {
                      const meta = insightMeta(insight.type);
                      const Icon = meta.icon;
                      return (
                        <button
                          key={insight.id}
                          onClick={() => submitMessage(insight.message)}
                          className={`w-full text-left rounded-2xl border p-4 transition-all hover:shadow-sm ${meta.bg} ${meta.border}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-0.5 shrink-0 ${meta.text}`}>
                              <Icon size={16} />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] font-semibold uppercase tracking-wide ${meta.text}`}>
                                  {meta.label}
                                </span>
                              </div>
                              <p className="text-sm font-semibold text-rayo-green leading-snug">
                                {insight.message}
                              </p>
                              <p className="mt-1 text-xs text-rayo-green/60 leading-relaxed line-clamp-2">
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
                <div className="space-y-2">
                  <p className="text-xs font-medium text-rayo-green/40 uppercase tracking-wide mb-3">
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
                      className="w-full text-left rounded-2xl border border-rayo-green/10 bg-white px-4 py-3 text-sm text-rayo-green/70 hover:bg-rayo-ash transition-all"
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
        <div className="px-5 md:px-7 py-2 border-t border-[#EEF2EB] bg-[#FAFBF8] flex items-center gap-2">
          <AlertCircle size={12} className="text-rayo-green/30" />
          <p className="text-[11px] text-rayo-green/35">
            Advice is based on your data and may not always be accurate.
          </p>
        </div>

        {/* INPUT */}
        <div className="px-4 md:px-6 py-4 border-t border-[#EEF2EB] bg-white">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <ChatInput loading={sending} onSend={submitMessage} />
            </div>
            <button className="w-12 h-12 rounded-2xl border border-[#E4E9E0] flex items-center justify-center">
              <Mic size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}