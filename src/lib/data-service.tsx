// lib/data-service.ts
import { getDashboardData, getCurrentUser } from "@/lib/api-client";
import { mockDashboardData, mockUser } from "@/lib/mock-data";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export async function fetchCurrentUser() {
  if (USE_MOCK) return mockUser;
  return getCurrentUser();
}

export async function fetchDashboardData(userId: string) {
  if (USE_MOCK) return mockDashboardData;
  return getDashboardData(userId);
}