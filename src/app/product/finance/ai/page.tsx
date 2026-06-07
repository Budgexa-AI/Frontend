"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, ArrowLeft, MoreHorizontal, Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import { useChat } from "@/hooks/useChat";
import { MessageList } from "@/components/ai/MessageList";
import { ChatInput } from "@/components/ai/ChatInput";
import RayoLogo from "@/components/icons/RayoLogo";

export default function InsightsPage() {
  const {
    messages,
    sending,
    submitMessage,
  } = useChat();

  const [showInfo, setShowInfo] = useState(false);
  const router = useRouter();

  useEffect(() => window.scrollTo(0, 0), []); // Scroll to top on page load

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
            <div className="h-full flex items-center justify-center px-6">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 rounded-3xl bg-rayo-green flex items-center justify-center mx-auto">
                  <RayoLogo size={36} className="text-white" />
                </div>

                <h2 className="mt-5 text-2xl md:text-3xl font-bold text-rayo-green">
                  Ask Your Financial Advisor
                </h2>

                <p className="mt-2 text-sm md:text-base text-rayo-green/50">
                  Get clarity on spending, saving, budgeting, and your financial goals.
                </p>

                <div className="mt-6 space-y-2 text-xs text-rayo-green/40">
                  <p>• Why am I overspending this month?</p>
                  <p>• How can I save faster?</p>
                  <p>• Am I on track for my goals?</p>
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