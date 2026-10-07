import type { FC, ReactNode } from "react";

interface BadgeProps {
  icon: ReactNode;
  label: string;
}

export const Badge: FC<BadgeProps> = ({ icon, label }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm font-medium text-white/90 backdrop-blur-sm">
    <span className="text-[#F5824A]">{icon}</span>
    <span>{label}</span>
  </span>
);