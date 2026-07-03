import { Code2, Bot, Globe, Rocket, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const values: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Full-Stack Delivery",
    description:
      "From database to UI, I ship complete, production-ready products end to end — not just prototypes.",
    icon: Code2,
  },
  {
    title: "AI-Native Building",
    description:
      "I integrate AI thoughtfully into real products, like plain-language legal guidance and content generation, not as a gimmick.",
    icon: Bot,
  },
  {
    title: "Africa-First Thinking",
    description:
      "I design for the infrastructure people actually have — USSD fallbacks, low-bandwidth, feature-phone support.",
    icon: Globe,
  },
  {
    title: "Startup Speed",
    description:
      "I move from idea to shipped MVP fast, having built and launched multiple products solo.",
    icon: Rocket,
  },
];

export function WhyWorkWithMe() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal variant="scale" className="text-center">
        <h2 className="text-3xl font-bold text-gradient-gold">Why Work With Me</h2>
        <p className="mt-3 text-brand-muted">
          A few things I bring to every project.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, i) => (
          <Reveal key={value.title} variant="scale" delay={i * 0.1}>
            <div className="group relative h-full overflow-hidden rounded-xl border border-brand-border bg-brand-surface/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold hover:shadow-[0_0_30px_rgba(201,166,70,0.25)]">
              <div className="absolute inset-0 bg-grid-lines opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <value.icon className="text-brand-gold" size={26} />
                <h3 className="mt-4 font-semibold text-brand-text">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                  {value.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
