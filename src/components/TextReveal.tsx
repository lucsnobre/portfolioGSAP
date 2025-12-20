"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  mode?: "words" | "letters";
  as?: "span" | "div";
};

export function TextReveal({
  text,
  className,
  delay = 0,
  mode = "words",
  as = "span",
}: TextRevealProps) {
  const reduce = useReducedMotion();

  const units = useMemo(() => {
    if (mode === "letters") return Array.from(text);
    return text.split(" ");
  }, [mode, text]);

  const Tag = as === "div" ? motion.div : motion.span;

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: mode === "letters" ? 0.018 : 0.06,
        delayChildren: delay,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 14,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.72,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={container}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {units.map((u, i) => (
          <motion.span
            key={`${u}-${i}`}
            variants={item}
            className="inline-block will-change-transform"
          >
            {u}
            {mode === "words" && i !== units.length - 1 ? "\u00A0" : null}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}
