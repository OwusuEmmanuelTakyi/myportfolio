"use client";

import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  cvDownloadUrl,
  cvSummary,
  cvEducation,
  cvSkills,
  cvExperience,
  cvLeadership,
} from "@/lib/cv-data";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { delay, duration: 0.4 },
  };
}

export function ResumeSection({ index }: { index: string }) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading icon={Briefcase} index={index} title="Resume" />
        <a
          href={cvDownloadUrl}
          download
          className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-background transition-transform hover:scale-105"
        >
          <Download size={16} />
          Download CV
        </a>
      </div>

      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-brand-muted">
        {cvSummary}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-brand-gold">
              <Briefcase size={15} />
              Experience
            </h3>
            <div className="mt-4 space-y-6">
              {cvExperience.map((entry, i) => (
                <motion.div key={entry.role} {...fadeUp(i * 0.08)}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold text-brand-text">
                      {entry.role}
                      {entry.org && (
                        <span className="text-brand-muted"> — {entry.org}</span>
                      )}
                    </p>
                    {entry.period && (
                      <span className="font-mono text-xs text-brand-muted">
                        {entry.period}
                      </span>
                    )}
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {entry.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2 text-sm leading-relaxed text-brand-muted"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-gold" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-brand-gold">
              <Award size={15} />
              Leadership
            </h3>
            <div className="mt-4 space-y-5">
              {cvLeadership.map((entry, i) => (
                <motion.div key={entry.role} {...fadeUp(i * 0.06)}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold text-brand-text">{entry.role}</p>
                    {entry.period && (
                      <span className="font-mono text-xs text-brand-muted">
                        {entry.period}
                      </span>
                    )}
                  </div>
                  {entry.org && (
                    <p className="text-sm text-brand-muted">{entry.org}</p>
                  )}
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">
                    {entry.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-brand-gold">
              <GraduationCap size={15} />
              Education
            </h3>
            <div className="mt-4 rounded-xl border border-brand-border bg-brand-surface p-5">
              <p className="font-semibold text-brand-text">{cvEducation.school}</p>
              <p className="text-sm text-brand-muted">{cvEducation.degree}</p>
              <p className="mt-1 font-mono text-xs text-brand-gold">
                {cvEducation.period}
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-wide text-brand-muted">
                Relevant Courses
              </p>
              <ul className="mt-2 space-y-1">
                {cvEducation.courses.map((course) => (
                  <li key={course} className="text-sm text-brand-muted">
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-sm uppercase tracking-wider text-brand-gold">
              Skills Summary
            </h3>
            <div className="mt-4 space-y-4">
              {cvSkills.map((group) => (
                <div key={group.category}>
                  <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
                    {group.category}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-brand-border px-2.5 py-1 text-xs text-brand-text"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
