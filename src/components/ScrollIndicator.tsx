"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "framer-motion";

export function ScrollIndicator() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (reduce) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-neutral-900/10 origin-left"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.div
        className="h-full bg-ink origin-left"
        style={{ scaleX }}
      />
    </motion.div>
  );
}
