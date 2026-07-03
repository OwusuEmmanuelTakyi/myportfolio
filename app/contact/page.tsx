"use client";

import { useState } from "react";
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

const badges = ["Freelance Projects", "Collaborations", "Full-time Roles"];

const CONTACT_EMAIL = cvContact.email;

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      form.subject || "Portfolio contact"
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-4xl font-bold text-brand-text sm:text-5xl">Contact</h1>
      <p className="mt-4 text-lg text-brand-muted">
        Have a project in mind or just want to say hi? Reach out.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="text-sm text-brand-muted">Currently open to:</span>
        {badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-brand-gold px-3 py-1 text-xs font-medium text-brand-gold"
          >
            {badge}
          </span>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-text outline-none focus:border-brand-gold"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-text outline-none focus:border-brand-gold"
          />
        </div>
        <input
          required
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-text outline-none focus:border-brand-gold"
        />
        <textarea
          required
          rows={6}
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-text outline-none focus:border-brand-gold"
        />
        <button
          type="submit"
          className="rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-background"
        >
          Send Message
        </button>
      </form>

      <div className="mt-12 flex gap-5 border-t border-brand-border pt-8">
        {socials.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-brand-muted transition-colors hover:text-brand-gold"
          >
            <Icon size={20} />
          </a>
        ))}
      </div>
    </section>
  );
}
