import Link from "next/link";
import { getFeaturedPosts } from "@/lib/blog";
import { BlogCard } from "@/components/ui/BlogCard";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedBlog() {
  const posts = getFeaturedPosts(2);

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <Reveal variant="scale" className="mb-10 flex items-end justify-between">
        <h2 className="text-3xl font-bold text-gradient-gold">From the Blog</h2>
        <Link
          href="/blog"
          className="text-sm font-medium text-brand-gold hover:underline"
        >
          Read all posts →
        </Link>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
