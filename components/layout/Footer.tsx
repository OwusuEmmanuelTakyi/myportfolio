"use client";

import { ArrowUp } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
  WhatsAppIcon,
} from "@/components/icons/SocialIcons";
import { cvContact } from "@/lib/cv-data";

const socials = [
  { href: cvContact.githubUrl, label: "GitHub", icon: GithubIcon },
  { href: cvContact.linkedinUrl, label: "LinkedIn", icon: LinkedinIcon },
  { href: "https://twitter.com/", label: "Twitter / X", icon: XIcon },
  { href: "https://wa.me/233593636309", label: "WhatsApp", icon: WhatsAppIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-brand-border/60 bg-brand-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-brand-muted">
          Built by Owusu Emmanuel Takyi — Accra, Ghana 🇬🇭
        </p>

        <div className="flex items-center gap-4">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-brand-muted transition-colors hover:text-brand-gold"
            >
              <Icon size={18} />
            </a>
          ))}

          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-border text-brand-gold transition-colors hover:bg-brand-surface"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
