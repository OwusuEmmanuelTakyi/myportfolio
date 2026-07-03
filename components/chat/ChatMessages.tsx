import { LoadingDots } from "./LoadingDots";
import type { ChatMessage } from "@/lib/hooks/useChat";

export function ChatMessages({
  messages,
  isStreaming,
}: {
  messages: ChatMessage[];
  isStreaming: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
      {messages.length === 0 && (
        <p className="text-sm text-brand-muted">
          Ask me anything about Emmanuel — his projects, skills, or
          availability.
        </p>
      )}
      {messages.map((message, i) => (
        <div
          key={i}
          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
            message.role === "user"
              ? "self-end bg-brand-gold text-brand-background"
              : "self-start bg-brand-surface text-brand-text"
          }`}
        >
          {message.content === "" && isStreaming && i === messages.length - 1 ? (
            <LoadingDots />
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>
      ))}
    </div>
  );
}
