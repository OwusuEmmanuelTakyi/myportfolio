import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal variant="scale" className="mb-10 flex items-end justify-between">
        <h2 className="text-3xl font-bold text-gradient-gold">Featured Work</h2>
        <Link
          href="/projects"
          className="text-sm font-medium text-brand-gold hover:underline"
        >
          View all projects →
        </Link>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
