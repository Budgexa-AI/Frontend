export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-Budgexa-beige animate-pulse">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-6 space-y-3">
          <div className="h-4 w-28 rounded bg-Budgexa-beige-dark" />
          <div className="h-10 w-72 rounded-2xl bg-Budgexa-beige-dark" />
        </div>

        <div className="h-52 rounded-[32px] bg-Budgexa-green/20 mb-6" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-36 rounded-[28px] border border-Budgexa-green/5 bg-white"
            />
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-12">
          <div className="space-y-6 xl:col-span-8">
            <div className="grid gap-6 xl:grid-cols-2">
              <div className="h-96 rounded-[28px] bg-white border border-Budgexa-green/5" />
              <div className="h-96 rounded-[28px] bg-white border border-Budgexa-green/5" />
            </div>
            <div className="h-64 rounded-[28px] bg-white border border-Budgexa-green/5 hidden md:block" />
          </div>
          <div className="xl:col-span-4">
            <div className="h-72 rounded-[28px] bg-white border border-Budgexa-green/5" />
          </div>
        </div>
      </div>
    </main>
  );
}
