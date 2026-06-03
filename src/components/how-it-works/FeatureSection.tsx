import type { FC } from "react";
import Image from "next/image";

const DashboardImg =
  "https://res.cloudinary.com/dcmnvhhib/image/upload/v1773101280/Rayo_dashboard_qxlj1i.jpg";

const BULLETS = [
  "Auto-detects paycheck deposits",
  "Adjusts for upcoming subscription bills",
  "Sweeps excess cash into high-yield savings",
];

const FilledCheck = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <circle cx="10" cy="10" r="10" fill="#2E5C3E" />
    <path
      d="M6 10L8.5 12.5L14 7"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrendUpIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#0a8740"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
    <polyline points="16 7 22 7 22 13"></polyline>
  </svg>
);

export const FeatureSection: FC = () => (
  <section className="bg-white animate-fade-up-3 py-24">
    <div className="px-6 max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        
        {/* Left — image */}
        <div className="relative w-full max-w-[480px] mx-auto lg:mx-0 isolate pt-4 pl-4">
          
          {/* Beige background */}
          <div className="absolute top-0 left-0 w-[95%] h-[95%] bg-[#F3EFE6] rounded-[2.5rem] -z-10" />

          {/* Teal container */}
          <div className="relative aspect-square w-full bg-[#49b0b5] rounded-[2.5rem] overflow-hidden shadow-sm flex items-center justify-center p-8">
            <div className="relative w-full h-full">
              <Image
                src={DashboardImg}
                alt="Rayo dashboard preview"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Stat chip */}
          <div className="absolute -bottom-6 right-4 lg:-right-12 z-20 bg-white rounded-2xl px-5 py-4 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <div className="w-10 h-10 rounded-full bg-[#e4f5ea] flex items-center justify-center shrink-0">
              <TrendUpIcon />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                Avg. Annual Savings
              </p>
              <p className="font-bold text-xl text-gray-900">
                +₦42,000
              </p>
            </div>
          </div>
        </div>

        {/* Right — copy */}
        <div className="flex flex-col justify-center lg:pl-10">
          <span className="self-start inline-flex items-center bg-[#eef5f0] text-[#2E5C3E] rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-[0.12em] uppercase mb-6">
            Smart Allocation
          </span>

          <h2 className="text-[32px] lg:text-[40px] font-bold text-gray-900 leading-[1.15] mb-6">
            Not just a tracker.<br />
            A financial autopilot.
          </h2>

          <p className="text-[16px] text-gray-500 leading-relaxed mb-8 pr-4">
            Most apps just show you where your money went. Rayo actively moves
            your money to where it should go. Our AI adapts to your monthly
            spending spikes and dips, ensuring you never over-save when bills
            are due.
          </p>

          <ul className="space-y-4">
            {BULLETS.map((b) => (
              <li
                key={b}
                className="flex items-center gap-3 text-[15px] text-gray-600 font-medium"
              >
                <FilledCheck />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
); 