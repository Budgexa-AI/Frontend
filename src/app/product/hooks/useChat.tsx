"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getConversations,
  getMessages,
  sendMessage,
} from "@/lib/ai";

import {
  Conversation,
  Message,
} from "@/lib/types";

export function useChat() {
  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [activeConversationId, setActiveConversationId] =
    useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const [loadingMessages, setLoadingMessages] =
    useState(false);

  const [sending, setSending] = useState(false);

  const activeConversation = useMemo(
    () =>
      conversations.find(
        (c) => c.id === activeConversationId
      ) ?? null,

    [conversations, activeConversationId]
  );

  useEffect(() => {
    loadConversations();
  }, []);

  async function loadConversations() {
    try {
      const data = await getConversations();

      setConversations(data);

      if (data.length > 0) {
        setActiveConversationId(data[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!activeConversationId) {
      setMessages([]);
      return;
    }

    loadMessages(activeConversationId);
  }, [activeConversationId]);

  async function loadMessages(
    conversationId: string
  ) {
    try {
      setLoadingMessages(true);

      const data = await getMessages(
        conversationId
      );

      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  }

  async function submitMessage(text: string) {
    if (!text.trim() || sending) return;

    const optimisticMessage: Message = {
      id: crypto.randomUUID(),

      role: "user",

      content: text,

      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [
      ...prev,
      optimisticMessage,
    ]);

    setSending(true);

    try {
      const response = await sendMessage(
        activeConversationId,
        text
      );

      if (!activeConversationId) {
        setActiveConversationId(
          response.conversationId
        );

        await loadConversations();
      }

      setMessages((prev) => [
        ...prev,
        response.message,
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),

          role: "assistant",

          content:
            "Something do backend small 😭 Try again.",

          createdAt:
            new Date().toISOString(),
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  async function createConversation() {
    setActiveConversationId(null);

    setMessages([]);
  }

  return {
    conversations,
    activeConversation,
    activeConversationId,
    setActiveConversationId,

    messages,

    loadingMessages,
    sending,

    submitMessage,
    createConversation,
  };
}
