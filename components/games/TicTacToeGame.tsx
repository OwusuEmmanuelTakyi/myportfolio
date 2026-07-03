"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

type Cell = "X" | "O" | null;

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(board: Cell[]): { winner: Cell; line: number[] } | null {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return null;
}

export function TicTacToeGame() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const result = getWinner(board);
  const isDraw = !result && board.every((cell) => cell !== null);

  function play(index: number) {
    if (board[index] || result || isDraw) return;
    const next = [...board];
    next[index] = turn;
    setBoard(next);

    const nextResult = getWinner(next);
    const nextIsDraw = !nextResult && next.every((cell) => cell !== null);
    if (nextResult) {
      setScores((s) => ({ ...s, [nextResult.winner as "X" | "O"]: s[nextResult.winner as "X" | "O"] + 1 }));
    } else if (nextIsDraw) {
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
    }
    setTurn(turn === "X" ? "O" : "X");
  }

  function newRound() {
    setBoard(Array(9).fill(null));
    setTurn("X");
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-text">Tic-Tac-Toe</h2>
      <p className="mt-1 text-sm text-brand-muted">
        Two players, one device — take turns and pass it around.
      </p>

      <div className="mt-4 flex gap-6 font-mono text-sm">
        <span className="text-brand-gold">Player X: {scores.X}</span>
        <span className="text-brand-gold">Player O: {scores.O}</span>
        <span className="text-brand-muted">Draws: {scores.draws}</span>
      </div>

      <p className="mt-4 text-lg font-semibold text-brand-text">
        {result
          ? `Player ${result.winner} wins!`
          : isDraw
            ? "It's a draw!"
            : `Player ${turn}'s turn`}
      </p>

      <div className="mx-auto mt-6 grid max-w-xs grid-cols-3 gap-3">
        {board.map((cell, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => play(i)}
            whileHover={{ scale: cell ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex h-24 items-center justify-center rounded-xl border text-4xl font-bold ${
              result?.line.includes(i)
                ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                : "border-brand-border bg-brand-surface text-brand-text"
            }`}
          >
            {cell}
          </motion.button>
        ))}
      </div>

      {(result || isDraw) && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex justify-center"
        >
          <button
            type="button"
            onClick={newRound}
            className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-background"
          >
            <RotateCcw size={16} />
            Next Round
          </button>
        </motion.div>
      )}
    </div>
  );
}
