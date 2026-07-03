"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Phase = "idle" | "waiting" | "ready" | "too-soon" | "round-result" | "done";

const ROUNDS = 5;
const BEST_KEY = "reactionBestAvg";

function loadBest(): number | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(BEST_KEY);
  return raw ? Number(raw) : null;
}

export function ReactionGame() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [round, setRound] = useState(0);
  const [times, setTimes] = useState<number[]>([]);
  const [best, setBest] = useState<number | null>(null);
  const readyAt = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setBest(loadBest());
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function startRound() {
    setPhase("waiting");
    const delay = 800 + Math.random() * 2500;
    timeoutRef.current = setTimeout(() => {
      readyAt.current = Date.now();
      setPhase("ready");
    }, delay);
  }

  function handleClick() {
    if (phase === "idle") {
      setTimes([]);
      setRound(0);
      startRound();
      return;
    }
    if (phase === "waiting") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPhase("too-soon");
      return;
    }
    if (phase === "ready") {
      const reaction = Date.now() - readyAt.current;
      const nextTimes = [...times, reaction];
      setTimes(nextTimes);
      if (nextTimes.length >= ROUNDS) {
        const avg = Math.round(nextTimes.reduce((a, b) => a + b, 0) / nextTimes.length);
        if (!best || avg < best) {
          localStorage.setItem(BEST_KEY, String(avg));
          setBest(avg);
        }
        setPhase("done");
      } else {
        setRound((r) => r + 1);
        setPhase("round-result");
      }
      return;
    }
    if (phase === "too-soon" || phase === "round-result") {
      startRound();
      return;
    }
    if (phase === "done") {
      setTimes([]);
      setRound(0);
      startRound();
    }
  }

  const avg =
    times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : null;

  const colors: Record<Phase, string> = {
    idle: "bg-brand-surface border-brand-border text-brand-text",
    waiting: "bg-red-500/10 border-red-500 text-red-500",
    ready: "bg-brand-gold border-brand-gold text-brand-background",
    "too-soon": "bg-red-500/10 border-red-500 text-red-500",
    "round-result": "bg-brand-surface border-brand-gold text-brand-gold",
    done: "bg-brand-surface border-brand-gold text-brand-gold",
  };

  const labels: Record<Phase, string> = {
    idle: "Click to Start",
    waiting: "Wait for gold...",
    ready: "Click Now!",
    "too-soon": "Too soon! Click to retry",
    "round-result": `${times[times.length - 1]}ms — Click for round ${round + 1}/${ROUNDS}`,
    done: `Average: ${avg}ms — Click to play again`,
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-text">Dev Reflex Test</h2>
      <p className="mt-1 text-sm text-brand-muted">
        Click as soon as the box turns gold. {ROUNDS} rounds, lowest average wins.
      </p>

      {best && (
        <p className="mt-3 font-mono text-sm text-brand-muted">
          Best average: <span className="text-brand-gold">{best}ms</span>
        </p>
      )}

      <motion.button
        type="button"
        onClick={handleClick}
        animate={{ scale: phase === "ready" ? [1, 1.02, 1] : 1 }}
        transition={{ duration: 0.3 }}
        className={`mt-6 flex h-64 w-full items-center justify-center rounded-2xl border-2 text-lg font-semibold transition-colors sm:h-80 ${colors[phase]}`}
      >
        {labels[phase]}
      </motion.button>

      {times.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-brand-muted">
          {times.map((t, i) => (
            <span key={i} className="rounded-full border border-brand-border px-2 py-1">
              R{i + 1}: {t}ms
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
