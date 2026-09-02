import { Suspense } from "react";
import ProductShell from "@/components/product/ProductShell";
import AsyncSidebar from "@/components/product/AsyncSidebar";

function SidebarFallback() {
  return (
    <aside className="hidden lg:block w-64 shrink-0 border-r border-Budgexa-green/5 bg-white p-4 space-y-4 animate-pulse">
      <div className="h-10 w-32 rounded-xl bg-Budgexa-beige" />
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-9 rounded-xl bg-Budgexa-beige" />
      ))}
    </aside>
  );
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductShell
      sidebar={
        <Suspense fallback={<SidebarFallback />}>
          <AsyncSidebar />
        </Suspense>
      }
    >
      {children}
    </ProductShell>
  );
}
