import { Bell, SunMoon, User, Search } from "lucide-react";

export const navbarItems = [
  {
    label: "Search",
    icon: Search,
    type: "search", // item special, va fi input în UI
    href: null,
  },
  {
    label: "Notifications",
    icon: Bell,
    type: "notifications",
    href: "/administrator/control-panel/notifications",
  },
  {
    label: "Theme",
    icon: SunMoon,
    type: "theme-toggle",
    href: null, // doar toggle JS
  },
  {
    label: "Profile",
    icon: User,
    type: "profile",
    href: "/administrator/control-panel/profile",
  },
];
