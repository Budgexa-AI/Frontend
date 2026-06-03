"use client";

import React, { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

function getMonthInfo(offset: number): { label: string; year: number; month: number } {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() + offset);
  return {
    label: d.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    year:  d.getFullYear(),
    month: d.getMonth() + 1,
  };
}

type Props = {
  label?: string;
  onClick?: () => void;
  className?: string;
  onMonthChange?: (year: number, month: number, offset: number) => void;
};

export default function DateRange({ label: propLabel, onClick, className, onMonthChange }: Props) {
  const [offset, setOffset] = useState(0);

  const info = getMonthInfo(offset);
  const isCurrentMonth = offset === 0;
  const { label: monthLabel } = info;

  const display = propLabel ?? monthLabel;

  const navigate = (direction: 1 | -1) => {
    const next = offset + direction;
    if (direction === 1 && next > 0) return;
    setOffset(next);
    const nextInfo = getMonthInfo(next);
    onMonthChange?.(nextInfo.year, nextInfo.month, next);
  };

  return (
    <div className={`inline-flex items-center rounded-lg border border-rayo-beige-dark bg-white overflow-hidden ${className ?? ""}`}>

      {/* ← Previous month */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center w-8 h-9 text-rayo-green/40 hover:bg-rayo-ash hover:text-rayo-green border-r border-rayo-beige-dark transition-colors"
        aria-label="Previous month"
      >
        <ChevronLeft size={15} strokeWidth={2.2} />
      </button>

      {/* Month label */}
      <div className="flex items-center gap-1.5 px-3 h-9">
        <CalendarDays size={13} className="text-rayo-green/30 shrink-0" />
        <span className="text-sm font-medium text-rayo-green/70 whitespace-nowrap w-[110px] text-center select-none">
          {display}
        </span>
      </div>

      {/* → Next month */}
      <button
        onClick={() => navigate(1)}
        disabled={isCurrentMonth}
        className="flex items-center justify-center w-8 h-9 border-l border-rayo-beige-dark transition-colors
          disabled:text-rayo-green/20 disabled:cursor-not-allowed
          enabled:text-rayo-green/40 enabled:hover:bg-rayo-ash enabled:hover:text-rayo-green"
        aria-label="Next month"
      >
        <ChevronRight size={15} strokeWidth={2.2} />
      </button>

    </div>
  );
}