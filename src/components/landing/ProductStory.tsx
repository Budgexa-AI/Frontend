// components/landing/ProductStorySection.tsx
export default function ProductStorySection() {
  return (
    <section id="how-it-works" className="grid grid-cols-1 border-b border-[#e5e2db] bg-[#F7F5EE] lg:grid-cols-2">
      {/* Card 1: One dashboard */}
      <div className="border-b border-[#e5e2db] p-8 sm:p-10 lg:border-b-0 lg:border-r">
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[44%_56%]">
          {/* Card Mockup */}
          <div className="flex justify-center">
            <div className="w-[175px] rounded-2xl bg-white p-4 shadow-md border border-[#e5e2db]/80 transition-transform hover:-translate-y-1">
              <p className="text-[9px] font-medium text-[#1b3d18]/60">Budget overview</p>
              <p className="mt-1 font-bold text-lg text-[#1b3d18] font-sans">₦24,650</p>
              <div className="mt-3 space-y-1.5">
                <div className="h-2 rounded bg-[#EFECE4]" />
                <div className="h-5 rounded-lg bg-[#F5F3ED]" />
                <div className="h-5 rounded-lg bg-[#F5F3ED]" />
                <div className="h-6 rounded-lg bg-[#1b3d18]" />
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] leading-tight">
              One dashboard.
              <br />
              No jargon. No shame.
            </h3>
            <p className="mt-3 text-xs sm:text-[12.5px] leading-relaxed text-[#1b3d18]/75">
              Log your spending, set a goal that actually fits your income, and ask Budgexa what
              your numbers mean, in plain language. The app stays simple. The thinking happens
              behind the scenes.
            </p>
          </div>
        </div>
      </div>

      {/* Card 2: Make an impact */}
      <div className="p-8 sm:p-10">
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[44%_56%]">
          {/* Card Mockup */}
          <div className="flex justify-center">
            <div className="w-[175px] rounded-2xl bg-white p-4 shadow-md border border-[#e5e2db]/80 transition-transform hover:-translate-y-1">
              <p className="text-[8px] font-bold tracking-wider uppercase text-[#1b3d18]/60">
                BUDGEXA · TODAY
              </p>
              <p className="mt-1 font-bold text-lg text-[#1b3d18] font-sans">₦12,000</p>
              <p className="text-[8px] text-[#1b3d18]/60">Safe-to-spend</p>

              <div className="mt-2.5 space-y-1.5 text-[9px]">
                <div className="flex justify-between items-center rounded-md bg-[#F6F5F0] px-2 py-1">
                  <span className="text-[#1b3d18]/70">Groceries</span>
                  <span className="font-semibold text-[#1b3d18]">₦6,200</span>
                </div>
                <div className="flex justify-between items-center rounded-md bg-[#F6F5F0] px-2 py-1">
                  <span className="text-[#1b3d18]/70">Transport</span>
                  <span className="font-semibold text-[#1b3d18]">₦1,500</span>
                </div>
                <div className="flex justify-between items-center rounded-md bg-[#F5824A] text-[#1b3d18] px-2 py-1 font-semibold">
                  <span>Saving goal</span>
                  <span>72%</span>
                </div>
                <div className="rounded-md bg-[#1b3d18] px-2 py-1 text-white text-[8px] leading-tight">
                  AI: You&apos;re still on track this week.
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1b3d18] leading-tight">
              Make an impact on your money, not just your dashboard.
            </h3>
            <p className="mt-3 text-xs sm:text-[12.5px] leading-relaxed text-[#1b3d18]/75">
              Budgexa turns raw transactions into useful decisions. Track every naira, spot
              patterns, and get personalized guidance using your own financial data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}