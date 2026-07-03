"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { Project } from "@/lib/projects";

const FILTERS = ["All", "AI", "Fintech", "Web", "Social Impact", "Mobile"] as const;

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((project) => project.tags.includes(filter));
  }, [projects, filter]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-3">
        {FILTERS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setFilter(tag)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === tag
                ? "border-brand-gold bg-brand-gold text-brand-background"
                : "border-brand-border text-brand-muted hover:border-brand-gold hover:text-brand-gold"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((project) => (
          <motion.div key={project.slug} layout>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-brand-muted">
          No projects match this filter yet.
        </p>
      )}
    </div>
  );
}
