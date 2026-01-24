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
  },
  {
    title: "Planify",
    meta: "Aplicação feita durante as aulas do curso técnico de desenvolvimento de sistemas. O projeto foi realizado com base no tema: Gestão de Projetos como um desafio final para o 1° semestre de 2025.",
    stack: "HTML · CSS · JavaScript · SQL",
    year: "2025",
    href: "https://lucsnobre.github.io/planify2025/",
    repo: "https://github.com/lucsnobre/planify2025",
  },
  {
    title: "Pictory",
    meta: "Aplicação feita durante as aulas do curso técnico de desenvolvimento de sistemas. O projeto foi feito para uma atividade da disciplina de gestão de projetos, com objetivo de criar uma rede social que consumisse a API criada pelo professor.",
    stack: "HTML · CSS · JavaScript",
    year: "2025",
    href: "https://lucsnobre.github.io/pictory2024/",
    repo: "https://github.com/lucsnobre/pictory2024",
  }
];
