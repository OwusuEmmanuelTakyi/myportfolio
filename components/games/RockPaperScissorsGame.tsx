"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Hand, Scissors, Mountain, RotateCcw } from "lucide-react";

type Move = "rock" | "paper" | "scissors";
type Phase = "player1" | "pass-to-2" | "player2" | "reveal";

const MOVES: { id: Move; label: string; icon: typeof Hand }[] = [
  { id: "rock", label: "Rock", icon: Mountain },
  { id: "paper", label: "Paper", icon: Hand },
  { id: "scissors", label: "Scissors", icon: Scissors },
];

function beats(a: Move, b: Move) {
  return (
    (a === "rock" && b === "scissors") ||
    (a === "paper" && b === "rock") ||
    (a === "scissors" && b === "paper")
  );
}

export function RockPaperScissorsGame() {
  const [phase, setPhase] = useState<Phase>("player1");
  const [move1, setMove1] = useState<Move | null>(null);
  const [move2, setMove2] = useState<Move | null>(null);
  const [scores, setScores] = useState({ p1: 0, p2: 0, ties: 0 });

  function pickMove1(move: Move) {
    setMove1(move);
    setPhase("pass-to-2");
  }

  function pickMove2(move: Move) {
    setMove2(move);
    setPhase("reveal");
    if (!move1) return;
    if (move1 === move) {
      setScores((s) => ({ ...s, ties: s.ties + 1 }));
    } else if (beats(move1, move)) {
      setScores((s) => ({ ...s, p1: s.p1 + 1 }));
    } else {
      setScores((s) => ({ ...s, p2: s.p2 + 1 }));
    }
  }

  function playAgain() {
    setMove1(null);
    setMove2(null);
    setPhase("player1");
  }

  const outcome =
    move1 && move2
      ? move1 === move2
        ? "It's a tie!"
        : beats(move1, move2)
          ? "Player 1 wins!"
          : "Player 2 wins!"
      : "";

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-text">Rock Paper Scissors</h2>
      <p className="mt-1 text-sm text-brand-muted">
        Two players, one device — pass it back and forth to keep your move secret.
      </p>

      <div className="mt-4 flex gap-6 font-mono text-sm">
        <span className="text-brand-gold">Player 1: {scores.p1}</span>
        <span className="text-brand-gold">Player 2: {scores.p2}</span>
        <span className="text-brand-muted">Ties: {scores.ties}</span>
      </div>

      {phase === "player1" && (
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold text-brand-text">
            Player 1 — choose your move
          </p>
          <div className="mt-6 flex justify-center gap-4">
            {MOVES.map((move) => (
              <motion.button
                key={move.id}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => pickMove1(move.id)}
                className="flex h-24 w-24 flex-col items-center justify-center gap-2 rounded-xl border border-brand-border bg-brand-surface text-brand-text transition-colors hover:border-brand-gold"
              >
                <move.icon size={28} className="text-brand-gold" />
                {move.label}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {phase === "pass-to-2" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 rounded-xl border border-brand-gold bg-brand-surface p-8 text-center"
        >
          <p className="text-lg font-semibold text-brand-text">
            Player 1 has chosen.
          </p>
          <p className="mt-2 text-sm text-brand-muted">
            Pass the device to Player 2 — don&apos;t peek!
          </p>
          <button
            type="button"
            onClick={() => setPhase("player2")}
            className="mt-6 rounded-full bg-brand-gold px-6 py-2.5 text-sm font-semibold text-brand-background"
          >
            I&apos;m Player 2, Ready
          </button>
        </motion.div>
      )}

      {phase === "player2" && (
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold text-brand-text">
            Player 2 — choose your move
          </p>
          <div className="mt-6 flex justify-center gap-4">
            {MOVES.map((move) => (
              <motion.button
                key={move.id}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => pickMove2(move.id)}
                className="flex h-24 w-24 flex-col items-center justify-center gap-2 rounded-xl border border-brand-border bg-brand-surface text-brand-text transition-colors hover:border-brand-gold"
              >
                <move.icon size={28} className="text-brand-gold" />
                {move.label}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {phase === "reveal" && move1 && move2 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <div className="flex items-center justify-center gap-8">
            {[move1, move2].map((move, i) => {
              const Icon = MOVES.find((m) => m.id === move)!.icon;
              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <span className="font-mono text-xs text-brand-muted">
                    Player {i + 1}
                  </span>
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-brand-gold bg-brand-gold/10">
                    <Icon size={32} className="text-brand-gold" />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-xl font-bold text-brand-gold">{outcome}</p>
          <button
            type="button"
            onClick={playAgain}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-background"
          >
            <RotateCcw size={16} />
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
}
