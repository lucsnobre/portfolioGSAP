"use client";

import { CustomCursor } from "@/components/CustomCursor";
import Lenis from "lenis";
import { useEffect } from "react";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (!href.startsWith("#")) return;

      if (href === "#") {
        event.preventDefault();
        lenis.scrollTo(0, { duration: 1.1 });
        history.pushState(null, "", href);
        return;
      }

      const el = document.querySelector(href) as HTMLElement | null;
      if (!el) return;

      event.preventDefault();
      lenis.scrollTo(href, { offset: -96, duration: 1.1 });
      history.pushState(null, "", href);
    };

    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {children}
      <CustomCursor />
    </>
  );
}
