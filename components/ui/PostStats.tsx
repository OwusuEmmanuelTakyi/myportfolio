"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";

export function PostStats({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(localStorage.getItem(`liked:${slug}`) === "true");

    fetch(`/api/blog/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setViews(data.views);
        setLikes(data.likes);
      })
      .catch(() => {
        setViews(0);
        setLikes(0);
      });

    const viewedKey = `viewed:${slug}`;
    if (sessionStorage.getItem(viewedKey)) return;
    sessionStorage.setItem(viewedKey, "true");

    fetch(`/api/blog/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "view" }),
    })
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch(() => {});
  }, [slug]);

  async function toggleLike() {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikes((prev) => (prev ?? 0) + (nextLiked ? 1 : -1));
    localStorage.setItem(`liked:${slug}`, String(nextLiked));

    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: nextLiked ? "like" : "unlike" }),
      });
      const data = await res.json();
      if (typeof data.likes === "number") setLikes(data.likes);
    } catch {
      // optimistic update stands if the request fails
    }
  }

  return (
    <div className="flex items-center gap-5 text-sm text-brand-muted">
      <span className="inline-flex items-center gap-1.5">
        <Eye size={16} />
        {views ?? "—"} views
      </span>

      <button
        type="button"
        onClick={toggleLike}
        className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-gold"
      >
        <motion.span whileTap={{ scale: 1.3 }} className="inline-flex">
          <Heart
            size={16}
            className={liked ? "fill-brand-gold text-brand-gold" : ""}
          />
        </motion.span>
        {likes ?? "—"}
      </button>
    </div>
  );
}
