import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 items-start">
      <div className="h-8 w-8 rounded-full bg-Budgexa-green flex items-center justify-center">
        <Bot
          size={14}
          className="text-white"
        />
      </div>

      <div className="bg-white border border-Budgexa-beige-dark rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-Budgexa-green/40 animate-bounce"
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}