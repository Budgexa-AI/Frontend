import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = {
    id: "user-123",
    name: "John Doe",
    email: "test@email.com",
  };

  return (
    <div className="min-h-screen bg-rayo-ash flex">
      <DashboardSidebar profile={profile} />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader profile={profile} />
        <main className="flex-1 overflow-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}