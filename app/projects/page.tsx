import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects — Owusu Emmanuel Takyi",
  description: "Case studies of digital products Owusu Emmanuel Takyi has built for Africa and beyond.",
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="text-4xl font-bold text-brand-text sm:text-5xl">My Work</h1>
      <p className="mt-4 max-w-2xl text-lg text-brand-muted">
        A collection of products I&apos;ve built — AI assistants, fintech
        platforms, organizational websites, and brand launches.
      </p>

      <div className="mt-12">
        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
