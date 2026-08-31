export default function ProductLoading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="h-10 w-64 rounded-2xl bg-Budgexa-beige-dark/60" />
      <div className="h-48 rounded-[32px] bg-Budgexa-beige-dark/40" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-36 rounded-[28px] bg-white border border-Budgexa-green/5"
          />
        ))}
      </div>
    </div>
  );
}
