"use client";

import { PillNav } from "@/components/PillNav";
import { Reveal } from "@/components/Reveal";
import { work } from "@/lib/work";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useMemo, useRef } from "react";

export default function HomePage() {
  const reduce = useReducedMotion();
  const blobRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();

  const heroY = useTransform(scrollY, [0, 700], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 360], [1, 0.75]);

  useEffect(() => {
    const el = blobRef.current;
    if (!el) return;

    const prefersReduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduce) return;

    const t1 = gsap.to(el, {
      x: 46,
      y: -34,
      duration: 6.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    const t2 = gsap.to(el, {
      scale: 1.06,
      duration: 7.4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      t1.kill();
      t2.kill();
    };
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="relative">
      <PillNav />

      <section
        id="home"
        className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-28"
      >
        <div
          ref={blobRef}
          className="pointer-events-none absolute left-1/2 top-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-70 blur-3xl mix-blend-multiply"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255, 201, 76, 0.72), rgba(255, 201, 76, 0) 68%)",
          }}
        />

        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            style={reduce ? undefined : { y: heroY, opacity: heroOpacity }}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[68rem]"
          >
            <div className="text-sm font-medium tracking-tight text-neutral-700">
              Seja bem-vindo ao meu portfólio pessoal!
            </div>

            <h1 className="mt-6 text-balance text-[clamp(3.6rem,9.2vw,8.6rem)] font-black leading-[0.86] tracking-tight text-ink">
              Lucas
              <span className="relative mt-3 block">
                Nobre
                <svg
                  aria-hidden="true"
                  viewBox="0 0 540 120"
                  className="pointer-events-none absolute -left-2 top-[62%] h-12 w-[min(420px,84vw)] -translate-y-1/2 opacity-30"
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
            </h1>

            <p className="mt-8 max-w-xl text-pretty text-sm leading-relaxed tracking-tight text-neutral-700 md:text-base">
              Front-end dev focado em estética, performance e motion elegante.
              Interfaces premium, sem ruído.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium tracking-tight text-white shadow-soft transition-transform duration-200 ease-in-out hover:-translate-y-0.5"
              >
                Ver trabalhos
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-white/40 px-5 py-3 text-sm font-medium tracking-tight text-ink backdrop-blur-sm transition-colors duration-200 ease-in-out hover:bg-white/60"
              >
                Contato
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="work" className="px-6 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
              <div>
                <div className="text-sm font-semibold tracking-tight text-ink">
                  Work
                </div>
                <div className="mt-3 max-w-[18rem] text-xs leading-relaxed tracking-wide text-neutral-500">
                  Seleção curta. Direta. Feita pra passar confiança.
                </div>
              </div>

              <div className="border-t border-ink/10">
                {work.map((item, idx) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="group block border-b border-ink/10 py-8 transition-colors duration-200 ease-in-out hover:bg-black/[0.02]"
                  >
                    <div className="flex items-start justify-between gap-8">
                      <div className="min-w-0">
                        <div className="flex items-baseline gap-3">
                          <div className="truncate text-lg font-semibold tracking-tight text-ink">
                            {item.title}
                          </div>
                          <div className="hidden text-xs font-medium tracking-wide text-neutral-400 md:block">
                            {String(idx + 1).padStart(2, "0")}
                          </div>
                        </div>
                        <div className="mt-2 max-w-xl text-sm leading-relaxed tracking-tight text-neutral-700">
                          {item.meta}
                        </div>
                        <div className="mt-3 text-xs tracking-wide text-neutral-500">
                          {item.stack}
                        </div>
                      </div>

                      <div className="shrink-0 text-xs font-medium tracking-wide text-neutral-500">
                        {item.year}
                      </div>
                    </div>
                    <div className="mt-6 h-px w-full bg-ink/0 transition-colors duration-200 ease-in-out group-hover:bg-ink/10" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="about" className="px-6 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
              <div>
                <div className="text-sm font-semibold tracking-tight text-ink">
                  About
                </div>
                <div className="mt-3 max-w-[18rem] text-xs leading-relaxed tracking-wide text-neutral-500">
                  Editorial UI + brutal minimalism.
                </div>
              </div>

              <div className="max-w-2xl">
                <p className="text-pretty text-base leading-relaxed tracking-tight text-neutral-800 md:text-lg">
                  Eu projeto e construo interfaces com sensação premium.
                  Tipografia forte, grid perfeito e animações sutis que deixam o
                  produto mais vivo — sem virar show.
                </p>

                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  <div className="border-t border-ink/10 pt-4">
                    <div className="text-xs tracking-wide text-neutral-500">
                      Focus
                    </div>
                    <div className="mt-2 text-sm font-medium tracking-tight text-ink">
                      UI engineering
                    </div>
                  </div>
                  <div className="border-t border-ink/10 pt-4">
                    <div className="text-xs tracking-wide text-neutral-500">
                      Stack
                    </div>
                    <div className="mt-2 text-sm font-medium tracking-tight text-ink">
                      Next.js · React · Tailwind
                    </div>
                  </div>
                  <div className="border-t border-ink/10 pt-4">
                    <div className="text-xs tracking-wide text-neutral-500">
                      Motion
                    </div>
                    <div className="mt-2 text-sm font-medium tracking-tight text-ink">
                      Framer Motion · GSAP
                    </div>
                  </div>
                  <div className="border-t border-ink/10 pt-4">
                    <div className="text-xs tracking-wide text-neutral-500">
                      Obsessões
                    </div>
                    <div className="mt-2 text-sm font-medium tracking-tight text-ink">
                      Performance · detalhes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="px-6 pb-28 pt-24">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <div className="rounded-3xl border border-ink/10 bg-white/40 p-10 shadow-soft backdrop-blur-sm md:p-14">
              <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-sm font-semibold tracking-tight text-ink">
                    Contact
                  </div>
                  <h2 className="mt-5 text-balance text-[clamp(2.1rem,4.4vw,3.6rem)] font-black leading-[0.94] tracking-tight text-ink">
                    Vamos construir algo que pareça caro.
                  </h2>
                  <p className="mt-4 max-w-lg text-pretty text-sm leading-relaxed tracking-tight text-neutral-700 md:text-base">
                    Se você quer um front-end que impressione em 5 segundos,
                    manda uma mensagem. Eu respondo rápido.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:seuemail@exemplo.com"
                    className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium tracking-tight text-white transition-transform duration-200 ease-in-out hover:-translate-y-0.5"
                  >
                    Email
                  </a>
                  <a
                    href="https://github.com/SEUUSUARIO"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-white/30 px-5 py-3 text-sm font-medium tracking-tight text-ink transition-colors duration-200 ease-in-out hover:bg-white/50"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/SEUUSUARIO"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-white/30 px-5 py-3 text-sm font-medium tracking-tight text-ink transition-colors duration-200 ease-in-out hover:bg-white/50"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="px-6 pb-10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between text-xs tracking-wide text-neutral-500">
          <div>© {year} Lucas Nobre</div>
          <a
            href="#home"
            className="transition-colors duration-200 ease-in-out hover:text-ink"
          >
            Topo
          </a>
        </div>
      </footer>
    </main>
  );
}
