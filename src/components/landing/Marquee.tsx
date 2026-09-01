// components/landing/Marquee.tsx
export default function Marquee({
  text,
  bg = "bg-Budgexa-green",
  fg = "text-white",
}: {
  text: string;
  bg?: string;
  fg?: string;
}) {
  const repeated = Array.from({ length: 6 }).map(() => text);

  return (
    <div className={`overflow-hidden border-b border-black/10 py-3 ${bg} ${fg}`}>
      <div className="flex w-max animate-marquee whitespace-nowrap text-sm font-bold">
        {repeated.map((t, i) => (
          <span key={i} className="mx-6">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}