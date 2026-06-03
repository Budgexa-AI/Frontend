import type { FC, ReactNode } from "react";

interface BadgeProps {
  icon: ReactNode;
  label: string;
}

export const Badge: FC<BadgeProps> = ({ icon, label }) => (
  <span className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/[0.15] rounded-full px-[18px] py-2 text-[#e5e0d0]/90 text-[13px] font-medium">
    <span className="text-[#e8673a]">{icon}</span>
    {label}
  </span>
);