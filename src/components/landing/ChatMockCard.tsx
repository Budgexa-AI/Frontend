import { TrendingUp, Mic, Send } from "lucide-react";
import RayoLogo from '@/components/icons/RayoLogo'

const messages = [
  {
    from: "rayo",
    text: "Morning, Ade! 👋 Your paycheck just hit.\n\nBased on your goals, setting aside ₦7,000 for your Travel Fund would keep you on track.",
  },
  {
    from: "user",
    text: "Nice. How much can I safely spend on dinner tonight?",
  },
  {
    from: "rayo",
    text: "After your upcoming bills and savings goals, you have about ₦4,500 safe-to-spend today. 🍕",
  },
];

export default function ChatMockCard() {
  return (
    <div
      className="relative w-full max-w-sm rounded-3xl bg-[#FFFFFF] shadow-card-lg border border-rayo-beige-dark"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Floating savings badge */}
      <div className="absolute right-1 top-2 -translate-y-1/2 -translate-x-1">
        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-2.5 shadow-lg">
          
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rayo-lemon">
            <TrendingUp size={14} className="text-rayo-green" />
          </div>

          <div className="leading-tight">
            <p className="text-[10px] font-semibold tracking-wide text-rayo-text-muted uppercase">
              SAVINGS GROWTH
            </p>
            <p className="text-sm font-bold text-rayo-orange">
              +24%
            </p>
          </div>

        </div>
      </div>

      {/* Time */}
      <div className="px-5 pt-4 pb-1">
        <span className="text-xs font-semibold text-rayo-green/50">
          9:41
        </span>
      </div>

      {/* Date */}
      <p className="text-center text-[11px] text-rayo-green/40 font-medium">
        Today
      </p>

      {/* Messages */}
      <div className="bg-[#F6F6F4] rounded-3xl m-2 mt-1 px-3 space-y-4 pb-3 pt-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.from === "rayo" && (
              <span className="h-7 w-7 rounded-full bg-rayo-green/20 flex items-center justify-center text-xs font-bold text-rayo-green mr-2 mt-0.5 shrink-0">
                <RayoLogo className="text-rayo-green" size={16} />
              </span>
            )}

            <div
              className={`max-w-[75%] rounded-2xl px-5 py-3 text-sm leading-snug whitespace-pre-line ${
                msg.from === "user"
                  ? "bg-rayo-green text-white rounded-tr-sm"
                  : "bg-rayo-beige-dark/60 text-rayo-green rounded-tl-sm border border-rayo-beige/60"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 pb-5">
        <div className="flex items-center gap-2 rounded-full border border-rayo-beige-dark fg-rayo-beige px-4 py-2.5">
          
          <Mic size={15} className="text-rayo-green/40" />

          <span className="flex-1 text-sm text-rayo-green/40">
            Ask Rayo anything…
          </span>

          <button className="h-8 w-8 rounded-full bg-rayo-green flex items-center justify-center">
            <Send size={14} className="text-white" />
          </button>

        </div>
      </div>
    </div>
  );
}