"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { quizQuestions } from "@/lib/games-data";

const BEST_KEY = "quizBestScore";

function loadBest(): number {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem(BEST_KEY) ?? 0);
}

export function CodeQuiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [best, setBest] = useState(0);

  useEffect(() => {
    setBest(loadBest());
  }, []);

  useEffect(() => {
    if (finished && score > best) {
      localStorage.setItem(BEST_KEY, String(score));
      setBest(score);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  const question = quizQuestions[index];
  const progress = Math.round((index / quizQuestions.length) * 100);

  function choose(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    const correct = optionIndex === question.answerIndex;
    if (correct) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (index + 1 < quizQuestions.length) {
        setIndex((i) => i + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 800);
  }

  function restart() {
    setIndex(0);
    setScore(0);
    setStreak(0);
    setSelected(null);
    setFinished(false);
  }

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-brand-text">Quiz Complete!</h2>
        <motion.p
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: "spring" }}
          className="mt-4 text-4xl font-bold text-brand-gold"
        >
          {score} / {quizQuestions.length}
        </motion.p>
        <p className="mt-2 text-sm text-brand-muted">
          Best score: {best} / {quizQuestions.length} · Built by Emmanuel to test
          your dev knowledge.
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-6 rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-background"
        >
          Play Again
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-brand-text">
          {"What Stack?"} Quiz
        </h2>
        <div className="flex items-center gap-3 font-mono text-sm">
          {streak > 1 && <span className="text-brand-gold">🔥 {streak} streak</span>}
          <span className="text-brand-gold">
            {index + 1} / {quizQuestions.length}
          </span>
        </div>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-brand-surface">
        <motion.div
          className="h-full bg-brand-gold"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
        >
          <pre className="mt-6 overflow-x-auto whitespace-pre-wrap rounded-xl border border-brand-border bg-brand-surface p-4 font-mono text-sm text-brand-text">
            {question.code}
          </pre>

          <p className="mt-4 font-medium text-brand-text">{question.question}</p>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {question.options.map((option, i) => {
              const isCorrect = selected !== null && i === question.answerIndex;
              const isWrongPick = selected === i && i !== question.answerIndex;
              return (
                <motion.button
                  key={option}
                  type="button"
                  whileHover={{ scale: selected === null ? 1.02 : 1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => choose(i)}
                  disabled={selected !== null}
                  className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                    isCorrect
                      ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                      : isWrongPick
                        ? "border-red-500 bg-red-500/10 text-red-500"
                        : "border-brand-border bg-brand-surface text-brand-text hover:border-brand-gold"
                  }`}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
