"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type CursorState = "default" | "link" | "text" | "media";

type LetterEffect = {
  className?: string;
  cursor?: CursorState;
  hover?: {
    x?: number;
    y?: number;
    rotate?: number;
    scale?: number;
    scaleX?: number;
    scaleY?: number;
  };
  previewSrc?: string;
};

const previewA =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=720&q=80";
const previewB =
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=720&q=80";

const effects: LetterEffect[] = [
  {
    className:
      "hover:[font-family:var(--font-graffiti)] hover:[text-shadow:0_22px_60px_rgba(0,0,0,0.12)]",
    cursor: "text",
    hover: { y: -4, rotate: -2, scale: 1.06 },
  },
  {
    className: "hover:text-ink hover:[font-family:var(--font-super-pixel)]",
    cursor: "media",
    hover: { y: -2, rotate: 2, scale: 1.04 },
    previewSrc: previewA,
  },
  {
    className: "hover:text-ink",
    cursor: "text",
    hover: { y: -1, scaleX: 1.22, scaleY: 0.98 },
  },
  {
    className:
      "hover:text-transparent hover:[-webkit-text-stroke:2px_rgba(11,11,13,0.82)]",
    cursor: "text",
    hover: { y: -3, rotate: -1, scale: 1.04 },
  },
  {
    className: "hover:text-ink",
    cursor: "text",
    hover: { y: -5, rotate: -6, scaleY: 1.08 },
  },
  {
    className:
      "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-amber-200 hover:to-ink",
    cursor: "text",
    hover: { y: -3, rotate: 1, scale: 1.03 },
  },
  {
    className: "hover:text-ink",
    cursor: "media",
    hover: { y: -2, rotate: 3, scale: 1.05 },
    previewSrc: previewB,
  },
  {
    className: "hover:text-ink",
    cursor: "text",
    hover: { y: -6, scale: 1.12, rotate: -1 },
  },
  {
    className: "hover:text-ink hover:[font-family:var(--font-super-pixel)]",
    cursor: "text",
    hover: { y: -3, rotate: 4, scaleX: 0.88, scaleY: 1.06 },
  },
  {
    className:
      "hover:text-ink hover:[text-shadow:0_18px_50px_rgba(0,0,0,0.14)]",
    cursor: "text",
    hover: { y: -4, rotate: -3, scale: 1.07 },
  },
];

function NameWord({
  text,
  startIndex,
  delay,
  onPreview,
  display,
}: {
  text: string;
  startIndex: number;
  delay: number;
  onPreview: (src: string | null) => void;
  display: "block" | "inline-block";
}) {
  const reduce = useReducedMotion();

  const letters = useMemo(() => Array.from(text), [text]);

  if (reduce) {
    return <span className={display}>{text}</span>;
  }

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.02,
        delayChildren: delay,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      className={display}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.85 }}
      variants={container}
    >
      {letters.map((char, i) => {
        const effect = effects[startIndex + i];
        const cursor = effect?.cursor ?? "text";

        return (
          <motion.span
            key={`${startIndex + i}-${char}`}
            data-cursor={cursor}
            variants={item}
            whileHover={effect?.hover}
            transition={{ type: "spring", stiffness: 520, damping: 32, mass: 0.75 }}
            onPointerEnter={() => onPreview(effect?.previewSrc ?? null)}
            onPointerLeave={() => onPreview(null)}
            className={
              "relative inline-block will-change-transform before:pointer-events-none before:absolute before:left-1/2 before:top-1/2 before:h-[1.25em] before:w-[1.25em] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-ink/[0.06] before:opacity-0 before:scale-75 before:blur-sm before:transition-all before:duration-300 hover:before:opacity-100 hover:before:scale-100 " +
              (effect?.className ?? "")
            }
          >
            <span className="relative z-10">{char}</span>
          </motion.span>
        );
      })}
    </motion.span>
  );
}

export function InteractiveName({
  variant = "stacked",
}: {
  variant?: "stacked" | "inline";
}) {
  const reduce = useReducedMotion();
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const x = useSpring(mx, { stiffness: 520, damping: 42, mass: 0.7 });
  const y = useSpring(my, { stiffness: 520, damping: 42, mass: 0.7 });

  useEffect(() => {
    if (reduce) return;

    const onMove = (event: PointerEvent) => {
      mx.set(event.clientX + 18);
      my.set(event.clientY + 18);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  if (reduce) {
    return <span>Lucas Nobre</span>;
  }

  const isInline = variant === "inline";
  const display: "block" | "inline-block" = isInline ? "inline-block" : "block";

  return (
    <>
      <span aria-label="Lucas Nobre">
        <span className="sr-only">Lucas Nobre</span>
        <span aria-hidden="true">
          <span
            className={
              isInline
                ? "relative inline-flex flex-nowrap items-baseline gap-x-[0.38em]"
                : ""
            }
          >
            <NameWord
              text="Lucas"
              startIndex={0}
              delay={0.0}
              onPreview={setPreviewSrc}
              display={display}
            />
            <span className={isInline ? "relative inline-block" : "relative mt-3 block"}>
              <NameWord
                text="Nobre"
                startIndex={5}
                delay={0.22}
                onPreview={setPreviewSrc}
                display={display}
              />
              <svg
                aria-hidden="true"
                viewBox="0 0 540 120"
                className={
                  isInline
                    ? "pointer-events-none absolute -left-2 top-[60%] h-12 w-[min(520px,84vw)] -translate-y-1/2 opacity-30"
                    : "pointer-events-none absolute -left-2 top-[62%] h-12 w-[min(420px,84vw)] -translate-y-1/2 opacity-30"
                }
              >
                <path
                  d="M16 74 C 98 22, 160 110, 248 66 C 336 20, 392 98, 520 44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </span>
      </span>

      <AnimatePresence>
        {previewSrc ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[9998] h-28 w-44 overflow-hidden rounded-2xl border border-white/25 bg-white/10 shadow-soft backdrop-blur-md"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${previewSrc})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/10" />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
