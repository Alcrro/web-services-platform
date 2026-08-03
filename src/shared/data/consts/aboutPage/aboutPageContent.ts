export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutSkill {
  name: string;
}

export interface AboutPageContent {
  badge: string;
  title: string;
  paragraphs: string[];
  stats: AboutStat[];
  skills: AboutSkill[];
  image: {
    src: string;
    alt: string;
  };
}

export const aboutPageContent: AboutPageContent = {
  badge: "About Me",
  title: "Alexandru Roventa",
  paragraphs: [
    "My passion for technology began at the age of 12, when I had my first interactions with a computer. By 14, I took my first steps into web development, modifying HTML and CSS in Adobe Dreamweaver, experimenting with scripts and templates for Counter-Strike 1.6 servers. This early curiosity taught me how to combine creativity with logic and the importance of attention to detail in every project.",
    "I attended the High School of Electrotechnics and Electronics, where I deepened my technical foundations, and later the Faculty of Automation and Applied Informatics, where I studied C++ and Oracle, developing my programming skills and understanding of complex systems.",
    "Today, I combine the practical experience I have gained since adolescence with solid academic knowledge to provide efficient software solutions tailored to clients' needs. Whether it is web development, application optimization, or complex automation projects, my approach is built on professionalism, attention to detail, and a passion for technology that has defined me for over 18 years.",
    "I am always ready to turn ideas into functional projects and deliver value through innovation and technical expertise.",
  ],
  stats: [
    { value: "18+", label: "Years of Experience" },
    { value: "50+", label: "Projects Delivered" },
    { value: "100%", label: "Client Satisfaction" },
  ],
  skills: [
    { name: "React" },
    { name: "Next.js" },
    { name: "TypeScript" },
    { name: "Node.js" },
    { name: "PostgreSQL" },
    { name: "Prisma" },
    { name: "TailwindCSS" },
    { name: "REST APIs" },
    { name: "Python" },
    { name: "AWS" },
    { name: "Claude AI" },
    { name: "OpenAI / GPT" },
    { name: "LLM Integration" },
  ],
  image: {
    src: "/images/profile.png",
    alt: "Alexandru Roventa — Full-Stack Developer",
  },
};
