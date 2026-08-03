export const homePageContent: IHomePageContent = {
  aiSection: {
    title: "AI-Powered Development",
    subtitle:
      "We integrate leading AI tools into websites, apps, CRMs, and automation pipelines — powered by OpenAI, Claude, and Gemini APIs.",
    tools: [
      {
        name: "AI Chatbot",
        description:
          "Custom chatbots powered by OpenAI or Claude API, trained on your business data and embedded directly in your site or app.",
        icon: "Bot",
      },
      {
        name: "AI Content Generation",
        description:
          "Automate blog posts, product descriptions, and marketing copy with LLM-powered generation tailored to your brand voice.",
        icon: "PenLine",
      },
      {
        name: "AI Email Automation",
        description:
          "Personalized email sequences and auto-replies generated and sent automatically based on user behavior and CRM data.",
        icon: "Mail",
      },
      {
        name: "AI Lead Scoring",
        description:
          "Score and prioritize CRM leads using AI models trained on your sales history to focus effort on the highest-value prospects.",
        icon: "Target",
      },
      {
        name: "AI Product Recommendations",
        description:
          "Increase e-commerce conversions with personalized product suggestions powered by real-time AI analysis of user behavior.",
        icon: "ShoppingBag",
      },
      {
        name: "AI Data Extraction",
        description:
          "Extract structured data from PDFs, emails, invoices, and documents automatically using OCR and LLM parsing pipelines.",
        icon: "ScanLine",
      },
      {
        name: "Custom LLM Integration",
        description:
          "Connect OpenAI, Claude, or Gemini APIs into any existing application, workflow, or internal tool — fully custom.",
        icon: "Cpu",
      },
    ],
  },

  hero: {
    title:
      "We build websites, applications, and scripts at a professional level",
    subtitle: "Fast, scalable services tailored to your business.",
    cta: {
      primary: { text: "Request a free quote", link: "/contact" },
      secondary: { text: "View our services", link: "/services" },
    },
    image: "/images/hero-showcase2.jpg",
  },

  services: [
    {
      name: "Web Development",
      description:
        "Presentation sites, e-commerce, blogs, and custom platforms built for performance.",
      icon: "FaGlobe",
      link: "/services/web",
    },
    {
      name: "App Development",
      description: "Web and mobile applications for Android and iOS.",
      icon: "FaMobileAlt",
      link: "/services/app",
    },
    {
      name: "AI & Automation",
      description: "AI integrations, automation scripts, bots, and custom tools.",
      icon: "FaCogs",
      link: "/services/scripts",
    },
    {
      name: "SaaS Development",
      description: "Full-stack SaaS products with auth, billing, and dashboards.",
      icon: "FaServer",
      link: "/services/saas",
    },
  ],

  benefits: [
    { title: "Performance & Security", icon: "FaLock" },
    { title: "Modern & Responsive Design", icon: "FaLaptopCode" },
    { title: "Long-Term Scalability", icon: "FaChartLine" },
    { title: "Support & Maintenance", icon: "FaHeadset" },
  ],

  portfolio: {
    title: "Portfolio",
    projects: [
      {
        name: "E-commerce Shop",
        image: "/images/portfolio/e-commerce.webp",
        link: "/portfolio",
      },
      {
        name: "CRM Application",
        image: "/images/portfolio/crm.webp",
        link: "/portfolio",
      },
      {
        name: "Automation Script",
        image: "/images/portfolio/script.webp",
        link: "/portfolio",
      },
    ],
  },

  testimonials: {
    title: "What Our Clients Say",
    reviews: [],
  },

  process: {
    title: "How We Work",
    steps: [
      {
        number: "1",
        title: "Initial Consultation",
        description:
          "We discuss your needs and goals to understand the direction of the project.",
        icon: "FaComments",
      },
      {
        number: "2",
        title: "Planning & Quote",
        description:
          "We present a clear plan and a personalized offer, with no hidden costs.",
        icon: "FaClipboardList",
      },
      {
        number: "3",
        title: "Design & Development",
        description:
          "We build your solution using modern technologies and best practices.",
        icon: "FaCode",
      },
      {
        number: "4",
        title: "Testing & Launch",
        description:
          "We carefully test everything and launch the project under optimal conditions.",
        icon: "FaRocket",
      },
      {
        number: "5",
        title: "Support & Growth",
        description:
          "We provide maintenance and help you scale as your business evolves.",
        icon: "FaHandsHelping",
      },
    ],
  },

  faq: [
    {
      question: "How long does a project take?",
      answer:
        "It depends on the complexity, but typical projects take 2–8 weeks.",
    },
    {
      question: "Do you provide post-launch support?",
      answer:
        "Yes, we offer support and maintenance packages tailored to your needs.",
    },
    {
      question: "Can you work with existing websites?",
      answer:
        "Absolutely, we can improve, migrate, or extend existing projects.",
    },
  ],
};

export interface IHomePageContent {
  hero: IHomeHero;
  aiSection: IHomeAISection;
  services: IHomeService[];
  portfolio: IHomePortfolio;
  benefits: IHomeBenefits[];
  testimonials: IHomeTestimonial;
  process: IHomeProcess;
  faq: IHomeFAQ[];
}

export interface IHomeAISection {
  title: string;
  subtitle: string;
  tools: IHomeAITool[];
}

export interface IHomeAITool {
  name: string;
  description: string;
  icon: string;
}

export interface IHomeHero {
  title: string;
  subtitle: string;
  cta: {
    primary: { text: string; link: string };
    secondary: { text: string; link: string };
  };
  image: string;
}

export interface IHomeService {
  name: string;
  description: string;
  icon: string;
  link: string;
}

export interface IHomePortfolio {
  title: string;
  projects: IPortfolioProjects[];
}

interface IPortfolioProjects {
  name: string;
  image: string;
  link: string;
}

export interface IHomeTestimonial {
  title: string;
  reviews: ITestimonialReview[];
}

export interface ITestimonialReview {
  name: string;
  role: string;
  text: string;
  image: string;
}

export interface IHomeProcess {
  title: string;
  steps: IProcessSteps[];
}

export interface IProcessSteps {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface IHomeBenefits {
  title: string;
  icon: string;
}

export interface IHomeFAQ {
  question: string;
  answer: string;
}
