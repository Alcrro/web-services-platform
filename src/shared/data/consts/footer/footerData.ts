import { FaSlack, FaInstagram, FaDiscord } from "react-icons/fa";

export const footerData: IFooterData[] = [
  {
    id: 0,
    title: "alcrro",
    description: "Building websites, apps, and AI automations that scale.",
    children: [],
  },
  {
    id: 1,
    title: "services",
    children: [
      { id: 0, name: "Web Development", link: "/services/web" },
      { id: 1, name: "App Development", link: "/services/app" },
      { id: 2, name: "AI & Automation", link: "/services/scripts" },
      { id: 3, name: "SaaS Development", link: "/services/saas" },
    ],
  },
  {
    id: 2,
    title: "company",
    children: [
      { id: 0, name: "Portfolio", link: "/portfolio" },
      { id: 1, name: "Contact", link: "/contact" },
    ],
  },
  {
    id: 3,
    title: "contact",
    children: [{ id: 0, name: "email", value: "alex.roventa94@gmail.com" }],
  },
  {
    id: 4,
    title: "socials",
    children: [
      {
        id: 0,
        name: "slack",
        link: "https://join.slack.com/t/appdeveloperhub/shared_invite/zt-3dfds8v9h-AxGveNG5F4abwjNnzq01ig",
      },
      {
        id: 1,
        name: "discord",
        link: "https://discord.gg/cmHpexcz",
      },
      {
        id: 2,
        name: "instagram",
        link: "https://instagram.com/_alcrro_",
      },
    ],
  },
];

export const iconsMap: Record<string, React.ElementType> = {
  slack: FaSlack,
  instagram: FaInstagram,
  discord: FaDiscord,
};

export interface IFooterData {
  id: number;
  title: string;
  description?: string;
  children: IFooterChildren[];
}

export interface IFooterChildren {
  id: number;
  name: string;
  link?: string;
  value?: string;
}
