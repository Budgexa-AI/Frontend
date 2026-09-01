"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ProductUserProvider } from "./ProductUserProvider";

function ProductShellContent({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = !pathname.startsWith("/product/onboarding");

  return (
    <div className="min-h-screen bg-Budgexa-beige flex">
      {showSidebar && sidebar}

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-3 sm:px-4 lg:px-6 pb-10 overflow-auto scrollbar-thin bg-Budgexa-beige">
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
