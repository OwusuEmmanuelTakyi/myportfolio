"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { memoryTechs } from "@/lib/games-data";
import { Confetti } from "./Confetti";

type Card = { id: number; tech: string; flipped: boolean; matched: boolean };
type BestScore = { moves: number; seconds: number };

const BEST_KEY = "memoryBestScore";

function loadBest(): BestScore | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(BEST_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function shuffle(): Card[] {
  const pairs = [...memoryTechs, ...memoryTechs];
  const shuffled = pairs
    .map((tech, i) => ({ id: i, tech, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5);
  return shuffled.map((card, i) => ({ ...card, id: i }));
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(() => shuffle());
  const [selected, setSelected] = useState<number[]>([]);
  const [mismatch, setMismatch] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [best, setBest] = useState<BestScore | null>(null);
  const [isNewBest, setIsNewBest] = useState(false);
  const won = cards.every((c) => c.matched);

  useEffect(() => {
    setBest(loadBest());
  }, []);

  useEffect(() => {
    if (won) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [won]);

  useEffect(() => {
    if (!won) return;
    const current = { moves, seconds };
    const better =
      !best || moves < best.moves || (moves === best.moves && seconds < best.seconds);
    if (better) {
      localStorage.setItem(BEST_KEY, JSON.stringify(current));
      setBest(current);
      setIsNewBest(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);

  useEffect(() => {
    if (selected.length !== 2) return;
    const [a, b] = selected;
    const match = cards[a].tech === cards[b].tech;

    setMoves((m) => m + 1);

    if (!match) setMismatch([a, b]);

    const timeout = setTimeout(
      () => {
        setCards((prev) =>
          prev.map((c, i) => {
            if (i === a || i === b) {
              return match ? { ...c, matched: true } : { ...c, flipped: false };
            }
            return c;
          })
        );
        setSelected([]);
        setMismatch([]);
      },
      match ? 350 : 750
    );

    return () => clearTimeout(timeout);
  }, [selected, cards]);

  function flip(index: number) {
    if (selected.length === 2) return;
    if (cards[index].flipped || cards[index].matched) return;

    setCards((prev) => prev.map((c, i) => (i === index ? { ...c, flipped: true } : c)));
    setSelected((prev) => [...prev, index]);
  }

  function restart() {
    setCards(shuffle());
    setSelected([]);
    setMismatch([]);
    setMoves(0);
    setSeconds(0);
    setIsNewBest(false);
  }

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-brand-text">Tech Memory Match</h2>
      <p className="mt-1 text-sm text-brand-muted">
        Flip cards to find matching tech pairs.
      </p>

      <div className="mt-4 flex flex-wrap gap-6 font-mono text-sm text-brand-gold">
        <span>Moves: {moves}</span>
        <span>Time: {seconds}s</span>
        {best && (
          <span className="text-brand-muted">
            Best: {best.moves} moves · {best.seconds}s
          </span>
        )}
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
        className="mt-6 grid grid-cols-4 gap-3"
        style={{ perspective: 1000 }}
      >
        {cards.map((card, i) => {
          const isFlipped = card.flipped || card.matched;
          const isMismatch = mismatch.includes(i);
          return (
            <motion.button
              key={card.id}
              type="button"
              onClick={() => flip(i)}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              animate={{
                rotateY: isFlipped ? 180 : 0,
                x: isMismatch ? [0, -6, 6, -6, 0] : 0,
              }}
              transition={{ duration: 0.4 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative h-20 sm:h-24"
            >
              <div
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 flex items-center justify-center rounded-lg border border-brand-border bg-brand-surface text-brand-gold"
              >
                ?
              </div>
              <div
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                className={`absolute inset-0 flex items-center justify-center rounded-lg border text-xs font-semibold sm:text-sm ${
                  card.matched
                    ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                    : "border-brand-gold bg-brand-surface text-brand-text"
                }`}
              >
                {card.tech}
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {won && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mt-8 overflow-hidden rounded-xl border border-brand-gold bg-brand-surface p-6 text-center"
        >
          <Confetti />
          <p className="text-lg font-semibold text-brand-gold">
            You won! 🎉 {isNewBest && "New best score!"}
          </p>
          <p className="mt-1 text-sm text-brand-muted">
            {moves} moves · {seconds}s
          </p>
          <button
            type="button"
            onClick={restart}
            className="mt-4 rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-background"
          >
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
}
