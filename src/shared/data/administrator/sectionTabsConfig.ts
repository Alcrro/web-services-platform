import { BarChart2, LayoutGrid, MessageSquare, type LucideIcon } from "lucide-react";

interface TabConfig {
  label: string;
  value: string;
  icon: LucideIcon;
}

export const sectionTabsConfig: Record<string, TabConfig[]> = {
  clients: [
    { label: "Statistics", value: "statistics", icon: BarChart2 },
    { label: "View", value: "view", icon: LayoutGrid },
  ],
  orders: [
    { label: "Statistics", value: "statistics", icon: BarChart2 },
    { label: "View", value: "view", icon: LayoutGrid },
    { label: "Discussions", value: "discussions", icon: MessageSquare },
  ],
  services: [
    { label: "Statistics", value: "statistics", icon: BarChart2 },
    { label: "View", value: "view", icon: LayoutGrid },
  ],
};
