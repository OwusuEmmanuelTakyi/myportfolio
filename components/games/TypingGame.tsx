"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { typingSnippets } from "@/lib/games-data";

type Score = { wpm: number; accuracy: number; date: string };

const STORAGE_KEY = "typingLeaderboard";

function loadLeaderboard(): Score[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function computeStats(snippet: string, input: string, elapsedMs: number) {
  const minutes = Math.max(elapsedMs, 1) / 60000;
  const words = snippet.trim().split(/\s+/).length;
  const progressWords = input.length > 0 ? words * (input.length / snippet.length) : 0;
  const wpm = elapsedMs > 0 ? Math.max(0, Math.round(progressWords / minutes)) : 0;

  let correct = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === snippet[i]) correct++;
  }
  const accuracy = input.length > 0 ? Math.round((correct / input.length) * 100) : 100;

  return { wpm, accuracy, correct };
}

export function TypingGame() {
  const [snippet, setSnippet] = useState(
    () => typingSnippets[Math.floor(Math.random() * typingSnippets.length)]
  );
  const [input, setInput] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [result, setResult] = useState<Score | null>(null);
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setLeaderboard(loadLeaderboard());
  }, []);

  const finished = input.length >= snippet.length;

  useEffect(() => {
    if (!startedAt || finished) return;
    const timer = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(timer);
  }, [startedAt, finished]);

  const elapsedMs = startedAt ? (now ?? startedAt) - startedAt : 0;
  const live = computeStats(snippet, input, elapsedMs);
  const progress = Math.min(100, Math.round((input.length / snippet.length) * 100));

  useEffect(() => {
    if (finished && startedAt && !result) {
      const totalMs = Date.now() - startedAt;
      const minutes = totalMs / 60000;
      const words = snippet.trim().split(/\s+/).length;
      const wpm = Math.max(1, Math.round(words / minutes));

      let correct = 0;
      for (let i = 0; i < snippet.length; i++) {
        if (input[i] === snippet[i]) correct++;
      }
      const accuracy = Math.round((correct / snippet.length) * 100);

      const score: Score = { wpm, accuracy, date: new Date().toLocaleDateString() };
      const updated = [...leaderboard, score].sort((a, b) => b.wpm - a.wpm).slice(0, 5);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setLeaderboard(updated);
      setResult(score);
    }
  }, [finished, startedAt, result, snippet, input, leaderboard]);

  const rendered = useMemo(
    () =>
      snippet.split("").map((char, i) => {
        let className = "text-brand-muted";
        if (i < input.length) {
          className = input[i] === char ? "text-brand-gold" : "bg-red-500/20 text-red-500 underline";
        } else if (i === input.length) {
          className = "text-brand-text border-l-2 border-brand-gold animate-pulse";
        }
        return (
          <span key={i} className={className}>
            {char}
          </span>
        );
      }),
    [snippet, input]
  );

  function reset() {
    setSnippet(typingSnippets[Math.floor(Math.random() * typingSnippets.length)]);
    setInput("");
    setStartedAt(null);
    setNow(null);
    setResult(null);
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-text">Dev Typing Challenge</h2>
      <p className="mt-1 text-sm text-brand-muted">
        Type the snippet below as fast and accurately as you can.
      </p>

      <div className="mt-4 flex gap-6 font-mono text-sm">
        <motion.span key={live.wpm} initial={{ scale: 1.15 }} animate={{ scale: 1 }} className="text-brand-gold">
          {live.wpm} WPM
        </motion.span>
        <span className="text-brand-gold">{live.accuracy}% accuracy</span>
        <span className="text-brand-muted">{(elapsedMs / 1000).toFixed(1)}s</span>
      </div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-brand-surface">
        <motion.div
          className="h-full bg-brand-gold"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.15 }}
        />
      </div>

      <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-brand-border bg-brand-surface p-4 font-mono text-sm leading-relaxed">
        {rendered}
      </pre>

      <textarea
        ref={textareaRef}
        value={input}
        disabled={finished}
        onChange={(e) => {
          if (!startedAt) {
            const start = Date.now();
            setStartedAt(start);
            setNow(start);
          }
          setInput(e.target.value);
        }}
        rows={4}
        placeholder="Start typing here..."
        className="mt-4 w-full rounded-xl border border-brand-border bg-brand-surface p-4 font-mono text-sm text-brand-text outline-none focus:border-brand-gold"
      />

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-xl border border-brand-gold bg-brand-surface p-4"
        >
          <p className="text-brand-text">
            <span className="text-brand-gold">{result.wpm} WPM</span> ·{" "}
            {result.accuracy}% accuracy
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-3 rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-background"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {leaderboard.length > 0 && (
        <div className="mt-8">
          <h3 className="font-mono text-sm uppercase tracking-wider text-brand-gold">
            Leaderboard
          </h3>
          <ol className="mt-3 space-y-1 text-sm text-brand-text">
            {leaderboard.map((score, i) => (
              <li key={i} className="flex justify-between border-b border-brand-border py-1">
                <span>#{i + 1}</span>
                <span>{score.wpm} WPM</span>
                <span>{score.accuracy}%</span>
                <span className="text-brand-muted">{score.date}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
