"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useRef, useState } from "react";

const items = [
  { label: "Início", href: "#home" },
  { label: "Projetos", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Sobre Mim", href: "#about" },
  { label: "Contato", href: "#contact" },
];

type GlassMode = "top" | "up" | "down";

export function PillNav() {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  const modeRef = useRef<GlassMode>("top");
  const [mode, setModeState] = useState<GlassMode>("top");
  const setMode = (next: GlassMode) => {
    if (modeRef.current === next) return;
    modeRef.current = next;
    setModeState(next);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (reduce) return;

    const prev = lastY.current;
    const delta = latest - prev;
    lastY.current = latest;

    if (latest < 18) {
      setMode("top");
      return;
    }

    if (Math.abs(delta) < 6) return;

    if (delta > 0) setMode("down");
    if (delta < 0) setMode("up");
  });

  const navMotion = reduce
    ? {
        backgroundColor: "rgba(11, 11, 13, 0.72)",
        borderColor: "rgba(255, 255, 255, 0.10)",
      }
    : mode === "down"
      ? {
          backgroundColor: "rgba(11, 11, 13, 0.86)",
          borderColor: "rgba(255, 255, 255, 0.14)",
        }
      : mode === "up"
        ? {
            backgroundColor: "rgba(11, 11, 13, 0.66)",
            borderColor: "rgba(255, 255, 255, 0.10)",
          }
        : {
            backgroundColor: "rgba(11, 11, 13, 0.54)",
            borderColor: "rgba(255, 255, 255, 0.08)",
          };

  return (
    <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
      <motion.nav
        className="relative flex items-center gap-1 rounded-full border px-2 py-2 text-[13px] text-neutral-100 shadow-soft backdrop-blur-md"
        aria-label="Primary"
        animate={navMotion}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onMouseEnter={() => setHovered(item.href)}
            onMouseLeave={() => setHovered(null)}
            className="relative rounded-full px-4 py-2 leading-none tracking-tight text-neutral-200 transition-colors duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            {hovered === item.href ? (
              <motion.span
                layoutId="pill"
                className="absolute inset-0 rounded-full bg-white/10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            ) : null}
            <span className="relative z-10">{item.label}</span>
          </a>
        ))}
      </motion.nav>
    </div>
  );
}
