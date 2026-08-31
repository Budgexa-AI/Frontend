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
    <div className={`inline-flex items-center rounded-lg border border-Budgexa-beige-dark bg-white overflow-hidden ${className ?? ""}`}>

      {/* ← Previous month */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center w-8 h-9 text-Budgexa-green/40 hover:bg-Budgexa-ash hover:text-Budgexa-green border-r border-Budgexa-beige-dark transition-colors"
        aria-label="Previous month"
      >
        <ChevronLeft size={15} strokeWidth={2.2} />
      </button>

      {/* Month label */}
      <div className="flex items-center gap-1.5 px-3 h-9">
        <CalendarDays size={13} className="text-Budgexa-green/30 shrink-0" />
        <span className="text-sm font-medium text-Budgexa-green/70 whitespace-nowrap w-[110px] text-center select-none">
          {display}
        </span>
      </div>

      {/* → Next month */}
      <button
        onClick={() => navigate(1)}
        disabled={isCurrentMonth}
        className="flex items-center justify-center w-8 h-9 border-l border-Budgexa-beige-dark transition-colors
          disabled:text-Budgexa-green/20 disabled:cursor-not-allowed
          enabled:text-Budgexa-green/40 enabled:hover:bg-Budgexa-ash enabled:hover:text-Budgexa-green"
        aria-label="Next month"
      >
        <ChevronRight size={15} strokeWidth={2.2} />
      </button>

    </div>
  );
}