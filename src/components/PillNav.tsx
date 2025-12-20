"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const items = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function PillNav() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <nav
        className="relative flex items-center gap-1 rounded-full border border-white/10 bg-neutral-900/70 px-1 py-1 text-[13px] text-neutral-100 shadow-soft backdrop-blur-md"
        aria-label="Primary"
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
      </nav>
    </div>
  );
}
