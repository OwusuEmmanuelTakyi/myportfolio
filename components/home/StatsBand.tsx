import { projects } from "@/lib/projects";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";

export function StatsBand() {
  const projectsShipped = projects.length;
  const industries = new Set(projects.flatMap((p) => p.tags)).size;
  const technologies = new Set(projects.flatMap((p) => p.stack)).size;
  const yearsBuilding = new Date().getFullYear() - 2023;

  const stats = [
    { value: projectsShipped, suffix: "+", label: "Projects Shipped" },
    { value: industries, suffix: "", label: "Industries Explored" },
    { value: technologies, suffix: "+", label: "Technologies Used" },
    { value: yearsBuilding, suffix: "+", label: "Years Building" },
  ];

  return (
    <section className="relative overflow-hidden border-y border-brand-border/60 bg-grid-lines bg-brand-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} variant="scale" delay={i * 0.1}>
              <div
                className="animate-glow-pulse rounded-xl border border-brand-gold/20 bg-brand-background/40 py-6 text-center backdrop-blur-sm"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <p className="font-mono text-4xl font-bold text-brand-gold sm:text-5xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-brand-muted">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
