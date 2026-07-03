import Link from "next/link";
import { Keyboard, Grid3x3, HelpCircle, Zap, Bug, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const games = [
  { label: "Dev Typing Challenge", icon: Keyboard },
  { label: "Tech Memory Match", icon: Grid3x3 },
  { label: '"What Stack?" Quiz', icon: HelpCircle },
  { label: "Dev Reflex Test", icon: Zap },
  { label: "Debug Dash", icon: Bug },
];

export function GamesTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal variant="scale" className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-gradient-gold">Take a Break — Play a Game</h2>
        <p className="mt-3 max-w-xl text-brand-muted">
          Five mini games to test your typing speed, memory, dev trivia, and
          reflexes.
        </p>
      </Reveal>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {games.map((game, i) => (
          <Reveal key={game.label} variant={i % 2 === 0 ? "left" : "right"} delay={i * 0.06}>
            <Link
              href="/games"
              className="flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-5 py-3 text-sm text-brand-text transition-colors hover:border-brand-gold hover:text-brand-gold"
            >
              <game.icon size={16} className="text-brand-gold" />
              {game.label}
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="mt-10 flex justify-center">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-background transition-transform hover:scale-105"
        >
          Play Now
          <ArrowRight size={16} />
        </Link>
      </Reveal>
    </section>
  );
}
