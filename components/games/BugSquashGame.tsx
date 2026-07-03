"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bug } from "lucide-react";

type GameState = "idle" | "playing" | "done";
type ActiveBug = { id: number; cell: number };

const GRID_SIZE = 16;
const GAME_SECONDS = 30;
const BUG_LIFETIME_MS = 900;
const BEST_KEY = "bugSquashBestScore";

function loadBest(): number {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem(BEST_KEY) ?? 0);
}

export function BugSquashGame() {
  const [state, setState] = useState<GameState>("idle");
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [bugs, setBugs] = useState<ActiveBug[]>([]);
  const [best, setBest] = useState(0);
  const nextId = useRef(0);
  const spawnTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bugsRef = useRef<ActiveBug[]>([]);

  useEffect(() => {
    bugsRef.current = bugs;
  }, [bugs]);

  useEffect(() => {
    setBest(loadBest());
  }, []);

  useEffect(() => {
    if (state !== "playing") return;
    const countdown = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(countdown);
          setState("done");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [state]);

  useEffect(() => {
    if (state !== "playing") {
      if (spawnTimeout.current) clearTimeout(spawnTimeout.current);
      return;
    }

    function spawn() {
      setBugs((prev) => {
        if (prev.length >= 3) return prev;
        const occupied = new Set(prev.map((b) => b.cell));
        const free = Array.from({ length: GRID_SIZE }, (_, i) => i).filter(
          (i) => !occupied.has(i)
        );
        if (free.length === 0) return prev;
        const cell = free[Math.floor(Math.random() * free.length)];
        const id = nextId.current++;

        setTimeout(() => {
          if (bugsRef.current.some((b) => b.id === id)) {
            setMisses((m) => m + 1);
            setBugs((current) => current.filter((b) => b.id !== id));
          }
        }, BUG_LIFETIME_MS);

        return [...prev, { id, cell }];
      });

      spawnTimeout.current = setTimeout(spawn, 500 + Math.random() * 500);
    }

    spawnTimeout.current = setTimeout(spawn, 400);
    return () => {
      if (spawnTimeout.current) clearTimeout(spawnTimeout.current);
    };
  }, [state]);

  useEffect(() => {
    if (state !== "done") return;
    if (score > best) {
      localStorage.setItem(BEST_KEY, String(score));
      setBest(score);
    }
  }, [state, score, best]);

  function squash(cell: number) {
    setBugs((prev) => {
      const hit = prev.find((b) => b.cell === cell);
      if (!hit) return prev;
      setScore((s) => s + 1);
      return prev.filter((b) => b.id !== hit.id);
    });
  }

  function start() {
    setState("playing");
    setTimeLeft(GAME_SECONDS);
    setScore(0);
    setMisses(0);
    setBugs([]);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-text">Debug Dash</h2>
      <p className="mt-1 text-sm text-brand-muted">
        Squash bugs before they escape. {GAME_SECONDS} seconds on the clock.
      </p>

      <div className="mt-4 flex flex-wrap gap-6 font-mono text-sm text-brand-gold">
        <span>Score: {score}</span>
        <span>Time: {timeLeft}s</span>
        <span className="text-brand-muted">Best: {best}</span>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-3">
        {Array.from({ length: GRID_SIZE }, (_, cell) => {
          const bug = bugs.find((b) => b.cell === cell);
          return (
            <button
              key={cell}
              type="button"
              onClick={() => squash(cell)}
              disabled={state !== "playing"}
              className="relative flex h-16 items-center justify-center overflow-hidden rounded-lg border border-brand-border bg-brand-surface sm:h-20"
            >
              <AnimatePresence>
                {bug && (
                  <motion.span
                    key={bug.id}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Bug className="text-brand-gold" size={26} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      {state !== "playing" && (
        <div className="mt-6 text-center">
          {state === "done" && (
            <p className="mb-3 text-brand-text">
              Final score: <span className="text-brand-gold">{score}</span> · Missed:{" "}
              {misses}
            </p>
          )}
          <button
            type="button"
            onClick={start}
            className="rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-background"
          >
            {state === "idle" ? "Start Game" : "Play Again"}
          </button>
        </div>
      )}
    </div>
  );
}
