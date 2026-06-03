"use client";

import {
  MessageCircle,
  PanelLeftClose,
  Plus,
  Search,
} from "lucide-react";

import { Conversation } from "@/lib/types";

import { cn } from "@/lib/utils";

interface Props {
  conversations: Conversation[];

  activeConversationId: string | null;

  onSelect: (id: string) => void;

  onNewConversation: () => void;
}

export function ConversationSidebar({
  conversations,
  activeConversationId,
  onSelect,
  onNewConversation,
}: Props) {
  return (
    <div className="w-72 shrink-0 flex flex-col gap-3 h-full min-h-0">

      {/* Container */}
      <div className="bg-white rounded-2xl border border-rayo-beige-dark shadow-sm flex-1 min-h-0 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-[#EEF2EB] bg-gradient-to-b from-white to-[#FBFCFA]">
          
          {/* Title block */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                {/* <div className="w-2 h-2 rounded-full bg-rayo-green" /> */}
                
                <h1 className="text-[18px] font-bold tracking-tight text-rayo-green">
                  AI Conversations
                </h1>
              </div>

              <p className="text-sm text-rayo-green/45 mt-1 leading-relaxed">
                Your financial memory and insights hub
              </p>
            </div>

            <button className="w-9 h-9 rounded-xl border border-[#E4E9E0] flex items-center justify-center text-rayo-green/60 hover:text-rayo-green transition-colors bg-white/60 backdrop-blur">
              <PanelLeftClose size={18} />
            </button>
          </div>

          {/* Action row */}
          <div className="mt-4 space-y-3">
            
            <button
              onClick={onNewConversation}
              className="w-full h-11 rounded-2xl bg-rayo-green text-white text-sm font-semibold hover:bg-rayo-green-dark transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus size={15} />
              New Conversation
            </button>

            {/* Search */}
            <div className="relative">
              <Search
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-rayo-green/30"
              />

              <input
                placeholder="Search conversations..."
                className="w-full h-11 rounded-2xl border border-[#E4E9E0] bg-[#FAFBF8] pl-11 pr-4 text-sm outline-none focus:border-rayo-green/30 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Scroll area */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 min-h-0">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={cn(
                "w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all",
                activeConversationId === c.id
                  ? "bg-rayo-beige"
                  : "hover:bg-rayo-ash"
              )}
            >
              <div className="h-8 w-8 rounded-lg bg-rayo-green/10 flex items-center justify-center">
                <MessageCircle size={14} className="text-rayo-green" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-rayo-green truncate">
                  {c.title}
                </p>

                <p className="text-xs text-rayo-green/50 truncate">
                  {c.preview}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}