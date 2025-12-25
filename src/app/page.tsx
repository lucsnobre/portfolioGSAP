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
              <p className="mb-6 max-w-xl text-pretty text-base font-bold leading-relaxed tracking-tight text-neutral-700 md:mb-4 md:text-lg">
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
                  Seleção curta. Direta. Escolhi alguns dos meus melhores projetos.
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
                    <motion.div
                      key={item.title}
                      initial={reduce ? false : { opacity: 0, y: 14 }}
                      whileInView={
                        reduce
                          ? undefined
                          : {
                              opacity: 1,
                              y: 0,
                              transition: {
                                duration: 0.65,
                                ease: [0.22, 1, 0.36, 1],
                                delay: idx * 0.06,
                              },
                            }
                      }
                      viewport={{ once: true, amount: 0.35 }}
                      whileHover={
                        reduce
                          ? undefined
                          : {
                              y: -2,
                              transition: {
                                type: "spring",
                                stiffness: 320,
                                damping: 26,
                                mass: 0.9,
                              },
                            }
                      }
                      className="group border-b border-ink/10 py-8 transition-colors duration-200 ease-in-out hover:bg-black/[0.02] will-change-transform"
                    >
                      <div className="flex items-start justify-between gap-8">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                            {icon && (
                              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-ink/10 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:will-change-transform motion-safe:group-hover:scale-[1.06] motion-safe:group-hover:-rotate-1">
                                <Image
                                  src={icon}
                                  alt={iconAlt}
                                  className="h-7 w-7 object-contain motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:scale-105"
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
                      <div className="mt-6 h-px w-full bg-ink/0 transition-colors duration-200 ease-in-out group-hover:bg-ink/10 motion-safe:origin-left motion-safe:scale-x-0 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:will-change-transform motion-safe:group-hover:scale-x-100" />
                    </motion.div>
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
                  text="Sobre mim"
                  as="div"
                  mode="letters"
                  className="text-sm font-semibold tracking-tight text-ink"
                />
                <div className="mt-3 max-w-[18rem] text-xs leading-relaxed tracking-wide text-neutral-500">
                  Um resumo da minha experiência com programação.
                </div>
              </div>

              <div className="max-w-2xl">
                <p className="text-pretty text-base leading-relaxed tracking-tight text-neutral-800 md:text-lg">
                  Projeto e construo aplicações, desde suas interfaces até seu sistema no geral. Gosto de explorar novos recursos e de expandir meus conhecimentos na área da programação.
                </p>

                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  <div className="border-t border-ink/10 pt-4 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:will-change-transform motion-safe:hover:-translate-y-0.5">
                    <div className="text-xs tracking-wide text-neutral-500">
                      Foco
                    </div>
                    <div className="mt-2 text-sm font-medium tracking-tight text-ink">
                      Criação de interfaces e experiência do usuário (Front-end).
                    </div>
                  </div>
                  <div className="border-t border-ink/10 pt-4 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:will-change-transform motion-safe:hover:-translate-y-0.5">
                    <div className="text-xs tracking-wide text-neutral-500">
                      Stack
                    </div>
                    <div className="mt-2 text-sm font-medium tracking-tight text-ink">
                      Next.js · React · Tailwind · JavaScript · TypeScript · Python · Node.js · HTML · CSS · C++ · Kotlin
                    </div>
                  </div>
                  <div className="border-t border-ink/10 pt-4 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:will-change-transform motion-safe:hover:-translate-y-0.5">
                    <div className="text-xs tracking-wide text-neutral-500">
                      Habilidades Pessoais e Interpessoais
                    </div>
                    <div className="mt-2 text-sm font-medium tracking-tight text-ink">
                      Boa comunicação · Aprendizado rápido · Bom trabalho em equipe · Bom ouvinte
                    </div>
                  </div>
                  <div className="border-t border-ink/10 pt-4 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:will-change-transform motion-safe:hover:-translate-y-0.5">
                    <div className="text-xs tracking-wide text-neutral-500">
                      Obsessões
                    </div>
                    <div className="mt-2 text-sm font-medium tracking-tight text-ink">
                      UI/UX · Performance · Detalhes
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
            <motion.div
              className="rounded-3xl border border-ink/10 bg-white/40 p-10 shadow-soft backdrop-blur-sm transition-shadow duration-300 ease-out hover:shadow-[0_24px_70px_rgba(0,0,0,0.10)] focus-within:shadow-[0_24px_70px_rgba(0,0,0,0.10)] md:p-14"
              whileHover={reduce ? undefined : { y: -2 }}
              transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.9 }}
            >
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
                    Conheça mais de mim e de meus projetos desenvolvidos até hoje!
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <PressableButton
                    as="a"
                    href="mailto:lucasfilbeto@gmail.com"
                    variant="primary"
                  >
                    <span className="sr-only">Email</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-[#EA4335] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:scale-[1.06]"
                    >
                      <path
                        d="M4 6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v10.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25V6.75Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        fill="none"
                      />
                      <path
                        d="M5.5 7.5 12 12.25 18.5 7.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </PressableButton>
                  <PressableButton
                    as="a"
                    href="https://github.com/lucsnobre"
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-[#181717] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:scale-[1.06]"
                    >
                      <path
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 4.302 2.793 7.956 6.675 9.242.488.09.667-.212.667-.472 0-.233-.009-.85-.013-1.669-2.716.59-3.29-1.31-3.29-1.31-.444-1.127-1.084-1.427-1.084-1.427-.886-.605.067-.593.067-.593  .98.069 1.495 1.007 1.495 1.007.87 1.492 2.285 1.061 2.842.812.089-.63.34-1.061.618-1.305-2.169-.247-4.448-1.084-4.448-4.823 0-1.066.381-1.938 1.005-2.622-.101-.247-.436-1.241.096-2.587 0 0 .817-.262 2.677 1.002A9.34 9.34 0 0 1 12 6.32c.828.004 1.663.112 2.443.328 1.859-1.264 2.675-1.002 2.675-1.002.534 1.346.199 2.34.098 2.587.626.684 1.004 1.556 1.004 2.622 0 3.748-2.283 4.573-4.46 4.815.35.302.664.897.664 1.809 0 1.306-.012 2.359-.012 2.681 0 .262.177.566.672.47C19.96 19.953 22.75 16.3 22.75 12c0-5.385-4.365-9.75-9.75-9.75Z"
                        fill="currentColor"
                      />
                    </svg>
                  </PressableButton>
                  <PressableButton
                    as="a"
                    href="https://www.linkedin.com/in/lucas-rodrigues-nobre-01941b327/"
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-[#0A66C2] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:scale-[1.06]"
                    >
                      <path
                        d="M4.98 3.5C4.98 4.604 4.16 5.5 2.9 5.5 1.66 5.5.84 4.604.84 3.5.84 2.37 1.68 1.5 2.94 1.5c1.26 0 2.04.87 2.04 2Zm.04 3.75H1V22h4.02V7.25Zm6.74 0H7.78V22h3.98v-7.67c0-2.02.76-3.29 2.66-3.29 1.43 0 2.16.96 2.16 3.29V22h3.98v-8.59c0-4.08-2.18-5.98-5.1-5.98-2.36 0-3.4 1.3-3.98 2.21h-.08V7.25Z"
                        fill="currentColor"
                      />
                    </svg>
                  </PressableButton>
                </div>
              </div>
            </motion.div>
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
