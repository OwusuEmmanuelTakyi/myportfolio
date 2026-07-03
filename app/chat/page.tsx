"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useChat } from "@/lib/hooks/useChat";
import { ChatMessages } from "@/components/chat/ChatMessages";

const STARTERS = [
  "What projects has Emmanuel built?",
  "Is he available for freelance?",
  "What's his tech stack?",
  "Tell me about the Legal AI project",
];

export default function ChatPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isStreaming } = useChat();

  function submit(text: string) {
    if (!text.trim()) return;
    sendMessage(text);
    setInput("");
  }

  return (
    <section className="mx-auto flex h-[calc(100dvh-4rem)] max-w-3xl flex-col px-6 py-10">
      <h1 className="text-3xl font-bold text-brand-text">
        Ask me anything about Emmanuel
      </h1>

      {messages.length === 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {STARTERS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => submit(q)}
              className="rounded-full border border-brand-border px-4 py-2 text-sm text-brand-text transition-colors hover:border-brand-gold hover:text-brand-gold"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-1 flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-background">
        <ChatMessages messages={messages} isStreaming={isStreaming} />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
          className="flex items-center gap-2 border-t border-brand-border p-4"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Emmanuel's work, skills, or availability..."
            className="flex-1 rounded-full border border-brand-border bg-brand-surface px-4 py-2.5 text-sm text-brand-text outline-none focus:border-brand-gold"
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            aria-label="Send"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold text-brand-background disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
