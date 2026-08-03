import { BarChart2, LayoutGrid, type LucideIcon } from "lucide-react";

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
  ],
  services: [
    { label: "Statistics", value: "statistics", icon: BarChart2 },
    { label: "View", value: "view", icon: LayoutGrid },
  ],
};
