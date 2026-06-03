import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default async function FinanceLayout({
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
    <div className="min-h-screen bg-rayo-beige flex">

      {/* ───────────────── SIDEBAR (DESKTOP ONLY RESPONSIBILITY) ───────────────── */}
      <div className="hidden lg:flex">
        <DashboardSidebar profile={profile} />
      </div>

      {/* ───────────────── MAIN CONTENT ───────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        <main className="
          flex-1 
          px-3 sm:px-4 lg:px-6 
          pb-10 
          overflow-auto 
          scrollbar-thin
          bg-rayo-beige
        ">
          {children}
        </main>

      </div>
    </div>
  );
}