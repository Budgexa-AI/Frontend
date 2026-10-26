"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ProductUserProvider } from "./ProductUserProvider";
import { cn } from "@/lib/utils";

function ProductShellContent({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = !pathname.startsWith("/product/onboarding");
  const isAiPage = pathname === "/product/finance/ai" || pathname.startsWith("/product/finance/ai");

  return (
    <div className={cn("bg-Budgexa-beige flex", isAiPage ? "h-[100dvh] max-h-[100dvh] overflow-hidden" : "min-h-screen")}>
      {showSidebar && sidebar}

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <main
          className={cn(
            "flex-1 bg-Budgexa-beige min-w-0",
            isAiPage
              ? "h-full max-h-full overflow-hidden p-2 sm:p-3 lg:p-4 flex flex-col min-h-0"
              : "px-3 sm:px-4 lg:px-6 pb-10 overflow-auto scrollbar-thin"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default function ProductShell({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  return (
    <ProductUserProvider initialProfile={null}>
      <ProductShellContent sidebar={sidebar}>{children}</ProductShellContent>
    </ProductUserProvider>
  );
}
