import { useState, useCallback } from "react";
import { sendAiMessage, getInitialConversations } from "@/lib/data-service";
import { AiConversation, AiMessage } from "@/lib/types/src";

function generateId() {
  return `conv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function titleFromMessage(msg: string): string {
  return msg.length > 40 ? msg.slice(0, 40) + "…" : msg;
}

export function useChat() {
  const [conversations, setConversations] = useState<AiConversation[]>(
    getInitialConversations
  );
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    () => getInitialConversations()[0]?.id ?? null
  );
  const [sending, setSending] = useState(false);

  // Messages for the active conversation
  const messages: AiMessage[] =
    conversations.find((c) => c.id === activeConversationId)?.messages ?? [];

  const createConversation = useCallback(() => {
    const id = generateId();
    const newConv: AiConversation = {
      id,
      title: "New conversation",
      messages: [],
      createdAt: new Date().toISOString(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(id);
    return id;
  }, []);

  const submitMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || sending) return;

      // Ensure there's an active conversation
      let convId = activeConversationId;
      if (!convId) {
        convId = createConversation();
      }

      const userMessage: AiMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        createdAt: new Date().toISOString(),
      };

      // Optimistically add user message
      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? {
                ...c,
                title: c.messages.length === 0 ? titleFromMessage(content) : c.title,
                messages: [...c.messages, userMessage],
              }
            : c
        )
      );

      setSending(true);

      try {
        const currentMessages = [
          ...(conversations.find((c) => c.id === convId)?.messages ?? []),
          userMessage,
        ];

        const { reply, conversationId } = await sendAiMessage({
          message: content,
          conversationId: convId,
          history: currentMessages,
        });

        const assistantMessage: AiMessage = {
          id: `msg-${Date.now()}`,
          role: "assistant",
          content: reply,
          createdAt: new Date().toISOString(),
        };

        setConversations((prev) =>
          prev.map((c) =>
            c.id === convId
              ? { ...c, messages: [...c.messages, assistantMessage] }
              : c
          )
        );

        // If backend returned a different conversationId (first message), sync it
        if (conversationId && conversationId !== convId) {
          setConversations((prev) =>
            prev.map((c) => (c.id === convId ? { ...c, id: conversationId } : c))
          );
          setActiveConversationId(conversationId);
        }
      } catch (err) {
        const errorMessage: AiMessage = {
          id: `msg-${Date.now()}-error`,
          role: "assistant",
          content: "Something dey do backend small.😭 Please try again.",
          createdAt: new Date().toISOString(),
        };

        setConversations((prev) =>
          prev.map((c) =>
            c.id === convId
              ? { ...c, messages: [...c.messages, errorMessage] }
              : c
          )
        );
      } finally {
        setSending(false);
      }
    },
    [activeConversationId, conversations, sending, createConversation]
  );

  return {
    conversations,
    activeConversationId,
    setActiveConversationId,
    messages,
    sending,
    submitMessage,
    createConversation,
  };
}