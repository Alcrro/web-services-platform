export const portfolioPageContent: PortfolioPageContent = {
  hero: {
    title: "Our Portfolio",
    subtitle: "A showcase of projects where creativity meets technology.",
    cta: { text: "Request a Quote", href: "/contact" },
    badge: "Our Work",
    stats: [
      { value: "20+", label: "Projects Delivered" },
      { value: "4", label: "Tech Categories" },
      { value: "100%", label: "Client Satisfaction" },
    ],
  },

  filters: [
    { id: 1, name: "All", key: "all" },
    { id: 2, name: "Web Development", key: "web" },
    { id: 3, name: "App Development", key: "app" },
    { id: 4, name: "Scripts & Automation", key: "scripts" },
  ],

  projects: [
    // example project object structure
    {
      id: 1,
      title: "E-commerce Shop",
      description:
        "Custom online store with payment integration and admin panel.",
      category: "web",
      image: "/images/portfolio/e-commerce.webp",
      link: "#",
      tags: [
        { type: "frontend", value: "NextJS" },
        {
          type: "backend",
          value: "ExpressJS",
        },
        { type: "database", value: "MongoDB" },
        { type: "host", value: "aws" },
      ],
    },
    {
      id: 2,
      title: "CRM Application",
      description: "Customer management platform with reporting and analytics.",
      category: "app",
      image: "/images/portfolio/crm.webp",
      link: "#",
      tags: [
        {
          type: "frontend",
          value: ["NextJS", "Flutter", "React Native"],
        },
        { type: "backend", value: "ExpressJS" },
        { type: "database", value: "PostgreSQL" },
        { type: "host", value: "aws" },
      ],
    },
    {
      id: 3,
      title: "Automation Script",
      description: "Custom script to automate repetitive business tasks.",
      category: "scripts",
      image: "/images/portfolio/script.webp",
      link: "#",
      tags: [
        { type: "backend", value: "ExpressJS" },
        { type: "API", value: "API" },
        { type: "Automation", value: "python" },
      ],
    },
  ],

  testimonials: {
    title: "What Our Clients Say",
    reviews: [
      {
        name: "Andrei Popescu",
        role: "Founder",
        text: "The team delivered a flawless product with outstanding support.",
        image: "/images/testimonials/andrei.jpg",
      },
      {
        name: "Maria Ionescu",
        role: "Marketing Manager",
        text: "Professional, reliable, and creative. Highly recommend!",
        image: "/images/testimonials/maria.png",
      },
    ],
  },

  cta: {
    title: "Want to work with us on your next project?",
    button: { text: "Contact Us", href: "/contact" },
  },
};

export interface PortfolioHeroStat {
  value: string;
  label: string;
}

export interface PortfolioHeroSection {
  title: string;
  subtitle: string;
  cta: {
    text: string;
    href: string;
  };
  badge: string;
  stats: PortfolioHeroStat[];
}

export interface PortfolioFilterItem {
  id: number;
  name: string;
  key: string;
}

export interface PortfolioTag {
  type: string;
  value: string | string[]; // poate fi un singur tag sau o listă (ex. frontend)
}

export interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  tags: PortfolioTag[];
}

export interface PortfolioReview {
  name: string;
  role: string;
  text: string;
  image: string;
}

export interface PortfolioTestimonials {
  title: string;
  reviews: PortfolioReview[];
}

export interface PortfolioCtaSection {
  title: string;
  button: {
    text: string;
    href: string;
  };
}

export interface PortfolioPageContent {
  hero: PortfolioHeroSection;
  filters: PortfolioFilterItem[];
  projects: PortfolioProject[];
  testimonials: PortfolioTestimonials;
  cta: PortfolioCtaSection;
}
