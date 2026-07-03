"use client";

import { useEffect, useState } from "react";
import { Share2, Link2, Check } from "lucide-react";
import { XIcon, WhatsAppIcon, LinkedinIcon } from "@/components/icons/SocialIcons";

export function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
    setCanNativeShare(typeof navigator.share === "function");
  }, []);

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // user cancelled — ignore
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const shareLinks = [
    {
      label: "Share on X",
      icon: XIcon,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "Share on WhatsApp",
      icon: WhatsAppIcon,
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
    {
      label: "Share on LinkedIn",
      icon: LinkedinIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-brand-muted">Share:</span>

      {canNativeShare && (
        <button
          type="button"
          onClick={nativeShare}
          aria-label="Share"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-border text-brand-muted transition-colors hover:border-brand-gold hover:text-brand-gold"
        >
          <Share2 size={16} />
        </button>
      )}

      {shareLinks.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-border text-brand-muted transition-colors hover:border-brand-gold hover:text-brand-gold"
        >
          <Icon size={16} />
        </a>
      ))}

      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-border text-brand-muted transition-colors hover:border-brand-gold hover:text-brand-gold"
      >
        {copied ? <Check size={16} className="text-brand-gold" /> : <Link2 size={16} />}
      </button>
    </div>
  );
}
