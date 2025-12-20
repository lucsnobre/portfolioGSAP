"use client";

import { useEffect, useRef } from "react";

type CursorState = "default" | "link" | "text" | "media";

type CursorEl = HTMLDivElement & {
  dataset: DOMStringMap & {
    state?: CursorState;
    pressed?: "true" | "false";
    hidden?: "true" | "false";
  };
};

export function CustomCursor() {
  const rootRef = useRef<CursorEl | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduce) return;

    document.body.classList.add("has-custom-cursor");

    root.dataset.state = "default";
    root.dataset.pressed = "false";
    root.dataset.hidden = "true";

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };

    let rafId = 0;
    const tick = () => {
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;

      pos.x += dx * 0.18;
      pos.y += dy * 0.18;

      root.style.setProperty("--cursor-x", `${pos.x}px`);
      root.style.setProperty("--cursor-y", `${pos.y}px`);

      rafId = requestAnimationFrame(tick);
    };

    const setState = (state: CursorState) => {
      if (root.dataset.state === state) return;
      root.dataset.state = state;
    };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (root.dataset.hidden === "true") root.dataset.hidden = "false";
    };

    const onDown = () => {
      root.dataset.pressed = "true";
    };

    const onUp = () => {
      root.dataset.pressed = "false";
    };

    const onOver = (event: Event) => {
      const el = event.target as HTMLElement | null;
      if (!el) return;

      const explicit = el.closest("[data-cursor]") as HTMLElement | null;
      const explicitValue = explicit?.getAttribute("data-cursor") as CursorState | null;
      if (explicitValue) {
        setState(explicitValue);
        return;
      }

      if (el.closest("a, button, [role=\"button\"]")) {
        setState("link");
        return;
      }

      if (el.closest("input, textarea, [contenteditable=\"true\"]")) {
        setState("text");
        return;
      }

      setState("default");
    };

    const onOut = (event: Event) => {
      const related = (event as PointerEvent).relatedTarget as HTMLElement | null;
      if (related) return;
      setState("default");
    };

    const onWindowOut = (event: MouseEvent) => {
      if (event.relatedTarget !== null) return;
      root.dataset.hidden = "true";
      root.dataset.pressed = "false";
      setState("default");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);
    window.addEventListener("mouseout", onWindowOut, true);

    rafId = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      window.removeEventListener("mouseout", onWindowOut, true);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="custom-cursor"
    >
      <div className="custom-cursor__ring" />
      <div className="custom-cursor__dot" />
    </div>
  );
}
