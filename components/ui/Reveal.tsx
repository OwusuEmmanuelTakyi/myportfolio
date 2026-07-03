"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import type { ReactNode } from "react";

type RevealVariant = "up" | "scale" | "left" | "right";

const variants: Record<RevealVariant, TargetAndTransition> = {
  up: { opacity: 0, y: 24 },
  scale: { opacity: 0, y: 16, scale: 0.94, filter: "blur(6px)" },
  left: { opacity: 0, x: -40 },
  right: { opacity: 0, x: 40 },
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
}) {
  return (
    <motion.div
      initial={variants[variant]}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
