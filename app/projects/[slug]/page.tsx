import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projects, getProjectBySlug } from "@/lib/projects";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { GithubIcon } from "@/components/icons/SocialIcons";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Owusu Emmanuel Takyi`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-gold hover:underline"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </Link>

      <div className="mt-8 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-brand-border px-3 py-1 text-xs font-medium text-brand-gold"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mt-4 text-4xl font-bold text-brand-text sm:text-5xl">
        {project.title}
      </h1>
      <p className="mt-4 text-lg text-brand-muted">{project.description}</p>

      <ImagePlaceholder
        label={project.image}
        className="mt-10 h-64 w-full rounded-xl sm:h-80"
      />

      <div className="mt-10 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-brand-border px-2.5 py-1 font-mono text-xs text-brand-gold"
          >
            {tech}
          </span>
        ))}
      </div>

      {(project.liveUrl || project.githubUrl || project.secondaryUrl) && (
        <div className="mt-6 flex flex-wrap gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-background"
            >
              <ExternalLink size={16} />
              Live Site
            </a>
          )}
          {project.secondaryUrl && (
            <a
              href={project.secondaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand-border px-5 py-2.5 text-sm font-semibold text-brand-text hover:border-brand-gold hover:text-brand-gold"
            >
              <ExternalLink size={16} />
              {project.secondaryLabel ?? "Learn More"}
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand-border px-5 py-2.5 text-sm font-semibold text-brand-text hover:border-brand-gold hover:text-brand-gold"
            >
              <GithubIcon size={16} />
              Source
            </a>
          )}
        </div>
      )}

      <div className="mt-16 space-y-10 border-t border-brand-border pt-10">
        <section>
          <h2 className="text-sm font-mono uppercase tracking-wider text-brand-gold">
            Problem
          </h2>
          <p className="mt-3 text-lg text-brand-text">{project.problem}</p>
        </section>
        <section>
          <h2 className="text-sm font-mono uppercase tracking-wider text-brand-gold">
            Solution
          </h2>
          <p className="mt-3 text-lg text-brand-text">{project.solution}</p>
        </section>
        <section>
          <h2 className="text-sm font-mono uppercase tracking-wider text-brand-gold">
            Outcome
          </h2>
          <p className="mt-3 text-lg text-brand-text">{project.outcome}</p>
        </section>
      </div>
    </article>
  );
}
