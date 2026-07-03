import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/ui/BlogCard";

export const metadata: Metadata = {
  title: "Blog — Owusu Emmanuel Takyi",
  description: "Writing on building AI products, startups, and software in Ghana.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="text-4xl font-bold text-brand-text sm:text-5xl">Blog</h1>
      <p className="mt-4 max-w-2xl text-lg text-brand-muted">
        Notes on building AI products, startups, and software for Ghana and
        beyond.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
