"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Sparkles,
  Compass,
  Workflow,
  History,
  Wrench,
  Heart,
  Mail,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons/SocialIcons";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Timeline } from "@/components/ui/Timeline";
import { SkillsGrid } from "@/components/ui/SkillsGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResumeSection } from "@/components/about/ResumeSection";
import { industries } from "@/lib/about-data";
import { cvContact } from "@/lib/cv-data";

// NOTE: Move metadata to a separate layout.ts since this is now a client component
// export const metadata: Metadata = { ... }

const galleryPhotos = [
  { label: "gallery/1.jpg", className: "h-56" },
  { label: "gallery/2.jpg", className: "h-72" },
  { label: "gallery/3.jpg", className: "h-64" },
  { label: "gallery/4.jpg", className: "h-48" },
];

const socialLinks = [
  { icon: GithubIcon, label: "GitHub", href: cvContact.githubUrl },
  { icon: LinkedinIcon, label: "LinkedIn", href: cvContact.linkedinUrl },
  { icon: XIcon, label: "Twitter / X", href: "#" },
  { icon: Mail, label: "Email", href: `mailto:${cvContact.email}` },
];

const quotes = [
  {
    text: "Africa's greatest opportunity lies in creating homegrown digital products that address everyday challenges while competing on a global scale.",
    context: "On African tech",
  },
  {
    text: "Every product begins with a real person who has a real problem. Technology is just the bridge — the empathy has to come first.",
    context: "On product thinking",
  },
  {
    text: "Access to justice shouldn't depend on how much money you have. AI can change that — if we build it right and deploy it responsibly.",
    context: "On legal tech & AI",
  },
  {
    text: "The best engineers I know aren't just coders — they're curious, they read widely, and they care deeply about the people they're building for.",
    context: "On engineering",
  },
];

const interestGroups = [
  {
    category: "Technology",
    items: ["Artificial Intelligence", "Legal Tech", "AI Policy", "Civic Tech", "Web3"],
  },
  {
    category: "Business",
    items: ["Startup Strategy", "Product Design", "Digital Transformation", "Entrepreneurship"],
  },
  {
    category: "Creative",
    items: ["Photography", "Graphic Design", "Writing", "Brand Strategy"],
  },
];

