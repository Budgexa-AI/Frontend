import { Suspense } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <div className="min-h-screen flex flex-col bg-rayo-beige">
        {/* Minimal header */}
        <header className="px-6 py-5"></header>

        {/* Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-14">
          {children}
        </main>
      </div>
    </Suspense>
  );
}
