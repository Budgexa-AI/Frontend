"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  MoreHorizontal,
  Mic,
} from "lucide-react";

import { useChat } from "@/hooks/useChat";
import { cn } from "@/lib/utils";

import { ConversationSidebar } from "@/components/ai/ConversationSidebar";
import { MessageList } from "@/components/ai/MessageList";
import { ChatInput } from "@/components/ai/ChatInput";
import RayoLogo from "@/components/icons/RayoLogo";

export default function InsightsPage() {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    messages,
    sending,
    submitMessage,
    createConversation,
  } = useChat();

  const activeConversation = useMemo(
    () =>
      conversations.find((c) => c.id === activeConversationId),
    [conversations, activeConversationId]
  );

  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="h-screen mt-4">
      <div className="h-full w-full mx-auto px-4 md:px-6 py-2">
        
        {/* ─────────────── GRID ─────────────── */}
        <div className="h-full grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-5 min-h-0">

          {/* DESKTOP SIDEBAR (CONVERSATIONS) */}
          <aside className="hidden xl:flex min-h-0">
            <ConversationSidebar
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelect={setActiveConversationId}
              onNewConversation={createConversation}
            />
          </aside>

          {/* ─────────────── MAIN ADVISOR AREA ─────────────── */}
          <main className="flex flex-col bg-white border border-[#E7ECE3] rounded-3xl overflow-hidden min-h-0">

            {/* HEADER */}
            <div className="flex items-center justify-between px-5 md:px-7 py-5 border-b border-[#EEF2EB]">

              <div className="flex items-center gap-3 min-w-0">

                <div className="w-11 h-11 rounded-2xl bg-rayo-green flex items-center justify-center">
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

              <button
                onClick={() => setShowInfo(!showInfo)}
                className="w-10 h-10 rounded-xl border border-[#E4E9E0] flex items-center justify-center"
              >
                <MoreHorizontal size={16} />
              </button>
            </div>

            {/* OPTIONAL INFO PANEL (MOBILE-FRIENDLY CONTEXT HELP) */}
            {showInfo && (
              <div className="px-5 md:px-7 py-3 border-b border-[#EEF2EB] bg-[#FAFBF8]">
                <p className="text-xs text-rayo-green/60">
                  Your advisor uses your transactions, budget, and goals to give personalized guidance.
                </p>
              </div>
            )}

            {/* CHAT AREA */}
            <div className="flex-1 min-h-0 bg-[#FAFBF8]">

              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center px-6">
                  <div className="text-center max-w-md">

                    <div className="w-18 h-18 md:w-20 md:h-20 rounded-3xl bg-rayo-green flex items-center justify-center mx-auto">
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
      </div>
    </div>
  );
}