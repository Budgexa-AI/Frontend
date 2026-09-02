"use client";

import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  loading: boolean;
  onSend: (message: string) => void;
}

export function ChatInput({ loading, onSend }: Props) {
  const [value, setValue] = useState("");

  function handleSubmit() {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="flex items-end gap-2 bg-Budgexa-ash rounded-2xl border border-Budgexa-beige-dark px-4 py-2.5 focus-within:border-Budgexa-green transition-colors">
      
      <textarea
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Ask Budgexa about your finances…"
        className="flex-1 bg-transparent text-sm text-Budgexa-green placeholder:text-Budgexa-green/35 resize-none outline-none max-h-32"
      />

      <button
        onClick={handleSubmit}
        disabled={!value.trim() || loading}
        className={cn(
          "h-8 w-8 rounded-xl flex items-center justify-center transition-all",
          value.trim() && !loading
            ? "bg-Budgexa-green text-white"
            : "bg-Budgexa-beige-dark text-Budgexa-green/30"
        )}
      >
        <Send size={14} />
      </button>
    </div>
  );
}