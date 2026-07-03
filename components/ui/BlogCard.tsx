"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ImagePlaceholder } from "./ImagePlaceholder";
import type { BlogPost } from "@/lib/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="overflow-hidden rounded-xl border border-brand-border bg-brand-surface"
    >
      <Link href={`/blog/${post.slug}`}>
        <ImagePlaceholder label={post.coverImage} className="h-40 w-full" />
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="font-mono text-xs text-brand-gold">
                #{tag}
              </span>
            ))}
          </div>
          <h3 className="mt-3 text-lg font-semibold text-brand-text">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-brand-muted">{post.excerpt}</p>
          <div className="mt-4 text-xs text-brand-muted">
            {post.date} · {post.readingTime}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
