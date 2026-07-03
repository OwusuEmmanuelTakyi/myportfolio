import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { PostStats } from "@/components/ui/PostStats";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Owusu Emmanuel Takyi`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-gold hover:underline"
      >
        <ArrowLeft size={16} />
        Back to Blog
      </Link>

      <div className="mt-8 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="font-mono text-xs text-brand-gold">
            #{tag}
          </span>
        ))}
      </div>

      <h1 className="mt-4 text-4xl font-bold text-brand-text sm:text-5xl">
        {post.title}
      </h1>

      <div className="mt-4 flex items-center gap-3 text-sm text-brand-muted">
        <ImagePlaceholder
          label="OT"
          className="h-9 w-9 shrink-0 rounded-full"
        />
        <span>Owusu Emmanuel Takyi</span>
        <span>·</span>
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <PostStats slug={post.slug} />
        <ShareButtons title={post.title} />
      </div>

      <ImagePlaceholder
        label={post.coverImage}
        className="mt-10 h-64 w-full rounded-xl sm:h-80"
      />

      <div className="prose mt-10 max-w-none prose-headings:text-brand-text prose-p:text-brand-text prose-li:text-brand-text prose-a:text-brand-gold prose-strong:text-brand-text prose-blockquote:text-brand-muted prose-blockquote:border-brand-gold">
        <MDXRemote source={post.content} />
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-brand-border pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-gold hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>
        <ShareButtons title={post.title} />
      </div>
    </article>
  );
}
