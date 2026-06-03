import type { FC, ReactNode } from "react";

interface AudienceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const AudienceCard: FC<AudienceCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-col gap-3.5">
    <div className="w-[52px] h-[52px] bg-[#e8673a]/[0.12] rounded-2xl flex items-center justify-center text-[#e8673a] mb-1">
      {icon}
    </div>
    <h3 className="text-[17px] font-bold text-[#1c3a1e] tracking-tight">{title}</h3>
    <p className="text-sm text-[#5a5a4a] leading-[1.7]">{description}</p>
  </div>
);