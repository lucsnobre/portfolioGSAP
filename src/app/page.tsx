"use client";

import { PillNav } from "@/components/PillNav";
import { Reveal } from "@/components/Reveal";
import { InteractiveName } from "@/components/InteractiveName";
import { TextReveal } from "@/components/TextReveal";
import { AnimatedUnderline } from "@/components/AnimatedUnderline";
import { PressableButton } from "@/components/PressableButton";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { work } from "@/lib/work";
import Image from "next/image";
import lespeakerLogo from "../../images/lespeaker-logo.webp";
import gymBuddyLogo from "../../images/GYM_BUDDY_CLARO.png";
import alpineLogo from "../../images/alpine-logo.png";
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
      <ScrollIndicator />
      <PillNav />

      <section
        id="home"
        className="relative flex min-h-[100svh] overflow-hidden px-6 pb-10 pt-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 58% at 50% 10%, rgba(255, 206, 74, 0.86) 0%, rgba(255, 206, 74, 0) 60%), radial-gradient(45% 45% at 86% 18%, rgba(255, 250, 230, 0.96) 0%, rgba(255, 250, 230, 0) 62%), linear-gradient(180deg, rgba(255, 248, 214, 0.92) 0%, rgba(255, 255, 252, 0.98) 58%, rgba(255, 255, 255, 1) 100%)",
          }}
        />
        <div
          ref={blobRef}
          className="pointer-events-none absolute left-1/2 top-[-180px] h-[880px] w-[880px] -translate-x-1/2 rounded-full opacity-80 blur-3xl mix-blend-multiply"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255, 201, 76, 0.78), rgba(255, 201, 76, 0) 66%)",
          }}
        />

        <motion.div
          style={reduce ? undefined : { y: heroY, opacity: heroOpacity }}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-none"
        >
          <div className="flex min-h-[calc(100svh-7rem)] flex-col justify-end">
            <div className="mt-10 w-full">
              <p className="mb-10 max-w-xl text-pretty text-sm font-bold leading-relaxed tracking-tight text-neutral-700 md:mb-6 md:text-base">
                Desenvolvedor Full-Stack focado em entregar soluções inteligentes e apresentar designs surpreendentes.
              </p>
              <h1 className="text-[clamp(3.6rem,14vw,16rem)] font-black leading-[0.8] tracking-tight text-ink whitespace-nowrap">
                <InteractiveName variant="inline" />
              </h1>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="work" className="px-6 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
              <div>
                <TextReveal
                  text="Projetos"
                  as="div"
                  mode="letters"
                  className="text-sm font-semibold tracking-tight text-ink"
                />
                <div className="mt-3 max-w-[18rem] text-xs leading-relaxed tracking-wide text-neutral-500">
                  Seleção curta. Direta. Feita pra passar confiança.
                </div>
              </div>

              <div className="border-t border-ink/10">
                {work.map((item, idx) => {
                  const siteExternal = item.href.startsWith("http");
                  const repoExternal = item.repo?.startsWith("http");

                  const isLespeaker = item.title === "Lespeaker Áudio Part’s";
                  const isGymBuddy = item.title === "Gym Buddy";
                  const isAlpineDogs = item.title === "Alpine Dogs";

                  const icon = isLespeaker
                    ? lespeakerLogo
                    : isGymBuddy
                    ? gymBuddyLogo
                    : isAlpineDogs
                    ? alpineLogo
                    : null;

                  const iconAlt = isLespeaker
                    ? "Logo Lespeaker Áudio Part’s"
                    : isGymBuddy
                    ? "Logo Gym Buddy"
                    : isAlpineDogs
                    ? "Logo Alpine Dogs"
                    : "";

                  return (
                    <div
                      key={item.title}
                      className="group border-b border-ink/10 py-8 transition-colors duration-200 ease-in-out hover:bg-black/[0.02]"
                    >
                      <div className="flex items-start justify-between gap-8">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                            {icon && (
                              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-ink/10">
                                <Image
                                  src={icon}
                                  alt={iconAlt}
                                  className="h-7 w-7 object-contain"
                                />
                              </div>
                            )}
                            <a
                              href={item.href}
                              target={siteExternal ? "_blank" : undefined}
                              rel={siteExternal ? "noreferrer" : undefined}
                              className="block min-w-0 truncate text-lg font-semibold tracking-tight text-ink"
                            >
                              <AnimatedUnderline>{item.title}</AnimatedUnderline>
                            </a>
                            <div className="hidden text-xs font-medium tracking-wide text-neutral-400 md:block">
                              {String(idx + 1).padStart(2, "0")}
                            </div>
                            {item.repo ? (
                              <a
                                href={item.repo}
                                target={repoExternal ? "_blank" : undefined}
                                rel={repoExternal ? "noreferrer" : undefined}
                                className="text-xs font-medium tracking-wide text-neutral-500 transition-colors duration-200 ease-in-out hover:text-ink"
                              >
                                Repo
                              </a>
                            ) : null}
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
                    </div>
                  );
                })}
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
                <TextReveal
                  text="About"
                  as="div"
                  mode="letters"
                  className="text-sm font-semibold tracking-tight text-ink"
                />
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
                  <TextReveal
                    text="Contatos"
                    as="div"
                    mode="letters"
                    className="text-sm font-semibold tracking-tight text-ink"
                  />
                  <TextReveal
                    text="Conheça mais dos meus projetos"
                    as="div"
                    mode="words"
                    delay={0.05}
                    className="mt-5 text-balance text-[clamp(2.1rem,4.4vw,3.6rem)] font-black leading-[0.94] tracking-tight text-ink"
                  />
                  <p className="mt-4 max-w-lg text-pretty text-sm leading-relaxed tracking-tight text-neutral-700 md:text-base">
                    Se você quer um front-end que impressione em 5 segundos,
                    manda uma mensagem. Eu respondo rápido.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <PressableButton as="a" href="mailto:seuemail@exemplo.com" variant="primary">
                    Email
                  </PressableButton>
                  <PressableButton as="a" href="https://github.com/SEUUSUARIO" target="_blank" rel="noreferrer" variant="secondary">
                    GitHub
                  </PressableButton>
                  <PressableButton as="a" href="https://www.linkedin.com/in/SEUUSUARIO" target="_blank" rel="noreferrer" variant="secondary">
                    LinkedIn
                  </PressableButton>
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
            <AnimatedUnderline>Clique aqui para ir ao início</AnimatedUnderline>
          </a>
        </div>
      </footer>
    </main>
  );
}
