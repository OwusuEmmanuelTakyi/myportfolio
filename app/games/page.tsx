"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Keyboard,
  Grid3x3,
  HelpCircle,
  Zap,
  Bug,
  Hash,
  Hand,
} from "lucide-react";
import { TypingGame } from "@/components/games/TypingGame";
import { MemoryGame } from "@/components/games/MemoryGame";
import { CodeQuiz } from "@/components/games/CodeQuiz";
import { ReactionGame } from "@/components/games/ReactionGame";
import { BugSquashGame } from "@/components/games/BugSquashGame";
import { TicTacToeGame } from "@/components/games/TicTacToeGame";
import { RockPaperScissorsGame } from "@/components/games/RockPaperScissorsGame";

type GameId =
  | "typing"
  | "memory"
  | "quiz"
  | "reaction"
  | "bugsquash"
  | "tictactoe"
  | "rps";

const games: { id: GameId; title: string; description: string; icon: typeof Keyboard }[] = [
  {
    id: "typing",
    title: "Dev Typing Challenge",
    description: "Type a code snippet as fast and accurately as you can.",
    icon: Keyboard,
  },
  {
    id: "memory",
    title: "Tech Memory Match",
    description: "Flip cards to find matching tech pairs.",
    icon: Grid3x3,
  },
  {
    id: "quiz",
    title: '"What Stack?" Quiz',
    description: "Guess the framework or language from a code snippet.",
    icon: HelpCircle,
  },
  {
    id: "reaction",
    title: "Dev Reflex Test",
    description: "Click the instant the box turns gold. 5 rounds, lowest average wins.",
    icon: Zap,
  },
  {
    id: "bugsquash",
    title: "Debug Dash",
    description: "Squash bugs before they escape. 30 seconds on the clock.",
    icon: Bug,
  },
  {
    id: "tictactoe",
    title: "Tic-Tac-Toe",
    description: "Two-player classic — great for two people sharing one device.",
    icon: Hash,
  },
  {
    id: "rps",
    title: "Rock Paper Scissors",
    description: "Two-player, pass-the-device style with a secret reveal.",
    icon: Hand,
  },
];

export default function GamesPage() {
  const [active, setActive] = useState<GameId | null>(null);

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-bold text-brand-text sm:text-5xl">
        Games Hub
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-brand-muted">
        A few mini games I built to test your dev knowledge and reflexes.
      </p>

      <AnimatePresence mode="wait">
        {active ? (
          <motion.div
            key="active-game"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="mt-12"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-brand-gold hover:underline"
            >
              <ArrowLeft size={16} />
              Back to Games
            </button>
            {active === "typing" && <TypingGame />}
            {active === "memory" && <MemoryGame />}
            {active === "quiz" && <CodeQuiz />}
            {active === "reaction" && <ReactionGame />}
            {active === "bugsquash" && <BugSquashGame />}
            {active === "tictactoe" && <TicTacToeGame />}
            {active === "rps" && <RockPaperScissorsGame />}
          </motion.div>
        ) : (
          <motion.div
            key="games-grid"
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {games.map((game) => (
              <motion.button
                key={game.id}
                type="button"
                onClick={() => setActive(game.id)}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -6, boxShadow: "0 0 30px rgba(201,166,70,0.3)" }}
                className="rounded-xl border-t-2 border-brand-gold bg-brand-surface p-6 text-left"
              >
                <game.icon className="text-brand-gold" size={28} />
                <h2 className="mt-4 font-semibold text-brand-text">{game.title}</h2>
                <p className="mt-2 text-sm text-brand-muted">{game.description}</p>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
