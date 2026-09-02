import { getCurrentUserServer } from "@/lib/server/current-user";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import SetProductProfile from "./SetProductProfile";

export default async function AsyncSidebar() {
  const profile = await getCurrentUserServer();

  return (
    <>
      <SetProductProfile profile={profile} />
      <DashboardSidebar profile={profile ?? undefined} />
    </>
  );
}
