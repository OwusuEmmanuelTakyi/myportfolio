"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Full-Stack Developer",
  "AI Builder",
  "Startup Founder",
  "Problem Solver",
];

const TYPE_SPEED = 70;
const DELETE_SPEED = 40;
const HOLD_MS = 1600;

export function Typewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIndex];

    if (!deleting && text === current) {
      const hold = setTimeout(() => setDeleting(true), HOLD_MS);
      return () => clearTimeout(hold);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        );
      },
      deleting ? DELETE_SPEED : TYPE_SPEED
    );

    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIndex]);

  return (
    <span className="text-brand-gold">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}
