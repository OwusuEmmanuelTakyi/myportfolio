import {
  Atom,
  Triangle,
  FileCode2,
  Paintbrush,
  Server,
  Route,
  Database,
  Bot,
  Layers,
  Zap,
  Cloud,
  Rocket,
  GitBranch,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const techs: { label: string; icon: LucideIcon }[] = [
  { label: "React", icon: Atom },
  { label: "Next.js", icon: Triangle },
  { label: "TypeScript", icon: FileCode2 },
  { label: "Tailwind CSS", icon: Paintbrush },
  { label: "Node.js", icon: Server },
  { label: "Express.js", icon: Route },
  { label: "MongoDB", icon: Database },
  { label: "Anthropic API", icon: Bot },
  { label: "Sanity CMS", icon: Layers },
  { label: "Supabase", icon: Zap },
  { label: "AWS S3", icon: Cloud },
  { label: "Vercel", icon: Rocket },
  { label: "Git", icon: GitBranch },
];

export function TechMarquee() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal variant="scale" className="text-center">
        <h2 className="text-3xl font-bold text-gradient-gold">What I Work With</h2>
        <p className="mt-3 text-brand-muted">
          The tools and technologies behind the products I build.
        </p>
      </Reveal>

      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-4">
          {[...techs, ...techs].map((tech, i) => (
            <div
              key={`${tech.label}-${i}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-4 py-2.5 text-sm text-brand-text"
            >
              <tech.icon size={16} className="text-brand-gold" />
              {tech.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
