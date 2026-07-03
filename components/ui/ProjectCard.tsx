"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ImagePlaceholder } from "./ImagePlaceholder";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6, boxShadow: "0 0 30px rgba(201,166,70,0.3)" }}
      className="group overflow-hidden rounded-xl border-t-2 border-brand-gold bg-brand-surface"
    >
      <Link href={`/projects/${project.slug}`}>
        <ImagePlaceholder label={project.title} className="h-40 w-full" />
        <div className="p-6">
          <h3 className="text-lg font-semibold text-brand-text">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-brand-muted">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-brand-border px-2.5 py-1 font-mono text-xs text-brand-gold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
