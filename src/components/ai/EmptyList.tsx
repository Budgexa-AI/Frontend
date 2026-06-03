"use client";

import { Bot } from "lucide-react";

interface Props {
  onPrompt: (prompt: string) => void;
}

const PROMPTS = [
  "How can I reduce my food spending?",
  "Analyze my spending habits",
  "Can I afford a new phone this month?",
  "Help me save more money",
];

export function EmptyState({
  onPrompt,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="h-14 w-14 rounded-2xl bg-rayo-green/10 flex items-center justify-center">
        <Bot
          size={24}
          className="text-rayo-green"
        />
      </div>

      <h2 className="mt-4 font-bold text-xl text-rayo-green">
        Ask Rayo anything
      </h2>

      <p className="text-sm text-rayo-green/50 mt-2 max-w-md">
        Get personalized financial insights
        based on your actual spending and
        savings habits.
      </p>

      <div className="grid grid-cols-2 gap-2 mt-6 w-full max-w-xl">
        {PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() =>
              onPrompt(prompt)
            }
            className="text-left text-sm px-4 py-3 rounded-xl border border-rayo-beige-dark bg-rayo-ash hover:border-rayo-green transition-all"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}