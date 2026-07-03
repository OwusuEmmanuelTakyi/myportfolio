"use client";

import { motion } from "framer-motion";
import {
  Atom,
  Triangle,
  FileCode2,
  Paintbrush,
  Server,
  Route,
  Database,
  Bot,
  Search,
  Sparkles,
  Layers,
  Zap,
  Cloud,
  Rocket,
  GitBranch,
  Frame,
  PenTool,
  Camera,
  type LucideIcon,
} from "lucide-react";

type Skill = { label: string; icon: LucideIcon };

const skillGroups: { category: string; skills: Skill[] }[] = [
  {
    category: "Frontend",
    skills: [
      { label: "React", icon: Atom },
      { label: "Next.js", icon: Triangle },
      { label: "TypeScript", icon: FileCode2 },
      { label: "Tailwind CSS", icon: Paintbrush },
    ],
  },
  {
    category: "Backend",
    skills: [
      { label: "Node.js", icon: Server },
      { label: "Express.js", icon: Route },
      { label: "MongoDB", icon: Database },
    ],
  },
  {
    category: "AI/ML",
    skills: [
      { label: "Anthropic API", icon: Bot },
      { label: "RAG", icon: Search },
      { label: "Prompt Engineering", icon: Sparkles },
    ],
  },
  {
    category: "Tools",
    skills: [
      { label: "Sanity CMS", icon: Layers },
      { label: "Supabase", icon: Zap },
      { label: "AWS S3", icon: Cloud },
      { label: "Vercel", icon: Rocket },
      { label: "Git", icon: GitBranch },
    ],
  },
  {
    category: "Design",
    skills: [
      { label: "Figma", icon: Frame },
      { label: "Graphic Design", icon: PenTool },
      { label: "Photography", icon: Camera },
    ],
  },
];

export function SkillsGrid() {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {skillGroups.map((group) => (
        <div key={group.category}>
          <h3 className="font-mono text-sm uppercase tracking-wider text-brand-gold">
            {group.category}
          </h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {group.skills.map((skill) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 rounded-lg border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-text"
              >
                <skill.icon size={16} className="text-brand-gold" />
                {skill.label}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
