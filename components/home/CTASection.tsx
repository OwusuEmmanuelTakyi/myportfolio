import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function CTASection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal
        variant="scale"
        className="animate-glow-pulse relative overflow-hidden rounded-2xl border border-brand-gold bg-brand-surface p-10 text-center sm:p-16"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(rgba(201,166,70,0.35) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 animate-scan-line bg-linear-to-b from-brand-gold/10 to-transparent" />
        <div className="relative">
          <h2 className="text-3xl font-bold text-gradient-gold sm:text-4xl">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-muted">
            I&apos;m open to freelance work, collaborations, and interesting
            problems — in Ghana and internationally.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-background transition-transform hover:scale-105"
            >
              Get in Touch
            </Link>
            <Link
              href="/chat"
              className="rounded-full border border-brand-gold px-6 py-3 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-background"
            >
              Chat With My AI
            </Link>
          </div>
          <Link
            href="/games"
            className="mt-6 inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-gold"
          >
            <Gamepad2 size={16} />
            Or take a break and play the dev games
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
