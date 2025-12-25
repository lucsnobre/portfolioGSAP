"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedUnderlineProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedUnderline({ children, className = "" }: AnimatedUnderlineProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full bg-current origin-left"
        variants={{
          rest: { scaleX: 0 },
          hover: { scaleX: 1 },
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.span>
  );
}
