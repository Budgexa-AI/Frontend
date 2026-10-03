import type { FC, ReactNode } from "react";

interface AudienceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  tag?: string;
}

export const AudienceCard: FC<AudienceCardProps> = ({ icon, title, description, tag }) => (
  <div className="group relative flex flex-col justify-between rounded-3xl border border-[#e5e2db] bg-white p-7 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#1b3d18]/25 hover:shadow-md">
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7F5EE] border border-[#e5e2db] text-[#1b3d18] transition-colors group-hover:bg-[#F5824A]/10 group-hover:text-[#F5824A] group-hover:border-[#F5824A]/25">
          {icon}
        </div>
        {tag && (
          <span className="rounded-full bg-[#F7F5EE] border border-[#d9d6cf] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1b3d18]/70">
            {tag}
          </span>
        )}
      </div>

      <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1b3d18] mb-3">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-[#1b3d18]/70 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);