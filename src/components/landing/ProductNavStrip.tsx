// components/landing/ProductNavStrip.tsx
import { Clock, Calendar, Sprout } from "lucide-react";

export default function ProductNavStrip() {
  const items = [
    { label: "Track", icon: Clock },
    { label: "Plan", icon: Calendar },
    { label: "Grow", icon: Sprout },
  ];

  return (
    <div className="border-b border-[#e5e2db] bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-3">
          {items.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="group relative flex h-14 sm:h-16 items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#1b3d18]/60 border-r border-[#e5e2db] last:border-r-0 cursor-default select-none transition-colors duration-200 hover:text-[#F5824A] hover:bg-[#F5824A]/5"
            >
              <Icon size={16} className="text-[#1b3d18]/50 transition-colors duration-200 group-hover:text-[#F5824A] group-hover:scale-110 transform transition-transform" />
              <span>{label}</span>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5824A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}