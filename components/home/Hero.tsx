"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Typewriter } from "./Typewriter";
import { FadeImage } from "@/components/ui/FadeImage";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden bg-brand-background"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 animate-[drift_20s_linear_infinite]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(201,166,70,0.35) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 py-20 md:grid-cols-5">
        <div className="md:col-span-3">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-sm text-brand-gold"
          >
            {"< Available for opportunities />"}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl font-bold tracking-tight text-brand-text sm:text-6xl lg:text-7xl"
          >
            Emmanuel Owusu Takyi
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 h-9 text-xl font-medium sm:text-2xl"
          >
            <Typewriter />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-xl text-lg text-brand-muted"
          >
            I build digital products for Africa and beyond — from AI
             to live consultancy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/projects"
              className="rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-background transition-transform hover:scale-105"
            >
              View My Work
            </Link>
            <Link
              href="/chat"
              className="rounded-full border border-brand-gold px-6 py-3 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-background"
            >
              Chat With My AI
            </Link>
          </motion.div>
        </div>

        <motion.div
          style={{ y: imageY, opacity: imageOpacity }}
          className="relative flex items-center justify-center md:col-span-2"
        >
          <div className="absolute h-72 w-72 rounded-full bg-brand-gold/20 blur-3xl sm:h-80 sm:w-80" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { duration: 0.6 },
              y: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.6 },
            }}
            className="relative h-72 w-64 overflow-hidden rounded-3xl border-2 border-brand-gold sm:h-80 sm:w-72"
            style={{ filter: "drop-shadow(0 0 30px rgba(201,166,70,0.3))" }}
          >
            <FadeImage
              src="/images/hero/emmanuel.png"
              alt="Emmanuel Owusu Takyi"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 640px) 288px, 256px"
              wrapperClassName="h-full w-full"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-gold"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}
