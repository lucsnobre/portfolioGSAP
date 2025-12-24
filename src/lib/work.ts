export type WorkItem = {
  title: string;
  meta: string;
  stack: string;
  year: string;
  href: string;
  repo?: string;
};

export const work: WorkItem[] = [
  {
    title: "Lespeaker Áudio Part’s",
    meta: "Site desenvolvido para a empresa Lespeaker Áudio Part’s, para divulgação da loja e experiência dos clientes.",
    stack: "Next.js · React · Tailwind",
    year: "2025",
    href: "https://lespeakerweb-atualizado.vercel.app/",
    repo: "https://github.com/lucsnobre/lespeakerweb",
  },
  {
    title: "Gym Buddy",
    meta: "Aplicação desenvolvida para o TCC do curso Técnico em Desenvolvimento de Sistemas da escola técnica SENAI Jandira.",
    stack: "React · TypeScript · HTML · Vite",
    year: "2025",
    href: "https://front-end-gymbuddy.vercel.app/",
    repo: "https://github.com/Pedrohenrique1309/Front-end_GYMBUDDY",
  },
  {
    title: "Alpine Dogs",
    meta: "Aplicação feita durante as aulas do curso técnico de desenvolvimento de sistemas, explorando o framework Alpine.js consumindo a API Dogs.",
    stack: "HTML · CSS · JavaScript · Alpine.js",
    year: "2025",
    href: "https://lucsnobre.github.io/alpineJSDOG/",
    repo: "https://github.com/lucsnobre/alpineJSDOG",
  }
];