// ── Quote Carousel ────────────────────────────────────────────
function QuoteCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setCurrent((next + quotes.length) % quotes.length);
    },
    []
  );

  // Auto-advance every 6 s
  useEffect(() => {
    const id = setInterval(() => go(current + 1, 1), 6000);
    return () => clearInterval(id);
  }, [current, go]);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <div className="relative mx-auto max-w-3xl select-none">
      {/* Faded big quote mark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 left-0 font-serif text-9xl leading-none text-brand-gold opacity-15 select-none"
      >
        &ldquo;
      </span>

      {/* Slide area */}
      <div
        className="relative min-h-[160px] overflow-hidden px-8 py-4 cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => { setDragging(true); setDragStart(e.clientX); }}
        onMouseUp={(e) => {
          if (!dragging) return;
          setDragging(false);
          const diff = dragStart - e.clientX;
          if (Math.abs(diff) > 40) go(current + (diff > 0 ? 1 : -1), diff > 0 ? 1 : -1);
        }}
        onMouseLeave={() => setDragging(false)}
        onTouchStart={(e) => setDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const diff = dragStart - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) go(current + (diff > 0 ? 1 : -1), diff > 0 ? 1 : -1);
        }}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="text-center"
          >
            <p className="relative text-xl font-medium leading-snug text-brand-text sm:text-2xl lg:text-3xl">
              {quotes[current].text}
            </p>
            <p className="mt-4 font-mono text-xs text-brand-gold">
              — Owusu Emmanuel · {quotes[current].context}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => go(current - 1, -1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-border bg-brand-surface text-brand-muted transition-colors hover:border-brand-gold hover:text-brand-gold"
          aria-label="Previous quote"
        >
          <ChevronLeft size={15} />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              aria-label={`Quote ${i + 1}`}
              className="relative h-1.5 overflow-hidden rounded-full transition-all duration-300"
              style={{ width: i === current ? 24 : 6 }}
            >
              <span className="absolute inset-0 rounded-full bg-brand-border" />
              {i === current && (
                <motion.span
                  layoutId="dot"
                  className="absolute inset-0 rounded-full bg-brand-gold"
                />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => go(current + 1, 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-border bg-brand-surface text-brand-muted transition-colors hover:border-brand-gold hover:text-brand-gold"
          aria-label="Next quote"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="bg-brand-background">

      {/* ── Page header (no hero — name is on Home) ── */}
      <section className="relative overflow-hidden border-b border-brand-border/60">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(201,166,70,0.4) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-6xl px-6 py-16"
        >
          <span className="inline-block rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 font-mono text-xs text-brand-gold">
            {"< Who I Am />"}
          </span>
          <h1 className="mt-4 text-4xl font-bold text-brand-text sm:text-5xl">
            About Me
          </h1>
          <p className="mt-3 max-w-xl text-lg text-brand-muted">
            Technology entrepreneur, software developer, and AI enthusiast
            building digital solutions for Africa.
          </p>
        </motion.div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="mx-auto max-w-6xl px-6 py-20 space-y-24">

        {/* ── Bio + Gallery ── */}
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Gallery */}
            <div className="columns-2 gap-4 lg:col-span-2 [&>*]:mb-4 [&>*]:break-inside-avoid">
              {galleryPhotos.map((photo, i) => (
                <motion.div
                  key={photo.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                >
                  <ImagePlaceholder
                    label={photo.label}
                    className={`w-full rounded-xl transition-transform duration-300 hover:scale-[1.03] ${photo.className}`}
                  />
                </motion.div>
              ))}
            </div>

            {/* Bio */}
            <div className="space-y-5 text-lg leading-relaxed text-brand-muted lg:col-span-3">
              <p>
                Hi, I&apos;m{" "}
                <span className="font-semibold text-brand-text">
                  Owusu Emmanuel Takyi
                </span>
                , a technology entrepreneur, software developer, and AI
                enthusiast passionate about building digital solutions that
                solve real-world problems across Africa.
              </p>
              <p>
                I enjoy turning ideas into practical products that improve how
                people work, connect, vote, transact, and access opportunities.
                My work sits at the intersection of artificial intelligence,
                software engineering, digital transformation, and
                entrepreneurship.
              </p>
              <p>
                Whether I&apos;m designing a platform for creators, building
                civic technology, or exploring AI applications in governance
                and agriculture, my goal remains the same: create technology
                that delivers meaningful impact.
              </p>
              <p>
                I&apos;m a Computer Science graduate from the University of
                Ghana, where I developed both technical and leadership
                experience through academic projects, research, and startup
                development.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Quote Carousel ── */}
        <Reveal>
          <QuoteCarousel />
        </Reveal>

        <div className="h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />

        {/* ── What I Build ── */}
        <Reveal>
          <SectionHeading icon={Code2} index="01" title="What I Build" />
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-muted">
            Over the years I have designed and developed projects across
            multiple industries, including:
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {industries.map(({ label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2.5 rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-text transition-colors hover:border-brand-gold/40 hover:bg-brand-gold/5"
              >
                <Icon size={15} className="shrink-0 text-brand-gold" />
                {label}
              </motion.div>
            ))}
          </div>

          <div className="mt-10 space-y-5 text-lg leading-relaxed text-brand-muted">
            <p>
              Legal tech is a particular focus of mine. My{" "}
              <Link
                href="/projects/legal-ai-ghana"
                className="inline-flex items-center gap-1 text-brand-gold hover:underline"
              >
                Ghana Legal AI Assistant
                <ExternalLink size={13} />
              </Link>{" "}
              gives ordinary Ghanaians plain-language answers on tenancy,
              labour, and consumer rights — building it pulled me into a
              deeper interest in AI policy: how AI should be regulated,
              deployed, and held accountable in legal and governance systems.
            </p>
            <p>
              One of my flagship projects is{" "}
              <Link
                href="/projects/prinpoll"
                className="inline-flex items-center gap-1 text-brand-gold hover:underline"
              >
                PRINPOLL Ghana
                <ExternalLink size={13} />
              </Link>
              , an event technology platform enabling organizations to manage
              online and USSD voting, nominations, and event engagement.
            </p>
            <p>
              Beyond those, I&apos;ve explored a{" "}
              <Link href="/projects/ride-campus-pooling" className="text-brand-gold hover:underline">
                campus ride-sharing platform
              </Link>{" "}
              for University of Ghana students, a{" "}
              <Link href="/projects/smart-water-billing" className="text-brand-gold hover:underline">
                smart water billing system
              </Link>
              , and AI-driven governance solutions for digital public services.
            </p>
          </div>
        </Reveal>

        <div className="h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />

        {/* ── Interests ── */}
        <Reveal>
          <SectionHeading icon={Sparkles} index="02" title="My Interests" />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {interestGroups.map(({ category, items }, gi) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.1, duration: 0.4 }}
                className="rounded-xl border border-brand-border bg-brand-surface p-5 transition-colors hover:border-brand-gold/30"
              >
                <p className="mb-3 font-mono text-xs font-semibold tracking-wider text-brand-gold uppercase">
                  {category}
                </p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-brand-muted">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-brand-gold opacity-60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <div className="h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />

        {/* ── Vision ── */}
        <Reveal className="max-w-3xl">
          <SectionHeading icon={Compass} index="03" title="My Vision" />
          <div className="mt-4 space-y-4 text-lg leading-relaxed text-brand-muted">
            <p>
              My long-term vision is to build a network of technology companies
              that transform key sectors across Africa — governance,
              agriculture, education, healthcare, finance, media, and the
              creative industry.
            </p>
            <p>
              Beyond building successful companies, I hope to contribute to
              Africa&apos;s technology ecosystem by mentoring young innovators,
              creating employment opportunities, and encouraging responsible use
              of AI — particularly in legal and governance systems where the
              stakes are highest.
            </p>
          </div>
        </Reveal>

        {/* ── How I Work ── */}
        <Reveal className="max-w-3xl">
          <SectionHeading icon={Workflow} index="04" title="How I Work" />
          <div className="mt-4 space-y-4 text-lg leading-relaxed text-brand-muted">
            <p>
              I believe great products are built through curiosity, continuous
              learning, collaboration, and disciplined execution. Every project
              begins with understanding the real problem before designing a
              simple, effective, and scalable solution.
            </p>
            <p>
              My approach combines technical expertise with strategic thinking,
              bridging the gap between technology and business while keeping
              users at the center of every decision.
            </p>
          </div>
        </Reveal>

        <div className="h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />

        {/* ── Timeline ── */}
        <div>
          <SectionHeading icon={History} index="05" title="Timeline" />
          <div className="mt-10 max-w-2xl">
            <Timeline />
          </div>
        </div>

        {/* ── Skills ── */}
        <div>
          <SectionHeading icon={Wrench} index="06" title="Skills & Stack" />
          <div className="mt-10">
            <SkillsGrid />
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />

        {/* ── Resume ── */}
        <Reveal>
          <ResumeSection index="07" />
        </Reveal>

        <div className="h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />

        {/* ── Beyond Tech ── */}
        <Reveal className="max-w-3xl">
          <SectionHeading icon={Heart} index="08" title="Beyond Technology" />
          <div className="mt-4 space-y-4 text-lg leading-relaxed text-brand-muted">
            <p>
              Outside software development, I research emerging technologies,
              study startup ecosystems, contribute to faith-based technology
              initiatives, and write about innovation. I look for opportunities
              where technology can create real social and economic impact.
            </p>
            <p>
              I also shoot photography and take on graphic design work — from
              brand identity for{" "}
              <Link href="/projects/pop-aura" className="text-brand-gold hover:underline">
                Pop Aura
              </Link>{" "}
              to event and portrait photography.
            </p>
          </div>
        </Reveal>

        {/* ── CTA ── */}
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-brand-gold/50 bg-brand-surface p-8 sm:p-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(201,166,70,0.5) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

            <div className="relative grid gap-8 sm:grid-cols-2 sm:items-center">
              <div>
                <SectionHeading icon={Mail} index="09" title="Let's Connect" />
                <p className="mt-4 text-base leading-relaxed text-brand-muted">
                  Open to collaborating with startups, businesses, researchers,
                  and innovators passionate about using technology to solve
                  meaningful problems.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="rounded-full bg-brand-gold px-6 py-2.5 text-sm font-semibold text-brand-background transition-transform hover:scale-105"
                  >
                    Get in Touch
                  </Link>
                  <Link
                    href="/chat"
                    className="rounded-full border border-brand-gold px-6 py-2.5 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-background"
                  >
                    Chat With My AI
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-3 rounded-xl border border-brand-border bg-brand-background px-4 py-3 text-sm text-brand-muted transition-colors hover:border-brand-gold/40 hover:text-brand-gold"
                  >
                    <Icon size={16} className="shrink-0 text-brand-gold" />
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}