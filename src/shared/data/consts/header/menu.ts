export const navbarMenuData = [
  {
    id: 0,
    name: "home",
    link: "/",
  },
  {
    id: 1,
    name: "services",
    link: "/services",
  },
  {
    id: 2,
    name: "portfolio",
    link: "/portfolio",
  },
  {
    id: 3,
    name: "about me",
    link: "/about",
  },
  {
    id: 4,
    name: "contact",
    link: "/contact",
  },
] as const;

export interface INavbarMenu {
  id: number;
  name: string;
  link: string;
}
