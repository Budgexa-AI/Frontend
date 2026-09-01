// components/landing/ProductNavStrip.tsx
export default function ProductNavStrip() {
  const items = [
    { label: "Track", href: "#features", className: "bg-Budgexa-beige text-Budgexa-green" },
    { label: "Plan", href: "#how-it-works", className: "bg-Budgexa-green text-white" },
    { label: "Grow", href: "#trust", className: "bg-Budgexa-orange text-Budgexa-green" },
  ];

  return (
    <div className="grid grid-cols-3 border-b border-Budgexa-beige-dark">
      {items.map(({ label, href, className }) => (
        <a
          key={label}
          href={href}
          className={`flex h-20 items-center justify-center font-display text-lg font-bold sm:h-24 ${className}`}
        >
          {label}
        </a>
      ))}
    </div>
  );
}