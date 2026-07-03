"use client";

import { motion } from "framer-motion";

type TimelineEntry = { year: string; title: string };

const entries: TimelineEntry[] = [
  { year: "2021", title: "Enrolled, University of Ghana, Legon (Computer Science)" },
  { year: "2022", title: "Joined GHAMSU Publications Board" },
  { year: "2023", title: "Built first freelance projects; started PrinPoll" },
  {
    year: "2024",
    title: "VP Editor-in-Chief, GHAMSU; built Ghana Legal AI (final year project)",
  },
  {
    year: "2025",
    title: "Continuing Computer Science studies; expanding PrinPoll, NYIN, and entrepreneurial ventures",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function Timeline() {
  return (
    <motion.ol
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="relative border-l border-brand-border pl-8"
    >
      {entries.map((entry) => (
        <motion.li key={entry.year} variants={item} className="mb-10 last:mb-0">
          <span className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full bg-brand-gold" />
          <span className="font-mono text-sm text-brand-gold">{entry.year}</span>
          <p className="mt-1 text-brand-text">{entry.title}</p>
        </motion.li>
      ))}
    </motion.ol>
  );
}
