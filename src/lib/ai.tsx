import { ChatResponse, Message } from "./types";

const API_URL = getApiBaseUrl();

function getApiBaseUrl() {
  const configuredUrl =
    process.env.BACKEND_URL ||
    "http://localhost:4000";

  if (/^https?:\/\//i.test(configuredUrl)) {
    return configuredUrl.replace(/\/$/, "");
  }

  return `https://${configuredUrl.replace(/\/$/, "")}`;
}

export async function getConversations() {
  const res = await fetch(`${API_URL}/ai/conversations`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch conversations");
  }

  return res.json();
}

export async function getMessages(
  conversationId: string
): Promise<Message[]> {
  const res = await fetch(
    `${API_URL}/ai/conversations/${conversationId}/messages`,
    {
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch messages");
  }

  return res.json();
}

export async function sendMessage(
  conversationId: string | null,
  message: string
): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/ai/chat`, {
    method: "POST",

    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      conversationId,
      message,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}