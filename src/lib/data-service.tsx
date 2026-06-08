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

export async function sendAiMessage(payload: { question: string }) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 800));
    return {
      reply: "Omo, this is mock mode o. Connect to backend to get the real gist.",
      conversationId: "mock-conv-1",
    };
  }

  const result = await askAi({ question: payload.question });
  return result;
}

export function getInitialConversations(): AiConversation[] {
  if (USE_MOCK) return mockAiConversations;
  return [];
}