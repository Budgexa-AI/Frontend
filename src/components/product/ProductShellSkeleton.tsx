export default function ProductShellSkeleton() {
  return (
    <div className="min-h-screen bg-Budgexa-beige flex animate-pulse">
      <aside className="hidden lg:block w-64 shrink-0 border-r border-Budgexa-green/5 bg-white p-4 space-y-4">
        <div className="h-10 w-32 rounded-xl bg-Budgexa-beige" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-9 rounded-xl bg-Budgexa-beige" />
        ))}
      </aside>
      <div className="flex-1 p-6 space-y-6">
        <div className="h-10 w-64 rounded-2xl bg-Budgexa-beige" />
        <div className="h-48 rounded-[32px] bg-Budgexa-beige" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-36 rounded-[28px] bg-white border border-Budgexa-green/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
