"use client";

import { Bot, User } from "lucide-react";

import { Message } from "@/lib/types";

import { cn } from "@/lib/utils";

interface Props {
  message: Message;
}

export function MessageBubble({
  message,
}: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3",
        isUser
          ? "justify-end"
          : "justify-start"
      )}
    >
      {!isUser && (
        <div className="h-8 w-8 rounded-full bg-Budgexa-green flex items-center justify-center shrink-0">
          <Bot
            size={14}
            className="text-white"
          />
        </div>
      )}

      <div
        className={cn(
          "max-w-[78%]",
          isUser
            ? "items-end"
            : "items-start"
        )}
      >
        <div
          className={cn(
            "px-4 py-3 rounded-2xl text-sm leading-relaxed prose prose-sm max-w-none",

            isUser
              ? "bg-Budgexa-green text-white rounded-tr-sm"
              : "bg-white border border-Budgexa-beige-dark text-Budgexa-green rounded-tl-sm shadow-sm"
          )}
        >
          <div className="whitespace-pre-wrap">
            {message.content}
          </div>
        </div>

        <p className="text-[10px] text-Budgexa-green/35 mt-1 px-1">
          {new Date(
            message.createdAt
          ).toLocaleTimeString("en-NG", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {isUser && (
        <div className="h-8 w-8 rounded-full bg-Budgexa-beige-dark flex items-center justify-center shrink-0">
          <User
            size={14}
            className="text-Budgexa-green"
          />
        </div>
      )}
    </div>
  );
}