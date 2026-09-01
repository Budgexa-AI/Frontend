import { Suspense } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7EE]">
          <div className="text-sm font-semibold text-[#1b3d18]">Loading...</div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

