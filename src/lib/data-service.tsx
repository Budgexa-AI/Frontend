// lib/data-service.ts
import { getDashboardData, getCurrentUser, getAiInsights, askAi } from "@/lib/api-client";
import { mockDashboardData, mockUser, mockAiConversations } from "@/lib/mock-data";
import { AiConversation, AiMessage } from "./types/src";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export async function fetchCurrentUser() {
  if (USE_MOCK) return mockUser;
  return getCurrentUser();
}

export async function fetchDashboardData(userId: string) {
  if (USE_MOCK) return mockDashboardData;
  return getDashboardData(userId);
}

export async function fetchAiInsights() {
  if (USE_MOCK) return [];
  return getAiInsights();
}

export async function sendAiMessage(payload: {
  message: string;
  conversationId?: string;
  history?: AiMessage[];
}) {
  if (USE_MOCK) {
    // Simulate a short delay in dev
    await new Promise((r) => setTimeout(r, 800));
    return {
      reply: "This is a mock AI response. Connect to the backend to get real insights.",
      conversationId: payload.conversationId ?? "mock-conv-1",
    };
  }

  console.log("Sending AI message with payload:", payload);
  const result = await askAi(payload);
  console.log("AI message response:", result);
  return result;
}

export function getInitialConversations(): AiConversation[] {
  if (USE_MOCK) return mockAiConversations;
  return [];
}