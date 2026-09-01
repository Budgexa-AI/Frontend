import { getCurrentUserServer } from "@/lib/server/current-user";
import { getDashboardDataServer } from "@/lib/server/dashboard";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const [initialData] = await Promise.all([
    getDashboardDataServer(),
    getCurrentUserServer(),
  ]);

  return <DashboardClient initialData={initialData} />;
}
