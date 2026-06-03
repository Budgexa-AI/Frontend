"use client";

import { useEffect, useRef } from "react";

import { Message } from "@/lib/types";

import { MessageBubble } from "./MessageBubble";

import { TypingIndicator } from "./TypingIndicator";

interface Props {
  messages: Message[];

  loading: boolean;
}

export function MessageList({
  messages,
  loading,
}: Props) {
  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="h-full overflow-y-auto px-5 md:px-7 py-6 space-y-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
        />
      ))}

      {loading && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
}