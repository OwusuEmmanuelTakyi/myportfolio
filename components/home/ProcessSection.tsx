import { Search, PenTool, Code2, Rocket, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const steps: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Discover",
    description: "Understand the real problem before writing a line of code.",
    icon: Search,
  },
  {
    title: "Design",
    description: "Sketch a simple, effective, and scalable solution.",
    icon: PenTool,
  },
  {
    title: "Build",
    description: "Ship a full-stack, production-ready implementation.",
    icon: Code2,
  },
  {
    title: "Ship & Iterate",
    description: "Launch, gather feedback, and keep improving.",
    icon: Rocket,
  },
];

export function ProcessSection() {
  return (
    <section className="relative overflow-hidden border-y border-brand-border/60 bg-grid-lines bg-brand-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal variant="scale" className="text-center">
          <h2 className="text-3xl font-bold text-gradient-gold">How I Work</h2>
          <p className="mt-3 text-brand-muted">
            Every project follows the same disciplined process.
          </p>
        </Reveal>

        <div className="relative mt-14 grid gap-8 sm:grid-cols-4">
          <Reveal
            variant="left"
            className="absolute top-6 left-0 right-0 hidden h-px origin-left bg-linear-to-r from-transparent via-brand-gold to-transparent sm:block"
          >
            <div className="h-px w-full bg-linear-to-r from-transparent via-brand-gold to-transparent" />
          </Reveal>
          {steps.map((step, i) => (
            <Reveal key={step.title} variant="scale" delay={i * 0.15} className="relative text-center">
              <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold bg-brand-background animate-glow-pulse">
                <step.icon className="text-brand-gold" size={20} />
              </div>
              <h3 className="mt-4 font-semibold text-brand-text">{step.title}</h3>
              <p className="mt-2 text-sm text-brand-muted">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
