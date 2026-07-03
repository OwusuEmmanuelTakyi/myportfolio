"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useChat } from "@/lib/hooks/useChat";
import { ChatMessages } from "./ChatMessages";

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, isStreaming } = useChat();

  if (pathname === "/chat") return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 flex h-125 w-95 max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-brand-border px-4 py-3">
              <p className="font-mono text-sm text-brand-gold">
                Emmanuel&apos;s AI Assistant
              </p>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="text-brand-muted hover:text-brand-gold"
              >
                <X size={18} />
              </button>
            </div>

            <ChatMessages messages={messages} isStreaming={isStreaming} />

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-brand-border p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Emmanuel..."
                className="flex-1 rounded-full border border-brand-border bg-brand-surface px-4 py-2 text-sm text-brand-text outline-none focus:border-brand-gold"
              />
              <button
                type="submit"
                disabled={isStreaming || !input.trim()}
                aria-label="Send"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold text-brand-background disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label="Toggle chat"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold text-brand-background shadow-lg"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>
    </div>
  );
}
